export function formatMode(mode: string) {
  const text = mode.replaceAll("_", " ");

  return text.charAt(0).toUpperCase() + text.slice(1);
}
