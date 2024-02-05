import type { Dispatch } from "react";
import { createContext, useReducer } from "react";

import schedulerReducer, {
  type SchedulerStateActions,
  type SchedulerStateType,
  initialSchedulerState,
} from "./schedulerReducer.ts";

import questionReducer, {
  type QuestionStateActions,
  type QuestionStateType,
  initialQuestionState,
} from "./questionReducer.ts";

import formReducer, {
  type FormStateActions,
  type FormStateType,
  initialFormState,
} from "./formReducer.ts";
// import type {
//   NavigationActions,
//   NavigationStateType,
// } from "./navigationReducer.ts";
// import navigationReducer, {
//   initialNavigationState,
// } from "./navigationReducer.ts";

type InitialStateType = {
  // navigation: NavigationStateType;
  formState: FormStateType;
  questionState: QuestionStateType;
  schedulerState: SchedulerStateType;
};

const initialState = {
  // navigation: initialNavigationState,
  formState: initialFormState,
  questionState: initialQuestionState,
  schedulerState: initialSchedulerState,
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<
    // | NavigationActions
    FormStateActions | QuestionStateActions | SchedulerStateActions
  >;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { formState, questionState, schedulerState }: InitialStateType,
  action: // | NavigationActions
  FormStateActions | QuestionStateActions | SchedulerStateActions,
) => ({
  // navigation: navigationReducer(navigation, action as NavigationActions),
  formState: formReducer(formState, action as FormStateActions),
  questionState: questionReducer(questionState, action as QuestionStateActions),
  schedulerState: schedulerReducer(
    schedulerState,
    action as SchedulerStateActions,
  ),
});

const AppProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
