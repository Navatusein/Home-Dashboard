import {TimeRange} from "@/shared/hooks/use-calendar-events";

export type OutageSegment = {
  kind: "outage" | "probable";
  range: TimeRange;
}
