// import { createContext, useState } from "react";

// type ContextType = {
//   pageHeaderObject?: any;
//   setPageHeaderObject?: (value: any) => void;
// };

// const defaultContext: ContextType = {
//   pageHeaderObject: null,
//   setPageHeaderObject: () => {},
// };

// interface NavigationContextProviderProps {
//   children: any;
// }

// export const PageHeaderObjectContext =
//   createContext<ContextType>(defaultContext);

// export const PageHeaderContextProvider = ({
//   children,
// }: NavigationContextProviderProps) => {
//   const [pageHeaderObject, setPageHeaderObject] = useState<any>(null);

//   console.log("state.pageHeaderObject", pageHeaderObject);
//   return (
//     <PageHeaderObjectContext.Provider
//       value={{ pageHeaderObject, setPageHeaderObject }}
//     >
//       {children}
//     </PageHeaderObjectContext.Provider>
//   );
// };
