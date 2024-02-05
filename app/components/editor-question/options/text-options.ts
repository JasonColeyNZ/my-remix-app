import { FieldType } from "~/components/draggable-forms-editor/types";
import { QuestionControlType, type TextType } from "../editor-question-types";

const SingleLine: TextType = {
  type: QuestionControlType.text,
  text: "Text Input",
  fieldType: FieldType.TEXTINPUT,
  value: 1,
  description: "Allows the entry of a single line of text",
};

const MultiLine: TextType = {
  type: QuestionControlType.text,
  text: "Text Area",
  fieldType: FieldType.TEXTAREA,
  value: 2,
  description: "Allows the entry of multiple lines of text",
};

export const textOptions = [SingleLine, MultiLine];
