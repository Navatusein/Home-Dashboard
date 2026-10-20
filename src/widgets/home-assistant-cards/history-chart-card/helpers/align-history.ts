import {HistoryPoint} from "@/shared/hooks/use-history-states";

export function alignHistory(series: HistoryPoint[][]): [number, number | null][][] {
  const times = [...new Set(series.flatMap((points) => points.map(([time]) => time)))].sort((a, b) => a - b);

  return series.map((points) => {
    let index = 0;
    let value: number | null = null;

    return times.map((time): [number, number | null] => {
      while (index < points.length && points[index][0] <= time)
        value = points[index++][1];

      return [time, value];
    });
  });
}
