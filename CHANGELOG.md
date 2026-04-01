# Changelog

Semua perubahan penting pada proyek ini didokumentasikan di file ini.

Format mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) dan proyek ini mengikuti [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.4.0] - 2026-04-01

### Ditambahkan

**Performance**
- `logo-sm.webp` (23 KiB) — varian logo mobile 440×212 untuk `srcset` responsif
- `<source srcset="logo-sm.webp 440w, logo.webp 640w" sizes="(max-width: 768px) 220px, 320px">` di hero section agar browser unduh gambar sesuai ukuran tampilan (hemat ~22 KiB di mobile)

### Diubah

**Performance**
- `logo.webp` di-re-encode dengan quality 70 (dari quality default): 45 KiB → 40 KiB

**Aksesibilitas**
- `.highlight .section-desc` — warna teks diubah dari `#6b7280` ke `#5a6070` agar kontras pada background `#eef3f9` memenuhi WCAG AA (4.07:1 → 5.18:1)

### Catatan

- Cache TTL 10 menit pada aset statis adalah limitasi GitHub Pages; tidak dapat diperbaiki tanpa menambahkan CDN (misal Cloudflare) di depan GitHub Pages

---

## [1.3.0] - 2026-04-01

### Ditambahkan

**UI/UX**
- Halaman 404 custom (`404.html`) dengan branding konsisten: header logo+nav, pesan error bertyle brand, tombol "Kembali ke Beranda", dan footer
- `meta name="robots" content="noindex, follow"` pada halaman 404

**Pengujian**
- Test 404 diperbarui: verifikasi layout bermerek (logo, footer, `.error-code`, `h1`, tombol CTA)

---

## [1.2.0] - 2026-04-01

### Ditambahkan

**SEO & Indexing**
- Canonical URL, meta robots `index, follow`, Open Graph, dan Twitter Card di semua halaman
- BreadcrumbList JSON-LD Schema.org di `privacy-policy.html` dan `disclaimer-etika.html`
- Meta description diperpanjang ke 150+ karakter di halaman legal
- `sitemap.xml` diperluas mencakup `privacy-policy.html` dan `disclaimer-etika.html`
- Judul halaman homepage diperlengkap: "PT Hello Kognisia Indonesia | Kognisi, Edukasi & Kesehatan Mental"

**PWA & Performance**
- `manifest.json` dengan nama, deskripsi, warna brand, dan icon
- `<meta name="theme-color">` dan `<link rel="apple-touch-icon">` di semua halaman
- `<link rel="preload" as="style">` untuk Google Fonts di semua halaman
- Atribut `width` dan `height` eksplisit pada semua `<img>` untuk mencegah layout shift (CLS)
- `width: auto` / `height: auto` di CSS untuk menjaga aspect ratio gambar

**Aksesibilitas**
- `<main id="main-content">` di semua halaman sebagai landmark semantik
- Skip link "Langsung ke konten" di semua halaman (muncul saat fokus keyboard)

**Keamanan**
- `rel="noopener noreferrer"` pada semua external link (`target="_blank"`)

**UI/UX**
- CTA buttons "Hubungi Kami" dan "Lihat Layanan" di hero section homepage
- Styling nav links: `font-weight: 500`, hover dengan underline kuning brand
- Styling teks link: `.card-link`, `.inline-link`, `.footer-link` dengan hover state
- `manifest.json` termasuk dalam artifact deployment

**Pengujian**
- Test baru: canonical URL, meta robots, Twitter Card, dan BreadcrumbList JSON-LD
- Validasi panjang meta description > 100 karakter di halaman legal

### Diubah

**CSS**
- Ekstrak CSS shared ke `style.css` (variables, reset, nav, footer, skip link)
- Inline `<style>` tiap halaman hanya berisi CSS spesifik halaman tersebut
- Duplikasi ~100 baris CSS dihapus dari masing-masing halaman legal

**UI/UX**
- Hero logo dikecilkan dari `max-width: 400px` ke `max-width: 320px`
- Hero padding dikurangi dari `100px 0 64px` ke `80px 0 48px`

**CI/CD**
- Perintah copy file di deploy job dipisah per kategori (required vs optional)
- File optional (`CNAME`, `.htaccess`, dll) menggunakan guard `[ -f ]` agar tidak error jika tidak ada
- Validasi eksplisit file wajib (`index.html`, `favicon.png`, `style.css`) setelah copy
- `style.css` dan `manifest.json` ditambahkan ke artifact deployment

### Diperbaiki

- `manifest.json` gagal dimuat karena tidak disertakan dalam artifact deployment
- Gambar header distorsi setelah penambahan atribut `width`/`height` tanpa `width: auto` di CSS
- Logo hero terlalu tinggi karena `height` HTML attribute tidak di-override CSS
- Deploy script menelan error diam-diam via `|| true` tanpa validasi hasil
- Footer link di halaman legal tidak memiliki hover state

---

## [1.1.0] - 2026-03-31

### Ditambahkan

