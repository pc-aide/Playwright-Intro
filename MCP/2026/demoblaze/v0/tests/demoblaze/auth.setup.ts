import { test as setup } from '@playwright/test';
import { HomePage } from '../../POM/home.page';
import { LoginPage } from '../../POM/login.page';
import { getAuthStatePath } from '../../auth-state';

const USERNAME = 'testv27aug2026';
const PASSWORD = 'password';

setup('authenticate user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await page.goto('/index.html');
  await loginPage.open();
  await loginPage.loginAs(USERNAME, PASSWORD);
  await homePage.expectLoggedIn();
  await page.context().storageState({ path: getAuthStatePath() });
});