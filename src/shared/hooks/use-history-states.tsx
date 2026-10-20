"use client";

import {useEffect, useState} from "react";
import {useHass} from "@hakit/core";

type HistoryState = {
  s: string;
  lu: number;
}

export type HistoryPoint = [number, number];

export function useHistoryStates(entityIds: string[], hours: number) {
  const connection = useHass((state) => state.connection);
  const [history, setHistory] = useState<Record<string, HistoryPoint[]>>({});

  const key = entityIds.join(",");

  useEffect(() => {
    if (!connection)
      return;

    connection.sendMessagePromise<Record<string, HistoryState[]>>({
      type: "history/history_during_period",
      start_time: new Date(Date.now() - hours * 3_600_000).toISOString(),
      entity_ids: key.split(","),
      minimal_response: true,
      no_attributes: true,
      significant_changes_only: false,
    }).then((response) => {
      setHistory(Object.fromEntries(
        Object.entries(response).map(([entityId, states]) => [
          entityId,
          states
            .filter((state) => !isNaN(Number(state.s)))
            .map((state): HistoryPoint => [state.lu * 1000, Number(state.s)])
        ])
      ));
    });
  }, [connection, key, hours]);

  return history;
}
