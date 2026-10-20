import {
  mdiWeatherCloudy,
  mdiWeatherFog,
  mdiWeatherHail,
  mdiWeatherLightning,
  mdiWeatherLightningRainy,
  mdiWeatherNight,
  mdiWeatherNightPartlyCloudy,
  mdiWeatherPartlyCloudy,
  mdiWeatherPouring,
  mdiWeatherRainy,
  mdiWeatherSnowy,
  mdiWeatherSnowyRainy,
  mdiWeatherSunny,
  mdiWeatherWindy,
  mdiWeatherWindyVariant
} from "@mdi/js";
import {WeatherIcon} from "@/shared/constants/weather-icons";

export const WEATHER_CONDITIONS: Record<string, WeatherIcon> = {
  "sunny": {icon: mdiWeatherSunny, color: "yellow"},
  "clear-night": {icon: mdiWeatherNight, color: "purple"},
  "partlycloudy": {icon: mdiWeatherPartlyCloudy, color: "yellow"},
  "cloudy": {icon: mdiWeatherCloudy, color: "secondary"},
  "fog": {icon: mdiWeatherFog, color: "secondary"},
  "rainy": {icon: mdiWeatherRainy, color: "blue"},
  "pouring": {icon: mdiWeatherPouring, color: "blue"},
  "snowy": {icon: mdiWeatherSnowy, color: "blue"},
  "snowy-rainy": {icon: mdiWeatherSnowyRainy, color: "blue"},
  "hail": {icon: mdiWeatherHail, color: "blue"},
  "lightning": {icon: mdiWeatherLightning, color: "orange"},
  "lightning-rainy": {icon: mdiWeatherLightningRainy, color: "orange"},
  "windy": {icon: mdiWeatherWindy, color: "teal"},
  "windy-variant": {icon: mdiWeatherWindyVariant, color: "teal"},
}

export const NIGHT_WEATHER_CONDITIONS: Record<string, WeatherIcon> = {
  "sunny": {icon: mdiWeatherNight, color: "purple"},
  "partlycloudy": {icon: mdiWeatherNightPartlyCloudy, color: "purple"},
}
