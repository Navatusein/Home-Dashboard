function minutesOfDay(date: Date) {
  return date.getHours() * 60 + date.getMinutes();
}

export function isNight(date: Date, sunrise: Date, sunset: Date) {
  const minutes = minutesOfDay(date);

  return minutes < minutesOfDay(sunrise) || minutes >= minutesOfDay(sunset);
}
