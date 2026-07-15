export const PADDINGS = [
  "md",
  "sm",
  "xs",
  "xxs",
] as const;

export type PaddingToken = typeof PADDINGS[number];
