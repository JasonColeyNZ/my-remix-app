import { ModuleIdentifier } from "./utils/types.ts";
import type { TabType } from "./utils/types.ts";

export type Path = {
  //  id?: string;
  text: string;
  icon?: string;
  path: string;
  hidden?: boolean;
  items?: Path[];
  current?: boolean;
  // breadcrumbs?: Breadcrumb[];
  alternates?: string[];
  regExp?: RegExp;
  subMenu?: Path[];
  identifier?: ModuleIdentifier[];
};

// export interface Breadcrumb {
//   url: string;
//   text: string;
// }

const submenuClientRecords: Path = {
  path: "/dashboard/clients/$clientId/records",
  text: "Records",
};
const submenuClientBookings: Path = {
  path: "/dashboard/clients/$clientId/bookings",
  text: "Bookings",
};
const submenuClientConsents: Path = {
  path: "/dashboard/clients/$clientId/consents",
  text: "Consents",
};
const submenuClientMessages: Path = {
  path: "/dashboard/clients/$clientId/messages",
  text: "Messages",
};
const submenuClientNotes: Path = {
  path: "/dashboard/clients/$clientId/notes",
  text: "Notes",
};

const submenuMemberNotes: Path = {
  path: "/dashboard/members/$memberId/notes",
  text: "Notes",
};
const submenuMemberSchedule: Path = {
  path: "/dashboard/members/$memberId/schedule",
  text: "Schedule",
};

const submenuSettingsClient: Path = {
  path: "/dashboard/settings/client",
  text: "Client",
  identifier: [ModuleIdentifier.ClientSettings],
  subMenu: [
    {
      path: "/dashboard/settings/client/tags",
      text: "Tags",
    },
    {
      path: "/dashboard/settings/client/general",
      text: "General",
    },
  ],
};
const submenuSettingsBooking: Path = {
  path: "/dashboard/settings/booking",
  text: "Booking",
  identifier: [ModuleIdentifier.BookingSettings],
  subMenu: [
    {
      path: "/dashboard/settings/booking/details",
      text: "Details",
    },
    {
      path: "/dashboard/settings/booking/general",
      text: "General",
    },
  ],
};
const submenuSettingsServices: Path = {
  path: "/dashboard/settings/services",
  text: "Services",
  identifier: [
    ModuleIdentifier.ServicesSettings,
    ModuleIdentifier.CombinationsSettings,
    ModuleIdentifier.CategoriesSettings,
  ],
  subMenu: [
    {
      path: "/dashboard/settings/services/services",
      text: "Services",
      identifier: [ModuleIdentifier.ServicesSettings],
    },
    {
      path: "/dashboard/settings/services/combinations",
      text: "Combinations",
      identifier: [ModuleIdentifier.CombinationsSettings],
    },
    {
      path: "/dashboard/settings/services/categories",
      text: "Categories",
      identifier: [ModuleIdentifier.CategoriesSettings],
    },
  ],
};
const submenuSettingsSecurity: Path = {
  path: "/dashboard/settings/security",
  text: "Security",
  identifier: [
    ModuleIdentifier.SecurityRoleSettings,
    ModuleIdentifier.TeamRoleMgmt,
  ],
  subMenu: [
    {
      path: "/dashboard/settings/security/roles",
      text: "Roles",
      identifier: [ModuleIdentifier.SecurityRoleSettings],
    },
    {
      path: "/dashboard/settings/security/members",
      text: "Members",
      identifier: [ModuleIdentifier.TeamRoleMgmt],
    },
  ],
};
const submenuSettingsProducts: Path = {
  path: "/dashboard/settings/products",
  text: "Products",
  identifier: [ModuleIdentifier.ProductsSettings],
};
const submenuSettingsForms: Path = {
  path: "/dashboard/settings/records",
  text: "Forms",
  identifier: [ModuleIdentifier.FormsSettings],
};
const submenuSettingsCompany: Path = {
  path: "/dashboard/settings/company",
  text: "Company",
  identifier: [ModuleIdentifier.CompanySettings],
  subMenu: [
    {
      path: "/dashboard/settings/company/info",
      text: "Company Info",
    },
    {
      path: "/dashboard/settings/company/locations",
      text: "Locations",
    },
    {
      path: "/dashboard/settings/company/system",
      text: "System",
    },
    {
      path: "/dashboard/settings/company/billing",
      text: "Billing",
    },
    {
      path: "/dashboard/settings/company/integrations",
      text: "Integrations",
    },
    {
      path: "/dashboard/settings/company/demo",
      text: "Demo",
    },
  ],
};

