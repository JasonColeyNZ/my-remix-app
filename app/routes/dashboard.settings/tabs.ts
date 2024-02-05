import type { BasicTabType } from "~/utils/types.ts";

export const settingsTabs: BasicTabType[] = [
  {
    text: "Client",
    url: "/dashboard/settings/client",
    regExp: /\/dashboard\/settings\/client/,
  },
  {
    text: "Booking",
    url: "/dashboard/settings/booking",
    regExp: /\/dashboard\/settings\/booking/,
  },
  {
    text: "Services",
    url: "/dashboard/settings/services",
    regExp: /\/dashboard\/settings\/services/,
  },
  {
    text: "Products",
    url: "/dashboard/settings/products",
    regExp: /\/dashboard\/settings\/products/,
  },
  {
    text: "Forms and Templates",
    url: "/dashboard/settings/records",
    regExp: /\/dashboard\/settings\/records/,
  },
  {
    text: "Company",
    url: "/dashboard/settings/company",
    regExp: /\/dashboard\/settings\/company/,
  },
  {
    text: "Security",
    url: "/dashboard/settings/security",
    regExp: /\/dashboard\/settings\/security/,
  },
];
