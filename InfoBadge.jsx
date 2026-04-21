// ============================================================
// InfoBadge.jsx
// Bu fayl: Natija sahifasidagi kichik ma'lumot qutichasi
// ============================================================
// Bu komponent 3 ta kichik qutichani chizadi:
//   [ SSL ]         [ DOMEN ]         [ MUAMMOLAR ]
//   ✓ FAOL          ✓ ISHONCHLI       2 ta topildi
//
// Xavfsiz bo'lsa — yashil rang
// Xavfli bo'lsa  — to'q sariq rang
// ============================================================

export default function InfoBadge({ label, value, ok }) {
  // ok = true  => yashil (xavfsiz)
  // ok = false => to'q sariq (xavfli yoki noma'lum)

  return (
    <div
      style={{
        padding: "8px 14px",
        background: ok
          ? "rgba(0,255,136,0.05)"   // yashil fon
          : "rgba(255,107,53,0.05)", // to'q sariq fon
        border: `1px solid ${
          ok
            ? "rgba(0,255,136,0.15)"   // yashil chegara
            : "rgba(255,107,53,0.15)"  // to'q sariq chegara
        }`,
        borderRadius: "6px",
      }}
    >
      {/* Sarlavha (SSL, DOMEN, MUAMMOLAR) */}
      <div
        style={{
          fontSize: "9px",
          letterSpacing: "2px",
          color: "#555",
          marginBottom: "3px",
        }}
      >
        {label}
      </div>

      {/* Qiymat (✓ FAOL, ✕ YO'Q va h.k.) */}
      <div
        style={{
          fontSize: "12px",
          color: ok ? "#00ff88" : "#ff6b35",
          fontWeight: "700",
        }}
      >
        {value}
      </div>
    </div>
  );
}
