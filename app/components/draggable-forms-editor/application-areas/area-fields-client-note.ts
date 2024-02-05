import { AreaType, FieldType, type FieldDefinition } from "../types.ts";

const NotesTitle: FieldDefinition = {
  id: "title",
  label: "Title",
  fieldType: FieldType.TEXTINPUT,
  area: AreaType.CLIENT_NOTE,
  options: [],
  displayOptions: {},
  validation: {
    required: true,
    minLength: 1,
    maxLength: 100,
  },
};

const NotesDate: FieldDefinition = {
  id: "datetime",
  label: "Date",
  fieldType: FieldType.DATETIME,
  area: AreaType.CLIENT_NOTE,
  options: [],
  displayOptions: {},
  validation: {
    required: true,
  },
};

const NotesText: FieldDefinition = {
  id: "text",
  label: "Text",
  fieldType: FieldType.RICHTEXT,
  area: AreaType.CLIENT_NOTE,
  options: [],
  displayOptions: {},
  validation: {
    required: true,
  },
};

export const ClientNoteFields: FieldDefinition[] = [
  NotesTitle,
  NotesDate,
  NotesText,
];
