export function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function formatDate(isoDate: string, pattern: string) {
  if (pattern == "iso")
    return `${isoDate}T00:00:00.000Z`;

  const [year, month, day] = isoDate.split("-");

  const tokens: Record<string, string> = {
    YYYY: year,
    YY: year.slice(-2),
    MM: month,
    DD: day,
  };

  return pattern.replace(/YYYY|YY|MM|DD/g, token => tokens[token]);
}
