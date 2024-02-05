import { AreaType, FieldType, type FieldDefinition } from "../types.ts";

const RecordsTitle: FieldDefinition = {
  id: "title",
  label: "Title",
  fieldType: FieldType.TEXTINPUT,
  area: AreaType.CLIENT_RECORD,
  options: [],
  displayOptions: {},
  validation: {
    required: true,
    minLength: 1,
    maxLength: 100,
  },
};

const RecordsDate: FieldDefinition = {
  id: "datetime",
  label: "Date",
  fieldType: FieldType.DATETIME,
  area: AreaType.CLIENT_RECORD,
  options: [],
  displayOptions: {},
  validation: {
    required: true,
  },
};

const RecordsNotes: FieldDefinition = {
  id: "note",
  label: "Notes",
  fieldType: FieldType.TEXTAREA,
  area: AreaType.CLIENT_RECORD,
  options: [],
  displayOptions: {},
  validation: {
    required: false,
  },
};

const RecordsSubjective: FieldDefinition = {
  id: "subjective",
  label: "Subjective",
  fieldType: FieldType.TEXTAREA,
  area: AreaType.CLIENT_RECORD,
  options: [],
  displayOptions: {},
  validation: {
    required: false,
  },
};

const RecordsObjective: FieldDefinition = {
  id: "objective",
  label: "Objective",
  fieldType: FieldType.TEXTAREA,
  area: AreaType.CLIENT_RECORD,
  options: [],
  displayOptions: {},
  validation: {
    required: false,
  },
};

const RecordsAssessment: FieldDefinition = {
  id: "assessment",
  label: "Assessment",
  fieldType: FieldType.TEXTAREA,
  area: AreaType.CLIENT_RECORD,
  options: [],
  displayOptions: {},
  validation: {
    required: false,
  },
};

const RecordsPlan: FieldDefinition = {
  id: "plan",
  label: "Plan",
  fieldType: FieldType.TEXTAREA,
  area: AreaType.CLIENT_RECORD,
  options: [],
  displayOptions: {},
  validation: {
    required: false,
  },
};

const RecordsTotalCost: FieldDefinition = {
  id: "totalCost",
  label: "Total Cost",
  fieldType: FieldType.NUMBER,
  area: AreaType.CLIENT_RECORD,
  options: [],
  displayOptions: {},
  validation: {
    required: false,
  },
};

const RecordsTotalDuration: FieldDefinition = {
  id: "totalDuration",
  label: "Total Duration",
  fieldType: FieldType.NUMBER,
  area: AreaType.CLIENT_RECORD,
  options: [],
  displayOptions: {},
  validation: { required: false },
};

// const RecordsBloodPressure: FieldDefinition = {
//   id: "bloodPressure",
//   label: "Blood Pressure",
//   fieldType: FieldType.BLOODPRESSURE,
//   area: AreaType.CLIENT_RECORD,
//   options: [],
//   displayOptions: {},
//   validation: { required: false },
// };

export const ClientRecordFields: FieldDefinition[] = [
  RecordsTitle,
  RecordsDate,
  RecordsSubjective,
  RecordsObjective,
  RecordsAssessment,
  RecordsPlan,
  RecordsNotes,
  // RecordsBloodPressure,
  RecordsTotalCost,
  RecordsTotalDuration,
];
