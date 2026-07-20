import { type Page } from '@playwright/test';
import { config } from '@core/config/configurationManager';
import { CartPage } from '@web/pages/ecommerce/cartPage';
import { CheckoutPage, type CustomerInformation } from '@web/pages/ecommerce/checkoutPage';
import { InventoryPage } from '@web/pages/ecommerce/inventoryPage';
import { LoginPage } from '@web/pages/ecommerce/loginPage';

export const ecommerceFlow = {
  async accessLogin(page: Page): Promise<LoginPage> {
    const loginPage = new LoginPage(page);
    await loginPage.open(config.getBaseUrl('SauceDemo', 'SAUCE_DEMO_BASE_URL'));
    await loginPage.assertLoaded();
    return loginPage;
  },

  async authenticate(page: Page, username: string, password: string): Promise<InventoryPage> {
    const loginPage = await this.accessLogin(page);
    await loginPage.login(username, password);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.assertLoaded();
    return inventoryPage;
  },

  async addProductsToCart(page: Page, username: string, password: string, productNames: string[]): Promise<CartPage> {
    const inventoryPage = await this.authenticate(page, username, password);
    for (const productName of productNames) await inventoryPage.addProduct(productName);
    await inventoryPage.assertCartCount(productNames.length);
    await inventoryPage.openCart();

    const cartPage = new CartPage(page);
    await cartPage.assertLoaded();
    return cartPage;
  },

  async completePurchase(
    page: Page,
    username: string,
    password: string,
    productName: string,
    customer: CustomerInformation,
  ): Promise<void> {
    const cartPage = await this.addProductsToCart(page, username, password, [productName]);
    await cartPage.checkout();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.assertInformationLoaded();
    await checkoutPage.fillCustomerInformation(customer);
    await checkoutPage.continue();
    await checkoutPage.assertOverviewLoaded();
    await checkoutPage.finish();
    await checkoutPage.assertOrderCompleted();
  },
};
