import {Flex, Grid, ModalPopUp, SegmentHeader} from "@/shared/ui-kit";
import {
  mdiEye,
  mdiGauge,
  mdiInformationOutline,
  mdiWaterPercent,
  mdiWaterThermometer,
  mdiWeatherSunnyAlert,
  mdiWeatherSunsetDown,
  mdiWeatherSunsetUp,
  mdiWeatherWindy
} from "@mdi/js";
import {useEntity, useWeather} from "@hakit/core";
import {QueryModalControl} from "@/features/query-modal-control";
import {StateCard} from "@/widgets/home-assistant-cards/state-card";
import {WeatherNowCard} from "@/widgets/home-assistant-cards/weather-now-card";
import {WeatherHourlyCard} from "@/widgets/home-assistant-cards/weather-hourly-card";
import {WeatherDailyCard} from "@/widgets/home-assistant-cards/weather-daily-card";
import {DEFAULT_WEATHER_ICON, WEATHER_ICONS} from "@/shared/constants/weather-icons";
import {WeatherForecast} from "@/shared/types/weather";
import {compassDirection} from "@/shared/helpers/compass-direction";
import {formatTime} from "@/shared/helpers/format-time";

const HOURLY_COUNT = 24;

export default function WeatherModal() {
  const weather = useEntity("weather.weather");
  const hourly = useWeather("weather.weather", {type: "hourly"});
  const daily = useWeather("weather.weather", {type: "daily"});
  const weatherIcon = useEntity("sensor.weather_icon");
  const weatherSummary = useEntity("sensor.weather_summary");
  const sun = useEntity("sun.sun");

  const icon = WEATHER_ICONS[weatherIcon.state] ?? DEFAULT_WEATHER_ICON;
  const attributes = weather.attributes;

  const hours = (hourly.forecast?.forecast ?? []) as WeatherForecast[];
  const days = (daily.forecast?.forecast ?? []) as WeatherForecast[];

  const sunrise = new Date(sun.attributes.next_rising);
  const sunset = new Date(sun.attributes.next_setting);

  return (
    <QueryModalControl modal="weather">
      <ModalPopUp.Header title="Weather" icon={icon.icon}/>
      <ModalPopUp.Content>
        <Flex vertical gap="sm">
          <WeatherNowCard
            icon={icon}
            summary={weatherSummary.state}
            temperature={attributes.temperature ?? 0}
            feelsLike={attributes.apparent_temperature ?? 0}
            high={days[0]?.temperature}
            low={days[0]?.templow}
          />
          <WeatherHourlyCard
            forecast={hours.slice(0, HOURLY_COUNT)}
            sunrise={sunrise}
            sunset={sunset}
          />
          <WeatherDailyCard forecast={days}/>
          <SegmentHeader icon={mdiInformationOutline} title="Details" iconColor="teal"/>
          <Grid columns={2} gap="xs">
            <StateCard
              title="UV Index"
              text={String(Math.round(days[0]?.uv_index ?? 0))}
              icon={mdiWeatherSunnyAlert}
            />
            <StateCard
              title="Humidity"
              text={`${attributes.humidity} %`}
              icon={mdiWaterPercent}
            />
            <StateCard
              title={`Wind, gusts ${Math.round(attributes.wind_gust_speed)}`}
              text={`${Math.round(attributes.wind_speed ?? 0)} ${attributes.wind_speed_unit} ${compassDirection(Number(attributes.wind_bearing))}`}
              icon={mdiWeatherWindy}
            />
            <StateCard
              title="Dew Point"
              text={`${Math.round(attributes.dew_point)} ${attributes.temperature_unit}`}
              icon={mdiWaterThermometer}
            />
            <StateCard
              title="Pressure"
              text={`${Math.round(attributes.pressure ?? 0)} ${attributes.pressure_unit}`}
              icon={mdiGauge}
            />
            <StateCard
              title="Visibility"
              text={`${Math.round(attributes.visibility ?? 0)} ${attributes.visibility_unit}`}
              icon={mdiEye}
            />
            <StateCard
              title="Sunrise"
              text={formatTime(sunrise)}
              icon={mdiWeatherSunsetUp}
            />
            <StateCard
              title="Sunset"
              text={formatTime(sunset)}
              icon={mdiWeatherSunsetDown}
            />
          </Grid>
        </Flex>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
