import { AreaType, FieldType, type FieldDefinition } from "../types.ts";

const NotesTitle: FieldDefinition = {
  id: "title",
  label: "Title",
  fieldType: FieldType.TEXTINPUT,
  area: AreaType.MEMBER_NOTE,
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
  area: AreaType.MEMBER_NOTE,
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
  area: AreaType.MEMBER_NOTE,
  options: [],
  displayOptions: {},
  validation: {
    required: true,
  },
};

export const MemberNoteFields: FieldDefinition[] = [
  NotesTitle,
  NotesDate,
  NotesText,
];