**Halaman & Konten**
- Google Fonts Inter di semua halaman agar tipografi konsisten di semua browser
- Meta tag `og:url` di `index.html`
- Navigasi header (Tentang, Layanan, Kontak) di halaman `privacy-policy.html` dan `disclaimer-etika.html`
- Garis bawah kuning pada H1 halaman legal, konsisten dengan visual homepage
- Script tahun otomatis di footer `privacy-policy.html` dan `disclaimer-etika.html` (sebelumnya kosong)
- CSS `* { box-sizing: border-box }` di halaman legal untuk konsistensi kalkulasi lebar container

**Pengujian**
- 16 test case baru, total dari 5 menjadi 21 test
- Coverage baru: Open Graph tags, Schema.org JSON-LD, header scroll behavior, footer year, keberadaan semua section, external link behavior, aksesibilitas dasar (lang, alt, viewport), halaman legal (status, konten, navigasi)

**CI/CD**
- Push ke `master` sebagai trigger CI, sebelumnya hanya pull request
- `concurrency` group di `deploy-pages.yml` untuk mencegah deploy konflik
- `environment` declaration dengan output URL di `deploy-pages.yml`
- Step "Prepare site files" di `deploy-pages.yml` agar hanya file yang diperlukan yang ter-deploy
- `retention-days: 14` untuk artifact Playwright report dan screenshot
- `restore-keys` fallback pada cache Playwright di CI
- `CHANGELOG.md`

### Diubah

**Wording & Bahasa**
- H1 `privacy-policy.html`: "Privacy Policy" menjadi "Kebijakan Privasi"
- H1 `disclaimer-etika.html`: "Disclaimer & Etika Profesional" menjadi "Sanggahan & Etika Profesional"
- `<title>` browser kedua halaman legal disesuaikan dengan judul H1
- Footer link teks di semua halaman: "Privacy Policy" menjadi "Kebijakan Privasi", "Disclaimer & Etika" menjadi "Sanggahan & Etika"
- "bertumbuh" menjadi "berkembang" (kata baku KBBI)
- Card "Berbasis Sains & Edukasi" ditambahkan subjek "Kami" agar konsisten dengan card lainnya
- "secara privat dan aman" menjadi "secara terjaga dan aman"
- "Kami dapat mengumpulkan" menjadi "Kami mengumpulkan" (menghilangkan ambiguitas)
- "komunikasi profesional yang relevan" menjadi "komunikasi yang berkaitan dengan layanan"
- "menarik persetujuan" menjadi "mencabut persetujuan" (istilah hukum yang tepat)
- "konsultasi profesional yang sesuai" menjadi "yang memadai"
- "kerahasiaan, privasi" menjadi "kerahasiaan" (menghapus redundansi makna)
- Inline text di `disclaimer-etika.html`: "halaman Disclaimer & Etika" menjadi "halaman Sanggahan & Etika"

**UI/UX**
- `og:image` di `index.html` diubah ke absolute URL (sebelumnya relative, tidak berfungsi untuk social media preview)
- Card section Layanan dibatasi lebar maksimum via `.grid--solo` agar tidak stretch full-width
- Hero bottom padding dikurangi dari `100px` menjadi `64px` untuk memperkecil gap ke section berikutnya
- Inline styles pada section Kontak dan footer dipindah ke CSS class `.card-note` dan `.footer-link`
- Container header halaman legal disesuaikan ke `max-width: 1120px` agar posisi logo dan navigasi identik dengan homepage saat berpindah halaman
- `section .container` halaman legal dibatasi `max-width: 900px` untuk keterbacaan konten artikel

**Pengujian**
- Playwright timeout dinaikkan dari 5 detik menjadi 15 detik
- Test navigasi legal pages dipecah menjadi dua test independen (sebelumnya chained, rentan error)
- Smoke test assertions disesuaikan dengan wording terbaru

**CI/CD**
- Cache key Playwright ditambahkan `hashFiles('tests/package-lock.json')` agar cache tidak stale saat versi berubah
- `npx serve` dan `npx wait-on` menggunakan `working-directory: tests` agar pakai binary dari `node_modules` lokal
- Playwright install menggunakan `--with-deps` untuk menyertakan system dependencies di Ubuntu
- `wait-on` ditambahkan `--timeout 30000`
- Deploy workflow menggunakan `fetch-depth: 1` untuk mempercepat checkout
- `README.md` diperbarui lengkap dengan daftar isi, struktur proyek, panduan pengujian, dan dokumentasi CI/CD

### Diperbaiki

- Tahun footer kosong di `privacy-policy.html` dan `disclaimer-etika.html` karena script tidak ada
- Posisi header bergeser saat navigasi dari homepage ke halaman legal akibat perbedaan `box-sizing` dan `max-width` container
- Test navigasi yang chained menyebabkan klik elemen pada halaman yang salah

### Dihapus

- Dependensi `@axe-core/playwright` dari `tests/package.json` (terpasang tapi tidak digunakan)
- Semua inline style dari HTML (dipindah ke CSS)
- Emoji dan icon dari `README.md`

---

## [1.0.0] - Rilis Awal

Rilis pertama website company profile PT Hello Kognisia Indonesia dengan fitur:

- Halaman utama dengan section Hero, Tentang Kami, Layanan, dan Kontak
- Halaman Kebijakan Privasi dan Sanggahan & Etika
- SEO meta tags, Open Graph, dan Schema.org JSON-LD
- Playwright smoke tests
- GitHub Actions untuk CI dan deployment ke GitHub Pages
