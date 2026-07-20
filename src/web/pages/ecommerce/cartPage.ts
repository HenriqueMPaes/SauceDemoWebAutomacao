import { expect, type Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async assertLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/cart\.html/);
    await expect(this.page.getByText('Your Cart', { exact: true })).toBeVisible();
  }

  async assertProductVisible(productName: string): Promise<void> {
    await expect(this.page.getByRole('link', { name: productName })).toBeVisible();
  }

  async removeProduct(productName: string): Promise<void> {
    await this.page.getByRole('link', { name: productName }).locator('xpath=ancestor::div[.//button][1]').getByRole('button', { name: 'Remove' }).click();
  }

  async assertProductNotVisible(productName: string): Promise<void> {
    await expect(this.page.getByRole('link', { name: productName })).toHaveCount(0);
  }

  async checkout(): Promise<void> {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }
}
