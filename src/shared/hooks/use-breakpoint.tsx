"use client"; // Must be a Client Component

import {useMediaQuery} from "react-responsive";
import {BREAKPOINTS_WIDTH, BreakpointToken} from "@/shared/constants/breakpoints";

export function useBreakpoint(breakpoint: BreakpointToken, above: boolean = false) {
  return useMediaQuery({
    query: `(${above ? "mix-width" : "max-width"}: ${BREAKPOINTS_WIDTH[breakpoint]}px)`
  });
}