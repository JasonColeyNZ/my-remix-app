import { updateNestedProperty } from "../formUtils.ts";
import type {
  FieldDefinition,
  FieldOptionType,
  FormDefinition,
  FormFieldDefinition,
  FormType,
  UpdateControlPropertyType,
} from "../types.ts";

const debug = false;

export type DraggableFormStateType = {
  editMode: boolean;
  controlModified: boolean;
  // clearSelections: null;
  selectedForm: FormType | null;
  selectedControl: FormFieldDefinition | null;
  deleteSelectedControl?: null;
  //updateSelectedControl?: FormFieldDefinition | null;
  selectedRowId: string | null;
  formModified: boolean;
  formDefinition: FormDefinition | null;
  addFieldOption?: null;
  editFieldOptionIndex?: number | null;
  // updateSelectedControlProperty?: UpdateControlPropertyType | null;
  saveSelectedControlToForm?: null;
  selectedFieldId?: string | null;
};

export const initialDraggableFormState = {
  editMode: false,
  controlModified: false,
  // clearSelections: null,
  selectedForm: null,
  selectedControl: null,
  selectedRowId: null,
  formModified: false,
  formDefinition: null,
  // updateSelectedControlProperty: null,
  selectedFieldId: null,
  editFieldOptionIndex: null,
};

export enum DraggableFormStateTypes {
  editMode = "EDIT_MODE",
  controlModified = "CONTROL_MODIFIED",
  clearSelections = "CLEAR_SELECTIONS",
  selectedControl = "SELECTED_CONTROL",
  deleteSelectedControl = "DELETE_SELECTED_CONTROL",
  //updateSelectedControl = "UPDATE_SELECTED_CONTROL",
  selectedRowId = "SELECTED_ROW_ID",
  formModified = "FORM_MODIFIED",
  formDefinition = "FORM_DEFINITION",
  addFieldOption = "ADD_FIELD_OPTION",
  editFieldOptionIndex = "EDIT_FIELD_OPTION_INDEX",
  updateSelectedControlProperty = "UPDATE_SELECTED_CONTROL_PROPERTY",
  selectedForm = "SELECTED_FORM",
  saveSelectedControlToForm = "SAVE_SELECTED_CONTROL_TO_FORM",
  selectFieldById = "SELECT_FIELD_BY_ID",
  addFieldToNewRow = "ADD_FIELD_TO_NEW_ROW",
}

