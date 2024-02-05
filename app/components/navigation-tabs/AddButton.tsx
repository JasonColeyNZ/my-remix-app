// import { useContext } from "react";
// import { AppContext } from "~/store/appContext";
// import { NavigationTypes } from "~/store/navigationReducer.ts";
// import type { TabType } from "~/utils/types.ts";

// interface Props {
//   selectedTabData: TabType | null;
//   pathname: string;
// }

// const AddButton = ({ selectedTabData, pathname }: Props) => {
//   const { dispatch } = useContext(AppContext);

//   if (!pathname) return null;
//   //console.log("selectedTabData", selectedTabData);
//   //console.log("pathname", pathname);
//   if (
//     selectedTabData &&
//     selectedTabData.addRegExp &&
//     selectedTabData.addRegExp.test(pathname + " ")
//   ) {
//     return (
//       <div>
//         <Button
//           labelDefault={selectedTabData.addText || ""}
//           url={selectedTabData.addUrl || ""}
//           // color={"secondary"}
//           variant={"outline"}
//           // sx={{ mt: 1.2, p: 0, px: 1, whiteSpace: "nowrap" }}
//           boxSx={{ ml: 1 }}
//           onClick={() => {
//             //console.log("add clicked");
//             dispatch({
//               type: NavigationTypes.addClicked,
//               payload: {
//                 clicked: true,
//               },
//             });

//             // if (setAddClicked && !selectedTabData.addUrl) {
//             //   setAddClicked(true);
//             // }
//           }}
//         />
//       </div>
//     );
//   }
//   return <></>;
// };
// export default AddButton;
