let context: CanvasRenderingContext2D | null | undefined;

export function measureTextWidth(text: string, font: string): number {
  context ??= document.createElement("canvas").getContext("2d");

  if (!context)
    return 0;

  context.font = font;

  return context.measureText(text).width;
}
