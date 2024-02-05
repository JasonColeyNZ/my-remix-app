// import type { TabType } from "~/utils/types.ts";

// export type NavigationStateType = {
//   title?: string;
//   addClicked: boolean;
//   editMode: boolean;
//   editEnabled: boolean;
//   saveClicked: boolean;
//   saveEnabled: boolean;
//   cancelClicked?: boolean;
//   // cancelEnabled: boolean;
//   selectButtonDisabled?: boolean;
//   drawerOpen?: boolean;
//   alternativeTabs?: TabType[];
//   alternativeTabSelectedId?: string;
//   alternativeTabQueryParam?: string;
//   pageHeaderObject?: any;
//   objectId?: string;
//   objectType?: string;
// };

// export const initialNavigationState = {
//   title: "",
//   addClicked: false,
//   editMode: false,
//   editEnabled: true,
//   saveClicked: false,
//   saveEnabled: false,
//   cancelClicked: false,
//   // cancelEnabled: false,
//   drawerOpen: false,
//   selectButtonDisabled: false,
//   alternativeTabs: [],
//   alternativeTabSelectedId: "",
//   alternativeTabQueryParam: "",
//   pageHeaderObject: null,
//   objectId: "",
//   objectType: "",
// };

// export enum NavigationTypes {
//   setTitle = "SET_TITLE",
//   addClicked = "ADD_CLICKED",
//   editMode = "EDIT_MODE",
//   editEnabled = "EDIT_ENABLED",
//   saveClicked = "SAVE_CLICKED",
//   saveEnabled = "SAVE_ENABLED",
//   cancelClicked = "CANCEL_CLICKED",
//   // cancelEnabled = "CANCEL_ENABLED",
//   drawerOpen = "DRAWER_OPEN",
//   selectButtonDisabled = "SELECT_BUTTON_DISABLED",
//   alternativeTabs = "ALTERNATIVE_TABS",
//   alternativeTabSelectedId = "ALTERNATIVE_TAB_SELECTED_ID",
//   alternativeTabQueryParam = "ALTERNATIVE_TAB_QUERY_PARAM",
//   setPageHeaderObject = "SET_PAGE_HEADER_OBJECT",
//   setObjectId = "SET_OBJECT_ID",
//   setObjectType = "SET_OBJECT_TYPE",
// }

// type NavigationPayload = {
//   [NavigationTypes.setTitle]: { title: string };
//   [NavigationTypes.addClicked]: { clicked: boolean };
//   [NavigationTypes.editEnabled]: { enabled: boolean };
//   [NavigationTypes.editMode]: { enabled: boolean };
//   [NavigationTypes.saveClicked]: { clicked: boolean };
//   [NavigationTypes.saveEnabled]: { enabled: boolean };
//   [NavigationTypes.cancelClicked]: { clicked: boolean };
//   // [NavigationTypes.cancelEnabled]: { enabled: boolean };
//   [NavigationTypes.drawerOpen]: { open: boolean };
//   [NavigationTypes.selectButtonDisabled]: { disabled: boolean };
//   [NavigationTypes.alternativeTabs]: { tabs: TabType[] };
//   [NavigationTypes.alternativeTabSelectedId]: { id: string };
//   [NavigationTypes.alternativeTabQueryParam]: { queryParam: string };
//   [NavigationTypes.setPageHeaderObject]: { object: any };
//   [NavigationTypes.setObjectId]: { id: string };
//   [NavigationTypes.setObjectType]: { type: string };
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
// export type NavigationActions =
//   ActionMap<NavigationPayload>[keyof ActionMap<NavigationPayload>];

// const showDebug = false;

