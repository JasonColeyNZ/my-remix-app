export enum FieldParentType {
  TOOLBOX = "TOOLBOX",
  VIEWER = "VIEWER",
  ROW = "ROW",
}

export enum AreaType {
  CLIENT_RECORD = "ClientRecord",
  CLIENT_NOTE = "ClientNote",
  CLIENT_DETAIL = "ClientDetail",
  CLIENT_CONSENT = "ClientConsent",
  CLIENT_QUESTIONNAIRE = "ClientQuestionnaire",
  CLIENT_TAG = "ClientTag",
  MEMBER_DETAIL = "MemberDetail",
  MEMBER_NOTE = "MemberNote",
  PRODUCTS = "Products",
  SERVICES = "Services",
  SERVICE_RECORD = "ServiceRecord",
  CATEGORY = "Category",
  LOCATIONS = "Locations",
  COMPANYINFO = "CompanyInfo",
  FORM = "Form",
  ADDFORM = "AddForm",
  ADDCONSENT = "AddConsent",
  CONTENTEDITOR = "ContentEditor",
}

export enum FieldType {
  PARAGRAPH = "PARAGRAPH",
  HEADER = "HEADER",
  TEXTINPUT = "TEXTINPUT",
  ADDRESS = "ADDRESS",
  SELECT = "SELECT",
  CHECKBOX = "CHECKBOX",
  DATETIME = "DATETIME",
  IMAGEUPLOAD = "IMAGEUPLOAD",
  RADIO = "RADIO",
  TEXTAREA = "TEXTAREA",
  RICHTEXT = "RICHTEXT",
  TIMEITSELECT = "TIMEITSELECT",
  COLORPICKER = "COLORPICKER",
  SIGNATURE = "SIGNATURE",
  FILEUPLOAD = "FILEUPLOAD",
  TEXTTEMPLATE = "TEXTTEMPLATE",
  BLOODPRESSURE = "BLOODPRESSURE",
  NUMBER = "NUMBER",
  NULL = "NULL",
  PRODUCTSELECT = "PRODUCTSELECT",
  SERVICESELECT = "SERVICESELECT",
  SERVICEADDON = "SERVICEADDON",
}

export interface FormType {
  name: string;
  id: string;
  area: string;
  description: string | null;
}

export type ToolbarItem = {
  id: string;
  type: string;
  name: string;
  fieldName: string;
};

export type FormFieldDefinition = {
  id: string;
  label?: string;
  sortOrder: number;
  colSpan: number;
  field: FieldDefinition;
  icon?: FieldType;
};

export type FieldValidation = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  disableFutureDate?: boolean;
  disablePastDate?: boolean;
};

export enum DisplayTextAlignment {
  LEFT = "left",
  TOP = "top",
}

export type DisplayOptions = {
  startInputAdornment?: string;
  textAlign?: DisplayTextAlignment;
  //fullWidth?: boolean;
  readOnly?: boolean;
  displayColumns?: number;
  disablePastDates?: boolean;
  disableFutureDates?: boolean;
  openOn?: "day" | "year" | "month";
  multiple?: boolean;
};

export enum ControlType {
  SELECT = "SELECT",
  CHECKBOX = "CHECKBOX",
  RADIO = "RADIO",
  DATE = "DATE",
  DATETIME = "DATETIME",
  TEL = "TEL",
  EMAIL = "EMAIL",
  NULL = "",
}

export type FieldDefinition = {
  id: string;
  formId?: string;
  area: AreaType;
  label: string;
  shortLabel?: string;
  description?: string;
  text?: string;
  fieldType: FieldType;
  controlType?: ControlType;
  autoFocus?: boolean;
  options?: FieldOptionType[];
  displayOptions?: DisplayOptions;
  validation?: FieldValidation;
};

export type UpdateControlPropertyType = {
  id: string;
  value: string;
};

export interface FieldOptionType {
  text: string;
  textBox?: string;
  value: number | string;
  checked?: boolean;
  clearOthers?: boolean;
  editing?: boolean; //used for the properties toolbar
  sortOrder: number;
}

export type ProductSelectFieldOptionType = FieldOptionType & {
  trackingType: string;
};

// export type FormRowControl = {
//   fields: FieldDefinition[];
// };

export type FormRowDefinition = {
  id: string;
  sortOrder: number;
  controls: Array<FormFieldDefinition>;
};

export type FormDefinition = {
  id: string;
  name: string;
  area: AreaType;
  //fieldsUsed: Array<string>; //just the field names
  rows: Array<FormRowDefinition>;
  // usedFormFields holds all fields used in a form, this makes it easy to build a data record
  // create record from formData      ......  client = { ...client, ...formDefinition.formData };
  // now populate with any saved data ......  client = { ...client, ...client.formData };
  usedFormFields: {};
};

export type LoaderFormType = {
  formDefinition: FormDefinition;
  formFields: FormFieldDefinition[];
  name: string;
  id: string;
  area: string;
  description: string | null;
};

// {
//   id: string;
//   sortOrder: number;
//   colSpan: number;
//   fieldType: FieldType;
//   controlType: ControlType;
//   label: string;
//   text?: string;
//   validation: FieldValidation;
// };

//{
//   // id: string;
//   sortOrder: number;
//   controls: Array<SavedFormFieldDefinition>;
// };

// {
//   rows: Array<SavedRowDefinition>;
// };
