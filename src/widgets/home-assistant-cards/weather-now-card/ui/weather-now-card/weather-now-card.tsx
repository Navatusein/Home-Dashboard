import {Card, Flex, Icon, Typography} from "@/shared/ui-kit";
import {WeatherIcon} from "@/shared/constants/weather-icons";
import styles from "./weather-now-card.module.scss";

type Props = {
  icon: WeatherIcon,
  summary: string,
  temperature: number,
  feelsLike: number,
  high?: number,
  low?: number,
}

export default function WeatherNowCard(props: Props) {
  return (
    <Card padding="md">
      <Flex align="center" justify="space-between" gap="sm">
        <Flex vertical gap="xxs">
          <Typography.Text bold className={styles["temperature"]}>
            {Math.round(props.temperature)}°
          </Typography.Text>
          <Typography.Text bold>
            {props.summary}
          </Typography.Text>
          <Typography.Text fontSize="sm" textColor="secondary">
            ↑{Math.round(props.high ?? props.temperature)}° ↓{Math.round(props.low ?? props.temperature)}° · Feels like {Math.round(props.feelsLike)}°
          </Typography.Text>
        </Flex>
        <Icon path={props.icon.icon} color={props.icon.color} className={styles["icon"]}/>
      </Flex>
    </Card>
  )
}
