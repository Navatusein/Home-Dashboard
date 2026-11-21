import type {CapacitorConfig} from "@capacitor/cli";
import {existsSync} from "fs";

if (existsSync(".env"))
  process.loadEnvFile(".env");

const config: CapacitorConfig = {
  appId: "homedashboard.navatusein",
  appName: "Home Dashboard",
  webDir: "capacitor-www",
  plugins: {
    Dashboard: {
      dashboardUrl: process.env.CAPACITOR_DASHBOARD_URL,
      homeAssistantHost: process.env.CAPACITOR_HOME_ASSISTANT_HOST,
    },
  },
};

export default config;
