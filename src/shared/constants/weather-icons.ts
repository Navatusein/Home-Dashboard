import {
  mdiWeatherCloudy,
  mdiWeatherFog,
  mdiWeatherHail,
  mdiWeatherLightning,
  mdiWeatherNight,
  mdiWeatherNightPartlyCloudy,
  mdiWeatherPartlyCloudy,
  mdiWeatherRainy,
  mdiWeatherSnowy,
  mdiWeatherSnowyRainy,
  mdiWeatherSunny,
  mdiWeatherWindy
} from "@mdi/js";
import {ColorToken} from "@/shared/constants/colors";

export type WeatherIcon = {
  icon: string;
  color: ColorToken | "secondary";
}

export const DEFAULT_WEATHER_ICON: WeatherIcon = {icon: mdiWeatherCloudy, color: "secondary"};

export const WEATHER_ICONS: Record<string, WeatherIcon> = {
  "clear-day": {icon: mdiWeatherSunny, color: "yellow"},
  "clear-night": {icon: mdiWeatherNight, color: "purple"},
  "rain": {icon: mdiWeatherRainy, color: "blue"},
  "snow": {icon: mdiWeatherSnowy, color: "blue"},
  "sleet": {icon: mdiWeatherSnowyRainy, color: "blue"},
  "hail": {icon: mdiWeatherHail, color: "blue"},
  "thunderstorm": {icon: mdiWeatherLightning, color: "orange"},
  "wind": {icon: mdiWeatherWindy, color: "teal"},
  "fog": {icon: mdiWeatherFog, color: "secondary"},
  "cloudy": {icon: mdiWeatherCloudy, color: "secondary"},
  "partly-cloudy-day": {icon: mdiWeatherPartlyCloudy, color: "yellow"},
  "partly-cloudy-night": {icon: mdiWeatherNightPartlyCloudy, color: "purple"},
}
