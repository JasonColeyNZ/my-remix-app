import type { TabType } from "../../utils/types.ts";

export const settingsTabs: TabType[] = [
  {
    text: "Letters of Consent",
    url: "letters",
    regExp: new RegExp("/dashboard/settings/records/letters(?:/\\w+|)"),
    addText: "Add Letter of Consent",
    addRegExp: new RegExp("/dashboard/settings/records/letters(?:/\\w+|)"),
    saveText: "Save Changes",
    saveRegExp: new RegExp("/dashboard/settings/records/letters(?:/\\w+|)"),
    detailRegExp: null,
  },
  {
    text: "Text Templates",
    url: "templates",
    regExp: new RegExp("/dashboard/settings/records/templates(?:/\\w+|)"),
    addText: "Add Text Template",
    addRegExp: new RegExp("/dashboard/settings/records/templates(?:/\\w+|)"),
    saveText: "Save Changes",
    saveRegExp: new RegExp("/dashboard/settings/records/templates(?:/\\w+|)"),
    detailRegExp: null,
  },
  {
    text: "Forms",
    url: "forms",
    regExp: new RegExp("/dashboard/settings/records/forms(?:/\\w+|)"),
    addText: "Add Form",
    //addUrl: "forms/add",
    addRegExp: new RegExp("/dashboard/settings/records/forms(?:/\\w+|)"),
    detailRegExp: null,
  },
];
