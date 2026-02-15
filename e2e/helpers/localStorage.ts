import { Page } from "@playwright/test";

interface TokenData {
  name: string;
  imgPath: string;
  x: number;
  y: number;
  tokenSize: number;
}

export async function getTokensFromStorage(
  page: Page
): Promise<Record<string, TokenData>> {
  const raw = await page.evaluate(() =>
    localStorage.getItem("displayedTokens")
  );
  return raw ? JSON.parse(raw) : {};
}

export async function getTokenCount(page: Page): Promise<number> {
  const tokens = await getTokensFromStorage(page);
  return Object.keys(tokens).length;
}

export async function getBackgroundFromStorage(
  page: Page
): Promise<string | null> {
  return page.evaluate(() => localStorage.getItem("backgroundImgPath"));
}

export async function clearStorage(page: Page): Promise<void> {
  await page.evaluate(() => localStorage.clear());
}
