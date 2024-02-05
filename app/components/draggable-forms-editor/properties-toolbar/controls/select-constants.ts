import type { OptionType } from "~/utils/types";
import { ControlType } from "../../types";

export const textAlignOptions: OptionType[] = [
  { value: "left", text: "Text left of controls" },
  { value: "top", text: "Text above controls" },
];

export const columnOptions: OptionType[] = [
  { value: 1, text: "1" },
  { value: 2, text: "2" },
  { value: 3, text: "3" },
  { value: 4, text: "4" },
  { value: 5, text: "5" },
  { value: 6, text: "6" },
];

export const selectSubTypeOptions: OptionType[] = [
  { value: ControlType.SELECT, text: "Select Box" },
  { value: ControlType.CHECKBOX, text: "Check Box List" },
  { value: ControlType.RADIO, text: "Radio Group" },
];

export const datetimeSubTypeOptions: OptionType[] = [
  { value: ControlType.DATE, text: "Date" },
  { value: ControlType.DATETIME, text: "Date/Time" },
];

export const columnSpanOptions: OptionType[] = [
  { value: 0, text: "Auto" },
  { value: 10, text: "10%" },
  { value: 20, text: "20%" },
  { value: 30, text: "30%" },
  { value: 40, text: "40%" },
  { value: 50, text: "50%" },
  { value: 60, text: "60%" },
  { value: 70, text: "70%" },
  { value: 80, text: "80%" },
  { value: 90, text: "90%" },
];

export const openOnOptions: OptionType[] = [
  { value: "year", text: "Year" },
  { value: "month", text: "Month" },
  { value: "date", text: "Date" },
];

export const trueFalseOptions: OptionType[] = [
  { value: true, text: "True" },
  { value: false, text: "False" },
];
