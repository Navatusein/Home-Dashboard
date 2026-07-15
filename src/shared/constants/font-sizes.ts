export const FONT_SIZES = [
  "xxl",
  "xl",
  "lg",
  "md",
  "sm",
  "xs"
] as const;

export type FontSizeToken = typeof FONT_SIZES[number];