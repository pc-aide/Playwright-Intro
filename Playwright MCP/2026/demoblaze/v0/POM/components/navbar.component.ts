import { type Locator, type Page } from '@playwright/test';

export class NavbarComponent {
  private readonly cartLink: Locator;
  private readonly logoutLink: Locator;

  constructor(private readonly page: Page) {
    this.cartLink = page.getByRole('link', { name: 'Cart', exact: true });
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }

  get logoutLinkLocator(): Locator {
    return this.logoutLink;
  }
}
