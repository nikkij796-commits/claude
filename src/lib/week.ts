import { DAY_KEYS, type DayKey } from "../types";

const DAY_LABELS: Record<DayKey, string> = {
  sun: "Sun",
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
};

function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Returns the 7 dates (Sun..Sat) of the week containing `reference`. */
export function currentWeekDates(reference = new Date()): { key: DayKey; date: string; label: string; isToday: boolean }[] {
  const today = toDateKey(new Date());
  const start = new Date(reference);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - start.getDay());

  return DAY_KEYS.map((key, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const date = toDateKey(d);
    return { key, date, label: DAY_LABELS[key], isToday: date === today };
  });
}

export function formatDayNumber(dateStr: string): string {
  return String(Number(dateStr.split("-")[2]));
}
