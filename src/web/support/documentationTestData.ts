export interface DocumentationLink {
  label: string;
  expectedPath: RegExp;
}

export const documentationLinks: DocumentationLink[] = [
  { label: 'Get started', expectedPath: /\/docs\/intro/ },
];

