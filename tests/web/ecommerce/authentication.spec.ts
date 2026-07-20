import { test } from '@playwright/test';
import { ecommerceFlow } from '@web/flows/ecommerceFlow';
import { ecommerceUsers } from '@web/support/ecommerceTestData';

test.describe('E-commerce · Autenticação', () => {
  test('[@smoke] usuário válido acessa o catálogo', async ({ page }) => {
    await ecommerceFlow.authenticate(page, ecommerceUsers.standard.username, ecommerceUsers.standard.password);
  });

  test('[@regression] credenciais inválidas exibem mensagem de erro', async ({ page }) => {
    const loginPage = await ecommerceFlow.accessLogin(page);
    await loginPage.login(ecommerceUsers.invalid.username, ecommerceUsers.invalid.password);
    await loginPage.assertError(/Username and password do not match/i);
  });

  test('[@regression] usuário bloqueado não acessa o catálogo', async ({ page }) => {
    const loginPage = await ecommerceFlow.accessLogin(page);
    await loginPage.login(ecommerceUsers.locked.username, ecommerceUsers.locked.password);
    await loginPage.assertError(/this user has been locked out/i);
  });
});
