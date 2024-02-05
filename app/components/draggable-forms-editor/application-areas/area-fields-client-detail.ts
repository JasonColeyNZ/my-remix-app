import {
  AreaType,
  type FieldDefinition,
  FieldType,
  ControlType,
} from "../types.ts";

const DetailsFirstName: FieldDefinition = {
  id: "firstName",
  label: "First Name",
  fieldType: FieldType.TEXTINPUT,
  area: AreaType.CLIENT_DETAIL,
  options: [],
  displayOptions: {},
  validation: {
    required: true,
    minLength: 0,
    maxLength: 0,
  },
};

const DetailsLastName: FieldDefinition = {
  id: "lastName",
  label: "Last Name",
  fieldType: FieldType.TEXTINPUT,
  area: AreaType.CLIENT_DETAIL,
  options: [],
  displayOptions: {},
  validation: {
    required: true,
    minLength: 0,
    maxLength: 0,
  },
};

const DetailsPreferredName: FieldDefinition = {
  id: "preferredName",
  label: "Preferred Name",
  fieldType: FieldType.TEXTINPUT,
  area: AreaType.CLIENT_DETAIL,
  options: [],
  displayOptions: {},
  validation: {
    required: false,
    minLength: 1,
    maxLength: 50,
  },
};
const DetailsEmail: FieldDefinition = {
  id: "email",
  label: "Email Address",
  fieldType: FieldType.TEXTINPUT,
  area: AreaType.CLIENT_DETAIL,
  controlType: ControlType.EMAIL,
  options: [],
  displayOptions: {},
  validation: {
    required: true,
  },
};
const DetailsHomeNumber: FieldDefinition = {
  id: "homeNumber",
  label: "Home Number",
  fieldType: FieldType.TEXTINPUT,
  area: AreaType.CLIENT_DETAIL,
  controlType: ControlType.TEL,
  options: [],
  displayOptions: {},
  validation: {
    required: false,
  },
};
const DetailsWorkNumber: FieldDefinition = {
  id: "workNumber",
  label: "Work Number",
  fieldType: FieldType.TEXTINPUT,
  area: AreaType.CLIENT_DETAIL,
  controlType: ControlType.TEL,
  options: [],
  displayOptions: {},
  validation: {
    required: false,
  },
};
const DetailsMobileNumber: FieldDefinition = {
  id: "mobileNumber",
  label: "Mobile Number",
  fieldType: FieldType.TEXTINPUT,
  area: AreaType.CLIENT_DETAIL,
  controlType: ControlType.TEL,
  options: [],
  displayOptions: {},
  validation: {
    required: true,
  },
};
const DetailsDateOfBirth: FieldDefinition = {
  id: "dateOfBirth",
  label: "Date of Birth",
  fieldType: FieldType.DATETIME,
  area: AreaType.CLIENT_DETAIL,
  controlType: ControlType.DATE,
  options: [],
  displayOptions: {
    openOn: "year",
    disablePastDates: false,
    disableFutureDates: true,
  },
  validation: {
    required: false,
    minLength: 0,
    maxLength: 0,
    minValue: 0,
    maxValue: 0,
  },
};
const DetailsOccupation: FieldDefinition = {
  id: "occupation",
  label: "Occupation",
  fieldType: FieldType.TEXTINPUT,
  area: AreaType.CLIENT_DETAIL,
  options: [],
  displayOptions: {},
  validation: {
    required: false,
    minLength: 1,
    maxLength: 100,
  },
};
const DetailsMaritalStatus: FieldDefinition = {
  id: "maritalStatus",
  label: "Marital Status",
  fieldType: FieldType.SELECT,
  area: AreaType.CLIENT_DETAIL,
  options: [
    { text: "Single", value: "single", sortOrder: 0 },
    { text: "Married", value: "married", sortOrder: 1 },
    { text: "Widowed", value: "widowed", sortOrder: 2 },
    { text: "Divorced", value: "divorced", sortOrder: 3 },
    { text: "Separated", value: "separated", sortOrder: 4 },
    { text: "Registered Partnership", value: "regpart", sortOrder: 5 },
  ],
  displayOptions: {},
  validation: {
    required: false,
  },
};

const DetailsCountryOfBirth: FieldDefinition = {
  id: "countryOfBirth",
  label: "Country Of Birth",
  fieldType: FieldType.SELECT,
  area: AreaType.CLIENT_DETAIL,
  options: [],
  displayOptions: {},
  validation: {
    required: false,
  },
};

const DetailsAvatar: FieldDefinition = {
  id: "avatarData",
  label: "Avatar",
  fieldType: FieldType.IMAGEUPLOAD,
  area: AreaType.CLIENT_DETAIL,
  options: [],
  displayOptions: {},
  validation: {
    required: false,
  },
};

export const ClientDetailFields: FieldDefinition[] = [
  DetailsFirstName,
  DetailsLastName,
  DetailsPreferredName,
  DetailsEmail,
  DetailsHomeNumber,
  DetailsWorkNumber,
  DetailsMobileNumber,
  DetailsDateOfBirth,
  DetailsOccupation,
  DetailsMaritalStatus,
  DetailsCountryOfBirth,
  DetailsAvatar,
];
