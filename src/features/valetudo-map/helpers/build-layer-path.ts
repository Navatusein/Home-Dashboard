export function buildLayerPath(compressedPixels: number[]): string {
  let path = "";

  for (let i = 0; i < compressedPixels.length; i += 3) {
    const [x, y, count] = compressedPixels.slice(i, i + 3);

    path += `M${x} ${y}h${count}v1h-${count}z`;
  }

  return path;
}
