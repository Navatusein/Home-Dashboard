import {Card, Flex, Typography} from "@/shared/ui-kit";
import {TimeRange} from "@/shared/hooks/use-calendar-events";
import {clipRanges} from "@/shared/helpers/time-ranges";
import {OutageSegment} from "../../types/types";
import OutageBar from "../outage-bar/outage-bar";
import OutageRow from "../outage-row/outage-row";

type Props = {
  dayStart: number;
  dayEnd: number;
  outages: TimeRange[];
  probable: TimeRange[];
  schedule?: TimeRange[];
  now: number;
  pending?: boolean;
}

export default function OutageTimelineCard(props: Props) {
  const clip = (ranges: TimeRange[]) => clipRanges(ranges, props.dayStart, props.dayEnd);

  const segments: OutageSegment[] = [
    ...clip(props.probable).map((range): OutageSegment => ({kind: "probable", range})),
    ...clip(props.outages).map((range): OutageSegment => ({kind: "outage", range}))
  ].sort((a, b) => a.range[0] - b.range[0]);

  const schedule = props.schedule && clip(props.schedule);
  const scheduleFor = ([from, to]: TimeRange) => schedule?.find(([scheduleFrom, scheduleTo]) => scheduleFrom < to && scheduleTo > from);
  const hasScheduleRows = segments.some((segment) => scheduleFor(segment.range));

  return (
    <Card padding="sm">
      <Flex vertical gap="sm">
        <OutageBar
          dayStart={props.dayStart}
          dayEnd={props.dayEnd}
          segments={segments}
          schedule={schedule}
          now={props.now}
          pending={props.pending}
        />
        {props.pending || segments.length == 0 ? (
          <Typography.Text textColor="secondary">
            {props.pending ? "Schedule not published yet" : "No outages"}
          </Typography.Text>
        ) : (
          <Flex vertical gap={hasScheduleRows ? "sm" : "xs"}>
            {segments.map((segment) => (
              <OutageRow
                key={`${segment.kind}-${segment.range[0]}`}
                segment={segment}
                schedule={scheduleFor(segment.range)}
                dayEnd={props.dayEnd}
              />
            ))}
          </Flex>
        )}
      </Flex>
    </Card>
  )
}
