// import { createContext, useState } from "react";
// import type { TabType } from "~/utils/types";

// type ContextType = {
//   title?: string;
//   setTitle?: (value: string) => void;

//   addClicked: boolean;
//   setAddClicked: (value: boolean) => void;

//   saveClicked: boolean;
//   setSaveClicked: (value: boolean) => void;

//   saveEnabled: boolean;
//   setSaveEnabled?: (value: boolean) => void;

//   cancelClicked?: boolean;
//   setCancelClicked?: (value: boolean) => void;

//   cancelEnabled: boolean;
//   setCancelEnabled?: (value: boolean) => void;

//   selectButtonDisabled?: boolean;
//   setSelectButtonDisabled?: (value: boolean) => void;

//   drawerOpen?: boolean;
//   setDrawerOpen?: (value: boolean) => void;

//   alternativeTabs?: TabType[];
//   setAlternativeTabs?: (value: any) => void;

//   alternativeTabSelectedId?: string;
//   setAlternativeTabSelectedId?: (value: string) => void;
// };

// const defaultContext: ContextType = {
//   title: "",
//   setTitle: () => {},

//   addClicked: false,
//   setAddClicked: () => {},

//   saveClicked: false,
//   setSaveClicked: () => {},

//   saveEnabled: false,
//   setSaveEnabled: () => {},

//   cancelClicked: false,
//   setCancelClicked: () => {},

//   cancelEnabled: false,
//   setCancelEnabled: () => {},

//   drawerOpen: false,
//   setDrawerOpen: () => {},

//   selectButtonDisabled: false,
//   setSelectButtonDisabled: () => {},

//   alternativeTabs: [],
//   setAlternativeTabs: () => {},

//   alternativeTabSelectedId: "",
//   setAlternativeTabSelectedId: () => {},
// };

// interface NavigationContextProviderProps {
//   //defaultContext: ContextType;
//   children: any;
// }

// export const NavigationContext = createContext<ContextType>(defaultContext);

// export const NavigationContextProvider = ({
//   children,
// }: NavigationContextProviderProps) => {
//   const setTitle = (title: string) => {
//     setState({ ...state, title });
//   };

//   const setAddClicked = (addClicked: boolean) => {
//     setState({ ...state, addClicked });
//   };

//   const setSaveClicked = (saveClicked: boolean) => {
//     setState({ ...state, saveClicked });
//   };

//   const setAlternativeTabs = (alternativeTabs: TabType[]) => {
//     setState({ ...state, alternativeTabs });
//   };

//   const setAlternativeTabSelectedId = (alternativeTabSelectedId: string) => {
//     setState({ ...state, alternativeTabSelectedId });
//   };

//   const setSaveEnabled = (saveEnabled: boolean) => {
//     setState({ ...state, saveEnabled });
//   };

//   const setDrawerOpen = (drawerOpen: boolean) => {
//     setState({ ...state, drawerOpen });
//   };

//   const setCancelClicked = (cancelClicked: boolean) => {
//     setState({ ...state, cancelClicked });
//   };

//   const setCancelEnabled = (cancelEnabled: boolean) => {
//     setState({ ...state, cancelEnabled });
//   };

//   const setSelectButtonDisabled = (selectButtonDisabled: boolean) => {
//     setState({ ...state, selectButtonDisabled });
//   };

//   const initState = {
//     ...defaultContext,

//     setTitle,
//     setAddClicked,
//     setSaveEnabled,
//     setSaveClicked,
//     setAlternativeTabs,
//     setAlternativeTabSelectedId,
//     setDrawerOpen,
//     setCancelClicked,
//     setCancelEnabled,
//     setSelectButtonDisabled,
//   };

//   const [state, setState] = useState(initState);
//   console.log("NavigationContextProvider.render");
//   return (
//     <NavigationContext.Provider value={state}>
//       {children}
//     </NavigationContext.Provider>
//   );
// };
