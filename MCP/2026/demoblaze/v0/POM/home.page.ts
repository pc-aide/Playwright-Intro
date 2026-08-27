import { expect, type Page } from '@playwright/test';
import { CartPage } from './cart.page';
import { NavbarComponent } from './components/navbar.component';
import { ProductPage } from './product.page';

export class HomePage {
  readonly navbar: NavbarComponent;

  constructor(private readonly page: Page) {
    this.navbar = new NavbarComponent(page);
  }

  async expectLoggedIn(): Promise<void> {
    await expect(this.navbar.logoutLinkLocator).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.navbar.logout();
  }

  async openProduct(productName: string): Promise<ProductPage> {
    await this.page.getByRole('link', { name: productName }).click();
    return new ProductPage(this.page);
  }

  async openCart(): Promise<CartPage> {
    await this.navbar.openCart();
    return new CartPage(this.page);
  }
}
