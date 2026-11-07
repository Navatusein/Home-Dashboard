import {Card, Flex, Typography} from "@/shared/ui-kit";
import {TimeRange} from "@/shared/hooks/use-calendar-events";
import {clipRanges} from "@/shared/helpers/time-ranges";
import {HistoryPoint} from "@/shared/hooks/use-history-states";
import {useBreakpoint} from "@/shared/hooks/use-breakpoint";
import {OutageSegment} from "../../types/types";
import OutageBar from "../outage-bar/outage-bar";
import OutageRow from "../outage-row/outage-row";

type Props = {
  dayStart: number;
  dayEnd: number;
  outages: TimeRange[];
  probable: TimeRange[];
  schedule?: TimeRange[];
  charging?: TimeRange[];
  batteryCharge?: HistoryPoint[];
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
  const isMobile = useBreakpoint("sm");
  const hasScheduleRows = segments.some((segment) => scheduleFor(segment.range));
  const charging = props.charging && clip(props.charging);

  const chargedAfter = (index: number) => {
    const from = segments[index].range[1];
    const to = segments.slice(index + 1).find((segment) => segment.kind == "outage")?.range[0] ?? props.dayEnd;

    return clipRanges(charging ?? [], from, to).reduce((sum, [rangeFrom, rangeTo]) => sum + (rangeTo - rangeFrom) / 60_000, 0);
  };

  const chargeAt = (time: number) => props.batteryCharge?.findLast(([pointTime]) => pointTime <= time)?.[1];

  const spentDuring = ([from, to]: TimeRange) => {
    const start = chargeAt(from);
    const end = chargeAt(Math.min(to, props.now));

    return from <= props.now && start != null && end != null ? Math.round(start - end) : 0;
  };

  return (
    <Card padding="sm">
      <Flex vertical gap="sm">
        <OutageBar
          dayStart={props.dayStart}
          dayEnd={props.dayEnd}
          segments={segments}
          schedule={schedule}
          charging={charging}
          now={props.now}
          pending={props.pending}
        />
        {props.pending || segments.length == 0 ? (
          <Typography.Text textColor="secondary">
            {props.pending ? "Schedule not published yet" : "No outages"}
          </Typography.Text>
        ) : (
          <Flex vertical gap={hasScheduleRows || isMobile ? "sm" : "xs"}>
            {segments.map((segment, index) => (
              <OutageRow
                key={`${segment.kind}-${segment.range[0]}`}
                segment={segment}
                schedule={scheduleFor(segment.range)}
                charged={segment.kind == "outage" ? chargedAfter(index) : 0}
                spent={segment.kind == "outage" ? spentDuring(segment.range) : 0}
                stacked={isMobile}
                dayEnd={props.dayEnd}
              />
            ))}
          </Flex>
        )}
      </Flex>
    </Card>
  )
}
