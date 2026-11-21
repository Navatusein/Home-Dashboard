export function musicAssistantImage(image: string | null | undefined, musicAssistantUrl: string | undefined) {
  if (!image || !musicAssistantUrl)
    return undefined;

  const url = new URL(image);
  url.searchParams.set("size", "256");

  return new URL(url.pathname + url.search, musicAssistantUrl).href;
}
