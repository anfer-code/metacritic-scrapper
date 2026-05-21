export const normalizeText = (value: string): string =>
  value.replace(/\s+/g, " ").trim();
