import { test, expect } from "@playwright/test";
import {
  getTokenCount,
  getTokensFromStorage,
  getBackgroundFromStorage,
  clearStorage,
} from "./helpers/localStorage";

test.beforeEach(async ({ page }) => {
  await page.goto("/?session=test");
  await clearStorage(page);
  await page.reload();
});

test.describe("Persistence", () => {
  test("Tokens survive reload", async ({ page }) => {
    const addGoblin = page
      .locator(".token-item")
      .filter({ hasText: "Goblin" })
      .getByRole("button", { name: "+" });

    await addGoblin.click();
    await addGoblin.click();

    await expect
      .poll(() => getTokenCount(page))
      .toBe(2);

    await page.reload();

    expect(await getTokenCount(page)).toBe(2);

    const tokens = await getTokensFromStorage(page);
    const tokenList = Object.values(tokens);
    expect(tokenList[0].name).toBe("Goblin");
    expect(tokenList[1].name).toBe("Goblin");
  });

  test("Map survives reload", async ({ page }) => {
    await page.locator(".Dropdown-control").click();
    await page.locator(".Dropdown-option").filter({ hasText: "Forest" }).click();

    await expect
      .poll(() => getBackgroundFromStorage(page))
      .toBe("/assets/default/maps/forest.jpg");

    await page.reload();

    expect(await getBackgroundFromStorage(page)).toBe(
      "/assets/default/maps/forest.jpg"
    );
  });

  test("Cleared state survives reload", async ({ page }) => {
    const addGoblin = page
      .locator(".token-item")
      .filter({ hasText: "Goblin" })
      .getByRole("button", { name: "+" });

    await addGoblin.click();
    await addGoblin.click();

    await expect
      .poll(() => getTokenCount(page))
      .toBe(2);

    await page.getByRole("button", { name: "Clear Tokens" }).click();

    await expect
      .poll(() => getTokenCount(page))
      .toBe(0);

    await page.reload();

    expect(await getTokenCount(page)).toBe(0);
  });
});
