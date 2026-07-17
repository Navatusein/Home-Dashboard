export const TERMINAL_PATH_PREFIX = "/terminal";

export const TERMINAL_MAIN_PAGE = "main"

export const buildPath = (path: string = TERMINAL_MAIN_PAGE) => {
  return `${TERMINAL_PATH_PREFIX}/${path}`;
}

export const TERMINAL_QUERY_PARAM = "from-terminal";

export const buildHaPath = (fromTerminal: boolean = false) => {
  return fromTerminal ? `/home-assistant/home?${TERMINAL_QUERY_PARAM}` : "/home-assistant/home";
}