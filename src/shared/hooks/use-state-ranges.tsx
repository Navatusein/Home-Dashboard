"use client";

import {useEffect, useState} from "react";
import {useHass} from "@hakit/core";
import {TimeRange} from "@/shared/hooks/use-calendar-events";

type HistoryState = {
  s: string;
  lc?: number;
  lu: number;
}

export function useStateRanges(entityId: `${string}.${string}`, state: string, start: number, end: number) {
  const connection = useHass((store) => store.connection);
  const [ranges, setRanges] = useState<TimeRange[]>([]);

  useEffect(() => {
    if (!connection)
      return;

    connection.sendMessagePromise<Record<string, HistoryState[]>>({
      type: "history/history_during_period",
      start_time: new Date(start).toISOString(),
      end_time: new Date(end).toISOString(),
      entity_ids: [entityId],
      minimal_response: true,
      no_attributes: true,
    }).then((response) => {
      const result: TimeRange[] = [];
      let from: number | null = null;

      for (const item of response[entityId] ?? []) {
        const time = Math.max((item.lc ?? item.lu) * 1000, start);

        if (item.s == state && from == null)
          from = time;
        else if (item.s != state && from != null) {
          result.push([from, time]);
          from = null;
        }
      }

      if (from != null)
        result.push([from, Math.min(end, Date.now())]);

      setRanges(result);
    });
  }, [connection, entityId, state, start, end]);

  return ranges;
}
