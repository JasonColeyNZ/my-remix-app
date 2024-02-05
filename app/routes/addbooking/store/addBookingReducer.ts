// const debug = false;

import type { ClientBookingItemType } from "~/models/booking.server";
import type { ClientsItemType } from "~/models/client.server";

type Service = {
  id: string;
  name: string;
  color: string;
  textColor: string;
};

// export type AddBookingType = {
//   id: string;
//   client: ClientsItemType;
//   services: Service[];
// };

export type AddBookingStateType = {
  // showEditor: boolean;
  activeBooking: ClientBookingItemType;
  postUpdate: boolean;
};

export const initialAddBookingState = {
  // showEditor: false,
  activeBooking: { id: "new", client: null, services: [] },
  postUpdate: false,
};

export enum AddBookingStateTypes {
  // showEditor = "SHOW_EDITOR",
  activeBooking = "ACTIVE_BOOKING",
  setId = "SET_ID",
  selectClient = "SELECT_CLIENT",
  selectServices = "SELECT_SERVICES",
  setPostUpdate = "SET_POST_UPDATE",
}

type AddBookingStatePayload = {
  [AddBookingStateTypes.activeBooking]: {
    activeBooking: ClientBookingItemType | null;
  };
  [AddBookingStateTypes.setId]: {
    id: string;
  };
  [AddBookingStateTypes.selectClient]: {
    selectClient: ClientsItemType | null;
  };
  [AddBookingStateTypes.selectServices]: {
    selectServices: Service[] | null;
  };
  [AddBookingStateTypes.setPostUpdate]: {
    postUpdate: boolean;
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

export type AddBookingStateActions =
  ActionMap<AddBookingStatePayload>[keyof ActionMap<AddBookingStatePayload>];

const AddBookingStateReducer = (
  state: AddBookingStateType,
  action: AddBookingStateActions,
) => {
  switch (action.type) {
    case AddBookingStateTypes.activeBooking:
      // console.log("activeIntegration", action.payload.activeIntegration);
      return {
        ...state,
        activeBooking: action.payload.activeBooking,
      };
    case AddBookingStateTypes.setId:
      // console.log("activeIntegration", action.payload.activeIntegration);
      return {
        ...state,
        activeBooking: {
          ...state.activeBooking,
          id: action.payload.id,
        },
      };
    case AddBookingStateTypes.selectClient:
      // console.log("activeIntegration", action.payload.activeIntegration);
      return {
        ...state,
        activeBooking: {
          ...state.activeBooking,
          client: action.payload.selectClient,
        },
        postUpdate: action.payload.selectClient ? true : false,
      };
    case AddBookingStateTypes.selectServices:
      // console.log("activeIntegration", action.payload.activeIntegration);
      return {
        ...state,
        activeBooking: {
          ...state.activeBooking,
          services: action.payload.selectServices,
        },
        postUpdate: true,
      };
    case AddBookingStateTypes.setPostUpdate:
      // console.log("activeIntegration", action.payload.activeIntegration);
      return {
        ...state,
        postUpdate: action.payload.postUpdate,
      };
    default:
      return state;
  }
};

export default AddBookingStateReducer;
