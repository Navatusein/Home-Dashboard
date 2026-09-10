import {ColorToken} from "@/shared/constants/colors";
import {mdiFan, mdiFire, mdiPower, mdiSnowflake, mdiThermostatAuto, mdiWaterPercent} from "@mdi/js";

export type ClimateMode = {
  title: string;
  icon: string;
  color?: ColorToken;
}

export const CLIMATE_MODES: Record<string, ClimateMode> = {
  "off": {title: "Off", icon: mdiPower},
  "fan_only": {title: "Fan", icon: mdiFan, color: "green"},
  "dry": {title: "Dry", icon: mdiWaterPercent, color: "teal"},
  "cool": {title: "Cool", icon: mdiSnowflake, color: "blue"},
  "heat": {title: "Heat", icon: mdiFire, color: "red"},
  "auto": {title: "Auto", icon: mdiThermostatAuto, color: "yellow"},
}