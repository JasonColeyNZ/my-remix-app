import type { TabType } from "~/utils/types";

export const securitySettingsTabs: TabType[] = [
  {
    text: "Roles",
    url: "roles",
    regExp: new RegExp("/dashboard/settings/security/roles(?:/\\w+|)"),
    detailRegExp: null,
  },
  {
    text: "Members",
    url: "members",
    regExp: new RegExp("/dashboard/settings/security/members(?:/\\w+|)"),
    detailRegExp: null,
  },
];
