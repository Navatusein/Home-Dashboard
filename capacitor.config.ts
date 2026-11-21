import type {CapacitorConfig} from "@capacitor/cli";
import {existsSync} from "fs";

if (existsSync(".env"))
  process.loadEnvFile(".env");

const serverUrl = process.env.CAPACITOR_SERVER_URL;

if (!serverUrl)
  throw new Error("CAPACITOR_SERVER_URL is required");

const config: CapacitorConfig = {
  appId: "homedashboard.navatusein",
  appName: "Home Dashboard",
  webDir: "capacitor-www",
  server: {
    url: serverUrl,
    allowNavigation: process.env.CAPACITOR_ALLOW_NAVIGATION?.split(",") ?? [],
  },
};

export default config;
