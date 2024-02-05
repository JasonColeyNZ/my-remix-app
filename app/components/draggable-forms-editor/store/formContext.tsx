// import type { Dispatch } from "react";
// import { createContext, useReducer } from "react";

// import formReducer, {
//   type FormStateActions,
//   type FormStateType,
//   initialFormState,
// } from "./formReducer.ts";

// export type FormInitialStateType = {
//   formState: FormStateType;
// };

// const initialState = {
//   formState: initialFormState,
// };

// const FormContext = createContext<{
//   state: FormInitialStateType;
//   dispatch: Dispatch<FormStateActions>;
// }>({
//   state: initialState,
//   dispatch: () => null,
// });

// const mainReducer = (
//   { formState }: FormInitialStateType,
//   action: FormStateActions,
// ) => ({
//   formState: formReducer(formState, action),
// });

// const FormProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [state, dispatch] = useReducer(mainReducer, initialState);
//   return (
//     <FormContext.Provider value={{ state, dispatch }}>
//       {children}
//     </FormContext.Provider>
//   );
// };

// export { FormContext, FormProvider };
