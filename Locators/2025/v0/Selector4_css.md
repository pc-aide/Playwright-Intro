# selector4_css
* CSS Selector: Selects elements based on their CSS properties.
* `const element = page.locator('css=utton#id');`
* <img src="https://i.imgur.com/mOnk4Fr.png">
* css - checkbox :
* <img src="https://i.imgur.com/rbrYcpS.png">

## tests/locator4_css.spec.ts
````ts
import { test, expect, Browser, Page, Locator } from '@playwright/test'
import { webkit, chromium, firefox } from 'playwright'

test('locator test', async() => {
    test.setTimeout(0); // désactive le timeout pour le debug

    const browser: Browser = await chromium.
    launch({ headless: false, channel: 'chrome' }); // msedge, chrome
    const page: Page = await browser.newPage();
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");

    // Create a web element(locator) + perform action on it(click, fill)
    // 1 Id:unique
    const firstName:Locator = page.locator('id=input-firstname');
    const lastName:Locator = page.locator('id=input-lastname');

    // action on it
    await firstName.fill("Kurt");
    await lastName.fill("Warner");

    // 2 class name
    // const logo:Locator = page.locator('.img-responsive');
    const logo:Locator = page.locator('.img-responsive');
    const logoExist = await logo.isEnabled();
    // console bool
    console.log(logoExist);

    // 3 text
    const header:Locator = page.locator('text=Register Account');
    const headerExist = await header.isEnabled();
    console.log("header1Exist :" + headerExist);

    const ContinueBtn:Locator = page.locator('text=Continue');
    const BtnExist = await ContinueBtn.isEnabled();
    console.log("ContinueBtnExist :" + BtnExist);

    const forgotPwdLink:Locator = page.locator('text=Forgotten Password');
    const forgotPwdLinkExist = await forgotPwdLink.isEnabled();
    console.log("forgotPwdLinkExist :" + forgotPwdLinkExist);

    // 4 CSS
    // const email:Locator = page.locator('css=input#input-email'); // css= not mandatory
    // const telephone:Locator = page.locator('css=input[name="telephone"]');
    // const privacyCheckbox:Locator = page.locator('css=input[type="checkbox"]');
    const email:Locator = page.locator('input#input-email'); // css= not mandatory
    const telephone:Locator = page.locator('input[name="telephone"]');
    const privacyCheckbox:Locator = page.locator('input[type="checkbox"]');

    await email.fill("kurt@gmail.com");
    await telephone.fill("1234567890");
    await privacyCheckbox.click();

    // pause debugging
    await new Promise(() => {});

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
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

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
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
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

<img src="https://i.imgur.com/C6sHq2J.png">
