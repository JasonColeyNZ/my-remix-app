import { AreaType, type FieldDefinition, FieldType } from "../types.ts";

// const ConsentTitle: FieldDefinition = {
//   id: "consentTitle",
//   label: "Title",
//   fieldType: FieldType.textinput,
//   area: AreaType.CLIENT_CONSENT,
//   options: [],
//   displayOptions: {},
//   validation: {
//     required: true,
//     minLength: 1,
//     maxLength: 100,
//   },
// };

// const ConsentDate: FieldDefinition = {
//   id: "dateTime",
//   label: "Date",
//   fieldType: FieldType.textinput,
//   area: AreaType.CLIENT_CONSENT,
//   options: [],
//   displayOptions: {},
//   validation: {
//     required: true,
//   },
// };

const ConsentText: FieldDefinition = {
  id: "consentText",
  label: "",
  fieldType: FieldType.RICHTEXT,
  area: AreaType.CLIENT_CONSENT,
  options: [],
  displayOptions: {
    readOnly: true,
  },
  validation: {
    required: true,
  },
};

const ClientConsentSignature: FieldDefinition = {
  id: "clientSignatureId",
  label: "Client Signature",
  fieldType: FieldType.SIGNATURE,
  area: AreaType.CLIENT_CONSENT,
  options: [],
  displayOptions: {},
  validation: {
    required: false,
  },
};

const ClientAcceptance: FieldDefinition = {
  id: "clientAcceptance",
  label: "I agree to use electronic records and signatures",
  fieldType: FieldType.CHECKBOX,
  area: AreaType.CLIENT_CONSENT,
  options: [],
  displayOptions: {},
  validation: {
    required: false,
  },
};

const UserConsentSignature: FieldDefinition = {
  id: "userSignatureId",
  label: "Team Member Signature",
  fieldType: FieldType.SIGNATURE,
  area: AreaType.CLIENT_CONSENT,
  options: [],
  displayOptions: {},
  validation: {
    required: false,
  },
};

const UserAcceptance: FieldDefinition = {
  id: "userAcceptance",
  label: "I agree to use electronic records and signatures",
  fieldType: FieldType.CHECKBOX,
  area: AreaType.CLIENT_CONSENT,
  options: [],
  displayOptions: {},
  validation: {
    required: false,
  },
};

export const ClientConsentFields: FieldDefinition[] = [
  // ConsentTitle,
  // ConsentDate,
  ConsentText,
  ClientConsentSignature,
  ClientAcceptance,
  UserConsentSignature,
  UserAcceptance,
];
