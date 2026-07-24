declare namespace NodeJS {
  interface ProcessEnv {
    HOME_ASSISTANT_URL: string;

    DEV_DISABLE_HOME_ASSISTANT: boolean;
    DEV_ALLOWED_ORIGINS: boolean;
    DEV_INDEX_PAGE: boolean;
  }
}