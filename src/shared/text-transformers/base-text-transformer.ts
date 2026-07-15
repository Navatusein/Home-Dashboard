export type TextTransformer = (text: string) => string;

export function baseTextTransformer(text: string): string {
  return text
}