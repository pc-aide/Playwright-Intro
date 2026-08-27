import { expect, type Locator, type Page } from '@playwright/test';
import { NavbarComponent } from './components/navbar.component';

export class CartPage {
  readonly navbar: NavbarComponent;
  private readonly productRows: Locator;

  constructor(private readonly page: Page) {
    this.navbar = new NavbarComponent(page);
    this.productRows = page.getByRole('row');
  }

  async expectProductInCart(productName: string): Promise<void> {
    await expect(this.productRows.filter({ hasText: productName }).first()).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.navbar.logout();
  }
}
