import { test, expect } from "@playwright/test";
import { clearStorage } from "./helpers/localStorage";
import { getKonvaLayerCount } from "./helpers/canvas";

test.beforeEach(async ({ page }) => {
  await page.goto("/?session=test");
  await clearStorage(page);
  await page.reload();
});

test.describe("Grid Toggle", () => {
  test("Grid visible by default (3 layers)", async ({ page }) => {
    const checkbox = page.getByRole("checkbox");
    await expect(checkbox).toBeChecked();

    await expect
      .poll(() => getKonvaLayerCount(page))
      .toBe(3);
  });

  test("Uncheck hides grid (2 layers)", async ({ page }) => {
    await page.getByRole("checkbox").click();

    await expect
      .poll(() => getKonvaLayerCount(page))
      .toBe(2);
  });

  test("Re-check restores grid (3 layers)", async ({ page }) => {
    const checkbox = page.getByRole("checkbox");

    await checkbox.click();
    await expect
      .poll(() => getKonvaLayerCount(page))
      .toBe(2);

    await checkbox.click();
    await expect
      .poll(() => getKonvaLayerCount(page))
      .toBe(3);
  });
});
