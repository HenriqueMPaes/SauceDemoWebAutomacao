import { test } from '@playwright/test';
import { documentationFlow } from '@web/flows/documentationFlow';
import { documentationLinks } from '@web/support/documentationTestData';

test.describe('Web · Documentação pública', () => {
  test('a página inicial é exibida', async ({ page }) => {
    await documentationFlow.accessHome(page);
  });

  for (const link of documentationLinks) {
    test(`o link "${link.label}" abre a documentação`, async ({ page }) => {
      await documentationFlow.accessDocumentation(page, link.label, link.expectedPath);
    });
  }
});
