import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly loginLink: Locator;
  private readonly loginModal: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.loginModal = page.locator('#logInModal');
    this.usernameInput = this.loginModal.locator('#loginusername');
    this.passwordInput = this.loginModal.locator('#loginpassword');
    this.loginButton = this.loginModal.getByRole('button', { name: 'Log in' });
  }

  async open(): Promise<void> {
    await this.loginLink.click({ force: true });
    await expect(this.loginModal).toBeVisible();
  }

  async loginAs(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoggedOut(): Promise<void> {
    await expect(this.loginLink).toBeVisible();
  }
}
