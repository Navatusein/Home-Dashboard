const DIRECTIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

export function compassDirection(bearing: number) {
  return DIRECTIONS[Math.round(bearing / 45) % DIRECTIONS.length];
}
