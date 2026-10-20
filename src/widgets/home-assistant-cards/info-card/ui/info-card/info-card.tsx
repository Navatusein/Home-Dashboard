import {Card, Typography} from "@/shared/ui-kit";
import {useEffect, useState} from "react";
import {useEntity} from "@hakit/core";
import {roundTextTransformer} from "@/shared/text-transformers/number-text-transformer";

export default function InfoCard() {
  const [time, setTime] = useState(new Date());

  const weatherSummary = useEntity("sensor.weather_summary");
  const weatherTemperature = useEntity("sensor.weather_temperature");
  const lightsOn = useEntity("sensor.lights_on_count");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card outline padding={0}>
      <Typography.Paragraph>
        It&#39;s {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}, {roundTextTransformer(weatherTemperature.state)}°C and {weatherSummary.state.toLowerCase()} outside.
        Right now there are {lightsOn.state} lights on and 2 windows open.
        The security system is set to Armed.
        The flat door is close.
      </Typography.Paragraph>
    </Card>
  )
}
