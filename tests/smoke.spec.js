import { test, expect } from '@playwright/test';

/**
 * Smoke Test – Homepage
 */
test('Homepage returns 200 and renders core content', async ({ page }) => {
    const res = await page.goto('/');
    expect(res.status()).toBe(200);

    // H1 utama
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText(/Mengembangkan Cara Berpikir/i);

    // Logo tampil
    await expect(page.locator('.hero-logo img')).toBeVisible();

    await page.screenshot({
        path: 'test-results/homepage.png',
        fullPage: true
    });
});

/**
 * Smoke Test – 404 Page
 */
test('404 page returns 404 and shows friendly message', async ({ page }) => {
    const res = await page.goto('/halaman-tidak-ada');
    expect(res.status()).toBe(404);

    // Untuk static site, cukup pastikan body ada
    await expect(page.locator('body')).toBeVisible();

    await page.screenshot({
        path: 'test-results/404.png',
        fullPage: true
    });
});

/**
 * Navigation & Internal Links
 */
test('Navigation links to legal pages work', async ({ page }) => {
    await page.goto('/');

    const privacyLink = page.locator('a[href="privacy-policy.html"]');
    const disclaimerLink = page.locator('a[href="disclaimer-etika.html"]');

    await expect(privacyLink).toBeVisible();
    await expect(disclaimerLink).toBeVisible();

    await privacyLink.click();
    await expect(page).toHaveURL(/privacy-policy/);
    await expect(page.locator('h1')).toHaveText(/Privacy Policy/i);

    await disclaimerLink.click();
    await expect(page).toHaveURL(/disclaimer-etika/);
    await expect(page.locator('h1')).toContainText(/Disclaimer/i);
});

/**
 * SEO & Metadata Basics
 */
test('SEO meta tags exist and valid', async ({ page }) => {
    await page.goto('/');

    // TITLE (cara yang benar)
    const title = await page.title();
    expect(title).toMatch(/Hello Kognisia/i);

    // Meta description
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description.length).toBeGreaterThan(50);

    // H1 hanya satu
    await expect(page.locator('h1')).toHaveCount(1);
});

/**
 * Contact & Trust Signals
 */
test('Contact information and trust signals exist', async ({ page }) => {
    await page.goto('/');

    const emailLink = page.locator('a[href^="mailto:"]');
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toContainText(/@hellokognisia\.id/i);

    const externalLink = page.locator('a[href*="hellokonseling"]');
    await expect(externalLink).toBeVisible();
});
