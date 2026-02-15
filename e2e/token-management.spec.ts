import { test, expect } from "@playwright/test";
import {
  getTokenCount,
  getTokensFromStorage,
  clearStorage,
} from "./helpers/localStorage";
import { doubleClickOnCanvas } from "./helpers/canvas";

test.beforeEach(async ({ page }) => {
  await page.goto("/?session=test");
  await clearStorage(page);
  await page.reload();
});

test.describe("Token Management", () => {
  test("Add a token", async ({ page }) => {
    const addButton = page
      .locator(".token-item")
      .filter({ hasText: "Goblin" })
      .getByRole("button", { name: "+" });
    await addButton.click();

    await expect
      .poll(() => getTokenCount(page))
      .toBe(1);

    const tokens = await getTokensFromStorage(page);
    const token = Object.values(tokens)[0];
    expect(token.name).toBe("Goblin");
    expect(token.x).toBe(96);
    expect(token.y).toBe(96);
  });

  test("Add multiple tokens with staggered positions", async ({ page }) => {
    const addGoblin = page
      .locator(".token-item")
      .filter({ hasText: "Goblin" })
      .getByRole("button", { name: "+" });

    await addGoblin.click();
    await addGoblin.click();
    await addGoblin.click();

    await expect
      .poll(() => getTokenCount(page))
      .toBe(3);

    const tokens = await getTokensFromStorage(page);
    const tokenList = Object.values(tokens);

    // Token 0: count=0 → x = 96 + (0%3)*96 = 96,  y = 96 + (0%2)*96 = 96
    expect(tokenList[0].x).toBe(96);
    expect(tokenList[0].y).toBe(96);

    // Token 1: count=1 → x = 96 + (1%3)*96 = 192, y = 96 + (1%2)*96 = 192
    expect(tokenList[1].x).toBe(192);
    expect(tokenList[1].y).toBe(192);

    // Token 2: count=2 → x = 96 + (2%3)*96 = 288, y = 96 + (2%2)*96 = 96
    expect(tokenList[2].x).toBe(288);
    expect(tokenList[2].y).toBe(96);
  });

  test("Delete a token via double-click", async ({ page }) => {
    const addGoblin = page
      .locator(".token-item")
      .filter({ hasText: "Goblin" })
      .getByRole("button", { name: "+" });
    await addGoblin.click();

    await expect
      .poll(() => getTokenCount(page))
      .toBe(1);

    // Token placed at (96, 96) with size 96, center is at (144, 144) on the canvas
    await doubleClickOnCanvas(page, 144, 144);

    await expect
      .poll(() => getTokenCount(page))
      .toBe(0);
  });

  test("Clear all tokens", async ({ page }) => {
    const addGoblin = page
      .locator(".token-item")
      .filter({ hasText: "Goblin" })
      .getByRole("button", { name: "+" });

    await addGoblin.click();
    await addGoblin.click();
    await addGoblin.click();

    await expect
      .poll(() => getTokenCount(page))
      .toBe(3);

    await page.getByRole("button", { name: "Clear Tokens" }).click();

    await expect
      .poll(() => getTokenCount(page))
      .toBe(0);
  });
});
