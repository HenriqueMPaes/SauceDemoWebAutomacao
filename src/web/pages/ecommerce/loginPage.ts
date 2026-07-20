import { expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open(baseUrl: string): Promise<void> {
    await this.page.goto(baseUrl);
  }

  async assertLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle('Swag Labs');
    await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async assertError(message: RegExp): Promise<void> {
    await expect(this.page.getByRole('heading', { name: message })).toBeVisible();
  }
}
