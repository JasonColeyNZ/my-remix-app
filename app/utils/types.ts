import type { FormEvent, RefObject } from "react";

export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export interface User {
  email: string;
  avatarUrl: string;
}

export type AuthContextType = {
  user?: User;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ isOk: boolean; data?: User; message?: string }>;
  signOut: () => void;
  loading: boolean;
};

export interface SideNavToolbarProps {
  title: string;
}

export interface SingleCardProps {
  title?: string;
  description?: string;
}

export type Handle = () => void;

interface NavigationData {
  currentPath: string;
}

export type NavigationContextType = {
  setNavigationData?: ({ currentPath }: NavigationData) => void;
  navigationData: NavigationData;
};

export type ValidationType = {
  value: string;
};

export type OptionType = {
  value: string | number | boolean;
  text: string;
};

export type TableColumn = {
  text: string;
  width?: number;
};

interface IBasicTabType {
  text: string;
  url: string;
  regExp: RegExp;
}

interface ITabType extends BasicTabType {
  detailRegExp: RegExp | null;
  addText?: string;
  addUrl?: string;
  addRegExp?: RegExp;
  cancelText?: string;
  cancelUrl?: string;
  cancelRegExp?: RegExp;
  selectText?: string;
  saveText?: string;
  saveUrl?: string;
  saveRegExp?: RegExp;
  drawerRegExp?: RegExp;
  drawerText?: string;
  drawerOpenText?: string;

  editText?: string;
  editRegExp?: RegExp;
}

export type BasicTabType = IBasicTabType;
export type TabType = ITabType;

export type ConditionalWrapperProps = {
  condition: boolean;
  children: React.ReactNode;
  wrapper: any;
};

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const MAX_FILE_SIZE = 5000000;

export type ImageUploadDataType = {
  fileName: string;
  storedFileName: string;
  storageKey: string;
  publicUrl: string;
  signedUrl: string;
  file?: File;
};

export enum TrackingType {
  CONSUMABLE = "CONSUMABLE",
  UNIT = "UNIT",
}

export enum UnitOfMeasure {
  each = "each",
  pieces = "pieces",
  box = "box",
  case = "case",
  lb = "lb",
  oz = "oz",
  kg = "kg",
  g = "g",
  mg = "mg",
  ml = "ml",
  l = "l",
  gal = "gal",
  qt = "qt",
  pt = "pt",
}

export interface ProductOnServiceType {
  // id: string;
  serviceId?: string;
  productId?: string;
  trackingType: string;
  qty: number;
}

export interface ServiceMemberType {
  // id: string;
  serviceId: string;
  userId: string;
}

export enum UserOnboarding {
  NOT_STARTED = "NOT_STARTED",
  PERSONAL_COMPLETED = "PERSONAL_COMPLETED",
  COMPANY_COMPLETED = "COMPANY_COMPLETED",
  DEMO_COMPLETED = "DEMO_COMPLETED",
  LEGAL_COMPLETED = "LEGAL_COMPLETED",
  COMPLETED = "COMPLETED",
}

export type RoleType = {
  module: string;
  permissions: string[];
};

export enum ModuleIdentifier {
  BookingSettings = "BookingSettings",
  Bookings = "Bookings",
  CategoriesSettings = "CategoriesSettings",
  Client = "Client",
  ClientMgmt = "ClientMgmt",
  ClientRecordMgmt = "ClientRecordMgmt",
  ClientSettings = "ClientSettings",
  CompanySettings = "CompanySettings",
  Dashboard = "Dashboard",
  FormsSettings = "FormsSettings",
  ProductsSettings = "ProductsSettings",
  SecurityRoleSettings = "SecurityRoleSettings",
  ServicesSettings = "ServicesSettings",
  CombinationsSettings = "CombinationsSettings",
  Team = "Team",
  TeamMemberSchedule = "TeamMemberSchedule",
  TeamMgmt = "TeamMgmt",
  TeamRoleMgmt = "TeamRoleMgmt",
  TeamSchedule = "TeamSchedule",
}

export enum TableTypes {
  CLIENTS = "CLIENTS",
  CLIENT_BOOKINGS = "CLIENT_BOOKINGS",
  CLIENT_RECORDS = "CLIENT_RECORDS",
  CLIENT_NOTES = "CLIENT_NOTES",
  CLIENT_MESSAGES = "CLIENT_MESSAGES",
  CLIENT_CONSENTS = "CLIENT_CONSENTS",
  MEMBERS = "MEMBERS",
  MEMBER_NOTES = "MEMBER_NOTES",
  PRODUCTS = "PRODUCTS",
}

export enum EditorTypeEnum {
  RICHTEXT = "RICHTEXT",
  QUESTION = "QUESTION",
  INTEGRATION = "INTEGRATION",
}

export enum IntegrationType {
  MAILCHIMP = "Mailchimp",
  SENDGRID = "SendGrid",
}

export type FormProps = {
  id?: string;
  ref: RefObject<HTMLFormElement>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  noValidate: boolean;
  "aria-invalid"?: "true";
  "aria-describedby"?: string;
};

export type appTeamMember = {
  firstName: string;
  lastName: string;
  id: string;
  img: string | null;
  checked: boolean;
};

export type appClient = {
  firstName: string;
  lastName: string;
  id: string;
};

export type appService = {
  name: string;
  color: string;
};

export enum AppointmentView {
  Day = "Day",
  Week = "Week",
  WorkWeek = "WorkWeek",
  Month = "Month",
  Agenda = "Agenda",
}

export type appView = {
  view: AppointmentView;
  startHour: string;
  endHour: string;
};

export type appGrouping = {
  byGroupID: boolean;
  resources: string[];
};
