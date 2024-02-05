// const debug = false;

// export type FormStateType = {
//   formEditor: boolean;
//   fullScreen: boolean;
//   recordEditor: boolean;
//   preview: boolean;
// };

// export const initialFormState = {
//   formEditor: false,
//   fullScreen: false,
//   recordEditor: false,
//   preview: false,
// };

// export enum FormStateTypes {
//   formEditor = "FORM_EDITOR",
//   fullScreen = "FULL_SCREEN",
//   recordEditor = "RECORD_EDITOR",
//   preview = "PREVIEW",

// }

// type FormStatePayload = {
//   [FormStateTypes.formEditor]: {
//     formEditor: boolean;
//   };
//   [FormStateTypes.fullScreen]: {
//     fullScreen: boolean;
//   };
//   [FormStateTypes.recordEditor]: {
//     recordEditor: boolean;
//   };
//   [FormStateTypes.preview]: {
//     preview: boolean;
//   };
// };

// type ActionMap<M extends { [index: string]: any }> = {
//   [Key in keyof M]: M[Key] extends undefined
//     ? {
//         type: Key;
//       }
//     : {
//         type: Key;
//         payload: M[Key];
//       };
// };

// export type FormStateActions =
//   ActionMap<FormStatePayload>[keyof ActionMap<FormStatePayload>];

// const formStateReducer = (state: FormStateType, action: FormStateActions) => {
//   switch (action.type) {
//     case FormStateTypes.formEditor: {
//       if (debug)
//         console.log("formStateReducer formEditor", action.payload.formEditor);

//       return {
//         ...state,
//         recordEditor: false,
//         formEditor: action.payload.formEditor,
//       };
//     }
//     case FormStateTypes.fullScreen: {
//       if (debug)
//         console.log("formStateReducer fullScreen", action.payload.fullScreen);
//       return {
//         ...state,
//         fullScreen: action.payload.fullScreen,
//       };
//     }
//     case FormStateTypes.recordEditor: {
//       if (debug)
//         console.log(
//           "formStateReducer recordEditor",
//           action.payload.recordEditor,
//         );
//       return {
//         ...state,
//         formEditor: false,
//         recordEditor: action.payload.recordEditor,
//       };
//     }
//     case FormStateTypes.preview: {
//       if (debug) console.log("formStateReducer preview", action.payload.preview);
//       return {
//         ...state,
//         preview: action.payload.preview,
//       };
//     }
//     default:
//       return state;
//   }
// };

// export default formStateReducer;
