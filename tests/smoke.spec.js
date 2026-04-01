import { test, expect } from '@playwright/test';

const CURRENT_YEAR = String(new Date().getFullYear());

// ─────────────────────────────────────────────
// HOMEPAGE – Core Content
// ─────────────────────────────────────────────

test('Homepage returns 200 and renders hero', async ({ page }) => {
    const res = await page.goto('/');
    expect(res.status()).toBe(200);

    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText(/Mengembangkan Cara Berpikir/i);
    await expect(page.locator('.hero-logo img')).toBeVisible();

    await page.screenshot({ path: 'test-results/homepage.png', fullPage: true });
});

test('Homepage all sections exist', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#about')).toBeAttached();
    await expect(page.locator('#services')).toBeAttached();
    await expect(page.locator('#contact')).toBeAttached();

    // Minimal 3 card di About
    await expect(page.locator('#about .card')).toHaveCount(3);

    // Layanan card
    await expect(page.locator('#services .card')).toHaveCount(1);
    await expect(page.locator('#services .card h3')).toContainText(/HelloKonseling/i);
});

// ─────────────────────────────────────────────
// HOMEPAGE – Header & Navigation
// ─────────────────────────────────────────────

test('Homepage header navigation links exist', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('nav a[href="#about"]')).toBeVisible();
    await expect(page.locator('nav a[href="#services"]')).toBeVisible();
    await expect(page.locator('nav a[href="#contact"]')).toBeVisible();
});

test('Homepage header scroll effect toggles scrolled class', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('#header');
    await expect(header).not.toHaveClass(/scrolled/);

    await page.evaluate(() => window.scrollTo(0, 100));
    await expect(header).toHaveClass(/scrolled/);

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(header).not.toHaveClass(/scrolled/);
});

// ─────────────────────────────────────────────
// HOMEPAGE – Footer
// ─────────────────────────────────────────────

test('Homepage footer renders with correct year and links', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('footer #year')).toHaveText(CURRENT_YEAR);
    await expect(page.locator('footer a[href="privacy-policy.html"]')).toBeVisible();
    await expect(page.locator('footer a[href="disclaimer-etika.html"]')).toBeVisible();
});

// ─────────────────────────────────────────────
// HOMEPAGE – SEO & Meta Tags
// ─────────────────────────────────────────────

test('Homepage SEO meta tags exist and valid', async ({ page }) => {
    await page.goto('/');

    expect(await page.title()).toMatch(/Hello Kognisia/i);

    const desc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(desc).toBeTruthy();
    expect(desc.length).toBeGreaterThan(50);

    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(robots).toContain('index');

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toMatch(/^https:\/\/www\.hellokognisia\.id/);

    await expect(page.locator('h1')).toHaveCount(1);
});

