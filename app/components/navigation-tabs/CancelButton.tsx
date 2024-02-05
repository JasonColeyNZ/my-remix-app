// import { useContext } from "react";
// import { AppContext } from "~/store/appContext";
// import { NavigationTypes } from "~/store/navigationReducer.ts";
// import type { TabType } from "~/utils/types.ts";

// interface Props {
//   selectedTabData: TabType | null;
//   pathname: string;
// }

// const CancelButton = ({ selectedTabData, pathname }: Props) => {
//   const { state, dispatch } = useContext(AppContext);
//   if (!pathname) return null;
//   if (
//     selectedTabData &&
//     selectedTabData.cancelRegExp &&
//     selectedTabData.cancelText &&
//     selectedTabData.cancelRegExp.test(pathname)
//   ) {
//     return (
//       <div>
//         <Button
//           labelDefault={selectedTabData.cancelText || ""}
//           url={selectedTabData.cancelUrl || ""}
//           // color={"error"}
//           // variant={"contained"}
//           //disabled={!state.navigation.cancelEnabled}
//           sx={{
//             mt: 1.2,
//             p: 0,
//             px: 1,
//             whiteSpace: "nowrap",
//             "&.Mui-disabled": {
//               color: "#ffffff8c",
//               backgroundColor: "#9e9e9e2b",
//             },
//           }}
//           // boxSx={{ ml: 1 }}
//           // onClick={() => {
//           //   dispatch({
//           //     type: NavigationTypes.editMode,
//           //     payload: {
//           //       enabled: false,
//           //     },
//           //   });
//           // }}

//           onClick={() => {
//             dispatch({
//               type: NavigationTypes.cancelClicked,
//               payload: {
//                 clicked: true,
//               },
//             });
//           }}
//         />
//       </div>
//     );
//   }
//   return <></>;
// };
// export default CancelButton;
