import { expect, type Page } from '@playwright/test';

export interface CustomerInformation {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async assertInformationLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-step-one\.html/);
    await expect(this.page.getByText('Checkout: Your Information', { exact: true })).toBeVisible();
  }

  async fillCustomerInformation(customer: CustomerInformation): Promise<void> {
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(customer.firstName);
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(customer.lastName);
    await this.page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill(customer.postalCode);
  }

  async continue(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async assertInformationError(message: RegExp): Promise<void> {
    await expect(this.page.getByRole('heading', { name: message })).toBeVisible();
  }

  async assertOverviewLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-step-two\.html/);
    await expect(this.page.getByText('Checkout: Overview', { exact: true })).toBeVisible();
  }

  async finish(): Promise<void> {
    await this.page.getByRole('button', { name: 'Finish' }).click();
  }

  async assertOrderCompleted(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-complete\.html/);
    await expect(this.page.getByText('Thank you for your order!', { exact: true })).toBeVisible();
  }
}
