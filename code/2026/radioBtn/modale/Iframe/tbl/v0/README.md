# radioBtn 

## playwright.config.ts
````ts
````

## tests/internal_transfer.ts
````ts
import { test } from '@playwright/test';

test('internal transfer', async ({ page }) => {
  await page.goto('file:///Users/paul/pwd_v13/internal_transfer.html');
  // nth(n) n start 0 to the first
  await page.frame({ name: 'modaleIFrame' })!.locator('input[name="chRadProv"]').nth(1).click();
  await page.pause();
});
````

## test
````sh
npx playwright test --project=chrome --headed tests/internal_transfer.spec.ts
````
