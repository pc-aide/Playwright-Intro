# Selector6_data-test-id
* Data-test-id Selector: Selects elements by a custom attribute (data-testid), commonly used in testing.
* https://playwright.dev/docs/locators#locate-by-test-id

## app.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login Page</title>
    <link rel="stylesheet" href="app.css">
</head>

<body>

<div class="box">
    <div class="form">
        <h2>Login</h2>

        <div class="inputBox">
            <input data-testid="username" type="text" required="required">
            <span>Username</span>
            <i></i>
        </div>

        <div class="inputBox">
            <input data-testid="password" type="password" required="required">
            <span>Password</span>
            <i></i>
        </div>

        <input data-testid="login" type="submit" value="Login">
    </div>
</div>

</body>
</html>
````

## app.css
````css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #23242a;
}

.box {
    position: relative;
    width: 380px;
    height: 420px;
    background: #1c1c1c;
    border-radius: 8px;
    overflow: hidden;
}

.box::before,
.box::after {
    content: '';
    position: absolute;
    width: 380px;
    height: 420px;
    background: linear-gradient(0deg, transparent, #45f3ff, #45f3ff);
    animation: animate 6s linear infinite;
    transform-origin: bottom right;
}

.box::after {
    animation-delay: -3s;
}

@keyframes animate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.form {
    position: absolute;
    inset: 2px;
    border-radius: 8px;
    background: #28292d;
    z-index: 10;
    padding: 50px 40px;
    display: flex;
    flex-direction: column;
}

.form h2 {
    color: #45f3ff;
    font-weight: 500;
    text-align: center;
    letter-spacing: 0.1em;
}

.inputBox {
    position: relative;
    width: 100%;
    margin-top: 35px;
}

.inputBox input {
    width: 100%;
    padding: 20px 10px 10px;
    background: transparent;
    border: none;
    outline: none;
    color: #fff;
    font-size: 1em;
    letter-spacing: 0.05em;
    z-index: 10;
}

.inputBox span {
    position: absolute;
    left: 0;
    padding: 20px 10px 10px;
    font-size: 1em;
    color: #8f8f8f;
    pointer-events: none;
    transition: 0.5s;
}

.inputBox input:valid ~ span,
.inputBox input:focus ~ span {
    color: #45f3ff;
    transform: translateY(-34px);
    font-size: 0.75em;
}

.inputBox i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: #45f3ff;
    border-radius: 4px;
    transition: 0.5s;
    pointer-events: none;
}

.inputBox input:valid ~ i,
.inputBox input:focus ~ i {
    height: 44px;
}

input[type="submit"] {
    border: none;
    outline: none;
    background: #45f3ff;
    padding: 11px 25px;
    width: 100px;
    margin-top: 20px;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
}

input[type="submit"]:active {
    opacity: 0.8;
}
````

* preview web
<img src="https://i.imgur.com/q5xUwNW.png">

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

## tests/locator6.spec.ts
````ts
import { test, expect, Browser, Page, Locator } from '@playwright/test'
import {log} from 'console';
import { webkit, chromium, firefox } from 'playwright'
 
test('locator test', async() => {
    test.setTimeout(0); // disable the timeout for debugging
 
    const browser: Browser = await chromium.
    launch({ headless: false, channel: 'msedge' }); // msedge, chrome
    const page: Page = await browser.newPage();
    await page.goto("file:///C:/Users/pc1/app_web_v4/app.html");
 
    // locator6 data-testid
    await page.getByTestId('username').fill('kurt');
    await page.getByTestId('password').fill('test@12#!S');
    await page.getByTestId('login').click();
 
 
    // pause debugging
    await new Promise(() => {});
 
});
````
