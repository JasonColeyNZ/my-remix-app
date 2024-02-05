import { QuestionControlType, type CheckType } from "../editor-question-types";

const List: CheckType = {
  type: QuestionControlType.check,
  text: "Check List",
  value: 1,
  options: [],
};

const singeOff: CheckType = {
  type: QuestionControlType.check,
  text: "Options with clear others",
  value: 2,
  options: [
    {
      text: "Yes, option a",
      value: 1,
      sortOrder: 0,
    },
    {
      text: "Yes, option b",
      value: 2,
      sortOrder: 1,
    },
    {
      text: "No, (clear others)",
      value: 4,
      sortOrder: 2,
      clearOthers: true,
    },
  ],
};

export const checkOptions = [List, singeOff];
