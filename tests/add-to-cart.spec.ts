import { test, expect } from '@playwright/test';

test.use({ storageState: '.auth.json' });

test('add-to-cart', async ({ page }) => {
  await page.goto('/inventory.html');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'cart.png', fullPage: true });
});
