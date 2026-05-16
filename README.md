# 📸 ShootSix Studio

> Tạo 6 ảnh sản phẩm chuẩn thương mại điện tử bằng AI — chỉ cần 1 ảnh đầu vào.

**Progressive Web App (PWA)** · Next.js 15 · Gemini AI + OpenAI · Deploy on Vercel

---

## ✨ Tính năng

- Upload 1 ảnh sản phẩm → nhận 6 ảnh chuyên nghiệp (vuông 1024×1024)
- 6 góc chụp: Hero, 3/4, Bên cạnh, Chi tiết, Lifestyle, Flat lay
- Hỗ trợ **Gemini API (miễn phí)** và OpenAI GPT-Image-1
- Tải từng ảnh riêng lẻ hoặc tất cả dưới dạng ZIP
- **PWA chuẩn**: cài trên Android & iOS như app thật
- Tương thích camera điện thoại (chụp trực tiếp)

---

## 🚀 Bắt đầu

### 1. Clone repository

```bash
git clone https://github.com/yourusername/shootsix-studio.git
cd shootsix-studio
npm install
```

### 2. Lấy API key miễn phí

**Gemini (miễn phí hoàn toàn):**
1. Truy cập [aistudio.google.com](https://aistudio.google.com)
2. Đăng nhập bằng tài khoản Google
3. Nhấn "Get API key" → Copy key

**OpenAI (tùy chọn, fallback):**
1. Truy cập [platform.openai.com](https://platform.openai.com)
2. API Keys → Create new key

### 3. Tạo file .env.local

```bash
cp .env.example .env.local
```

Điền API keys vào `.env.local`:

```env
GEMINI_API_KEY=AIza...your_key_here
OPENAI_API_KEY=sk-...your_key_here   # Có thể để trống nếu chỉ dùng Gemini
AI_PROVIDER=gemini
```

### 4. Chạy local

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

---

## 📦 Deploy lên Vercel

### Option A: Vercel CLI

```bash
npx vercel --prod
```

### Option B: GitHub + Vercel Dashboard

1. Push code lên GitHub
2. Vào [vercel.com](https://vercel.com) → Import repository
3. Thêm Environment Variables:
   - `GEMINI_API_KEY`
   - `OPENAI_API_KEY`
   - `AI_PROVIDER=gemini`
4. Deploy!

---

## 📱 Cài app trên điện thoại

**Android (Chrome):** Banner cài đặt tự động xuất hiện sau vài giây

**iOS (Safari):** Nhấn nút Share ⬆ → "Add to Home Screen" → "Add"

---

## ⚡ Giới hạn Gemini Free Tier

| Chỉ số | Free |
|---|---|
| Requests/phút | 10 RPM |
| Requests/ngày | 1,500 |
| Dữ liệu train AI | Có thể được dùng |

App đã được tối ưu để chạy **tuần tự** (1 ảnh mỗi 1.5 giây) để không vượt giới hạn free.

Muốn nhanh hơn → nâng lên [Gemini Paid](https://ai.google.dev/pricing)

---

## 📁 Cấu trúc project

```
src/
├── app/
│   ├── api/generate/     ← API endpoint xử lý ảnh
│   ├── layout.tsx        ← PWA head tags
│   └── page.tsx          ← Trang chính
├── components/
│   ├── UploadZone        ← Upload + camera capture
│   ├── ResultGrid        ← Lưới 6 ảnh
│   ├── ShotCard          ← Card từng ảnh
│   ├── DownloadAll       ← Zip download
│   └── InstallBanner     ← PWA install prompt
├── hooks/
│   ├── useGenerate       ← Logic tạo ảnh + progress
│   └── usePWAInstall     ← PWA install prompt logic
└── lib/
    ├── gemini.ts         ← Gemini API client
    ├── openai.ts         ← OpenAI API client
    ├── imageUtils.ts     ← Helpers
    └── shotDefinitions   ← 6 prompt configs
```

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **AI**: Google Gemini 2.0 Flash Image Generation
- **Fallback AI**: OpenAI GPT-Image-1
- **PWA**: Custom Service Worker + Web App Manifest
- **Deploy**: Vercel Edge Functions
