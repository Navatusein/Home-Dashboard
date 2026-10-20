import {Card, Flex, RoundedIcon, Typography} from "@/shared/ui-kit";
import {mdiClockOutline} from "@mdi/js";
import {WeatherForecast} from "@/shared/types/weather";
import WeatherHourlyItem from "../weather-hourly-item/weather-hourly-item";
import styles from "./weather-hourly-card.module.scss";

type Props = {
  forecast: WeatherForecast[],
  sunrise: Date,
  sunset: Date,
}

export default function WeatherHourlyCard(props: Props) {
  return (
    <Card padding="sm">
      <Flex vertical gap="xs">
        <Flex align="center" gap="xs">
          <RoundedIcon path={mdiClockOutline} iconColor="blue"/>
          <Typography.Text bold>
            Hourly
          </Typography.Text>
        </Flex>
        <div className={styles["hours"]}>
          {props.forecast.map((hour) => (
            <WeatherHourlyItem
              key={hour.datetime}
              hour={hour}
              sunrise={props.sunrise}
              sunset={props.sunset}
            />
          ))}
        </div>
      </Flex>
    </Card>
  )
}
