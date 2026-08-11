# Portfolio App — Achmat Fajri

Progress: Fase 1 (Fondasi Frontend Modern) ✅ → Fase 2 (Isi Konten & Interaksi) ✅

## Isi Fase 1
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS dengan token warna ala shadcn/ui (light/dark mode ready)
- Komponen `Button` dari shadcn/ui

## Isi Fase 2
- **Desain "blueprint/schematic"**: navy gelap + aksen amber, font Space Grotesk (display) + Inter (body) + JetBrains Mono (label teknis), grid pattern halus di hero, efek corner-bracket saat hover kartu proyek
- Section lengkap: Hero, About, Projects (3 card), Skills (dikelompokkan), Contact, Footer
- Dark mode aktif sebagai default
- Animasi fade-up berurutan di hero
- **Catatan**: bio & deskripsi 3 proyek masih lorem ipsum (sengaja, sesuai request) — cari `TODO` / lorem ipsum di `app/page.tsx` untuk ganti dengan konten asli. LinkedIn juga belum ditambahkan ke section Contact/Footer — tinggal tambahkan `<a>` baru di sana kalau sudah ada linknya.

## Cara menjalankan di komputer kamu

Karena environment saya di sini tidak punya akses internet, project ini belum di-`npm install`. Lakukan ini di komputer kamu:

```bash
# 1. Extract zip ini, lalu masuk ke foldernya
cd portfolio-app

# 2. Install dependencies
npm install

# 3. Jalankan dev server
npm run dev
```

Buka `http://localhost:3000` — kamu akan lihat nav + hero section skeleton-nya.

## Menambahkan komponen shadcn/ui lain

Kalau nanti butuh komponen lain (Card, Input, Badge, dll), jalankan (butuh internet & Node.js terpasang):

```bash
npx shadcn@latest add card input badge
```

Ini akan otomatis mengikuti konfigurasi di `components.json` yang sudah saya siapkan.

## Deploy ke Vercel (sesuai Fase 1)

1. Push folder ini ke repo GitHub baru.
2. Buka [vercel.com](https://vercel.com), sign in pakai akun GitHub kamu.
3. Klik "Add New Project", pilih repo yang barusan kamu push.
4. Vercel otomatis mendeteksi ini project Next.js — klik Deploy, tidak perlu ubah konfigurasi apa pun.
5. Setelah selesai, kamu akan dapat live URL (`nama-project.vercel.app`) — inilah live link pertamamu, meskipun isinya masih skeleton.

## Struktur folder

```
portfolio-app/
├── app/
│   ├── layout.tsx      # root layout + font + metadata
│   ├── page.tsx        # halaman utama (nav + hero skeleton)
│   └── globals.css     # Tailwind + CSS variables tema
├── components/
│   └── ui/
│       └── button.tsx  # komponen shadcn/ui
├── lib/
│   └── utils.ts        # helper cn() untuk merge className
├── tailwind.config.ts
├── components.json     # config shadcn/ui
└── package.json
```

## Selanjutnya (Fase 3)

Fase 3 akan membangun 1 backend project terpisah pakai NestJS + Prisma/Drizzle + Zod, disambungkan ke PostgreSQL di Supabase, plus halaman admin sederhana yang dilindungi Better Auth.
