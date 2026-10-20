import {Card, Flex, RoundedIcon, Typography} from "@/shared/ui-kit";
import {mdiCalendarWeek} from "@mdi/js";
import {WeatherForecast} from "@/shared/types/weather";
import WeatherDailyRow from "../weather-daily-row/weather-daily-row";

type Props = {
  forecast: WeatherForecast[],
}

export default function WeatherDailyCard(props: Props) {
  return (
    <Card padding="sm">
      <Flex vertical gap="xs">
        <Flex align="center" gap="xs">
          <RoundedIcon path={mdiCalendarWeek} iconColor="purple"/>
          <Typography.Text bold>
            Daily
          </Typography.Text>
        </Flex>
        {props.forecast.map((day, index) => (
          <WeatherDailyRow
            key={day.datetime}
            day={day}
            title={index == 0 ? "Today" : new Date(day.datetime).toLocaleDateString("en-US", {weekday: "long"})}
          />
        ))}
      </Flex>
    </Card>
  )
}
