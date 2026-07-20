import { test } from '@playwright/test';
import { CheckoutPage } from '@web/pages/ecommerce/checkoutPage';
import { ecommerceFlow } from '@web/flows/ecommerceFlow';
import { checkoutCustomer, ecommerceUsers, products } from '@web/support/ecommerceTestData';

test.describe('E-commerce · Checkout', () => {
  test('[@smoke] compra é concluída com dados válidos', async ({ page }) => {
    await ecommerceFlow.completePurchase(
      page,
      ecommerceUsers.standard.username,
      ecommerceUsers.standard.password,
      products.backpack,
      checkoutCustomer,
    );
  });

  test('[@regression] checkout exige nome', async ({ page }) => {
    const cartPage = await ecommerceFlow.addProductsToCart(page, ecommerceUsers.standard.username, ecommerceUsers.standard.password, [products.backpack]);
    await cartPage.checkout();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.assertInformationLoaded();
    await checkoutPage.continue();
    await checkoutPage.assertInformationError(/First Name is required/i);
  });
});
