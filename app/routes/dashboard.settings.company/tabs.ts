import type { TabType } from "~/utils/types";

export const settingsTabs: TabType[] = [
  {
    text: "Information",
    url: "info",
    regExp: new RegExp("/dashboard/settings/company/info(?:/\\w+|)"),
    detailRegExp: new RegExp("//"),
  },
  {
    text: "Locations",
    url: "locations",
    regExp: new RegExp(
      "/dashboard/settings/company/locations(?:/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+\\s|)",
    ),
    detailRegExp: new RegExp(
      "//", //always show the nav tabs
    ),
    addText: "Add Location",
    addRegExp: new RegExp(
      "/dashboard/settings/company/locations(?:/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/(?:details\\s|hours\\s|rooms\\s)|\\s)",
    ),
    saveText: "Save Changes",
    saveRegExp: new RegExp("/dashboard/settings/company/locations(?:/\\w+|)"),
    cancelText: "Cancel Changes",
    cancelRegExp: new RegExp("/dashboard/settings/company/locations(?:/\\w+|)"),
  },
  {
    text: "System",
    url: "system",
    regExp: new RegExp("/dashboard/settings/company/system(?:/\\w+|)"),
    saveText: "Save Changes",
    saveRegExp: new RegExp("/dashboard/settings/company/system(?:/\\w+|)"),
    detailRegExp: new RegExp("//"),
  },
  {
    text: "Billing",
    url: "billing",
    regExp: new RegExp("/dashboard/settings/company/billing(?:/\\w+|)"),
    detailRegExp: new RegExp("//"),
  },
  {
    text: "Integrations",
    url: "integrations",
    regExp: new RegExp("/dashboard/settings/company/integrations(?:/\\w+|)"),
    detailRegExp: new RegExp("//"),
  },
  {
    text: "Demo Data",
    url: "demo",
    regExp: new RegExp("/dashboard/settings/company/demo(?:/\\w+|)"),
    detailRegExp: new RegExp("//"),
  },
];
