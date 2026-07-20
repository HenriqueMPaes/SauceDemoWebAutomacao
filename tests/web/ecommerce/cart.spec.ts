import { test } from '@playwright/test';
import { ecommerceFlow } from '@web/flows/ecommerceFlow';
import { ecommerceUsers, products } from '@web/support/ecommerceTestData';

test.describe('E-commerce · Carrinho', () => {
  test('[@smoke] produtos adicionados são exibidos no carrinho', async ({ page }) => {
    const cartPage = await ecommerceFlow.addProductsToCart(page, ecommerceUsers.standard.username, ecommerceUsers.standard.password, [
      products.backpack,
      products.bikeLight,
    ]);
    await cartPage.assertProductVisible(products.backpack);
    await cartPage.assertProductVisible(products.bikeLight);
  });

  test('[@regression] produto pode ser removido do carrinho', async ({ page }) => {
    const cartPage = await ecommerceFlow.addProductsToCart(page, ecommerceUsers.standard.username, ecommerceUsers.standard.password, [products.backpack]);
    await cartPage.removeProduct(products.backpack);
    await cartPage.assertProductNotVisible(products.backpack);
  });
});
