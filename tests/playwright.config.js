import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  timeout: 5_000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:3000',
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure'
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ]
});
