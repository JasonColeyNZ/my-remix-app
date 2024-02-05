// const debug = false;

type ListTagType = {
  id: string;
  name: string;
};

type listType = {
  id: string;
  listName: string;
  listId: string;
  primary: boolean;
  tags: ListTagType[];
};

export type IntegrationDetailType = {
  id?: string;
  integrationType: string;
  name: string;
  // subject: string;
  shortDescription: string;
  longDescription?: string;
  configurationComponent?: string;
  logo?: string;
  lists?: listType[];

  // primaryListId: string | null;
  // totalItems?: number;
};

export type IntegrationsStateType = {
  showEditor: boolean;
  activeIntegration: IntegrationDetailType | null;
  primaryListId: string | null;
};

export const initialIntegrationsState = {
  showEditor: false,
  activeIntegration: null,
  primaryListId: null,
};

export enum IntegrationsStateTypes {
  showEditor = "SHOW_EDITOR",
  activeIntegration = "ACTIVE_INTEGRATION",
  primaryListId = "PRIMARY_LIST_ID",
}

type IntegrationsStatePayload = {
  [IntegrationsStateTypes.showEditor]: {
    showEditor: boolean;
  };
  [IntegrationsStateTypes.activeIntegration]: {
    activeIntegration: IntegrationDetailType | null;
  };
  [IntegrationsStateTypes.primaryListId]: {
    primaryListId: string | null;
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

export type IntegrationsStateActions =
  ActionMap<IntegrationsStatePayload>[keyof ActionMap<IntegrationsStatePayload>];

const IntegrationsStateReducer = (
  state: IntegrationsStateType,
  action: IntegrationsStateActions,
) => {
  switch (action.type) {
    case IntegrationsStateTypes.showEditor:
      return {
        ...state,
        showEditor: action.payload.showEditor,
      };
    case IntegrationsStateTypes.activeIntegration:
      // console.log("activeIntegration", action.payload.activeIntegration);
      return {
        ...state,
        activeIntegration: action.payload.activeIntegration,
        showEditor: action.payload.activeIntegration !== null,
      };
    case IntegrationsStateTypes.primaryListId:
      // console.log("primaryListId", action.payload.primaryListId);
      return {
        ...state,
        primaryListId: action.payload.primaryListId,
      };
    default:
      return state;
  }
};

export default IntegrationsStateReducer;
