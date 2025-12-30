# naveenautomationlabs

## optional - default mytests/login.spec.ts
````ts
const { webkit, firefox, chromium } = require('playwright');
import { test, expect, Browser, Page } from '@playwright/test';

test('login test', async () => {

  const browser: Browser = await firefox.launch({ headless: false });
  const page: Page = await browser.newPage();

  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

  const emailId = await page.locator('[name="email"]');
  const password = await page.locator('[name="password"]');
  const loginButton = await page.locator('input[value="Login"]');

  await emailId.fill("naveen@gmail.com");
  await password.fill("naveen@123");
  await loginButton.click();

  const title = await page.title();
  console.log(title);

  await page.screenshot({ path: `example.png` });

  // await browser.close();
});
````

## playwright.config.ts
````ts
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './',
  testMatch: '**/*.{spec,setup}.ts',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://naveenautomationlabs.com/opencart/index.php?route=account/login',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'edge',
      use: { 
        ...devices['Desktop Edge'],
        channel: 'msedge',
        video: 'on',
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    {
      name: 'chrome',
      use: {
         ...devices['Desktop Chrome'],
         channel: 'chrome',
         video: 'on',
        },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
````

## setup/login.setup.ts
````ts
import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {

  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

  const emailId = await page.locator('[name="email"]');
  const password = await page.locator('[name="password"]');
  const loginButton = await page.locator('input[value="Login"]');

  await emailId.fill("uqd06520@laoia.com");
  await password.fill("naveen@123");
  
  // Wait for navigation after login button click
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    loginButton.click()
  ]);

  const title = await page.title();
  console.log("home page title:", title);

  // account page url
  await expect(page).toHaveURL(/\/account/);
  // my account title
  await expect(title).toEqual('My Account');
  // screenshot
  await page.screenshot({ path: 'account.png' });
  // storageState save
  await page.context().storageState({ path: '.auth.json' });

});
````

## tests/add-to-cart.spec.ts
````ts
import { test, expect } from '@playwright/test';

test.use({ storageState: './setup/.auth.json' });

test('add-to-cart', async ({ page }) => {
  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=20');
  
  // onglet desktop
  await page.locator('#menu').getByRole('link', { name: 'Desktops', exact: true }).click();
  await page.getByRole('link', { name: 'Show All Desktops' }).click();
  // add to cart
  await page.getByRole('button', { name: ' Add to Cart' }).first().click();
  await page.getByRole('button', { name: ' 1 item(s) - $' }).click();
  await page.getByRole('link', { name: ' View Cart' }).click();
});
````

## test
### Windows
````ps1
npx playwright test setup/login.setup.ts --project=edge --headed
````

---

## debug
### windows
````ps1
npx playwright test tests/add-to-cart.spec.ts --project=edge --ui
````
