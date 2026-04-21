// ============================================================
// constants.js
// Bu fayl: Dasturning o'zgarmas qiymatlari (ma'lumotlar bazasi)
// ============================================================
// Bu yerda 3 ta asosiy ro'yxat saqlanadi:
//   1. SUSPICIOUS_PATTERNS  — xavfli naqshlar ro'yxati
//   2. SAFE_DOMAINS         — ishonchli saytlar ro'yxati
//   3. SEVERITY_CONFIG      — xavf darajalari va ularning ranglari
// ============================================================

// Xavfli naqshlar: URL ichida quyidagilardan biri topilsa — ogohlantirish chiqadi
export const SUSPICIOUS_PATTERNS = [
  {
    pattern: /^(?!https?:\/\/)/i,
    label: "HTTPS yo'q",
    severity: "high",
  },
  {
    pattern: /bit\.ly|tinyurl|t\.co|goo\.gl|ow\.ly|short\.gy|rb\.gy|cutt\.ly/i,
    label: "URL qisqartiruvchi",
    severity: "medium",
  },
  {
    pattern: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/,
    label: "IP manzil (domen o'rniga raqam)",
    severity: "high",
  },
  {
    pattern: /paypal|bank|secure|login|verify|account|update|confirm/i,
    label: "Phishing so'zlar",
    severity: "high",
  },
  {
    pattern: /[^\x00-\x7F]/,
    label: "Unicode aldov belgilar",
    severity: "high",
  },
  {
    pattern: /\.ru$|\.cn$|\.tk$|\.ml$|\.ga$|\.cf$/i,
    label: "Xavfli domen zonasi",
    severity: "medium",
  },
  {
    pattern: /@/,
    label: "@ belgisi (yo'naltirish hiylasi)",
    severity: "high",
  },
  {
    pattern: /javascript:/i,
    label: "JavaScript injection (kod kiritish)",
    severity: "critical",
  },
  {
    pattern: /data:/i,
    label: "Data URI (yashirin ma'lumot)",
    severity: "critical",
  },
  {
    pattern: /\.(exe|bat|cmd|scr|vbs|pif|com)(\?|$)/i,
    label: "Zararli fayl kengaytmasi",
    severity: "critical",
  },
  {
    pattern: /\-{2,}|\_{2,}/,
    label: "Ko'p defis yoki pastki chiziq",
    severity: "low",
  },
  {
    pattern: /https?:\/\/[^/]*https?:\/\//i,
    label: "Ichma-ich URL (aldov yo'naltirish)",
    severity: "critical",
  },
  {
    pattern: /\d{4,}/,
    label: "Domenida ko'p raqam bor",
    severity: "low",
  },
];

// Ishonchli domenlar: bu saytlar tekshiruvdan muammosiz o'tadi
export const SAFE_DOMAINS = [
  "google.com",
  "youtube.com",
  "facebook.com",
  "instagram.com",
  "twitter.com",
  "x.com",
  "github.com",
  "wikipedia.org",
  "microsoft.com",
  "apple.com",
  "amazon.com",
  "linkedin.com",
  "reddit.com",
  "stackoverflow.com",
  "anthropic.com",
  "claude.ai",
  "openai.com",
  "t.me",
  "telegram.org",
  "uz", // O'zbekiston domenlar (.uz bilan tugaganlar)
];

// Xavf darajalari: har bir darajaning rangi, fon rangi, nomi va ball qiymati
export const SEVERITY_CONFIG = {
  critical: { color: "#ff2d55", bg: "#1a0008", label: "KRITIK", score: 40 },
  high:     { color: "#ff6b35", bg: "#1a0800", label: "YUQORI", score: 25 },
  medium:   { color: "#ffd60a", bg: "#1a1400", label: "O'RTA",  score: 10 },
  low:      { color: "#4ade80", bg: "#001a08", label: "PAST",   score: 3  },
};
