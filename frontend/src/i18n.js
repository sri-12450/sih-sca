// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome, {{name}}!",
      cropDashboard: "🌾 Crop Recommendation Dashboard",
      nitrogen: "Nitrogen",
      phosphorus: "Phosphorus",
      potassium: "Potassium",
      phValue: "pH Value",
      season: "Season",
      kharif: "Kharif",
      rabi: "Rabi",
      getRecommendation: "Get Recommendation",
      recommendedCrops: "Recommended Crops",
      reason: "Reason",
      error: "Error fetching recommendation",
      confidence: "Confidence",

      crops: {
        wheat: "Wheat",
        maize: "Maize",
        rice: "Rice",
        cotton: "Cotton"
      },

      npk: {
        wheat: { n: "N: 120", p: "P: 60", k: "K: 40" },
        maize: { n: "N: 150", p: "P: 70", k: "K: 60" },
        rice: { n: "N: 100", p: "P: 50", k: "K: 40" },
        cotton: { n: "N: 130", p: "P: 65", k: "K: 45" }
      },

      reasons: {
        highN: "High Nitrogen requirement",
        balanced: "Balanced nutrients required",
        highK: "High Potassium requirement"
      }
    }
  },

  hi: {
    translation: {
      welcome: "स्वागत है, {{name}}!",
      cropDashboard: "🌾 फसल अनुशंसा डैशबोर्ड",
      nitrogen: "नाइट्रोजन",
      phosphorus: "फॉस्फोरस",
      potassium: "पोटैशियम",
      phValue: "पीएच मान",
      season: "मौसमी",
      kharif: "खरीफ",
      rabi: "रबी",
      getRecommendation: "अनुशंसा प्राप्त करें",
      recommendedCrops: "अनुशंसित फसलें",
      reason: "कारण",
      error: "अनुशंसा लाने में त्रुटि",
      confidence: "विश्वास",

      crops: {
        wheat: "गेहूँ",
        maize: "मकई",
        rice: "चावल",
        cotton: "कपास"
      },

      npk: {
        wheat: { n: "N: 120", p: "P: 60", k: "K: 40" },
        maize: { n: "N: 150", p: "P: 70", k: "K: 60" },
        rice: { n: "N: 100", p: "P: 50", k: "K: 40" },
        cotton: { n: "N: 130", p: "P: 65", k: "K: 45" }
      },

      reasons: {
        highN: "उच्च नाइट्रोजन आवश्यकता",
        balanced: "संतुलित पोषक तत्वों की आवश्यकता",
        highK: "उच्च पोटैशियम आवश्यकता"
      }
    }
  },

  ta: {
    translation: {
      welcome: "வரவேற்கிறோம், {{name}}!",
      cropDashboard: "🌾 பயிர் பரிந்துரைக் கட்டளை பலகை",
      nitrogen: "நைட்ரஜன்",
      phosphorus: "பாஸ்பரஸ்",
      potassium: "பொட்டாசியம்",
      phValue: "pH மதிப்பு",
      season: "பருவம்",
      kharif: "காரிஃப்",
      rabi: "ராபி",
      getRecommendation: "பரிந்துரையைப் பெறுங்கள்",
      recommendedCrops: "பரிந்துரைக்கப்பட்ட பயிர்கள்",
      reason: "காரணம்",
      error: "பரிந்துரையை பெறும்போது பிழை",
      confidence: "நம்பிக்கை",

      crops: {
        wheat: "கோதுமை",
        maize: "சேளரி",
        rice: "அரிசி",
        cotton: "பருத்தி"
      },

      npk: {
        wheat: { n: "N: 120", p: "P: 60", k: "K: 40" },
        maize: { n: "N: 150", p: "P: 70", k: "K: 60" },
        rice: { n: "N: 100", p: "P: 50", k: "K: 40" },
        cotton: { n: "N: 130", p: "P: 65", k: "K: 45" }
      },

      reasons: {
        highN: "உயர் நைட்ரஜன் தேவை",
        balanced: "சமநிலை சத்து தேவை",
        highK: "உயர் பொட்டாசியம் தேவை"
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
