export const TERMINAL_PATH_PREFIX = "/terminal";

export const TERMINAL_MAIN_PAGE = "main"

export const buildPath = (path: string = TERMINAL_MAIN_PAGE) => {
  return `${TERMINAL_PATH_PREFIX}/${path}`;
}