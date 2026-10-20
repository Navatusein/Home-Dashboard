import {Icon, Typography} from "@/shared/ui-kit";
import {DEFAULT_WEATHER_ICON} from "@/shared/constants/weather-icons";
import {WEATHER_CONDITIONS} from "@/shared/constants/weather-conditions";
import {WeatherForecast} from "@/shared/types/weather";
import styles from "./weather-daily-row.module.scss";

type Props = {
  day: WeatherForecast,
  title: string,
}

export default function WeatherDailyRow(props: Props) {
  const icon = WEATHER_CONDITIONS[props.day.condition ?? ""] ?? DEFAULT_WEATHER_ICON;

  return (
    <div className={styles["row"]}>
      <Typography.Text>
        {props.title}
      </Typography.Text>
      <Typography.Text fontSize="sm" className={styles["precipitation"]}>
        {Math.round(props.day.precipitation_probability ?? 0)}%
      </Typography.Text>
      <Icon path={icon.icon} color={icon.color}/>
      <Typography.Text bold className={styles["temperature"]}>
        {Math.round(props.day.temperature)}°
      </Typography.Text>
      <Typography.Text textColor="secondary" className={styles["temperature"]}>
        {Math.round(props.day.templow ?? props.day.temperature)}°
      </Typography.Text>
    </div>
  )
}
