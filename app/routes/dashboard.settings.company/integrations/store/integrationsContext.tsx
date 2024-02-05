import type { Dispatch } from "react";
import { createContext, useReducer } from "react";

import integrationReducer, {
  type IntegrationsStateActions,
  type IntegrationsStateType,
  initialIntegrationsState,
} from "./integrationsReducer.ts";

type InitialStateType = {
  integrationsState: IntegrationsStateType;
};

const initialState = {
  integrationsState: initialIntegrationsState,
};

const IntegrationsContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<IntegrationsStateActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { integrationsState }: InitialStateType,
  action: IntegrationsStateActions,
) => ({
  integrationsState: integrationReducer(
    integrationsState,
    action as IntegrationsStateActions,
  ),
});

const IntegrationsProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  return (
    <IntegrationsContext.Provider value={{ state, dispatch }}>
      {children}
    </IntegrationsContext.Provider>
  );
};

export { IntegrationsContext, IntegrationsProvider };
