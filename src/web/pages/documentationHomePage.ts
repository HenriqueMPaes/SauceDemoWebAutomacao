import { expect, type Page } from '@playwright/test';

export class DocumentationHomePage {
  constructor(private readonly page: Page) {}

  async open(baseUrl: string): Promise<void> {
    await this.page.goto(baseUrl);
  }

  async assertLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(/Playwright/);
    await expect(this.page.getByRole('heading', { name: /playwright enables reliable web automation/i })).toBeVisible();
  }

  async openDocumentation(linkLabel: string): Promise<void> {
    await this.page.getByRole('link', { name: linkLabel, exact: true }).click();
  }
}
