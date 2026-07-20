import { expect, type Page } from '@playwright/test';
import { config } from '@core/config/configurationManager';
import { DocumentationHomePage } from '@web/pages/documentationHomePage';

export const documentationFlow = {
  async accessHome(page: Page): Promise<DocumentationHomePage> {
    const homePage = new DocumentationHomePage(page);
    await homePage.open(config.getBaseUrl('PortfolioSite', 'WEB_BASE_URL'));
    await homePage.assertLoaded();
    return homePage;
  },

  async accessDocumentation(page: Page, linkLabel: string, expectedPath: RegExp): Promise<void> {
    const homePage = await this.accessHome(page);
    await homePage.openDocumentation(linkLabel);
    await expect(page).toHaveURL(expectedPath);
  },
};
