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
  await page.context().storageState({ path: '.auth.json' });
});
