# files

---

## playwright.config.ts
### basic
````ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on',
  },
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
````

### pluralsight
````ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  reporter: 'html',

  expect: {
    timeout: 3000
  },

  use: {
    baseURL: 'http://localhost:3000',

    screenshot: 'only-on-failure',
  },

  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000',
  }
});
````
<img src="https://i.imgur.com/1xQ4ffI.png">
