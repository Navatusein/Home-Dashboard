"use client";

import {useEffect, useState} from "react";
import {useHass} from "@hakit/core";

type CalendarEvent = {
  start: {dateTime?: string, date?: string};
  end: {dateTime?: string, date?: string};
  summary: string;
}

export type TimeRange = [number, number];

const parseTime = (time: CalendarEvent["start"]) => Date.parse(time.dateTime ?? `${time.date}T00:00`);

export function useCalendarEvents(entityId: `calendar.${string}`, start: number, end: number, refreshKey?: string) {
  const callApi = useHass((state) => state.helpers.callApi);
  const [events, setEvents] = useState<TimeRange[]>([]);

  useEffect(() => {
    const query = new URLSearchParams({
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString(),
    });

    callApi<CalendarEvent[]>(`/calendars/${entityId}?${query}`).then((response) => {
      if (response.status != "success")
        return;

      setEvents(response.data
        .map((event): TimeRange => [parseTime(event.start), parseTime(event.end)]));
    });
  }, [callApi, entityId, start, end, refreshKey]);

  return events;
}
