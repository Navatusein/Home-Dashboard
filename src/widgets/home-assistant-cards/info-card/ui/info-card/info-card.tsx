import {Card, Typography} from "@/shared/ui-kit";
import {useEffect, useState} from "react";

export default function InfoCard() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card outline padding={0}>
      <Typography.Paragraph>
        It&#39;s {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}, the weather is clear with 12°C.
        Right now there are 23 lights on and 2 windows open.
        The security system is set to Armed.
        The flat door is close.
      </Typography.Paragraph>
    </Card>
  )
}
