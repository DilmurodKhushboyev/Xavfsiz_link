// ============================================================
// ResultCard.jsx
// Bu fayl: Tahlil natijasini ko'rsatuvchi asosiy karta
// ============================================================
// Bu komponent tekshiruv tugagandan keyin ko'rinadigan katta blok.
// Ichida 4 ta bo'lim bor:
//   1. Hukm sarlavhasi  — XAVFSIZ / SHUBHALI / XAVFLI va xavf bali
//   2. Xavf o'lchovi    — progress bar (to'lgan sari xavfli)
//   3. Info qutichalar  — SSL, Domen, Muammolar soni
//   4. Muammolar ro'yxati — har bir muammo alohida qatorcha
// ============================================================

import InfoBadge from "./InfoBadge.jsx";
import { SEVERITY_CONFIG } from "./constants.js";

export default function ResultCard({ result }) {
  // result = analyzeUrl() funksiyasi qaytargan ma'lumot (analyzer.js dan)

  return (
    <div
      style={{
        border: `1px solid ${result.verdictColor}30`,
        borderRadius: "8px",
        background: result.verdictBg,
        marginBottom: "24px",
        overflow: "hidden",
        animation: "fadeIn 0.4s ease",
      }}
    >
      {/* --- Animatsiya CSS --- */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ---- 1. HUKM SARLAVHASI ---- */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: `1px solid ${result.verdictColor}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {/* Chap: belgi + hukm nomi + domen */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "52px", height: "52px",
              border: `2px solid ${result.verdictColor}`,
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "22px",
              color: result.verdictColor,
              flexShrink: 0,
            }}
          >
            {result.verdictIcon}
          </div>
          <div>
            <div style={{ fontSize: "22px", fontWeight: "900", color: result.verdictColor, letterSpacing: "2px" }}>
              {result.verdict}
            </div>
            <div style={{ fontSize: "11px", color: "#666", letterSpacing: "1px", marginTop: "2px" }}>
              {result.domain || "noma'lum domen"}
            </div>
          </div>
        </div>

        {/* O'ng: xavf bali (raqam) */}
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "36px", fontWeight: "900", color: result.verdictColor, lineHeight: 1 }}>
            {result.riskScore}
          </div>
          <div style={{ fontSize: "10px", color: "#555", letterSpacing: "2px" }}>XAVF BALI</div>
        </div>
      </div>

      {/* ---- 2. XAVF O'LCHOVI (progress bar) ---- */}
      <div style={{ padding: "16px 24px", borderBottom: `1px solid ${result.verdictColor}10` }}>
        <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "3px", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${result.riskScore}%`,
              background: `linear-gradient(90deg, ${result.verdictColor}88, ${result.verdictColor})`,
              borderRadius: "3px",
              transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", fontSize: "9px", color: "#444", letterSpacing: "1px" }}>
          <span>XAVFSIZ</span>
          <span>O'RTA</span>
          <span>XAVFLI</span>
        </div>
      </div>

      {/* ---- 3. INFO QUTICHALAR (SSL, Domen, Muammolar) ---- */}
      <div
        style={{
          padding: "16px 24px",
          borderBottom: `1px solid ${result.verdictColor}10`,
          display: "flex", gap: "12px", flexWrap: "wrap",
        }}
      >
        <InfoBadge label="SSL"       value={result.hasHttps ? "✓ FAOL" : "✕ YO'Q"}                        ok={result.hasHttps} />
        <InfoBadge label="DOMEN"     value={result.isSafeDomain ? "✓ ISHONCHLI" : "? TEKSHIRILMAGAN"}     ok={result.isSafeDomain} />
        <InfoBadge label="MUAMMOLAR" value={`${result.findings.length} ta topildi`}                       ok={result.findings.length === 0} />
      </div>

      {/* ---- 4. MUAMMOLAR RO'YXATI ---- */}
      {result.findings.length > 0 ? (
        <div style={{ padding: "16px 24px" }}>
          <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#555", marginBottom: "12px" }}>
            [ ANIQLANGAN MUAMMOLAR ]
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {result.findings.map((f, i) => {
              const sc = SEVERITY_CONFIG[f.severity]; // o'sha darajaning rang/nomi
              return (
                <div
                  key={i}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 14px",
                    background: sc.bg,
                    border: `1px solid ${sc.color}20`,
                    borderRadius: "6px",
                    gap: "8px",
                  }}
                >
                  <div style={{ fontSize: "13px", color: "#ccc" }}>
                    <span style={{ color: sc.color, marginRight: "8px" }}>▸</span>
                    {f.label}
                  </div>
                  <div
                    style={{
                      fontSize: "9px", letterSpacing: "2px",
                      color: sc.color,
                      border: `1px solid ${sc.color}40`,
                      padding: "2px 8px",
                      borderRadius: "3px",
                      flexShrink: 0,
                    }}
                  >
                    {sc.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Muammo topilmasa — yashil xabar */
        <div style={{ padding: "20px 24px", textAlign: "center" }}>
          <div style={{ fontSize: "12px", color: "#00ff88", letterSpacing: "2px" }}>
            ✓ HECH QANDAY MUAMMO ANIQLANMADI
          </div>
        </div>
      )}
    </div>
  );
}
