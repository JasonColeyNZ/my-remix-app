import type { FieldType } from "../draggable-forms-editor/types";

export interface OptionType {
  text: string;
  value: number;
  textBox?: string;
  sortOrder: number;
  clearOthers?: boolean;
}

export enum QuestionControlType {
  radio = "radio",
  text = "text",
  check = "check",
}

export interface QuestionType {
  type: QuestionControlType;
  text: string;
  value: number;
}

export interface RadioType extends QuestionType {
  type: QuestionControlType.radio;
  options: OptionType[];
}

export interface TextType extends QuestionType {
  type: QuestionControlType.text;
  description: string;
  fieldType: FieldType;
}

export interface CheckType extends QuestionType {
  type: QuestionControlType.check;
  options: OptionType[];
}
