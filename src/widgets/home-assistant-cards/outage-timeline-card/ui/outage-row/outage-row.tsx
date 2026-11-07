import {mdiBatteryArrowDown, mdiBatteryCharging, mdiFlashAlert, mdiFlashOff} from "@mdi/js";
import {Flex, RoundedIcon, Typography} from "@/shared/ui-kit";
import {Chips} from "@/shared/ui-kit/chips";
import {TimeRange} from "@/shared/hooks/use-calendar-events";
import {formatDuration} from "@/shared/helpers/format-duration";
import {formatTime} from "@/shared/helpers/format-time";
import {OutageSegment} from "../../types/types";

type Props = {
  segment: OutageSegment;
  schedule?: TimeRange;
  charged: number;
  spent: number;
  stacked?: boolean;
  dayEnd: number;
}

export default function OutageRow(props: Props) {
  const [from, to] = props.segment.range;
  const isProbable = props.segment.kind == "probable";

  const formatRange = ([rangeFrom, rangeTo]: TimeRange) =>
    `${formatTime(new Date(rangeFrom))} – ${rangeTo == props.dayEnd ? "24:00" : formatTime(new Date(rangeTo))}`;

  const time = (
    <Typography.Text bold>
      {formatRange(props.segment.range)}
    </Typography.Text>
  );

  const duration = (
    <Chips
      text={formatDuration((to - from) / 60_000)}
    />
  );

  const spent = props.spent > 0 && (
    <Chips
      text={`${props.spent}%`}
      icon={mdiBatteryArrowDown}
      iconColor="red"
    />
  );

  const charged = props.charged > 0 && (
    <Chips
      text={formatDuration(props.charged)}
      icon={mdiBatteryCharging}
      iconColor="green"
    />
  );

  const isStacked = props.schedule || props.stacked;

  return (
    <Flex align={isStacked ? "start" : "center"} gap="xs">
      <RoundedIcon
        path={isProbable ? mdiFlashAlert : mdiFlashOff}
        size="sm"
        color={isProbable ? "orange" : undefined}
        small
      />
      {isStacked ? (
        <Flex vertical gap="xxs">
          {time}
          <Flex gap="xxs" wrap>
            {duration}
            {props.schedule && (
              <Chips
                text={`Plan ${formatRange(props.schedule)}`}
              />
            )}
            {spent}
            {charged}
          </Flex>
        </Flex>
      ) : (
        <Flex align="center" gap="xs">
          {time}
          {duration}
          {spent}
          {charged}
        </Flex>
      )}
    </Flex>
  )
}
