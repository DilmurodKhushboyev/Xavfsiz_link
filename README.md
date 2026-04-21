# 🛡️ URL Xavfsizlik Tekshiruvi — Loyiha Xaritasi

> Dasturchi bo'lmaganlar uchun oddiy tilda yozilgan qo'llanma.
> Har bir fayl nima qilishini, nima uchun kerakligini tushuntiradi.

---

## 📁 Fayl tuzilmasi

```
url-checker/
│
├── constants.js       ← Ma'lumotlar bazasi (ro'yxatlar va ranglar)
├── analyzer.js        ← Tekshiruv aqli (URL ni tahlil qiluvchi)
├── InfoBadge.jsx      ← Kichik ma'lumot qutichasi
├── ResultCard.jsx     ← Natija kartasi (katta blok)
├── HistoryPanel.jsx   ← Oldingi tekshiruvlar paneli
├── UrlChecker.jsx     ← Bosh fayl (hammani boshqaruvchi)
└── README.md          ← Siz hozir o'qiyotgan fayl 📖
```

---

## 📋 Har bir fayl nima qiladi?

---

### 📄 `constants.js` — Ma'lumotlar bazasi

**Oddiy tilda:** Bu fayl — dasturning "bilim kitobchasi".
Unda 3 ta ro'yxat saqlanadi:

| Ro'yxat | Nima saqlaydi |
|---|---|
| `SUSPICIOUS_PATTERNS` | Xavfli naqshlar: `.exe`, `javascript:`, IP manzil va h.k. |
| `SAFE_DOMAINS` | Ishonchli saytlar: `google.com`, `youtube.com`, `uz` va h.k. |
| `SEVERITY_CONFIG` | Xavf darajalari: KRITIK 🔴, YUQORI 🟠, O'RTA 🟡, PAST 🟢 |

**Qachon o'zgartiriladi?**
- Yangi ishonchli sayt qo'shmoqchisiz → `SAFE_DOMAINS` ga yozing
- Yangi xavfli naqsh qo'shmoqchisiz → `SUSPICIOUS_PATTERNS` ga yozing
- Rang yoki ball o'zgartirmoqchisiz → `SEVERITY_CONFIG` ga qarang

---

### 🧠 `analyzer.js` — Tekshiruv aqli

**Oddiy tilda:** Bu fayl — dasturning "miyasi".
Foydalanuvchi URL kiritganda, shu fayl:

1. HTTP/HTTPS borligini tekshiradi
2. Domen nomini ajratib oladi (`https://google.com` → `google.com`)
3. Ishonchli domenlar ro'yxatidan qidiradi
4. Xavfli naqshlar ro'yxati bilan taqqoslaydi
5. Domen uzunligini va subdomenlar sonini hisoblaydi
6. Barcha muammolarni yig'ib, **0–100** orasida **xavf bali** beradi
7. Balga qarab yakuniy **HUKM** aniqlaydi:

