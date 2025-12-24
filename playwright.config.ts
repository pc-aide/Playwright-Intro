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

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
