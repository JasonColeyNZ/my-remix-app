import { useLocales } from "remix-utils/locales/react";

const TimeColumn = ({ date }: { date: Date }) => {
  const locales = useLocales();
  const newDate = new Date(date);
  return <div>{newDate.toLocaleTimeString(locales)}</div>;
};

export default TimeColumn;
