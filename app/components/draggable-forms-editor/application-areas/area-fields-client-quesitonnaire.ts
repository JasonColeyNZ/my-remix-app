import { AreaType, FieldType, type FieldDefinition } from "../types.ts";

const QuestionnaireDate: FieldDefinition = {
  id: "date",
  label: "Date",
  fieldType: FieldType.DATETIME,
  area: AreaType.CLIENT_NOTE,
  options: [],
  displayOptions: {},
  validation: {
    required: true,
  },
};

export const ClientQuestionnaireFields: FieldDefinition[] = [QuestionnaireDate];
