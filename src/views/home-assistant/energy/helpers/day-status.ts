import {TimeRange} from "@/shared/hooks/use-calendar-events";

export const getDayStatus = (planned: TimeRange[], scheduled: TimeRange[], dayStart: number, dayEnd: number) => {
  const inDay = (ranges: TimeRange[]) => ranges.filter(([from, to]) => from < dayEnd && to > dayStart);

  if (inDay(planned).some(([from, to]) => from <= dayStart && to >= dayEnd))
    return "emergency_shutdowns";

  if (inDay(planned).length > 0)
    return "schedule_applies";

  return inDay(scheduled).length > 0 ? "waiting_for_schedule" : "no_outages";
};