test('Homepage Open Graph tags exist and have absolute URLs', async ({ page }) => {
    await page.goto('/');

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toMatch(/Hello Kognisia/i);

    const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDesc).toBeTruthy();
    expect(ogDesc.length).toBeGreaterThan(20);

    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toMatch(/^https?:\/\//);

    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    expect(ogUrl).toMatch(/^https?:\/\//);
});

test('Homepage Twitter Card tags exist', async ({ page }) => {
    await page.goto('/');

    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    expect(twitterCard).toBeTruthy();

    const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content');
    expect(twitterTitle).toMatch(/Hello Kognisia/i);

    const twitterImage = await page.locator('meta[name="twitter:image"]').getAttribute('content');
    expect(twitterImage).toMatch(/^https?:\/\//);
});

test('Homepage has valid Schema.org JSON-LD', async ({ page }) => {
    await page.goto('/');

    const schemaText = await page.locator('script[type="application/ld+json"]').textContent();
    expect(schemaText).toBeTruthy();

    const schema = JSON.parse(schemaText);
    expect(schema['@type']).toBe('Organization');
    expect(schema.name).toMatch(/Hello Kognisia/i);
    expect(schema.url).toMatch(/^https?:\/\//);
});

// ─────────────────────────────────────────────
// 404 PAGE
// ─────────────────────────────────────────────

test('404 page returns 404, shows branded layout and back link', async ({ page }) => {
    const res = await page.goto('/halaman-tidak-ada');
    expect(res.status()).toBe(404);

    await expect(page.locator('.error-code')).toContainText('404');
    await expect(page.locator('h1')).toContainText(/Halaman Tidak Ditemukan/i);
    await expect(page.locator('.brand img')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('a.btn-primary[href="index.html"]')).toContainText(/Kembali ke Beranda/i);

    await page.screenshot({ path: 'test-results/404.png', fullPage: true });
});

// ─────────────────────────────────────────────
// NAVIGASI ANTAR HALAMAN
// ─────────────────────────────────────────────

test('Privacy Policy footer link navigates correctly', async ({ page }) => {
    await page.goto('/');
    await page.locator('footer a[href="privacy-policy.html"]').click();
    await expect(page).toHaveURL(/privacy-policy/);
    await expect(page.locator('h1')).toContainText(/Kebijakan Privasi/i);
});

test('Disclaimer & Etika footer link navigates correctly', async ({ page }) => {
    await page.goto('/');
    await page.locator('footer a[href="disclaimer-etika.html"]').click();
    await expect(page).toHaveURL(/disclaimer-etika/);
    await expect(page.locator('h1')).toContainText(/Sanggahan/i);
});

test('Legal pages nav links point back to homepage sections', async ({ page }) => {
    for (const path of ['/privacy-policy.html', '/disclaimer-etika.html']) {
        await page.goto(path);
        await expect(page.locator('nav a[href="index.html#about"]')).toBeVisible();
        await expect(page.locator('nav a[href="index.html#services"]')).toBeVisible();
        await expect(page.locator('nav a[href="index.html#contact"]')).toBeVisible();
        await expect(page.locator('.brand a[href="index.html"]')).toBeVisible();
    }
});

// ─────────────────────────────────────────────
// KEBIJAKAN PRIVASI – Konten & Struktur
// ─────────────────────────────────────────────

test('Privacy Policy page renders all sections and footer', async ({ page }) => {
    const res = await page.goto('/privacy-policy.html');
    expect(res.status()).toBe(200);

    await expect(page.locator('h1')).toContainText(/Kebijakan Privasi/i);

    // Minimal 7 section h2
    const h2s = page.locator('h2');
    await expect(h2s).toHaveCount(7);

    // Email kontak tersedia
    await expect(page.locator('a[href^="mailto:"]')).toBeVisible();

    // Footer tahun
    await expect(page.locator('footer #year')).toHaveText(CURRENT_YEAR);

    await page.screenshot({ path: 'test-results/privacy-policy.png', fullPage: true });
});

test('Privacy Policy page SEO meta tags exist and valid', async ({ page }) => {
    await page.goto('/privacy-policy.html');
    expect(await page.title()).toMatch(/Hello Kognisia/i);

    const desc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(desc).toBeTruthy();
    expect(desc.length).toBeGreaterThan(100);

    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(robots).toContain('index');

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('privacy-policy');

    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    expect(ogUrl).toMatch(/^https?:\/\//);

    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    expect(twitterCard).toBeTruthy();

    const schemaText = await page.locator('script[type="application/ld+json"]').textContent();
    const schema = JSON.parse(schemaText);
    expect(schema['@type']).toBe('BreadcrumbList');
});

// ─────────────────────────────────────────────
// SANGGAHAN & ETIKA – Konten & Struktur
// ─────────────────────────────────────────────

test('Disclaimer page renders all sections and footer', async ({ page }) => {
    const res = await page.goto('/disclaimer-etika.html');
    expect(res.status()).toBe(200);

    await expect(page.locator('h1')).toContainText(/Sanggahan/i);

    // Minimal 5 section h2
    const h2s = page.locator('h2');
    await expect(h2s).toHaveCount(5);

    // Footer tahun
    await expect(page.locator('footer #year')).toHaveText(CURRENT_YEAR);

    await page.screenshot({ path: 'test-results/disclaimer-etika.png', fullPage: true });
});

test('Disclaimer page SEO meta tags exist and valid', async ({ page }) => {
    await page.goto('/disclaimer-etika.html');
    expect(await page.title()).toMatch(/Hello Kognisia/i);

    const desc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(desc).toBeTruthy();
    expect(desc.length).toBeGreaterThan(100);

    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(robots).toContain('index');

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('disclaimer-etika');

    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    expect(ogUrl).toMatch(/^https?:\/\//);

    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    expect(twitterCard).toBeTruthy();

    const schemaText = await page.locator('script[type="application/ld+json"]').textContent();
    const schema = JSON.parse(schemaText);
    expect(schema['@type']).toBe('BreadcrumbList');
});

// ─────────────────────────────────────────────
// KONTAK & TRUST SIGNALS
// ─────────────────────────────────────────────

test('Contact information and trust signals exist', async ({ page }) => {
    await page.goto('/');

    const emailLink = page.locator('a[href^="mailto:"]');
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toContainText(/@hellokognisia\.id/i);

    const igLink = page.locator('a[href*="instagram.com"]');
    await expect(igLink).toBeVisible();
    await expect(igLink).toContainText(/@hellokognisia\.id/i);

    await expect(page.locator('a[href*="hellokonseling"]')).toBeVisible();
});

test('External links have target="_blank"', async ({ page }) => {
    await page.goto('/');

    const selectors = [
        'a[href*="hellokonseling"]',
        'a[href*="instagram.com"]',
    ];

    for (const selector of selectors) {
        const target = await page.locator(selector).getAttribute('target');
        expect(target).toBe('_blank');
    }
});

// ─────────────────────────────────────────────
// AKSESIBILITAS DASAR
// ─────────────────────────────────────────────

test('All pages have lang="id" attribute', async ({ page }) => {
    for (const path of ['/', '/privacy-policy.html', '/disclaimer-etika.html']) {
        await page.goto(path);
        const lang = await page.locator('html').getAttribute('lang');
        expect(lang).toBe('id');
    }
});

test('Homepage images all have alt text', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
        const alt = await images.nth(i).getAttribute('alt');
        expect(alt, `img[${i}] missing alt`).toBeTruthy();
    }
});

test('All pages have viewport meta tag', async ({ page }) => {
    for (const path of ['/', '/privacy-policy.html', '/disclaimer-etika.html', '/404.html']) {
        await page.goto(path);
        const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
        expect(viewport).toContain('width=device-width');
    }
});
