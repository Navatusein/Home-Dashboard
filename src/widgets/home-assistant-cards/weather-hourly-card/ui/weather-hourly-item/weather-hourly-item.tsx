import {Flex, Icon, Typography} from "@/shared/ui-kit";
import {DEFAULT_WEATHER_ICON} from "@/shared/constants/weather-icons";
import {NIGHT_WEATHER_CONDITIONS, WEATHER_CONDITIONS} from "@/shared/constants/weather-conditions";
import {WeatherForecast} from "@/shared/types/weather";
import {formatTime} from "@/shared/helpers/format-time";
import {isNight} from "../../helpers/is-night";
import styles from "./weather-hourly-item.module.scss";

type Props = {
  hour: WeatherForecast,
  sunrise: Date,
  sunset: Date,
}

export default function WeatherHourlyItem(props: Props) {
  const date = new Date(props.hour.datetime);
  const condition = props.hour.condition ?? "";

  const icon = (isNight(date, props.sunrise, props.sunset) && NIGHT_WEATHER_CONDITIONS[condition])
    || WEATHER_CONDITIONS[condition]
    || DEFAULT_WEATHER_ICON;

  return (
    <Flex vertical align="center" gap="xxs" className={styles["hour"]}>
      <Typography.Text fontSize="sm" textColor="secondary">
        {formatTime(date)}
      </Typography.Text>
      <Icon path={icon.icon} color={icon.color}/>
      <Typography.Text bold>
        {Math.round(props.hour.temperature)}°
      </Typography.Text>
      <Typography.Text fontSize="xs" className={styles["precipitation"]}>
        {Math.round(props.hour.precipitation_probability ?? 0)}%
      </Typography.Text>
    </Flex>
  )
}
