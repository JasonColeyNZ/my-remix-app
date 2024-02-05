// import { useContext } from "react";
// import { AppContext } from "~/store/appContext";
// import { NavigationTypes } from "~/store/navigationReducer";
// import type { TabType } from "~/utils/types";

// interface Props {
//   selectedTabData: TabType | null;
//   pathname: string;
// }

// const SaveButton = ({ selectedTabData, pathname }: Props) => {
//   const { state, dispatch } = useContext(AppContext);
//   if (!pathname) return null;
//   //console.log("selectedTabData", selectedTabData);
//   //console.log("pathname", pathname);
//   if (
//     selectedTabData &&
//     selectedTabData.saveRegExp &&
//     selectedTabData.saveRegExp.test(pathname)
//   ) {
//     return (
//       <Button
//         labelDefault={selectedTabData.saveText || ""}
//         url={selectedTabData.saveUrl || ""}
//         color={"success"}
//         variant={"contained"}
//         //disabled={!state.navigation.saveEnabled}
//         sx={{
//           mt: 1.2,
//           p: 0,
//           px: 1,
//           whiteSpace: "nowrap",
//           "&.Mui-disabled": {
//             color: "#ffffff8c",
//             backgroundColor: "#9e9e9e2b",
//           },
//         }}
//         boxSx={{ ml: 1 }}
//         onClick={() => {
//           dispatch({
//             type: NavigationTypes.saveClicked,
//             payload: {
//               clicked: true,
//             },
//           });
//         }}
//       />
//     );
//   }
//   return <></>;
// };
// export default SaveButton;
