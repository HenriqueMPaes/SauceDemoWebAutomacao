import { expect, type Page } from '@playwright/test';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  private productCard(productName: string) {
    return this.page.getByRole('link', { name: productName }).first().locator('xpath=ancestor::div[.//button][1]');
  }

  async assertLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/inventory\.html/);
    await expect(this.page.getByText('Products', { exact: true })).toBeVisible();
  }

  async assertProductVisible(productName: string): Promise<void> {
    await expect(this.productCard(productName)).toBeVisible();
  }

  async addProduct(productName: string): Promise<void> {
    await this.productCard(productName).getByRole('button', { name: 'Add to cart' }).click();
  }

  async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.page.getByRole('combobox').selectOption(value);
  }

  async assertFirstProduct(productName: string): Promise<void> {
    await expect(this.page.getByRole('link').first()).toHaveAccessibleName(productName);
  }

  async assertCartCount(quantity: number): Promise<void> {
    await expect(this.page.getByText(String(quantity), { exact: true })).toBeVisible();
  }

  async openCart(): Promise<void> {
    await this.page.locator('a').filter({ hasText: /^\d+$/ }).click();
  }
}
