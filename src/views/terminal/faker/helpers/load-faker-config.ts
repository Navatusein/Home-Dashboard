import {readFile} from "fs/promises";
import {FakerConfig} from "../types/types";

export default async function loadFakerConfig() {
  const path = process.env.FAKER_CONFIG_PATH;

  if (!path)
    return null;

  try {
    return JSON.parse(await readFile(path, "utf8")) as FakerConfig;
  }
  catch (error) {
    console.error(`Failed to load faker config from ${path}`, error);
    return null;
  }
}