export const clientInfoNav: Path = {
  text: "Client Info",
  path: "/dashboard/clients/$clientId/$clientInfoTab",
  regExp: new RegExp(
    `/dashboard/clients/(\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+|new)(/records|/record/new|/questionnaires|/questionnaire/select/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+|/notes(?:/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+\\s|/new\\s|\\s)|/bookings|/consents|/details|/messages)`,
  ),
  alternates: [
    "details",
    "records",
    "records.add",
    "notes",
    "questionnaires",
    "consents",
    "bookings",
    "messages",
  ],
  hidden: true,
  subMenu: [
    submenuClientBookings,
    submenuClientRecords,
    submenuClientNotes,
    submenuClientMessages,
    submenuClientConsents,
    // submenuClientQuestionnaires,
  ],
};

export const memberInfoNav: Path = {
  text: "Member Info",
  path: "/dashboard/members/$memberId/$memberInfoTab",
  regExp: new RegExp(
    `/dashboard/members/(\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+|new)(/notes(?:/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+\\s|/new\\s|\\s)|/schedule(?:\\s)|/details(?:\\s))`,
  ),
  alternates: ["details", "schedule"],
  hidden: true,
  subMenu: [submenuMemberNotes, submenuMemberSchedule],
};

export const navigation: Path[] = [
  {
    text: "Dashboard",
    path: "/dashboard",
    regExp: new RegExp("/dashboard(?=\\s)"),
  },
  {
    text: "Marketing",
    path: "/dashboard/marketing",
    regExp: new RegExp("/dashboard/marketing(?=\\s)"),
  },
  {
    text: "Clients",
    path: "/dashboard/clients",
    regExp: new RegExp("/dashboard/clients(?=\\s)"),
  },
  { ...clientInfoNav },
  { ...memberInfoNav },
  {
    text: "Bookings",
    path: "/dashboard/bookings",
    regExp: new RegExp("/dashboard/bookings(?=\\s)"),
    alternates: ["/edit"],
  },
  {
    text: "Team",
    path: "/dashboard/members",
    regExp: new RegExp("/dashboard/members(?=\\s)"),
  },
  {
    text: "Team Schedule",
    path: "/dashboard/teamschedule",
    regExp: new RegExp("/dashboard/teamschedule(?=\\s)"),
  },
  {
    text: "Settings",
    path: "/dashboard/settings",
    regExp: new RegExp(
      "/dashboard/settings/(client/(tags(/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+|/new|)|general)|" +
        "booking/(details|general)|" +
        "services/(services(/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+|/new|)|categories|categories/(\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+|new))|" +
        "products|products/(\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+|new)|" +
        "forms|roles|services/combinations|" +
        "company/(info|locations|system|billing|demo|integrations)|" +
        "company/locations/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/(details|hours|rooms/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+)|" +
        "records/forms/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+|" +
        "security/(roles|roles(/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+|/new)|members|members(/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+|))|" +
        ")\\s",
    ),
    subMenu: [
      submenuSettingsClient,
      submenuSettingsBooking,
      submenuSettingsServices,
      submenuSettingsProducts,
      submenuSettingsForms,
      submenuSettingsCompany,
      submenuSettingsSecurity,
    ],
  },
];

