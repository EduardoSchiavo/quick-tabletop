import { test, expect } from "@playwright/test";
import { getTokenCount, getKonvaTokens } from "./helpers/gameState";
import { doubleClickOnCanvas } from "./helpers/canvas";

test.beforeEach(async ({ page }) => {
  const resp = await page.request.post("http://localhost:3000/session");
  const { sessionId } = await resp.json();
  await page.goto(`/?session=${sessionId}`);
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

    const tokens = await getKonvaTokens(page);
    expect(tokens[0].name).toBe("Goblin");
    expect(tokens[0].x).toBe(96);
    expect(tokens[0].y).toBe(96);
  });

  test("Add multiple tokens with staggered positions", async ({ page }) => {
    const addGoblin = page
      .locator(".token-item")
      .filter({ hasText: "Goblin" })
      .getByRole("button", { name: "+" });

    await addGoblin.click();
    await expect.poll(() => getTokenCount(page)).toBe(1);
    await addGoblin.click();
    await expect.poll(() => getTokenCount(page)).toBe(2);
    await addGoblin.click();
    await expect.poll(() => getTokenCount(page)).toBe(3);

    const tokens = (await getKonvaTokens(page)).sort((a, b) => a.x - b.x || a.y - b.y);

    expect(tokens[0].x).toBe(96);
    expect(tokens[0].y).toBe(96);

    expect(tokens[1].x).toBe(192);
    expect(tokens[1].y).toBe(192);

    expect(tokens[2].x).toBe(288);
    expect(tokens[2].y).toBe(96);
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
    await expect.poll(() => getTokenCount(page)).toBe(1);
    await addGoblin.click();
    await expect.poll(() => getTokenCount(page)).toBe(2);
    await addGoblin.click();
    await expect.poll(() => getTokenCount(page)).toBe(3);

    await page.getByRole("button", { name: "Clear Tokens" }).click();

    await expect
      .poll(() => getTokenCount(page))
      .toBe(0);
  });
});
