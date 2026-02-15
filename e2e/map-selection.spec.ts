import { test, expect } from "@playwright/test";
import {
  getBackgroundFromStorage,
  clearStorage,
} from "./helpers/localStorage";

test.beforeEach(async ({ page }) => {
  await page.goto("/?session=test");
  await clearStorage(page);
  await page.reload();
});

test.describe("Map Selection", () => {
  test("Default map is tavern", async ({ page }) => {
    const bg = await getBackgroundFromStorage(page);
    expect(bg).toBe("/assets/default/maps/tavern.jpg");
  });

  test("Change to Forest map", async ({ page }) => {
    await page.locator(".Dropdown-control").click();
    await page.locator(".Dropdown-option").filter({ hasText: "Forest" }).click();

    await expect
      .poll(() => getBackgroundFromStorage(page))
      .toBe("/assets/default/maps/forest.jpg");
  });

  test("Switch back to Tavern", async ({ page }) => {
    // Select Forest first
    await page.locator(".Dropdown-control").click();
    await page.locator(".Dropdown-option").filter({ hasText: "Forest" }).click();

    await expect
      .poll(() => getBackgroundFromStorage(page))
      .toBe("/assets/default/maps/forest.jpg");

    // Switch back to Tavern
    await page.locator(".Dropdown-control").click();
    await page.locator(".Dropdown-option").filter({ hasText: "Tavern" }).click();

    await expect
      .poll(() => getBackgroundFromStorage(page))
      .toBe("/assets/default/maps/tavern.jpg");
  });
});
