import { test } from '@playwright/test';
import { HomePage } from '../../POM/home.page';
import { LoginPage } from '../../POM/login.page';
import { getAuthStatePath } from '../../auth-state';

const PRODUCT_NAME = 'Samsung galaxy s6';

test.use({ storageState: getAuthStatePath() });

test.describe('DemoBlaze - Shopping journey', () => {
  test('logs in, adds a product to the cart, and logs out', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await page.goto('/index.html');
    await homePage.expectLoggedIn();
    const loginScreenshot = testInfo.outputPath('login.png');
    await page.screenshot({ path: loginScreenshot, fullPage: true });
    await testInfo.attach('login :', {
      path: loginScreenshot,
      contentType: 'image/png',
    });

    const productPage = await homePage.openProduct(PRODUCT_NAME);
    await productPage.addToCart();
    const cartPage = await homePage.openCart();
    await cartPage.expectProductInCart(PRODUCT_NAME);
    const cartScreenshot = testInfo.outputPath('cart.png');
    await page.screenshot({ path: cartScreenshot, fullPage: true });
    await testInfo.attach('cart :', {
      path: cartScreenshot,
      contentType: 'image/png',
    });

    await homePage.logout();
    await loginPage.expectLoggedOut();
    const logoutScreenshot = testInfo.outputPath('logout.png');
    await page.screenshot({ path: logoutScreenshot, fullPage: true });
    await testInfo.attach('logout :', {
      path: logoutScreenshot,
      contentType: 'image/png',
    });
  });
});
