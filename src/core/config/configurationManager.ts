import { readFileSync } from 'node:fs';
import { join } from 'node:path';

type ConfigTree = {
  Environments?: Record<string, { BaseUrl?: string }>;
};

function merge(base: ConfigTree, overlay: ConfigTree): ConfigTree {
  return {
    ...base,
    ...overlay,
    Environments: { ...base.Environments, ...overlay.Environments },
  };
}

class ConfigurationManager {
  private readonly settings: ConfigTree;

  constructor() {
    const environment = process.env.TEST_ENV ?? 'Dev';
    const configDir = join(process.cwd(), 'config');
    const read = (file: string): ConfigTree => JSON.parse(readFileSync(join(configDir, file), 'utf8'));

    this.settings = merge(read('appsettings.json'), read(`appsettings.${environment}.json`));
  }

  getBaseUrl(application: string, environmentVariable = 'WEB_BASE_URL'): string {
    const configuredUrl = this.settings.Environments?.[application]?.BaseUrl;
    const url = process.env[environmentVariable] ?? configuredUrl;

    if (!url) throw new Error(`BaseUrl não configurada para ${application}.`);
    return url;
  }
}

export const config = new ConfigurationManager();
