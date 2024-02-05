import type { EditorTypeEnum } from "~/utils/types";

const debug = false;

export type FormStateType = {
  formEditor: boolean;
  fullScreen: boolean;
  recordEditors: string[];
  preview: boolean;
  refreshRichtextEditor: boolean;
  showEditor: EditorTypeEnum | null;
};

export const initialFormState = {
  formEditor: false,
  fullScreen: false,
  recordEditors: [],
  preview: false,
  refreshRichtextEditor: false,
  showEditor: null,
};

export enum FormStateTypes {
  formEditor = "FORM_EDITOR",
  fullScreen = "FULL_SCREEN",
  addRecordEditor = "ADD_RECORD_EDITOR",
  removeRecordEditor = "REMOVE_RECORD_EDITOR",
  preview = "PREVIEW",
  refreshRichtextEditor = "REFRESH_RICHTEXT_EDITOR",
  showEditor = "SHOW_EDITOR",
}

type FormStatePayload = {
  [FormStateTypes.formEditor]: {
    formEditor: boolean;
  };
  [FormStateTypes.fullScreen]: {
    fullScreen: boolean;
  };
  [FormStateTypes.addRecordEditor]: {
    recordEditor: string;
  };
  [FormStateTypes.removeRecordEditor]: {
    recordEditor: string;
  };
  [FormStateTypes.preview]: {
    preview: boolean;
  };
  [FormStateTypes.refreshRichtextEditor]: {
    refreshRichtextEditor: boolean;
  };
  [FormStateTypes.showEditor]: {
    showEditor: EditorTypeEnum | null;
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

export type FormStateActions =
  ActionMap<FormStatePayload>[keyof ActionMap<FormStatePayload>];

const formStateReducer = (state: FormStateType, action: FormStateActions) => {
  switch (action.type) {
    case FormStateTypes.formEditor: {
      if (debug)
        console.log("formStateReducer formEditor", action.payload.formEditor);

      return {
        ...state,
        recordEditor: false,
        formEditor: action.payload.formEditor,
      };
    }
    case FormStateTypes.fullScreen: {
      if (debug)
        console.log("formStateReducer fullScreen", action.payload.fullScreen);
      return {
        ...state,
        fullScreen: action.payload.fullScreen,
      };
    }
    case FormStateTypes.addRecordEditor: {
      if (debug)
        console.log(
          "formStateReducer addRecordEditor",
          action.payload.recordEditor,
        );
      return {
        ...state,
        recordEditors: [
          ...state.recordEditors.filter(
            (recordEditor) => recordEditor !== action.payload.recordEditor,
          ),
          action.payload.recordEditor,
        ],
      };
    }
    case FormStateTypes.removeRecordEditor: {
      if (debug)
        console.log(
          "formStateReducer removeRecordEditor",
          action.payload.recordEditor,
        );
      return {
        ...state,
        recordEditors: state.recordEditors.filter(
          (recordEditor) => recordEditor !== action.payload.recordEditor,
        ),
      };
    }
    case FormStateTypes.preview: {
      if (debug)
        console.log("formStateReducer preview", action.payload.preview);
      return {
        ...state,
        preview: action.payload.preview,
      };
    }
    case FormStateTypes.refreshRichtextEditor: {
      if (debug)
        console.log(
          "formStateReducer refreshRichtextEditor",
          action.payload.refreshRichtextEditor,
        );
      return {
        ...state,
        refreshRichtextEditor: action.payload.refreshRichtextEditor,
      };
    }
    case FormStateTypes.showEditor: {
      if (debug)
        console.log("formStateReducer showEditor", action.payload.showEditor);
      return {
        ...state,
        showEditor: action.payload.showEditor,
      };
    }
    default:
      return state;
  }
};

export default formStateReducer;
