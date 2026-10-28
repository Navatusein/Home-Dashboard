import {TimeRange} from "@/shared/hooks/use-calendar-events";

export function clipRanges(ranges: TimeRange[], start: number, end: number): TimeRange[] {
  return ranges
    .map(([from, to]): TimeRange => [Math.max(from, start), Math.min(to, end)])
    .filter(([from, to]) => to > from);
}

export function mergeRanges(ranges: TimeRange[]): TimeRange[] {
  return ranges
    .toSorted(([a], [b]) => a - b)
    .reduce<TimeRange[]>((result, [from, to]) => {
      const last = result[result.length - 1];

      if (last && from <= last[1])
        last[1] = Math.max(last[1], to);
      else
        result.push([from, to]);

      return result;
    }, []);
}

export function dropShortRanges(ranges: TimeRange[], minMinutes: number): TimeRange[] {
  return ranges.filter(([from, to]) => to - from >= minMinutes * 60_000);
}
