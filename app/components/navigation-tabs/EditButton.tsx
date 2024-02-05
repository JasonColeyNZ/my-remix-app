// import { useContext } from "react";
// import { AppContext } from "~/store/appContext";
// import { NavigationTypes } from "~/store/navigationReducer.ts";
// import type { TabType } from "~/utils/types.ts";

// interface Props {
//   selectedTabData: TabType | null;
//   pathname: string;
// }

// const EditButton = ({ selectedTabData, pathname }: Props) => {
//   const { state, dispatch } = useContext(AppContext);
//   if (!pathname) return null;
//   if (
//     selectedTabData &&
//     selectedTabData.editRegExp &&
//     selectedTabData.editRegExp.test(pathname)
//   ) {
//     return (
//       <Button
//         labelDefault={selectedTabData.editText || ""}
//         url={""}
//         // color={"success"}
//         // variant={"contained"}
//         disabled={!state.navigation.editEnabled}
//         // sx={{
//         //   mt: 1.2,
//         //   p: 0,
//         //   px: 1,
//         //   whiteSpace: "nowrap",
//         // }}
//         // boxSx={{ ml: 1 }}
//         onClick={() => {
//           dispatch({
//             type: NavigationTypes.editMode,
//             payload: {
//               enabled: true,
//             },
//           });
//         }}
//       />
//     );
//   }
//   return <></>;
// };
// export default EditButton;
