import { test, expect } from "@playwright/test";
import { getBackgroundImageSrc } from "./helpers/gameState";

test.beforeEach(async ({ page }) => {
  const resp = await page.request.post("http://localhost:3000/session");
  const { sessionId } = await resp.json();
  await page.goto(`/?session=${sessionId}`);
});

test.describe("Map Selection", () => {
  test("Default map is tavern", async ({ page }) => {
    await expect
      .poll(() => getBackgroundImageSrc(page))
      .toContain("tavern.jpg");
  });

  test("Change to Forest map", async ({ page }) => {
    await page.locator(".Dropdown-control").click();
    await page.locator(".Dropdown-option").filter({ hasText: "Forest" }).click();

    await expect
      .poll(() => getBackgroundImageSrc(page))
      .toContain("forest.jpg");
  });

  test("Switch back to Tavern", async ({ page }) => {
    await page.locator(".Dropdown-control").click();
    await page.locator(".Dropdown-option").filter({ hasText: "Forest" }).click();

    await expect
      .poll(() => getBackgroundImageSrc(page))
      .toContain("forest.jpg");

    await page.locator(".Dropdown-control").click();
    await page.locator(".Dropdown-option").filter({ hasText: "Tavern" }).click();

    await expect
      .poll(() => getBackgroundImageSrc(page))
      .toContain("tavern.jpg");
  });
});
