import type { Dispatch } from "react";
import { createContext, useReducer } from "react";

import draggableFormReducer, {
  type DraggableFormStateActions,
  type DraggableFormStateType,
  initialDraggableFormState,
} from "./draggableFormReducer.ts";

export type DraggableFormInitialStateType = {
  formState: DraggableFormStateType;
};

const initialState = {
  formState: initialDraggableFormState,
};

const DraggableFormContext = createContext<{
  state: DraggableFormInitialStateType;
  dispatch: Dispatch<DraggableFormStateActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { formState }: DraggableFormInitialStateType,
  action: DraggableFormStateActions,
) => ({
  formState: draggableFormReducer(formState, action),
});

const DraggableFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  return (
    <DraggableFormContext.Provider value={{ state, dispatch }}>
      {children}
    </DraggableFormContext.Provider>
  );
};

export { DraggableFormContext, DraggableFormProvider };
