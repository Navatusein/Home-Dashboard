export const GAPS = [
  "xl",
  "lg",
  "md",
  "sm",
  "xs",
  "xxs"
] as const;

export type GapToken = typeof GAPS[number];