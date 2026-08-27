import { expect, type Locator, type Page } from '@playwright/test';

export class ProductPage {
  private readonly addToCartLink: Locator;

  constructor(private readonly page: Page) {
    this.addToCartLink = page.getByRole('link', { name: 'Add to cart' });
  }

  async addToCart(): Promise<void> {
    const dialogPromise = this.page.waitForEvent('dialog');

    await this.addToCartLink.click();

    const dialog = await dialogPromise;
    expect(dialog.message()).toBe('Product added.');
    await dialog.accept();
  }
}
