import type { BasicTabType } from "~/utils/types";

export const settingsTabs: BasicTabType[] = [
  {
    text: "Details",
    url: "details",
    regExp: new RegExp("/dashboard/settings/booking/details(?:/\\w+|)"),
  },
  {
    text: "General",
    url: "general",
    regExp: new RegExp("/dashboard/settings/booking/general(?:/\\w+|)"),
  },
];
