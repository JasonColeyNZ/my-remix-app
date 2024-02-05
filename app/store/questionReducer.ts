import type {
  FieldDefinition,
  FieldOptionType,
  FieldType,
  ControlType,
} from "~/components/draggable-forms-editor/types";
import { BlankFieldDefinition } from "~/const";

// const debug = false;

export type QuestionStateType = {
  fieldDefinition: FieldDefinition;
  fieldLabel: string;
  fieldDescription: string;
  editFieldOptionIndex: number;
  checkedOptionValue: number;
  addToForm: boolean;
};

export const initialQuestionState = {
  fieldDefinition: { ...BlankFieldDefinition },
  fieldLabel: "",
  fieldDescription: "",
  editFieldOptionIndex: -1,
  checkedOptionValue: 0,
  addToForm: false,
};

export enum QuestionStateTypes {
  fieldDefinition = "fieldDefinition",
  fieldLabel = "fieldLabel",
  fieldDescription = "fieldDescription",
  addOptions = "addOptions",
  editFieldOptionIndex = "editFieldOptionIndex",
  checkedOptionValue = "checkedOptionValue",
  checkBoxChange = "checkBoxChange",
  updateOption = "updateOption",
  addOption = "addOption",
  deleteOption = "deleteOption",
  textAlign = "textAlign",
  displayColumns = "displayColumns",
  addToForm = "addToForm",
  // controlType = "controlType",
  fieldType = "fieldType",
}

type QuestionStatePayload = {
  [QuestionStateTypes.fieldDefinition]: {
    fieldDefinition: FieldDefinition;
  };
  [QuestionStateTypes.fieldLabel]: {
    fieldLabel: string;
  };
  [QuestionStateTypes.fieldDescription]: {
    fieldDescription: string;
  };
  [QuestionStateTypes.addOptions]: {
    addOptions: FieldOptionType[];
  };
  [QuestionStateTypes.editFieldOptionIndex]: {
    editFieldOptionIndex: number;
  };
  [QuestionStateTypes.checkedOptionValue]: {
    checkedOptionValue: number;
  };
  [QuestionStateTypes.checkBoxChange]: {
    option: FieldOptionType;
  };
  [QuestionStateTypes.updateOption]: {
    updateOption: FieldOptionType;
  };
  [QuestionStateTypes.addOption]: {
    addOption: FieldOptionType;
  };
  [QuestionStateTypes.deleteOption]: {
    deleteOption: FieldOptionType;
  };
  [QuestionStateTypes.textAlign]: {
    textAlign: string;
  };
  [QuestionStateTypes.displayColumns]: {
    displayColumns: number;
  };
  [QuestionStateTypes.addToForm]: {
    addToForm: boolean;
  };
  // [QuestionStateTypes.controlType]: {
  //   controlType: ControlType;
  // };
  [QuestionStateTypes.fieldType]: {
    fieldType: FieldType;
    controlType: ControlType;
  };
};

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type QuestionStateActions =
  ActionMap<QuestionStatePayload>[keyof ActionMap<QuestionStatePayload>];

