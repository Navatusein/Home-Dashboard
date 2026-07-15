export const BREAKPOINTS = [
  "xl",
  "lg",
  "md",
  "sm",
  "xs",
  "xxs"
] as const;

export const BREAKPOINTS_WIDTH = {
  xl: 1440,
  lg: 1280,
  md: 1024,
  sm: 768,
  xs: 425,
  xxs: 375,
}

export type BreakpointTypeHelper<T> = {
  xl?: T;
  lg?: T;
  md?: T;
  sm?: T;
  xs?: T;
  xxs?: T;
}

export type BreakpointToken = typeof BREAKPOINTS[number];