const DEFAULT_BASE_URL = 'https://demoblaze.com';

// Builds the domain-specific path used to save and reuse the Playwright authentication state.
export function getAuthStatePath(baseUrl = process.env.BASE_URL ?? DEFAULT_BASE_URL): string {
  const domain = new URL(baseUrl).hostname.toLowerCase();
  const safeDomain = domain.replace(/[^a-z0-9.-]/g, '-');

  return `playwright/.auth/${safeDomain}.json`;
}