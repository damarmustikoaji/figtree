# PT Hello Kognisia Indonesia — Company Profile Website

Website resmi **PT Hello Kognisia Indonesia**, menampilkan profil perusahaan, layanan, dan informasi kontak. Dibangun sebagai static site yang ringan, mudah dirawat, dan siap untuk kebutuhan branding serta SEO.

---

## Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Struktur Proyek](#struktur-proyek)
- [Menjalankan Secara Lokal](#menjalankan-secara-lokal)
- [Pengujian](#pengujian)
- [CI/CD](#cicd)
- [Deployment](#deployment)
- [Kontak](#kontak)
- [Changelog](#changelog)
- [Lisensi](#lisensi)

---

## Tentang Proyek

PT Hello Kognisia Indonesia adalah perusahaan yang mengembangkan inisiatif di bidang kognisi, edukasi, dan kesehatan mental dengan pendekatan yang human-centered, berbasis sains, dan menjunjung tinggi etika profesional.

Website ini dibangun dengan pure HTML dan CSS tanpa framework atau build tools, sehingga:

- Tidak membutuhkan proses kompilasi
- Mudah di-maintain oleh siapa pun
- Performa ringan dan cepat dimuat
- Dapat di-deploy ke platform hosting mana pun

### Halaman

| Halaman | File | Keterangan |
|---|---|---|
| Beranda | `index.html` | Hero, Tentang Kami, Layanan, Kontak |
| Kebijakan Privasi | `privacy-policy.html` | Kebijakan pengelolaan data pengguna |
| Sanggahan & Etika | `disclaimer-etika.html` | Batasan layanan dan etika profesional |
| Halaman 404 | `404.html` | Halaman tidak ditemukan |

---

## Struktur Proyek

```
/
├── .github/
│   └── workflows/
│       ├── ci-tests.yml          # Workflow pengujian otomatis
│       └── deploy-pages.yml      # Workflow deployment ke GitHub Pages
├── tests/
│   ├── smoke.spec.js             # Playwright smoke tests
│   ├── playwright.config.js      # Konfigurasi Playwright
│   └── package.json              # Dependensi pengujian
├── index.html
├── privacy-policy.html
├── disclaimer-etika.html
├── 404.html
├── favicon.png
├── logo.png
├── robots.txt
├── sitemap.xml
├── .htaccess
└── CNAME
```

---

## Menjalankan Secara Lokal

Tidak dibutuhkan instalasi apa pun untuk membuka halaman website. Cukup buka file `index.html` langsung di browser.

Namun untuk menjalankan pengujian, dibutuhkan server lokal terlebih dahulu. Gunakan perintah berikut dari direktori `tests/`:

```bash
cd tests
npm install
npm run localhost-serve
```

Server akan berjalan di `http://localhost:3000`.

---

## Pengujian

Proyek ini menggunakan [Playwright](https://playwright.dev) untuk smoke testing. Pengujian mencakup:

- Rendering halaman dan status HTTP
- Keberadaan semua section dan konten utama
- Navigasi antar halaman
- Meta tag SEO dan Open Graph
- Schema.org JSON-LD
- Konten dan struktur halaman legal
- Informasi kontak dan trust signals
- Atribut aksesibilitas dasar

### Menjalankan Pengujian

Pastikan server lokal sudah berjalan (lihat bagian [Menjalankan Secara Lokal](#menjalankan-secara-lokal)), lalu jalankan dari direktori `tests/`:

```bash
npm test
```

Laporan HTML hasil pengujian tersedia di `tests/playwright-report/` setelah pengujian selesai.

### Prasyarat

- Node.js 20 atau lebih baru
- Browser Chromium (diinstall otomatis oleh Playwright)

```bash
cd tests
npm install
npx playwright install chromium
```

---

## CI/CD

### Pengujian Otomatis (`ci-tests.yml`)

Berjalan otomatis pada setiap:

- Push ke branch `master`
- Pull request ke branch `master`
- Trigger manual via GitHub Actions

Pipeline melakukan:
1. Install dependensi pengujian
2. Install browser Chromium dengan system dependencies
3. Menjalankan server lokal
4. Menjalankan semua Playwright tests
5. Meng-upload laporan HTML dan screenshot sebagai artifact (disimpan 14 hari)

### Deployment Otomatis (`deploy-pages.yml`)

Berjalan otomatis ketika tag versi semantik di-push, contoh: `v1.0.0`.

```bash
git tag v1.0.0
git push origin v1.0.0
```

Pipeline melakukan:
1. Checkout repository
2. Menyiapkan file yang akan diserver (HTML, aset, robots.txt, sitemap)
3. Upload artifact ke GitHub Pages
4. Deploy ke GitHub Pages

URL deployment ditampilkan di tab **Environments** pada halaman repository GitHub.

---

## Deployment

Website ini bersifat statis dan dapat di-deploy ke platform mana pun yang mendukung static hosting. Cukup upload seluruh file ke root domain.

Platform yang didukung:

- GitHub Pages (sudah dikonfigurasi)
- Cloudflare Pages

Untuk GitHub Pages, deployment dilakukan secara otomatis melalui workflow saat tag versi di-push (lihat bagian [CI/CD](#cicd)).

---

## Kontak

**PT Hello Kognisia Indonesia**

- Email: info@hellokognisia.id
- Website: https://www.hellokognisia.id
- Instagram: https://www.instagram.com/hellokognisia.id

---

## Changelog

Riwayat perubahan lengkap tersedia di [CHANGELOG.md](CHANGELOG.md).

---

## Lisensi

Hak cipta &copy; PT Hello Kognisia Indonesia. Seluruh konten, desain, dan materi dilindungi oleh hukum yang berlaku.
