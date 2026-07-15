export const ICON_SIZES = [
  "xl",
  "lg",
  "md",
  "sm",
] as const;

export type IconSizesToken = typeof ICON_SIZES[number];