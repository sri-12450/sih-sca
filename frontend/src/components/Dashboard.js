// src/components/Dashboard.js
import React, { useState, useEffect } from "react";
import API from "../services/api";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const Dashboard = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ n: "", p: "", k: "", ph: "", season: "Kharif" });
  const [result, setResult] = useState(null);
  const [user, setUser] = useState({ name: "", email: "" });
  const [voices, setVoices] = useState([]);
  const [listening, setListening] = useState({ n: false, p: false, k: false, ph: false });

  // Load voices
  useEffect(() => {
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Get user info
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ name: decoded?.name || "", email: decoded?.email || "" });
      } catch (err) {
        console.error("Token decoding failed", err);
      }
    }
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Speak TTS
 // Speak TTS
const speakText = (text, langCode) => {
  if (!window.speechSynthesis) return;

  let voiceLang = "en-US";
  if (langCode === "hi") voiceLang = "hi-IN";
  if (langCode === "ta") voiceLang = "ta-IN";

  const selectedVoice = voices.find(
    (v) =>
      v.lang.startsWith(voiceLang) ||
      v.name.toLowerCase().includes(voiceLang.split("-")[0])
  );

  const utterance = new SpeechSynthesisUtterance(text);
  if (selectedVoice) utterance.voice = selectedVoice;

  // 🔊 Volume / speed / pitch adjustments
  if (langCode === "en") {
    utterance.volume = 1.0; // ✅ Max loudness for English
    utterance.rate = 0.95;  // Slightly slower for clarity
    utterance.pitch = 1.1;  // Slightly sharper
  } else {
    utterance.volume = 0.9; // A bit softer for Hindi/Tamil
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
  }

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

  // Voice input for N, P, K, PH
  const startListening = (key) => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = i18n.language === "ta" ? "ta-IN" : i18n.language === "hi" ? "hi-IN" : "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setListening((prev) => ({ ...prev, [key]: true }));
    recognition.start();

    recognition.onresult = (event) => {
      const speechValue = event.results[0][0].transcript.replace(/\D/g, ""); // extract numbers
      setForm((prev) => ({ ...prev, [key]: speechValue }));
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };

    recognition.onend = () => {
      setListening((prev) => ({ ...prev, [key]: false }));
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/recommend", {
        soil: {
          n: Number(form.n),
          p: Number(form.p),
          k: Number(form.k),
          ph: Number(form.ph),
        },
        season: form.season,
      });

      setResult(res.data);

      const langCode = i18n.language;
      const translations = i18n.options.resources[langCode].translation;

      const ttsText = res.data.top3
        .map((crop) => {
          const cropKey = crop.crop?.toLowerCase() || "";
          const reasonKey = crop.reasonKey || "balanced";
          const npkObj = translations.npk[cropKey] || {};

          const nVal = npkObj.n ? npkObj.n.replace("N:", "").trim() : "";
          const pVal = npkObj.p ? npkObj.p.replace("P:", "").trim() : "";
          const kVal = npkObj.k ? npkObj.k.replace("K:", "").trim() : "";

          return `${translations.crops[cropKey] || crop.crop}. ${translations.nitrogen} ${nVal}, ${translations.phosphorus} ${pVal}, ${translations.potassium} ${kVal}. ${translations.reasons[reasonKey]}. ${translations.confidence} ${Math.round(crop.confidence * 100)} percent.`;
        })
        .join(" ");

      if (ttsText) speakText(ttsText, langCode);
    } catch (err) {
      alert(t("error"));
    }
  };

  return (
    <div className="dashboard">
      {/* Language Switch */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => i18n.changeLanguage("en")}>EN</button>
        <button onClick={() => i18n.changeLanguage("hi")}>HI</button>
        <button onClick={() => i18n.changeLanguage("ta")}>TA</button>
      </div>

      {/* Welcome Message */}
      <h2>
        {user.name
          ? t("welcome", { name: user.name })
          : user.email
          ? t("welcome", { name: user.email.split("@")[0] })
          : t("welcome", { name: "" })}
      </h2>
      <h3>{t("cropDashboard")}</h3>

      {/* Form */}
      <form onSubmit={handleSubmit} className="form">
        <div>
          <input type="number" name="n" placeholder={t("nitrogen")} value={form.n} onChange={handleChange} required />
          <button
            type="button"
            className={listening.n ? "listening" : ""}
            onClick={() => startListening("n")}
          >
            🎤
          </button>
        </div>

        <div>
          <input type="number" name="p" placeholder={t("phosphorus")} value={form.p} onChange={handleChange} required />
          <button
            type="button"
            className={listening.p ? "listening" : ""}
            onClick={() => startListening("p")}
          >
            🎤
          </button>
        </div>

        <div>
          <input type="number" name="k" placeholder={t("potassium")} value={form.k} onChange={handleChange} required />
          <button
            type="button"
            className={listening.k ? "listening" : ""}
            onClick={() => startListening("k")}
          >
            🎤
          </button>
        </div>

        <div>
          <input type="number" name="ph" step="0.1" placeholder={t("phValue")} value={form.ph} onChange={handleChange} required />
          <button
            type="button"
            className={listening.ph ? "listening" : ""}
            onClick={() => startListening("ph")}
          >
            🎤
          </button>
        </div>

        <select name="season" value={form.season} onChange={handleChange}>
          <option value="Kharif">{t("kharif")}</option>
          <option value="Rabi">{t("rabi")}</option>
        </select>

        <button type="submit">{t("getRecommendation")}</button>
      </form>

      {/* Results */}
      {result && (
        <div className="result-card">
          <h3>{t("recommendedCrops")}</h3>
          <ul>
            {result.top3.map((crop, i) => {
              const cropKey = crop.crop?.toLowerCase() || "";
              const reasonKey = crop.reasonKey || "balanced";
              const npkObj = i18n.options.resources[i18n.language].translation.npk[cropKey] || {};

              return (
                <li key={i}>
                  {t(`crops.${cropKey}`, cropKey)} ✅ ({npkObj.n}, {npkObj.p}, {npkObj.k}) -{" "}
                  {t(`reasons.${reasonKey}`, reasonKey)} - {t("confidence")}: {Math.round(crop.confidence * 100)}%
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
