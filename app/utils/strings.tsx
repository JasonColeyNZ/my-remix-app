export const isUUid = (value: string) => {
  const regex = new RegExp(
    "^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$",
  );
  return regex.test(value);
};

export const camelCaseToWords = (s: string) => {
  const result = s.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const toPascalCase = (str: string) => {
  return str.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
    return g1.toUpperCase() + g2.toLowerCase();
  });
};

export const durationString = (value: number) => {
  const getHours = (value: number) => {
    return value > 0 ? `${value}h ` : "";
  };
  const getMinutes = (value: number) => {
    return value > 0 ? `${value}m` : "";
  };
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  return getHours(hours) + getMinutes(minutes);
};

export const timeItText = (value: string) => {
  const [hours, minutes] = value.split(":");
  const hourString = hours === "1" ? "hour" : "hours";
  if (hours === "00" && minutes === "00") return "0 minutes";
  if (hours === "00" || hours === "0") return `${minutes} minutes`;
  if (minutes === "00" || minutes === "0") return `${hours} ${hourString}`;
  return `${hours} ${hourString} ${minutes} minutes`;
};

//firstName can be the name, i.e. "Jason Coley" or just "Jason"
export const userInitials = (firstName: string, lastName?: string) => {
  if (!lastName) {
    if (firstName.includes(" ")) {
      const names = firstName.split(" ");
      return `${names[0][0]}${names[1][0]}`;
    }

    return firstName[0];
  }

  return `${firstName[0]}${lastName[0]}`;
};

export const appointmentDuration = (
  startDate: string | Date,
  endDate: string | Date,
) => {
  // console.log(startDate, endDate);
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;
  const diff = end.getTime() - start.getTime();
  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const remainderMinutes = minutes % 60;
  if (hours === 0) return `${remainderMinutes}m`;
  return `${hours}h ${remainderMinutes}m`;
  // new Date(cell.row.original.endDate) - new Date(cell.row.original.startDate);
};

export const getDateString = (
  date: string | Date,
  options?: Intl.DateTimeFormatOptions,
) => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", options);
};
