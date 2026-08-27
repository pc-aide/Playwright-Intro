import { defineConfig, devices } from '@playwright/test';
import { getAuthStatePath } from './auth-state';

const AUTH_FILE = getAuthStatePath();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['./reporter.ts'], ['list']],
  use: {
    baseURL: process.env.BASE_URL ?? 'https://demoblaze.com',
    trace: 'on',
    video: 'on',
    screenshot: 'only-on-failure',
    headless: true,
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      testIgnore: /.*\.setup\.ts/,
      use: { ...devices['Desktop Chrome'], storageState: AUTH_FILE },
    },
  ],
});
