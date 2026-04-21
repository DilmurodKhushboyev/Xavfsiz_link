// ============================================================
// UrlChecker.jsx  (Asosiy komponent — bosh fayl)
// Bu fayl: Butun ilovani boshqaruvchi markaz
// ============================================================
// Bu fayl barcha qismlarni birlashtiradi:
//   - Fon (grid chiziqlar va yashil/qizil yorug'lik)
//   - Sarlavha (XAVFSIZLIK TIZIMI v2.0)
//   - Kiritish maydoni + "TEKSHIR" tugmasi
//   - Skanlanmoqda animatsiyasi
//   - Natija kartasi (ResultCard)
//   - Tarix paneli (HistoryPanel)
//   - Pastki izoh
//
// Bu fayl faqat "boshqaruv" qiladi — ko'rinish va hisoblash
// boshqa fayllarda (ResultCard, analyzer, constants, ...).
// ============================================================

import { useState, useEffect, useRef } from "react";
import { analyzeUrl } from "./analyzer.js";
import ResultCard from "./ResultCard.jsx";
import HistoryPanel from "./HistoryPanel.jsx";

export default function UrlChecker() {
  // --- Holat o'zgaruvchilari (State) ---
  const [url, setUrl]               = useState("");        // kiritilgan URL matni
  const [result, setResult]         = useState(null);      // tahlil natijasi
  const [analyzing, setAnalyzing]   = useState(false);     // skanlanmoqdami?
  const [history, setHistory]       = useState([]);        // oldingi tekshiruvlar
  const [showHistory, setShowHistory] = useState(false);   // tarix ochiqmi?

  const inputRef = useRef(null); // input maydonga avtomatik fokus uchun

  // --- Tekshirish funksiyasi ---
  const handleAnalyze = () => {
    if (!url.trim()) return; // bo'sh bo'lsa hech narsa qilma

    setAnalyzing(true); // "skanlanmoqda..." holatini yoq

    // 0.9 soniya kutgandan so'ng tahlil qil (animatsiya ko'rinsin)
    setTimeout(() => {
      const res = analyzeUrl(url); // analyzer.js dan natija ol
      setResult(res);

      if (res) {
        // Tarixga qo'sh (maksimum 10 ta saqlaydi)
        setHistory((prev) =>
          [{ url, ...res, time: new Date().toLocaleTimeString() }, ...prev].slice(0, 10)
        );
      }

      setAnalyzing(false); // animatsiyani o'chir
    }, 900);
  };

  // --- Enter tugmasi bosilsa ham tekshirsin ---
  const handleKey = (e) => {
    if (e.key === "Enter") handleAnalyze();
  };

  // --- Sahifa ochilganda input ga fokus qo'y ---
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#06060f",
        fontFamily: "'Courier New', monospace",
        color: "#e0e0e0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ---- FON: yashil grid chiziqlar ---- */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      {/* ---- FON: chap yuqori yashil yorug'lik ---- */}
      <div
        style={{
          position: "fixed", top: "-120px", left: "-120px",
          width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }}
      />

      {/* ---- FON: o'ng pastki qizil yorug'lik ---- */}
      <div
        style={{
          position: "fixed", bottom: "-120px", right: "-120px",
          width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(255,45,85,0.06) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }}
      />

      {/* ---- ASOSIY KONTENT (fon ustida) ---- */}
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "660px" }}>

        {/* ---- SARLAVHA ---- */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-block",
              border: "1px solid rgba(0,255,136,0.2)",
              borderRadius: "4px",
              padding: "4px 14px",
              fontSize: "10px",
              letterSpacing: "4px",
              color: "#00ff88",
              marginBottom: "20px",
              background: "rgba(0,255,136,0.05)",
            }}
          >
            XAVFSIZLIK TIZIMI v2.0
          </div>
          <h1
            style={{
              fontSize: "clamp(28px, 6vw, 48px)",
              fontWeight: "900",
              letterSpacing: "-1px",
              margin: "0 0 8px",
              background: "linear-gradient(135deg, #ffffff 0%, #00ff88 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.1,
            }}
          >
            URL TEKSHIRUV
          </h1>
          <p style={{ color: "#666", fontSize: "13px", letterSpacing: "2px", margin: 0 }}>
            LINK XAVFSIZLIGINI ANIQLASH
          </p>
        </div>

        {/* ---- URL KIRITISH MAYDONI ---- */}
        <div
          style={{
            border: "1px solid rgba(0,255,136,0.15)",
            borderRadius: "8px",
            background: "rgba(0,255,136,0.02)",
            padding: "24px",
            marginBottom: "24px",
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#00ff88", marginBottom: "12px" }}>
            [ URL KIRITING ]
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {/* Matn kiritish maydoni */}
            <input
              ref={inputRef}
              value={url}
              onChange={(e) => { setUrl(e.target.value); setResult(null); }}
              onKeyDown={handleKey}
              placeholder="https://example.com/link..."
              style={{
                flex: 1,
                minWidth: "200px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "6px",
                padding: "14px 16px",
                color: "#fff",
                fontSize: "14px",
                fontFamily: "'Courier New', monospace",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(0,255,136,0.5)")}
              onBlur={(e)  => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />

            {/* Tekshirish tugmasi */}
            <button
              onClick={handleAnalyze}
              disabled={analyzing || !url.trim()}
              style={{
                background: analyzing
                  ? "rgba(0,255,136,0.1)"
                  : "linear-gradient(135deg, #00ff88, #00cc6a)",
                border: "none",
                borderRadius: "6px",
                padding: "14px 28px",
                color: analyzing ? "#00ff88" : "#000",
                fontFamily: "'Courier New', monospace",
                fontWeight: "900",
                fontSize: "12px",
                letterSpacing: "2px",
                cursor: analyzing || !url.trim() ? "not-allowed" : "pointer",
                opacity: !url.trim() ? 0.4 : 1,
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {analyzing ? "SKANLANMOQDA..." : "TEKSHIR →"}
            </button>
          </div>
        </div>

        {/* ---- SKANLANMOQDA ANIMATSIYASI ---- */}
        {analyzing && (
          <div
            style={{
              textAlign: "center",
              padding: "32px",
              border: "1px solid rgba(0,255,136,0.1)",
              borderRadius: "8px",
              marginBottom: "24px",
              background: "rgba(0,255,136,0.02)",
            }}
          >
            <div
              style={{
                width: "48px", height: "48px",
                border: "2px solid rgba(0,255,136,0.1)",
                borderTop: "2px solid #00ff88",
                borderRadius: "50%",
                margin: "0 auto 16px",
                animation: "spin 0.8s linear infinite",
              }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div style={{ color: "#00ff88", fontSize: "11px", letterSpacing: "3px" }}>
              SKANLANMOQDA...
            </div>
          </div>
        )}

        {/* ---- NATIJA KARTASI (tahlil tugagandan keyin) ---- */}
        {result && !analyzing && <ResultCard result={result} />}

        {/* ---- TARIX PANELI ---- */}
        <HistoryPanel
          history={history}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
          onSelect={(h) => { setUrl(h.url); setResult(h); }}
        />

        {/* ---- PASTKI IZOH ---- */}
        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            fontSize: "10px",
            color: "#333",
            letterSpacing: "2px",
          }}
        >
          URL XAVFSIZLIK SKANERI · LOCAL TAHLIL · SHAXSIY MA'LUMOT SAQLANMAYDI
        </div>

      </div>
    </div>
  );
}