const questionStateReducer = (
  state: QuestionStateType,
  action: QuestionStateActions,
) => {
  switch (action.type) {
    case QuestionStateTypes.fieldDefinition:
      if (action.payload.fieldDefinition === null) return state;
      let initialValue = 0;
      if (action.payload.fieldDefinition.options)
        action.payload.fieldDefinition.options.forEach((option) => {
          if (option.checked) initialValue += parseInt(option.value.toString());
        });

      return {
        ...state,
        fieldDefinition: {
          ...action.payload.fieldDefinition,
        },
        checkedOptionValue: initialValue,
      };
    case QuestionStateTypes.fieldLabel:
      return {
        ...state,
        fieldDefinition: {
          ...state.fieldDefinition,
          label: action.payload.fieldLabel,
        },
      };
    case QuestionStateTypes.fieldDescription:
      return {
        ...state,
        fieldDefinition: {
          ...state.fieldDefinition,
          description: action.payload.fieldDescription,
        },
      };
    case QuestionStateTypes.addOptions:
      // console.log("addOptions", action.payload.addOptions);
      return {
        ...state,
        fieldDefinition: {
          ...state.fieldDefinition,
          options: action.payload.addOptions,
        },
        checkedOptionValue: 0,
        editFieldOptionIndex: -1,
      };
    case QuestionStateTypes.editFieldOptionIndex:
      return {
        ...state,
        editFieldOptionIndex: action.payload.editFieldOptionIndex,
      };
    case QuestionStateTypes.checkedOptionValue:
      return {
        ...state,
        checkedOptionValue: action.payload.checkedOptionValue,
      };
    case QuestionStateTypes.checkBoxChange:
      if (!action.payload.option) return state;
      if (!state.fieldDefinition) return state;

      //setup the value and options
      let newValue = state.checkedOptionValue;
      const updatedOptions = state.fieldDefinition.options
        ? [...state.fieldDefinition.options]
        : [];

      // console.log(
      //   "checkBoxChange",
      //   newValue,
      //   action.payload.option,
      //   updatedOptions,
      // );

      //handle the checkbox if it is a clear others option
      if (action.payload.option.clearOthers) {
        //uncheck all other options
        updatedOptions.forEach((option) => {
          if (option.value !== action.payload.option.value)
            option.checked = false;
          else option.checked = true;
        });

        newValue = 0;
        if (action.payload.option.checked) {
          newValue = parseInt(action.payload.option.value.toString());
        }
        // console.log(
        //   "checkBoxChange",
        //   newValue,
        //   action.payload.option,
        //   updatedOptions,
        // );
      } else {
        //handle the checkbox if it is a normal option
        //we need to add values together if we are being checked
        // console.log("checkBoxChange", action.payload.option);
        //uncheck the clear others options
        newValue = 0;
        updatedOptions.forEach((option) => {
          if (option.clearOthers) option.checked = false;
          else if (option.checked)
            newValue += parseInt(option.value.toString());
        });

        // if (action.payload.option.checked) {
        //   newValue += parseInt(action.payload.option.value.toString());
        // } else {
        //   newValue -= parseInt(action.payload.option.value.toString());
        // }
      }
      // console.log(
      //   "checkBoxChange",
      //   newValue,
      //   action.payload.option,
      //   updatedOptions,
      // );
      return {
        ...state,
        checkedOptionValue: newValue,
        fieldDefinition: {
          ...state.fieldDefinition,
          options: [...updatedOptions],
        },
      };
    case QuestionStateTypes.updateOption:
      // if (action.payload.updateOption === null) return state;
      // console.log(
      //   "updateOption",
      //   state.editFieldOptionIndex,
      //   action.payload.updateOption,
      //   state.fieldDefinition.options,
      // );
      if (!state.fieldDefinition) return state;
      const options = state.fieldDefinition.options || [];

      if (state.editFieldOptionIndex > -1) {
        options[state.editFieldOptionIndex] = action.payload.updateOption;
      }
      return {
        ...state,
        fieldDefinition: {
          ...state.fieldDefinition,
          options: options,
        },
      };
    case QuestionStateTypes.addOption:
      if (!state.fieldDefinition) return state;
      const newOptions = state.fieldDefinition.options
        ? [...state.fieldDefinition.options]
        : [];
      newOptions.push({ ...action.payload.addOption });
      return {
        ...state,
        fieldDefinition: {
          ...state.fieldDefinition,
          options: newOptions,
        },
      };
    case QuestionStateTypes.deleteOption:
      if (!state.fieldDefinition) return state;
      const deleteOptions = state.fieldDefinition.options
        ? [...state.fieldDefinition.options]
        : [];
      deleteOptions.splice(state.editFieldOptionIndex, 1);
      return {
        ...state,
        editFieldOptionIndex: -1,
        fieldDefinition: {
          ...state.fieldDefinition,
          options: deleteOptions,
        },
      };
    case QuestionStateTypes.textAlign:
      if (!state.fieldDefinition) return state;
      return {
        ...state,
        fieldDefinition: {
          ...state.fieldDefinition,
          displayOptions: {
            ...state.fieldDefinition.displayOptions,
            textAlign: action.payload.textAlign,
          },
        },
      };
    case QuestionStateTypes.displayColumns:
      if (!state.fieldDefinition) return state;
      return {
        ...state,
        fieldDefinition: {
          ...state.fieldDefinition,
          displayOptions: {
            ...state.fieldDefinition.displayOptions,
            displayColumns: action.payload.displayColumns,
          },
        },
      };
    case QuestionStateTypes.addToForm:
      return {
        ...state,
        fieldDefinition: {
          ...state.fieldDefinition,
          addToForm: action.payload.addToForm,
        },
      };
    // case QuestionStateTypes.controlType:
    //   return {
    //     ...state,
    //     fieldDefinition: {
    //       ...state.fieldDefinition,
    //       controlType: action.payload.controlType,
    //     },
    //   };
    case QuestionStateTypes.fieldType:
      return {
        ...state,
        fieldDefinition: {
          ...state.fieldDefinition,
          controlType: action.payload.controlType,
          fieldType: action.payload.fieldType,
        },
      };
    default:
      return state;
  }
};

export default questionStateReducer;
