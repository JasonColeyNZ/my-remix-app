// import { Form } from "@remix-run/react";
// import { useContext } from "react";
// import { AppContext } from "~/store/appContext";
// import type { TabType } from "~/utils/types";

// interface Props {
//   selectedTabData: TabType | null;
//   pathname: string;
//   onClick: () => void;
// }

// const SelectButton = ({ selectedTabData, pathname, onClick }: Props) => {
//   const { state } = useContext(AppContext);
//   if (!pathname) return null;
//   if (
//     selectedTabData &&
//     selectedTabData.regExp &&
//     selectedTabData.regExp.test(pathname) &&
//     selectedTabData.selectText
//   ) {
//     return (
//       <>
//         <Form id="selectForm" method="post">
//           {/* <input
//             type="hidden"
//             name="selectId"
//           /> */}
//         </Form>
//         <Button
//           labelDefault={selectedTabData.selectText || ""}
//           url={null}
//           color={"success"}
//           onClick={onClick}
//           variant={"contained"}
//           sx={{ mt: 1.2, p: 0, px: 1 }}
//           boxSx={{ ml: 1 }}
//           disabled={state.navigation.selectButtonDisabled}
//         />
//       </>
//     );
//   }
//   return <></>;
// };
// export default SelectButton;
