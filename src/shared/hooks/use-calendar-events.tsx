"use client";

import {useEffect, useState} from "react";
import {useHass} from "@hakit/core";

type CalendarEvent = {
  start: {dateTime?: string, date?: string};
  end: {dateTime?: string, date?: string};
  summary: string;
}

export type TimeRange = [number, number];

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
        .filter((event) => event.start.dateTime && event.end.dateTime)
        .map((event): TimeRange => [Date.parse(event.start.dateTime!), Date.parse(event.end.dateTime!)]));
    });
  }, [callApi, entityId, start, end, refreshKey]);

  return events;
}
