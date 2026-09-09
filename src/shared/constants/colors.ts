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

export const THEME_COLORS = [
  "primary",
  "secondary",
] as const;

export const ALL_COLORS = [
  ...COLORS,
  ...THEME_COLORS,
] as const;

export type ColorToken = typeof COLORS[number];
export type ThemeColorToken = typeof THEME_COLORS[number];
export type AllColorToken = typeof ALL_COLORS[number];