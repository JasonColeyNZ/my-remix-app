import type { Dispatch } from "react";
import { createContext, useReducer } from "react";

import addBookingReducer, {
  type AddBookingStateActions,
  type AddBookingStateType,
  initialAddBookingState,
} from "./addBookingReducer.ts";

type InitialStateType = {
  addBookingState: AddBookingStateType;
};

const initialState = {
  addBookingState: initialAddBookingState,
};

const AddBookingContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<AddBookingStateActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { addBookingState }: InitialStateType,
  action: AddBookingStateActions,
) => ({
  addBookingState: addBookingReducer(
    addBookingState,
    action as AddBookingStateActions,
  ),
});

const AddBookingProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  return (
    <AddBookingContext.Provider value={{ state, dispatch }}>
      {children}
    </AddBookingContext.Provider>
  );
};

export { AddBookingContext, AddBookingProvider };
