// ============================================================
// analyzer.js
// Bu fayl: URL ni tekshirib, xavf darajasini hisoblaydigan aql
// ============================================================
// Bu fayl foydalanuvchi kiritgan linkni qabul qiladi,
// uni tekshiradi va quyidagilarni qaytaradi:
//   - findings    : topilgan muammolar ro'yxati
//   - riskScore   : 0–100 orasidagi xavf bali
//   - verdict     : yakuniy hukm (XAVFSIZ / SHUBHALI / XAVFLI ...)
//   - domain      : linkdagi sayt nomi
//   - hasHttps    : HTTPS bormi?
//   - isSafeDomain: ishonchli saytmi?
// ============================================================

import { SUSPICIOUS_PATTERNS, SAFE_DOMAINS, SEVERITY_CONFIG } from "./constants.js";

export function analyzeUrl(url) {
  // Bo'sh kirish — hech narsa qaytarma
  if (!url || url.trim() === "") return null;

  const trimmed = url.trim();
  const findings = []; // topilgan muammolar
  let riskScore = 0;   // xavf bali (qancha ko'p = shuncha xavfli)

  // --- 1. Protokolni tekshirish (http:// yoki https://) ---
  const hasHttps = /^https:\/\//i.test(trimmed);
  const hasHttp  = /^http:\/\//i.test(trimmed);

  if (!hasHttps && !hasHttp) {
    findings.push({ label: "Protokol ko'rsatilmagan", severity: "medium" });
    riskScore += 10;
  } else if (hasHttp && !hasHttps) {
    findings.push({ label: "HTTP (shifrsiz aloqa)", severity: "medium" });
    riskScore += 10;
  }

  // --- 2. Domen nomini ajratib olish ---
  let domain = "";
  try {
    const urlObj = new URL(hasHttp || hasHttps ? trimmed : "https://" + trimmed);
    domain = urlObj.hostname.replace(/^www\./, ""); // "www." ni olib tashlash
  } catch {
    findings.push({ label: "Noto'g'ri URL format", severity: "high" });
    riskScore += 25;
  }

  // --- 3. Ishonchli domenlar ro'yxatida bormi? ---
  const isSafeDomain = SAFE_DOMAINS.some(
    (d) => domain === d || domain.endsWith("." + d)
  );

  // --- 4. Xavfli naqshlarni tekshirish (constants.js dan) ---
  for (const { pattern, label, severity } of SUSPICIOUS_PATTERNS) {
    if (pattern.test(trimmed)) {
      findings.push({ label, severity });
      riskScore += SEVERITY_CONFIG[severity].score;
    }
  }

  // --- 5. Qo'shimcha tekshiruvlar ---

  // Domen juda uzunmi? (40 belgidan oshsa shubhali)
  if (domain.length > 40) {
    findings.push({ label: "Juda uzun domen", severity: "medium" });
    riskScore += 10;
  }

  // Ko'p subdomen bormi? (masalan: a.b.c.example.com)
  const subdomains = domain.split(".").length - 2;
  if (subdomains > 2) {
    findings.push({ label: "Ko'p subdomen", severity: "medium" });
    riskScore += 10;
  }

  // --- 6. Ishonchli sayt bo'lsa — baldan chegirma ---
  if (isSafeDomain && riskScore < 30) {
    riskScore = Math.max(0, riskScore - 20);
  }

  // Bal 100 dan oshmasin
  riskScore = Math.min(100, riskScore);

  // --- 7. Yakuniy hukm aniqlash ---
  let verdict, verdictColor, verdictBg, verdictIcon;

  if (riskScore === 0 && findings.length === 0) {
    verdict = "XAVFSIZ";    verdictColor = "#00ff88"; verdictBg = "#001a0d"; verdictIcon = "✓";
  } else if (riskScore < 20) {
    verdict = "MUMKIN";     verdictColor = "#4ade80"; verdictBg = "#001a08"; verdictIcon = "◎";
  } else if (riskScore < 45) {
    verdict = "SHUBHALI";   verdictColor = "#ffd60a"; verdictBg = "#1a1400"; verdictIcon = "⚠";
  } else if (riskScore < 70) {
    verdict = "XAVFLI";     verdictColor = "#ff6b35"; verdictBg = "#1a0800"; verdictIcon = "✕";
  } else {
    verdict = "BLOKLANGAN"; verdictColor = "#ff2d55"; verdictBg = "#1a0008"; verdictIcon = "✗";
  }

  return {
    findings,
    riskScore,
    verdict,
    verdictColor,
    verdictBg,
    verdictIcon,
    domain,
    hasHttps,
    isSafeDomain,
  };
}
