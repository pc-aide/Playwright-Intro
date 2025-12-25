# naveenautomationlabs

---

## Install
````ps1

````

---

## setup/login.setup.ts
````ts
import { test, expect } from '@playwright/test';

test('login test', async ({ page }) => {

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

});
````

---

## test
### Windows
````ps1
npx playwright test setup/login.setup.ts --project=edge --headed
````
