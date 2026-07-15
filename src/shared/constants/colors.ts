export const COLORS = [
  "purple",
  "yellow",
  "orange",
  "red",
  "green",
  "blue",
  "teal",
  "pink",
] as const;

export type ColorToken = typeof COLORS[number];