export const ClientInfoTabs: TabType[] = [
  {
    text: "Bookings",
    url: "bookings",
    regExp: new RegExp(
      "/dashboard/client/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/bookings(?:\\s)",
    ),
    detailRegExp: new RegExp(
      "/dashboard/client/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/bookings/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+",
    ),
  },
  {
    text: "Messages",
    url: "messages",
    regExp: new RegExp(
      "/dashboard/client/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/messages(?:\\s)",
    ),
    detailRegExp: new RegExp(
      "/dashboard/client/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/messages/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+",
    ),
  },
  // {
  //   text: "Questionnaires",
  //   url: "questionnaires",
  //   regExp: new RegExp(
  //     "/dashboard/client/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/questionnaires(?:\\s)",
  //   ),
  //   detailRegExp: new RegExp(
  //     "/dashboard/client/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/questionnaires/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+",
  //   ),

  //   addText: "Add Questionnaire",
  //   addUrl: "questionnaire/select/new",
  //   addRegExp: new RegExp(
  //     "/dashboard/client/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/questionnaires",
  //   ),

  //   cancelText: "Cancel",
  //   cancelUrl: "questionnaires",
  //   selectText: "Select Questionnaire",
  // },
  // {
  // text: "Details",
  // url: "details",
  // regExp: new RegExp(
  //   "/dashboard/client/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/details(?:\\s)",
  // ),
  // detailRegExp: new RegExp(
  //   "/dashboard/client/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/details/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+",
  // ),
  // editText: "Edit Client",
  // editRegExp: new RegExp(
  //   "/dashboard/client/(\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+|new)/details",
  // ),
  // saveText: "Save Changes",
  // saveRegExp: new RegExp(
  //   "/dashboard/client/(\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+|new)/details",
  // ),

  // addText: "Add Avatar",
  // addRegExp: new RegExp(
  //   "/dashboard/client/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/details",
  // ),

  //   cancelRegExp: new RegExp(
  //     "/dashboard/client/(\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+|new)/details",
  //   ),
  //   cancelText: "Cancel",
  // },
];

export const MemberInfoTabs: TabType[] = [
  {
    text: "Work Schedule",
    url: "schedule",
    regExp: new RegExp(
      "/dashboard/member/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/schedule(?:\\s)",
    ),
    detailRegExp: new RegExp(
      "/dashboard/member/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/schedule/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+",
    ),
    saveText: "Save Changes",
    saveRegExp: new RegExp(
      "/dashboard/member/(\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+|new)/schedule",
    ),
  },
  {
    text: "Notes & Files",
    url: "notes",
    regExp: new RegExp(
      "/dashboard/member/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/notes(?:\\s)",
    ),
    detailRegExp: new RegExp(
      "/dashboard/member/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/notes(?:/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+|/new)",
    ),
    addText: "Add Note",
    addRegExp: new RegExp(
      "/dashboard/member/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/notes\\s",
    ),
    saveText: "Save Changes",
    saveRegExp: new RegExp(
      "/dashboard/member/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/notes(?:/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+|/new)",
    ),
    cancelRegExp: new RegExp(
      "/dashboard/member/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/notes/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+",
    ),
    cancelText: "Cancel",
    cancelUrl: "notes",
  },
  {
    text: "Details",
    url: "details",
    regExp: new RegExp(
      "/dashboard/member/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/details(?:\\s)",
    ),
    detailRegExp: new RegExp(
      "/dashboard/member/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/details/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+",
    ),
  },
];

export const MemberProfileTabs: TabType[] = [
  {
    text: "Profile",
    url: "profile",
    regExp: new RegExp("/dashboard/member/profile"),
    detailRegExp: new RegExp("/dashboard/member/profile"),
    editText: "Edit Profile",
    editRegExp: new RegExp("/dashboard/member/profile"),
    saveText: "Save Changes",
    saveRegExp: new RegExp("/dashboard/member/profile"),
    cancelRegExp: new RegExp("/dashboard/member/profile"),
    cancelText: "Cancel",
  },
];
