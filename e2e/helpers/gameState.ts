import { Page } from "@playwright/test";

interface TokenData {
  name: string;
  imgPath: string;
  x: number;
  y: number;
  tokenSize: number;
}

export async function getKonvaTokens(
  page: Page
): Promise<TokenData[]> {
  return page.evaluate(() => {
    const stage = (window as any).Konva?.stages?.[0];
    if (!stage) return [];
    const layers = stage.getLayers();
    const tokenLayer = layers[layers.length - 1];
    if (!tokenLayer) return [];
    return tokenLayer.getChildren().map((node: any) => ({
      name: node.name?.() || "",
      imgPath: "",
      x: node.x(),
      y: node.y(),
      tokenSize: node.width(),
    }));
  });
}

export async function getTokenCount(page: Page): Promise<number> {
  return page.evaluate(() => {
    const stage = (window as any).Konva?.stages?.[0];
    if (!stage) return 0;
    const layers = stage.getLayers();
    const tokenLayer = layers[layers.length - 1];
    return tokenLayer ? tokenLayer.getChildren().length : 0;
  });
}

export async function getBackgroundImageSrc(
  page: Page
): Promise<string | null> {
  return page.evaluate(() => {
    const stage = (window as any).Konva?.stages?.[0];
    if (!stage) return null;
    const layers = stage.getLayers();
    const bgLayer = layers[0];
    if (!bgLayer) return null;
    const image = bgLayer.findOne("Image");
    if (!image) return null;
    const img = image.image();
    return img ? img.src : null;
  });
}
