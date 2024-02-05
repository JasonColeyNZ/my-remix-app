import {
  FieldType,
  type FieldDefinition,
  AreaType,
  DisplayTextAlignment,
  ControlType,
} from "./components/draggable-forms-editor/types";

export const USER_SESSION_KEY = "userId";
export const NEW_LOCATION_ID = "newLocationId";
export const LOCATION_ID_KEY = "locationId";
export const ENTITY_ID_KEY = "entityId";
export const SETTINGS_SELECTED_TAB = "settingsSelectedTab";
export const SETTINGS_COMPANY_SELECTED_TAB = "company";
export const SETTINGS_SECURITY_SELECTED_TAB = "security";
export const SETTINGS_PRODUCTS_SELECTED_TAB = "products";
export const SETTINGS_BOOKING_SELECTED_TAB = "booking";
export const SETTINGS_SERVICES_SELECTED_TAB = "services";
export const SETTINGS_RECORDS_SELECTED_TAB = "records";
export const SETTINGS_CLIENT_SELECTED_TAB = "client";
// export const CLIENTS_SELECTED_TAB = "clientsSelectedTab";

export const MEMBERS_SELECTED_TAB = "membersSelectedTab";

export const SETTINGS_FORM_SELECTED = "settingsFormSelected";
export const SETTINGS_TEMPLATE_SELECTED = "settingsTemplateSelected";
export const SETTINGS_LETTER_SELECTED = "settingsLetterSelected";
export const SETTINGS_LOCATION_SELECTED = "settingsLocationSelected";
export const SETTINGS_QUESTIONNAIRE_SELECTED = "settingsQuestionnaireSelected";

export const BlankFieldDefinition: FieldDefinition = {
  id: "",
  //formId: "",
  area: AreaType.CLIENT_RECORD,
  label: "",
  shortLabel: "",
  description: "",
  fieldType: FieldType.TEXTINPUT,
  options: [],
  controlType: ControlType.NULL,
  displayOptions: {
    textAlign: DisplayTextAlignment.LEFT,
    displayColumns: 1,
  },
  validation: {
    required: false,
  },
};