type DraggableFormStatePayload = {
  [DraggableFormStateTypes.editMode]: {
    editMode: boolean;
  };
  [DraggableFormStateTypes.controlModified]: {
    controlModified: boolean;
  };
  [DraggableFormStateTypes.clearSelections]: {};
  [DraggableFormStateTypes.selectedControl]: {
    selectedControl: FormFieldDefinition | null;
  };
  [DraggableFormStateTypes.deleteSelectedControl]: {};
  // [DraggableFormStateTypes.updateSelectedControl]: {
  //   updateSelectedControl: FormFieldDefinition | null;
  // };
  [DraggableFormStateTypes.selectedRowId]: {
    selectedRowId: string | null;
  };
  [DraggableFormStateTypes.formModified]: {
    formModified: boolean;
  };
  [DraggableFormStateTypes.formDefinition]: {
    formDefinition: FormDefinition;
  };
  [DraggableFormStateTypes.addFieldOption]: {};
  [DraggableFormStateTypes.editFieldOptionIndex]: {
    editFieldOptionIndex: number | null;
  };
  [DraggableFormStateTypes.updateSelectedControlProperty]: {
    updateSelectedControlProperty: UpdateControlPropertyType | null;
  };
  [DraggableFormStateTypes.selectedForm]: {
    selectedForm: FormType | null;
  };
  [DraggableFormStateTypes.saveSelectedControlToForm]: {};
  [DraggableFormStateTypes.selectFieldById]: { id: string | null };
  [DraggableFormStateTypes.addFieldToNewRow]: { field: FieldDefinition };
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

export type DraggableFormStateActions =
  ActionMap<DraggableFormStatePayload>[keyof ActionMap<DraggableFormStatePayload>];

const draggableFormStateReducer = (
  state: DraggableFormStateType,
  action: DraggableFormStateActions,
) => {
  switch (action.type) {
    case DraggableFormStateTypes.clearSelections: {
      if (state.selectedControl === null && state.selectedRowId === null)
        return state;
      if (debug) console.log("formStateReducer clearSelections");
      return {
        ...state,
        selectedControl: null,
        selectedRowId: null,
        selectedFieldId: null,
        editMode: false,
      };
    }
    case DraggableFormStateTypes.editMode: {
      if (debug)
        console.log("formStateReducer editMode", action.payload.editMode);
      return {
        ...state,
        editMode: action.payload.editMode,
      };
    }
    case DraggableFormStateTypes.controlModified: {
      if (debug)
        console.log(
          "formStateReducer controlModified",
          action.payload.controlModified,
        );
      return {
        ...state,
        controlModified: action.payload.controlModified,
      };
    }
    case DraggableFormStateTypes.selectedControl: {
      if (
        !action.payload.selectedControl ||
        (state.selectedControl &&
          state.selectedControl.id === action.payload.selectedControl.id)
      )
        return state;

      if (debug)
        console.log(
          "formStateReducer selectedControl",
          action.payload.selectedControl,
        );

      return {
        ...state,
        selectedControl: action.payload.selectedControl,
        selectedFieldId: action.payload.selectedControl.id,
        selectedRowId: null,
        editMode: false,
        controlModified: false,
      };
    }
    case DraggableFormStateTypes.deleteSelectedControl: {
      if (
        !state.formDefinition ||
        (!state.selectedControl && !state.selectedRowId)
      )
        return state;

      if (debug) console.log("formStateReducer deleteSelectedControl");
      const newForm = { ...state.formDefinition };

      if (state.selectedRowId) {
        newForm.rows = newForm.rows.filter(
          (row) => row.id !== state.selectedRowId,
        );
      }

      if (state.selectedControl !== null) {
        newForm.rows.forEach((row) => {
          //console.log("row", row);
          row.controls = row.controls.filter(
            (control) => control.id !== state.selectedControl!.id,
          );
        });
      }

      //update sortOrder for rows
      newForm.rows.forEach((row, index) => {
        row.sortOrder = index;
      });

      //console.log('newForm', newForm)
      return {
        ...state,
        formDefinition: newForm,
        selectedControl: null,
        selectedFieldId: null,
        selectedRowId: null,
        formModified: true,
        editMode: false,
        controlModified: false,
      };
    }
    // case DraggableFormStateTypes.updateSelectedControl: {
    //   console.log("formStateReducer updateSelectedControl", action.payload.updateSelectedControl);
    //   if (!state.formDefinition || !action.payload.updateSelectedControl) return state;

    //   const newForm = { ...state.formDefinition };
    //   newForm.rows.forEach((row) => {
    //     row.controls.forEach((control) => {
    //       if (action.payload!.updateSelectedControl)
    //         if (control.id === action.payload.updateSelectedControl.id) {
    //           console.log("found control: ", control);
    //           control.label = action.payload.updateSelectedControl.label;
    //           control.colSpan = action.payload.updateSelectedControl.colSpan;
    //           control.field = { ...action.payload.updateSelectedControl.field };
    //         }
    //     });
    //   });

    //   return {
    //     ...state,
    //     formDefinition: newForm,
    //     formModified: true,
    //   };
    // };
    case DraggableFormStateTypes.updateSelectedControlProperty: {
      if (!state.selectedControl || !state.formDefinition) return state;

      const control = state.selectedControl;
      if (!action.payload.updateSelectedControlProperty) return state;

      const { id, value } = action.payload.updateSelectedControlProperty;
      if (debug)
        console.log(
          "formStateReducer updateSelectedControlProperty",
          control,
          id,
          value,
        );
      updateNestedProperty(control, id, value);

      //some fields are saved to the formDefinition so do we save here?
      //console.log("formStateReducer updateSelectedControlProperty", control);
      //console.log("formStateReducer originalControlProperty", state.originalSelectedControl);
      return {
        ...state,
        selectedControl: control,
        controlModified: true,
      };
    }
    case DraggableFormStateTypes.addFieldOption: {
      if (!state.selectedControl || !state.formDefinition) return state;

      const control = state.selectedControl;
      if (!control.field.options)
        control.field.options = [] as Array<FieldOptionType>;

      //change all other options to not editing
      control.field.options.forEach((option) => {
        option.editing = false;
      });

      control.field.options.push({
        text: "New option",
        textBox: "",
        value: 0,
        sortOrder: control.field.options.length,
        editing: true,
      });

      return {
        ...state,
        editFieldOptionIndex: control.field.options.length - 1,
        selectedControl: control,
        controlModified: true,
      };
    }
    case DraggableFormStateTypes.editFieldOptionIndex: {
      if (!state.selectedControl || !state.formDefinition) return state;

      const control = state.selectedControl;
      if (!control.field.options)
        control.field.options = [] as Array<FieldOptionType>;

      control.field.options.forEach((option) => {
        option.editing = false;
      });

      if (action.payload.editFieldOptionIndex !== null) {
        control.field.options[action.payload.editFieldOptionIndex].editing =
          true;
      }

      return {
        ...state,
        selectedControl: control,
        editFieldOptionIndex: action.payload.editFieldOptionIndex,
      };
    }
    case DraggableFormStateTypes.selectedRowId: {
      if (!action.payload.selectedRowId) return state;

      if (debug)
        console.log(
          "formStateReducer selectedRowId",
          action.payload.selectedRowId,
        );
      return {
        ...state,
        selectedControl: null,
        selectedControlId: null,
        SelectedFieldId: null,
        selectedRowId: action.payload.selectedRowId,
      };
    }
    case DraggableFormStateTypes.formModified: {
      if (debug)
        console.log(
          "formStateReducer formModified",
          action.payload.formModified,
        );
      return {
        ...state,
        formModified: action.payload.formModified,
      };
    }
    case DraggableFormStateTypes.formDefinition: {
      if (debug)
        console.log(
          "formStateReducer formDefinition",
          action.payload.formDefinition,
        );
      // let selectedControl = null;

      //field isn't on the form when we create a new field
      // if (state.selectedFieldId) {
      //   console.log("formStateReducer formDefinition selectedFieldId", state.selectedFieldId)
      //   const newForm = { ...action.payload.formDefinition };
      //   newForm.rows.forEach((row) => {
      //     row.controls.forEach((control) => {
      //       console.log('control', control.id)
      //       if (control.id === state.selectedFieldId) {
      //         console.log("found control: ", control)
      //         selectedControl = control;
      //       };
      //     });
      //   });
      // }

      return {
        ...state,
        selectedControl: null,
        selectedRowId: null,
        selectedFieldId: null,
        editMode: false,
        //        selectedControl,
        formDefinition: action.payload.formDefinition,
      };
    }
    case DraggableFormStateTypes.selectedForm: {
      if (debug)
        console.log(
          "formStateReducer selectedForm",
          action.payload.selectedForm,
        );
      return {
        ...state,
        selectedControl: null,
        selectedRowId: null,
        selectedFieldId: null,
        editMode: false,
        selectedForm: action.payload.selectedForm,
      };
    }
    case DraggableFormStateTypes.saveSelectedControlToForm: {
      if (!state.selectedControl || !state.formDefinition) return state;
      if (debug)
        console.log(
          "formStateReducer saveSelectedControlToForm",
          state.selectedControl,
        );

      const control = state.selectedControl;
      console.log("control", control);
      const newForm = { ...state.formDefinition };

      newForm.rows.forEach((row) => {
        row.controls.forEach((c) => {
          if (c.id === control.id) {
            c.label = control.label;
            c.colSpan = control.colSpan;
            c.field = { ...control.field };
          }
        });
      });

      return {
        ...state,
        editMode: false,
        formDefinition: newForm,
        formModified: true,
        controlModified: false,
      };
    }
    case DraggableFormStateTypes.selectFieldById: {
      if (!action.payload.id) return state;
      if (debug)
        console.log("formStateReducer selectFieldById", action.payload.id);

      if (!state.formDefinition)
        return { ...state, selectedFieldId: action.payload.id };

      const newForm = { ...state.formDefinition };
      let selectedControl = null;
      newForm.rows.forEach((row) => {
        row.controls.forEach((control) => {
          if (control.id === action.payload.id) {
            selectedControl = control;
          }
        });
      });

      return {
        ...state,
        selectedControl,
        selectedFieldId: action.payload.id,
        selectedRowId: null,
      };
    }
    case DraggableFormStateTypes.addFieldToNewRow: {
      if (!action.payload.field) return state;
      if (debug)
        console.log("formStateReducer addFieldToNewRow", action.payload.field);

      if (!state.formDefinition) return state;

      const formField = {
        id: action.payload.field.id,
        label: action.payload.field.label,
        colSpan: 0,
        sortOrder: 0,
        fieldType: action.payload.field.fieldType,
        field: action.payload.field,
      };

      const newForm = { ...state.formDefinition };
      const newRow = {
        id: "newRow",
        sortOrder: newForm.rows.length,
        controls: [formField],
      };
      newForm.rows.push(newRow);

      return {
        ...state,
        formDefinition: newForm,
        formModified: false,
        // selectedControl: action.payload.field,
        // selectedFieldId: action.payload.field.id,
        //selectedRowId: newRow.id,
      };
    }

    default:
      return state;
  }
};

export default draggableFormStateReducer;
