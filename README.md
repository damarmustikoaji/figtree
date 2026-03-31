# PT Hello Kognisia Indonesia — Company Profile Website

Website resmi **PT Hello Kognisia Indonesia**, menampilkan profil perusahaan, layanan, dan informasi kontak. Dibangun sebagai static site yang ringan, mudah dirawat, dan siap untuk kebutuhan branding serta SEO.

---

## Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Struktur Proyek](#struktur-proyek)
- [Menjalankan Secara Lokal](#menjalankan-secara-lokal)
- [Pengujian](#pengujian)
- [CI/CD](#cicd)
- [Alur Kerja & Release](#alur-kerja--release)
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

### Pengujian Harian (`ci-tests.yml`)

Berjalan otomatis pada setiap push ke `master` dan pull request, untuk memberikan feedback cepat selama pengembangan.

Pipeline melakukan:
1. Install dependensi dan browser Chromium
2. Menjalankan server lokal
3. Menjalankan semua 21 Playwright test
4. Upload laporan HTML dan screenshot sebagai artifact (disimpan 14 hari)

### Pipeline Release (`deploy-pages.yml`)

Berjalan otomatis ketika tag versi di-push. Terdiri dari tiga job yang berjalan berurutan — job berikutnya hanya jalan jika job sebelumnya berhasil.

```
tag v*.*.* di-push
       │
       ▼
  [1] test     — Jalankan semua Playwright tests
       │          Jika gagal, pipeline berhenti di sini
       ▼
  [2] deploy   — Deploy file ke GitHub Pages
       │          Jika gagal, release tidak dibuat
       ▼
  [3] release  — Buat GitHub Release otomatis
                  dengan isi dari CHANGELOG.md
```

URL deployment ditampilkan di tab **Environments** pada halaman repository GitHub.

---

## Alur Kerja & Release

### Pengembangan Sehari-hari

Semua perubahan dilakukan langsung di branch `master` untuk proyek ini karena sifatnya yang sederhana (static site, satu kontributor).

**Langkah standar untuk setiap perubahan:**

```bash
# 1. Pastikan kondisi lokal up to date dengan remote
git pull origin master

# 2. Buat perubahan pada file yang diperlukan

# 3. Cek file apa saja yang berubah
git status

# 4. Stage file yang akan di-commit
git add nama-file.html

# 5. Commit dengan pesan yang deskriptif
git commit -m "fix: perbaiki teks hero section"

# 6. Push ke remote
git push origin master
```

CI Tests akan berjalan otomatis setelah push. Cek hasilnya di tab **Actions** pada GitHub.

### Konvensi Pesan Commit

Gunakan format berikut agar riwayat commit mudah dibaca:

| Prefix | Digunakan untuk |
|---|---|
| `feat:` | Penambahan fitur atau konten baru |
| `fix:` | Perbaikan bug atau kesalahan |
| `style:` | Perubahan tampilan/CSS tanpa mengubah fungsi |
| `content:` | Perubahan teks atau wording |
| `ci:` | Perubahan konfigurasi workflow/CI |
| `docs:` | Perubahan dokumentasi (README, CHANGELOG) |
| `chore:` | Pemeliharaan umum yang tidak masuk kategori lain |

Contoh:
```bash
git commit -m "content: ubah tagline hero section"
git commit -m "fix: perbaiki link navigasi di halaman legal"
git commit -m "style: sesuaikan padding section layanan"
```

### Proses Release

Release dilakukan ketika ada sekumpulan perubahan yang siap dipublikasikan ke production.

**Langkah 1 — Pastikan semua perubahan sudah di-push dan CI passed**

```bash
git push origin master
# Tunggu CI Tests selesai dan passed di GitHub Actions
```

**Langkah 2 — Tentukan nomor versi**

Proyek ini menggunakan [Semantic Versioning](https://semver.org/) dengan format `MAJOR.MINOR.PATCH`:

| Jenis perubahan | Bagian yang naik | Contoh |
|---|---|---|
| Perbaikan kecil, typo, konten minor | `PATCH` | `1.1.0` → `1.1.1` |
| Fitur baru, halaman baru, perubahan signifikan | `MINOR` | `1.1.0` → `1.2.0` |
| Perubahan besar yang mengubah struktur fundamental | `MAJOR` | `1.1.0` → `2.0.0` |

**Langkah 3 — Update `CHANGELOG.md`**

Tambahkan section versi baru di bagian atas, tepat di bawah header, sebelum versi sebelumnya:

```markdown
## [1.2.0] - YYYY-MM-DD

### Ditambahkan
- Deskripsi fitur atau konten yang ditambahkan

### Diubah
- Deskripsi perubahan yang dilakukan

### Diperbaiki
- Deskripsi bug yang diperbaiki

### Dihapus
- Deskripsi yang dihapus
```

Hanya cantumkan kategori yang relevan. Jika tidak ada yang dihapus, bagian `### Dihapus` tidak perlu ditulis.

**Langkah 4 — Commit CHANGELOG**

```bash
git add CHANGELOG.md
git commit -m "docs: tambah changelog v1.2.0"
git push origin master
```

**Langkah 5 — Buat dan push tag**

```bash
git tag v1.2.0
git push origin v1.2.0
```

Setelah tag di-push, pipeline release berjalan otomatis:
- Semua test dijalankan
- Jika passed, site di-deploy ke GitHub Pages
- GitHub Release dibuat otomatis dengan isi dari section `[1.2.0]` di `CHANGELOG.md`

**Langkah 6 — Verifikasi**

1. Buka tab **Actions** di GitHub — pastikan ketiga job (test, deploy, release) berwarna hijau
2. Buka tab **Releases** di GitHub — pastikan release baru muncul dengan catatan yang benar
3. Buka URL production dan pastikan perubahan sudah tampil

### Menghapus Tag yang Salah

Jika tag di-push tapi ada yang perlu diperbaiki sebelum release:

```bash
# Hapus tag di lokal
git tag -d v1.2.0

# Hapus tag di remote
git push origin --delete v1.2.0

# Lakukan perbaikan, commit, push, lalu buat tag ulang
git tag v1.2.0
git push origin v1.2.0
```

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
