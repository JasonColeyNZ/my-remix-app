// import { useContext } from "react";
// import { AppContext } from "~/store/appContext.tsx";
// import { NavigationTypes } from "~/store/navigationReducer.ts";
// import type { TabType } from "~/utils/types.ts";

// interface DrawerButtonProps {
//   selectedTabData: TabType | null;
//   //setDrawerOpen?: (value: boolean) => void;
//   //drawerOpen?: boolean;
//   pathname: string;
// }

// const DrawerButton = ({
//   selectedTabData,
//   //drawerOpen,
//   //setDrawerOpen,
//   pathname,
// }: DrawerButtonProps) => {
//   const { state, dispatch } = useContext(AppContext);
//   if (
//     selectedTabData &&
//     selectedTabData.drawerText &&
//     selectedTabData.drawerOpenText &&
//     selectedTabData.drawerRegExp &&
//     selectedTabData.drawerRegExp.test(pathname + " ")
//   ) {
//     return (
//       <Button
//         labelDefault={
//           state.navigation.drawerOpen
//             ? selectedTabData.drawerOpenText
//             : selectedTabData.drawerText
//         }
//         url={""}
//         // color={"secondary"}
//         // variant={"contained"}
//         // sx={{ mt: 1.2, p: 0, px: 1, whiteSpace: "nowrap" }}
//         // boxSx={{ ml: 1 }}
//         onClick={() => {
//           dispatch({
//             type: NavigationTypes.drawerOpen,
//             payload: {
//               open: !state.navigation.drawerOpen,
//             },
//           });
//           // if (setDrawerOpen) {
//           //   setDrawerOpen && setDrawerOpen(!drawerOpen);
//           // }
//         }}
//       />
//     );
//   } else return null;
// };
// export default DrawerButton;
