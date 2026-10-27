import {Flex, Typography} from "@/shared/ui-kit";
import {TimeRange} from "@/shared/hooks/use-calendar-events";
import {OutageSegment} from "../../types/types";
import styles from "./outage-bar.module.scss";

const TICKS = ["00:00", "06:00", "12:00", "18:00", "24:00"];

const COLORS = {
  power: "var(--color-yellow-tint)",
  outage: "var(--color-primary)",
  probable: "var(--color-orange-tint)",
};

type Props = {
  dayStart: number;
  dayEnd: number;
  segments: OutageSegment[];
  schedule?: TimeRange[];
  now: number;
  pending?: boolean;
}

export default function OutageBar(props: Props) {
  const percent = (time: number) => (time - props.dayStart) / (props.dayEnd - props.dayStart) * 100;

  const stops = props.segments.flatMap(({kind, range: [from, to]}, index) => [
    `${COLORS.power} ${index == 0 ? 0 : percent(props.segments[index - 1].range[1])}% ${percent(from)}%`,
    `${COLORS[kind]} ${percent(from)}% ${percent(to)}%`
  ]);
  const lastEnd = props.segments.length > 0 ? percent(props.segments[props.segments.length - 1].range[1]) : 0;
  const gradient = `linear-gradient(to right, ${[...stops, `${COLORS.power} ${lastEnd}% 100%`].join(", ")})`;

  return (
    <Flex vertical gap="xxs">
      <div className={styles["bar"]} style={{background: props.pending ? COLORS.outage : gradient}}>
        {props.now >= props.dayStart && props.now < props.dayEnd && (
          <div className={styles["now"]} style={{left: `${percent(props.now)}%`}}/>
        )}
      </div>
      {props.schedule && (
        <div className={styles["schedule"]}>
          {props.schedule.map(([from, to]) => (
            <div
              key={from}
              className={styles["schedule-mark"]}
              style={{left: `${percent(from)}%`, right: `${100 - percent(to)}%`}}
            />
          ))}
        </div>
      )}
      <Flex justify="space-between">
        {TICKS.map((tick) => (
          <Typography.Text key={tick} fontSize="xs" textColor="secondary">
            {tick}
          </Typography.Text>
        ))}
      </Flex>
    </Flex>
  )
}
