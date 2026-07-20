import { test } from '@playwright/test';
import { ecommerceFlow } from '@web/flows/ecommerceFlow';
import { ecommerceUsers, products } from '@web/support/ecommerceTestData';

test.describe('E-commerce · Produtos', () => {
  test('[@smoke] catálogo exibe produtos disponíveis', async ({ page }) => {
    const inventoryPage = await ecommerceFlow.authenticate(page, ecommerceUsers.standard.username, ecommerceUsers.standard.password);
    await inventoryPage.assertProductVisible(products.backpack);
    await inventoryPage.assertProductVisible(products.bikeLight);
  });

  test('[@regression] produtos podem ser ordenados por menor preço', async ({ page }) => {
    const inventoryPage = await ecommerceFlow.authenticate(page, ecommerceUsers.standard.username, ecommerceUsers.standard.password);
    await inventoryPage.sortBy('lohi');
    await inventoryPage.assertFirstProduct(products.onesie);
  });
});
