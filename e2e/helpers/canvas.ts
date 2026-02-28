import { Page } from "@playwright/test";

export async function getKonvaLayerCount(page: Page): Promise<number> {
  return page.evaluate(() => {
    const stage = (window as any).Konva?.stages?.[0];
    return stage ? stage.getLayers().length : 0;
  });
}

export async function getKonvaTokenCount(page: Page): Promise<number> {
  return page.evaluate(() => {
    const stage = (window as any).Konva?.stages?.[0];
    if (!stage) return 0;
    const layers = stage.getLayers();
    const tokenLayer = layers.find((l: any) => l.name() === "tokens");
    return tokenLayer ? tokenLayer.getChildren().length : 0;
  });
}

export async function getCanvasOffset(
  page: Page
): Promise<{ x: number; y: number }> {
  const canvas = page.locator("canvas").first();
  const box = await canvas.boundingBox();
  return { x: box?.x ?? 0, y: box?.y ?? 0 };
}

export async function doubleClickOnCanvas(
  page: Page,
  canvasX: number,
  canvasY: number
): Promise<void> {
  const offset = await getCanvasOffset(page);
  await page.mouse.dblclick(offset.x + canvasX, offset.y + canvasY);
}
