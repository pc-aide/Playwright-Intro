# sauceDemo

---

## playwright.config.ts
````ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  /* No global use, all in projects */
  projects: [
    {
      name: 'setup-chrome',
      testDir: './setup',
      testMatch: /.*\.setup\.ts$/,
      outputDir: (() => {
        const now = new Date();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const month = months[now.getMonth()];
        const year = now.getFullYear();
        return `test-results/setup/${hours}h${minutes}_${month}_${year}`;
      })(),
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
        trace: 'on-first-retry',
        video: 'on',
      },
    },
    {
      name: 'setup-edge',
      testDir: './setup',
      testMatch: /.*\.setup\.ts$/,
      outputDir: (() => {
        const now = new Date();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const month = months[now.getMonth()];
        const year = now.getFullYear();
        return `test-results/setup/${hours}h${minutes}_${month}_${year}`;
      })(),
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
        baseURL: 'https://www.saucedemo.com',
        trace: 'on-first-retry',
        video: 'on',
      },
    },
    {
      name: 'chrome',
      testDir: './tests',
      outputDir: (() => {
        const now = new Date();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const month = months[now.getMonth()];
        const year = now.getFullYear();
        return `test-results/add-to-cart/${hours}h${minutes}_${month}_${year}`;
      })(),
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
        storageState: 'setup/.auth.json',
        trace: 'on-first-retry',
        video: 'on',
      },
    },
    {
      name: 'edge',
      testDir: './tests',
      outputDir: (() => {
        const now = new Date();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const month = months[now.getMonth()];
        const year = now.getFullYear();
        return `test-results/add-to-cart/${hours}h${minutes}_${month}_${year}`;
      })(),
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
        baseURL: 'https://www.saucedemo.com',
        storageState: 'setup/.auth.json',
        trace: 'on-first-retry',
        video: 'on',
      },
    },
  ],
});
````

## setup/login.setup.ts
````ts
import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
  await page.goto('/');

  // username
  await page.locator('[data-test="username"]').type(process.env.user!);
  
  // password
  await page.locator('[data-test="password"]').type(process.env.MDP!);
  
  // login button
  await page.locator('[data-test="login-button"]').click();
  
  // wait for redirect to inventory
  await page.waitForURL('**/inventory.html');
  
  // take screenshot
  await page.screenshot({ path: 'inventory.png', fullPage: true });

  // storageState
  await page.context().storageState({ path: 'setup/.auth.json' });
});
````

---

## tests/add-to-cart.spec.ts
````ts
import { test, expect } from '@playwright/test';

test.use({ storageState: 'setup/.auth.json' });

test('add-to-cart', async ({ page }) => {
  await page.goto('/inventory.html');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'cart.png', fullPage: true });
});
````