// const navigationReducer = (
//   state: NavigationStateType,
//   action: NavigationActions,
// ) => {
//   //console.log("navigationReducer", action.type, action.payload);
//   switch (action.type) {
//     case NavigationTypes.setTitle: {
//       if (showDebug)
//         console.log("navigationReducer setTitle", action.payload.title);
//       return {
//         ...state,
//         title: action.payload.title,
//       };
//     }
//     case NavigationTypes.addClicked: {
//       if (showDebug)
//         console.log("navigationReducer addClicked", action.payload.clicked);
//       return {
//         ...state,
//         addClicked: action.payload.clicked,
//       };
//     }
//     case NavigationTypes.editEnabled: {
//       if (showDebug)
//         console.log("navigationReducer editEnabled", action.payload.enabled);
//       return {
//         ...state,
//         editClicked: action.payload.enabled,
//       };
//     }
//     case NavigationTypes.editMode: {
//       if (showDebug)
//         console.log("navigationReducer editMode", action.payload.enabled);
//       return {
//         ...state,
//         editMode: action.payload.enabled,
//       };
//     }
//     case NavigationTypes.saveClicked: {
//       if (showDebug)
//         console.log("navigationReducer saveClicked", action.payload.clicked);
//       return {
//         ...state,
//         saveClicked: action.payload.clicked,
//       };
//     }
//     case NavigationTypes.saveEnabled: {
//       if (showDebug)
//         console.log("navigationReducer saveEnabled", action.payload.enabled);
//       return {
//         ...state,
//         saveEnabled: action.payload.enabled,
//       };
//     }
//     case NavigationTypes.cancelClicked: {
//       if (showDebug)
//         console.log("navigationReducer cancelClicked", action.payload.clicked);
//       return {
//         ...state,
//         cancelClicked: action.payload.clicked,
//       };
//     }
//     // case NavigationTypes.cancelEnabled: {
//     //   if (showDebug)
//     //   console.log("navigationReducer cancelEnabled", action.payload.enabled);
//     //   return {
//     //     ...state,
//     //     cancelEnabled: action.payload.enabled,
//     //   };
//     // }
//     case NavigationTypes.drawerOpen: {
//       if (showDebug)
//         console.log("navigationReducer drawerOpen", action.payload.open);
//       return {
//         ...state,
//         drawerOpen: action.payload.open,
//       };
//     }
//     case NavigationTypes.selectButtonDisabled: {
//       if (showDebug)
//         console.log(
//           "navigationReducer selectButtonDisabled",
//           action.payload.disabled,
//         );
//       return {
//         ...state,
//         selectButtonDisabled: action.payload.disabled,
//       };
//     }
//     case NavigationTypes.alternativeTabs: {
//       if (showDebug)
//         console.log("navigationReducer alternativeTabs", action.payload.tabs);
//       return {
//         ...state,
//         alternativeTabs: action.payload.tabs,
//       };
//     }
//     case NavigationTypes.alternativeTabSelectedId: {
//       if (showDebug)
//         console.log(
//           "navigationReducer alternativeTabSelectedId",
//           action.payload.id,
//         );
//       return {
//         ...state,
//         alternativeTabSelectedId: action.payload.id,
//       };
//     }
//     case NavigationTypes.alternativeTabQueryParam: {
//       if (showDebug)
//         console.log(
//           "navigationReducer alternativeTabQueryParam",
//           action.payload.queryParam,
//         );
//       return {
//         ...state,
//         alternativeTabQueryParam: action.payload.queryParam,
//       };
//     }
//     case NavigationTypes.setPageHeaderObject: {
//       if (showDebug)
//         console.log(
//           "navigationReducer setPageHeaderObject",
//           action.payload.object,
//         );
//       return {
//         ...state,
//         pageHeaderObject: action.payload.object,
//       };
//     }
//     case NavigationTypes.setObjectId: {
//       if (showDebug)
//         console.log("navigationReducer setObjectId", action.payload.id);
//       return {
//         ...state,
//         objectId: action.payload.id,
//       };
//     }
//     case NavigationTypes.setObjectType: {
//       if (showDebug)
//         console.log("navigationReducer setObjectType", action.payload.type);
//       return {
//         ...state,
//         objectType: action.payload.type,
//       };
//     }
//     default:
//       return state;
//   }
// };

// export default navigationReducer;
