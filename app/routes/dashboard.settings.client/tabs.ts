import type { TabType } from "~/utils/types";

export const clientSettingsTabs: TabType[] = [
  {
    text: "Tags",
    url: "tag",
    regExp: new RegExp("/dashboard/settings/client/tag(?:/\\w+|)"),
    detailRegExp: null,
    //addText: "Add Questionnaire",
    //addUrl: "questionnaires/add",
    //addRegExp: new RegExp(
    //  "/dashboard/settings/records/questionnaires(?:/\\w+|)"
    //),
  },
  {
    text: "General",
    url: "general",
    regExp: new RegExp("/dashboard/settings/client/general(?:/\\w+|)"),
    detailRegExp: null,
  },
];