| Xavf bali | Hukm |
|---|---|
| 0 (muammo yo'q) | ✓ XAVFSIZ (yashil) |
| 1 – 19 | ◎ MUMKIN (och yashil) |
| 20 – 44 | ⚠ SHUBHALI (sariq) |
| 45 – 69 | ✕ XAVFLI (to'q sariq) |
| 70 – 100 | ✗ BLOKLANGAN (qizil) |

**Qachon o'zgartiriladi?**
- Hukm chegaralarini o'zgartirmoqchisiz (`riskScore < 45` qismini toping)
- Yangi tekshiruv qoidasi qo'shmoqchisiz

---

### 🏷️ `InfoBadge.jsx` — Kichik ma'lumot qutichasi

**Oddiy tilda:** Bu fayl — natija sahifasidagi 3 ta kichik quticha:

```
[ SSL ]           [ DOMEN ]           [ MUAMMOLAR ]
✓ FAOL            ✓ ISHONCHLI         2 ta topildi
```

- Xavfsiz bo'lsa → **yashil** rang
- Xavfli bo'lsa → **to'q sariq** rang

**Qachon o'zgartiriladi?**
- Quticha rangini o'zgartirmoqchisiz
- Yangi quticha qo'shmoqchisiz

---

### 📊 `ResultCard.jsx` — Natija kartasi

**Oddiy tilda:** Bu fayl — tekshiruv tugagandan keyin ko'rinadigan **katta blok**.
Ichida 4 bo'lim bor:

```
┌─────────────────────────────────────────────┐
│  ⚠  SHUBHALI                           35   │  ← 1. Hukm sarlavhasi
│     suspicious-site.net            XAVF BALI│
├─────────────────────────────────────────────┤
│  ████████████░░░░░░░░  35%                  │  ← 2. Xavf o'lchovi (progress bar)
│  XAVFSIZ        O'RTA              XAVFLI   │
├─────────────────────────────────────────────┤
│  [SSL: ✕ YO'Q] [DOMEN: ?] [MUAMMOLAR: 2 ta]│  ← 3. Info qutichalar (InfoBadge)
├─────────────────────────────────────────────┤
│  ▸ HTTP (shifrsiz aloqa)           O'RTA    │  ← 4. Muammolar ro'yxati
│  ▸ URL qisqartiruvchi              O'RTA    │
└─────────────────────────────────────────────┘
```

**Qachon o'zgartiriladi?**
- Natija kartasi ko'rinishini o'zgartirmoqchisiz
- Yangi bo'lim qo'shmoqchisiz

---

### 🕑 `HistoryPanel.jsx` — Tarix paneli

**Oddiy tilda:** Bu fayl — "So'nggi tekshiruvlar" ro'yxatini ko'rsatadi.

- Har bir qatorda: belgi + URL + xavf bali + vaqt
- Bosilsa — o'sha URL qayta natijada ko'rsatiladi
- Maksimum **10 ta** tekshiruv saqlanadi (dastur o'chganda tarix yo'qoladi)
- Panel yig'ilib-yoyiladi (▼ ▲ tugmasi)

**Qachon o'zgartiriladi?**
- Saqlanadigan tarix sonini o'zgartirmoqchisiz (`.slice(0, 10)` dagi `10` ni o'zgartiring — bu `UrlChecker.jsx` da)
- Tarix qatorining ko'rinishini o'zgartirmoqchisiz

---

### 🏠 `UrlChecker.jsx` — Bosh fayl (hammani boshqaruvchi)

**Oddiy tilda:** Bu fayl — ilovaning **bosh xonasi**.
U o'zi hech narsa hisoblamaydi — boshqa fayllarni chaqiradi va birlashtiradi.

U boshqaradi:
- **Fon** (yashil grid chiziqlar, yashil/qizil yorug'lik)
- **Sarlavha** (XAVFSIZLIK TIZIMI v2.0 / URL TEKSHIRUV)
- **Input maydoni** — URL kiritish joyi
- **TEKSHIR tugmasi** — bosilganda `analyzer.js` chaqiriladi
- **Skanlanmoqda animatsiyasi** — aylana spin
- **`ResultCard`** — natijani ko'rsatadi
- **`HistoryPanel`** — tarixni ko'rsatadi

**Qachon o'zgartiriladi?**
- Sarlavha matnini o'zgartirmoqchisiz
- Animatsiya vaqtini o'zgartirmoqchisiz (`900` ms → boshqa son)
- Umumiy sahifa rangini o'zgartirmoqchisiz (`#06060f` → boshqa rang)

---

## 🔗 Fayllar orasidagi bog'liqlik

```
UrlChecker.jsx   ←── boshqaradi
   │
   ├── analyzer.js        (URL ni tahlil qiladi)
   │      └── constants.js  (ro'yxatlar kerak)
   │
   ├── ResultCard.jsx     (natijani ko'rsatadi)
   │      ├── InfoBadge.jsx  (3 kichik quticha)
   │      └── constants.js   (rang/label kerak)
   │
   └── HistoryPanel.jsx   (tarixni ko'rsatadi)
```

**Qoidasi:** Agar biror faylda xato chiqsa — uning chap tomonidagi (uni chaqirgan) faylga ham ta'sir qiladi.

---

## 🚀 Ishga tushirish tartibi

1. Barcha fayllarni bir jildga joylashtiring
2. `UrlChecker.jsx` faylini React loyihasiga import qiling:
   ```jsx
   import UrlChecker from "./UrlChecker.jsx";
   ```
3. Sahifangizda ishlatish:
   ```jsx
   export default function App() {
     return <UrlChecker />;
   }
   ```

---

## ❓ Tez-tez so'raladigan savollar

**Yangi saytni "ishonchli" ro'yxatiga qo'shmoqchiman.**
→ `constants.js` ni oching → `SAFE_DOMAINS` massiviga sayt nomini qo'shing.

**"XAVFLI" deb chiqqan sayt aslida xavfsiz, bal noto'g'ri.**
→ `analyzer.js` ni oching → ballarni kamaytiring (`riskScore += 25` → `riskScore += 10`).

**Tekshiruv animatsiyasi juda tez/sekin.**
→ `UrlChecker.jsx` ni oching → `setTimeout(..., 900)` dagi `900` ni o'zgartiring (millisekundda).

---

*Barcha tekshiruvlar faqat sizning qurilmangizda amalga oshiriladi. Hech qanday ma'lumot tashqariga yuborilmaydi.*
