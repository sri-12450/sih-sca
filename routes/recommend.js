// routes/recommend.js
const express = require('express');
const router = express.Router();

/*
 Expected input (POST JSON):
 {
   "soil": { "n": 200, "p": 40, "k": 150, "ph": 6.5 },
   "location": { "lat": 30.9, "lon": 76.7, "district": "SAS Nagar" },
   "season": "Kharif"  // optional
 }
*/

router.post('/', async (req, res) => {
  try {
    const { soil, location, season } = req.body || {};

    // Simple demo rules (replace with ML model later)
    const recommendations = [];

    // Example rules: if high N and adequate rain -> recommend maize/rice
    if (soil) {
      const { n = 0, p = 0, k = 0, ph = 7 } = soil;

      if (n > 150 && p > 30) {
        recommendations.push({ crop: "Maize", confidence: 0.82, reason: "High N & P" });
      }
      if (ph >= 6 && ph <= 7.5) {
        recommendations.push({ crop: "Wheat", confidence: 0.75, reason: "Suitable pH" });
      }
      if (k > 120) {
        recommendations.push({ crop: "Cotton", confidence: 0.68, reason: "High K" });
      }
    }

    // Fallback top crops if none matched
    if (recommendations.length === 0) {
      recommendations.push(
        { crop: "Maize", confidence: 0.5, reason: "General-purpose suggestion" },
        { crop: "Wheat", confidence: 0.45, reason: "Seasonal fallback" },
        { crop: "Mustard", confidence: 0.4, reason: "Low-input option" }
      );
    }

    // Return top-3 sorted by confidence
    recommendations.sort((a,b) => b.confidence - a.confidence);
    res.json({ top3: recommendations.slice(0,3) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
