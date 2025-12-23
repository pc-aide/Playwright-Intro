# code

---

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
  testDir: './tests',
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
    baseURL: 'https://www.saucedemo.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Record video on failure */
    video: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testDir: './setup',
      testMatch: /.*\.setup\.ts/,
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },

    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

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
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge', storageState: 'auth.json' },
    },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
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
  await page.goto('/');

  // username
  await page.locator('[data-test="username"]').type('standard_user');
  
  // password
  await page.locator('[data-test="password"]').type('secret_sauce');
  
  // login button
  await page.locator('[data-test="login-button"]').click();
  
  // wait for redirect to inventory
  await page.waitForURL('**/inventory.html');
  
  // take screenshot
  await page.screenshot({ path: 'inventory.png', fullPage: true });

  // storageState
  await page.context().storageState({ path: 'auth.json' });
});
````

## auth.json
````json
{
  "cookies": [
    {
      "name": "session-username",
      "value": "standard_user",
      "domain": "www.saucedemo.com",
      "path": "/",
      "expires": 1766518999,
      "httpOnly": false,
      "secure": false,
      "sameSite": "Lax"
    }
  ],
  "origins": [
    {
      "origin": "https://www.saucedemo.com",
      "localStorage": [
        {
          "name": "backtrace-guid",
          "value": "e2ce0ec4-739f-4785-bdb7-2f3118d63e08"
        },
        {
          "name": "backtrace-last-active",
          "value": "1766518398608"
        }
      ]
    }
  ]
}
````

## tests/add-to-cart.spec.ts
````ts
import { test, expect } from '@playwright/test';

test.use({ storageState: 'auth.json' });

test('add-to-cart', async ({ page }) => {
  await page.goto('/inventory.html');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'cart.png', fullPage: true });
});
````

---


## test

### generated auth.json
````ps1
npx playwright test --project=setup --headed
````

### add-to-cart.spec.ts
````ps1
npx playwright test "tests/add-to-cart.spec.ts" --headed
````
