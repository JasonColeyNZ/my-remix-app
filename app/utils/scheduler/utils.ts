import type { LocationHourItemType } from "~/models/location.server.ts";

export const daysOfWeek: string[] = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

export function getDayNames(
  locale = "en",
  format: "long" | "short" | "narrow" = "long",
) {
  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: format,
    timeZone: "UTC",
  });
  const days = [1, 2, 3, 4, 5, 6, 7].map((day) => {
    const dd = day < 10 ? `0${day}` : day;
    return new Date(`2017-01-${dd}T00:00:00+00:00`);
  });
  return days.map((date) => formatter.format(date));
}

export const timeNumberToString = (value: number) => {
  const timeParts = value.toString().split(".");
  const hours = timeParts[0].length === 1 ? "0" + timeParts[0] : timeParts[0];

  const minutes =
    timeParts.length === 1
      ? "00"
      : timeParts[1].length === 0
      ? "00"
      : timeParts[1].length === 1
      ? timeParts[1] + "0"
      : timeParts[1];

  return hours + ":" + minutes;
};

export const getFirstStartTime = (locationHours: LocationHourItemType[]) => {
  let time = 24;
  locationHours.forEach((locationHour) => {
    const start = parseInt(locationHour.start.replace(":", "."));
    if (start < time) {
      time = start;
    }
  });
  // if (time - 1 > 0) {
  //   time -= 1;
  // }
  // console.log(time);
  return timeNumberToString(time);
};

export const getLastEndTime = (locationHours: LocationHourItemType[]) => {
  let time = 0;
  locationHours.forEach((locationHour) => {
    const end = parseInt(locationHour.end.replace(":", "."));
    if (end > time) {
      time = end;
    }
  });
  if (time + 1 < 24) {
    time += 1;
  }
  return timeNumberToString(time);
};

export const getLastDay = (locationHours: LocationHourItemType[]) => {
  let day = 0;
  locationHours.forEach((locationHour) => {
    if (daysOfWeek.indexOf(locationHour.dayOfWeek) > day) {
      day = daysOfWeek.indexOf(locationHour.dayOfWeek);
    }
  });
  return day;
};

export const getFirstDay = (locationHours: LocationHourItemType[]) => {
  let day = 6;
  locationHours.forEach((locationHour) => {
    if (daysOfWeek.indexOf(locationHour.dayOfWeek) < day) {
      day = daysOfWeek.indexOf(locationHour.dayOfWeek);
    }
  });
  return day;
};
