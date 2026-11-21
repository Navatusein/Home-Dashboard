export function waveformLevels(seed: string, count: number) {
  let hash = 0;

  for (const char of seed)
    hash = (hash * 31 + char.charCodeAt(0)) | 0;

  return Array.from({length: count}, (_, index) =>
    0.25 + 0.75 * Math.abs(Math.sin(index * 1.7 + hash) * Math.cos(index * 0.31 + hash * 0.5))
  );
}
