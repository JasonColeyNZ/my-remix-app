import { QuestionControlType, type RadioType } from "../editor-question-types";

const TrueFalse: RadioType = {
  type: QuestionControlType.radio,
  text: "True, False",
  value: 0,
  options: [
    { text: "True", value: 2, sortOrder: 0 },
    { text: "False", value: 1, sortOrder: 1 },
  ],
};

const YesNo: RadioType = {
  type: QuestionControlType.radio,
  text: "Yes, No",
  value: 1,
  options: [
    { text: "Yes", value: 2, sortOrder: 0 },
    { text: "No", value: 1, sortOrder: 1 },
  ],
};

const YesMoreInfoNo: RadioType = {
  type: QuestionControlType.radio,
  text: "Yes -> More Info, No",
  value: 2,
  options: [
    { text: "Yes", value: 2, textBox: "More Info..", sortOrder: 0 },
    { text: "No", value: 1, sortOrder: 1 },
  ],
};

const YesNoMoreInfo: RadioType = {
  type: QuestionControlType.radio,
  text: "Yes, No -> More Info",
  value: 3,
  options: [
    { text: "Yes", value: 2, sortOrder: 0 },
    { text: "No", value: 1, textBox: "More Info...", sortOrder: 1 },
  ],
};

export const radioOptions = [TrueFalse, YesNo, YesMoreInfoNo, YesNoMoreInfo];
