// ============================================================
// HistoryPanel.jsx
// Bu fayl: Oldingi tekshiruvlar tarixi paneli
// ============================================================
// Foydalanuvchi bir necha URL tekshirsa, ularni bu panel
// ro'yxat ko'rinishida saqlaydi (maksimum 10 ta).
// Har bir qatorda:
//   - Hukm belgisi (✓ ✕ ⚠ ...)
//   - URL matni (qisqartirib ko'rsatiladi)
//   - Xavf bali (raqam)
//   - Tekshiruv vaqti
// Biror qatorni bossangiz — u URL qayta tekshiriladi.
// ============================================================

export default function HistoryPanel({ history, showHistory, setShowHistory, onSelect }) {
  // history      = oldingi tekshiruvlar massivi
  // showHistory  = panel ochiqmi yoki yopiqmi (true/false)
  // setShowHistory = ochish/yopish funksiyasi
  // onSelect     = biror URL bosilganda nima qilish kerak

  if (history.length === 0) return null; // tarix yo'q bo'lsa — hech narsa ko'rsatma

  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "8px",
        overflow: "hidden",
        background: "rgba(255,255,255,0.01)",
      }}
    >
      {/* --- Panel sarlavhasi (bosib ochish/yopish) --- */}
      <button
        onClick={() => setShowHistory(!showHistory)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "16px 24px",
          color: "#555",
          fontFamily: "'Courier New', monospace",
          fontSize: "10px",
          letterSpacing: "3px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>[ SO'NGGI TEKSHIRUVLAR ]</span>
        <span>{showHistory ? "▲" : "▼"} {history.length} ta</span>
      </button>

      {/* --- Tarix qatorlari (faqat panel ochiq bo'lsa ko'rinadi) --- */}
      {showHistory && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          {history.map((h, i) => (
            <div
              key={i}
              onClick={() => onSelect(h)} // bosilganda yuqorida ko'rsatish
              style={{
                padding: "12px 24px",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {/* Hukm belgisi */}
              <span style={{ color: h.verdictColor, fontSize: "14px", flexShrink: 0 }}>
                {h.verdictIcon}
              </span>

              {/* URL matni (juda uzun bo'lsa oxiri "..." bilan qisqaradi) */}
              <span
                style={{
                  flex: 1,
                  fontSize: "12px",
                  color: "#888",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {h.url}
              </span>

              {/* Xavf bali */}
              <span
                style={{
                  fontSize: "9px",
                  letterSpacing: "1px",
                  color: h.verdictColor,
                  border: `1px solid ${h.verdictColor}40`,
                  padding: "2px 8px",
                  borderRadius: "3px",
                  flexShrink: 0,
                }}
              >
                {h.riskScore}
              </span>

              {/* Tekshiruv vaqti */}
              <span style={{ fontSize: "10px", color: "#444", flexShrink: 0 }}>
                {h.time}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
