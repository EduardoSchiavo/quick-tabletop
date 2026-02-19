import { test, expect } from "@playwright/test";
import { getTokenCount, getKonvaTokens, getBackgroundImageSrc } from "./helpers/gameState";

let sessionId: string;

test.beforeEach(async ({ page }) => {
  const resp = await page.request.post("http://localhost:3000/session");
  const body = await resp.json();
  sessionId = body.sessionId;
  await page.goto(`/?session=${sessionId}`);
});

test.describe("Persistence", () => {
  test("Tokens survive reload", async ({ page }) => {
    const addGoblin = page
      .locator(".token-item")
      .filter({ hasText: "Goblin" })
      .getByRole("button", { name: "+" });

    await addGoblin.click();
    await expect.poll(() => getTokenCount(page)).toBe(1);
    await addGoblin.click();
    await expect.poll(() => getTokenCount(page)).toBe(2);

    await page.reload();

    await expect.poll(() => getTokenCount(page)).toBe(2);

    const tokens = await getKonvaTokens(page);
    expect(tokens[0].name).toBe("Goblin");
    expect(tokens[1].name).toBe("Goblin");
  });

  test("Map survives reload", async ({ page }) => {
    await page.locator(".Dropdown-control").click();
    await page.locator(".Dropdown-option").filter({ hasText: "Forest" }).click();

    await expect
      .poll(() => getBackgroundImageSrc(page))
      .toContain("forest.jpg");

    await page.reload();

    await expect
      .poll(() => getBackgroundImageSrc(page))
      .toContain("forest.jpg");
  });

  test("Cleared state survives reload", async ({ page }) => {
    const addGoblin = page
      .locator(".token-item")
      .filter({ hasText: "Goblin" })
      .getByRole("button", { name: "+" });

    await addGoblin.click();
    await expect.poll(() => getTokenCount(page)).toBe(1);
    await addGoblin.click();
    await expect.poll(() => getTokenCount(page)).toBe(2);

    await page.getByRole("button", { name: "Clear Tokens" }).click();

    await expect
      .poll(() => getTokenCount(page))
      .toBe(0);

    await page.reload();

    await expect.poll(() => getTokenCount(page)).toBe(0);
  });
});
