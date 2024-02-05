// import { useLocation } from "@remix-run/react";
// import { memo, useContext, useEffect, useState } from "react";

// import { navigation } from "../../app-navigation.tsx";
// import type { Path } from "../../app-navigation.tsx";
// import { AppContext } from "../../store/appContext.tsx";
// import { cn } from "../../utils/shadcn.utils.ts";

// // import Breadcrumb from "../breadcrumb/Breadcrumb.tsx";

// interface Props {
//   secondaryText?: string;
//   centerChildren?: any;
//   smallSecondaryText?: string;
//   breadCrumbOnly?: boolean;
// }

// const PageHeader = ({
//   centerChildren,
//   secondaryText,
//   smallSecondaryText,
//   breadCrumbOnly = false,
// }: Props) => {
//   const location = useLocation();
//   const [isScrollOnPageTop, setIsScrollOnPageTop] = useState(true);
//   const { state } = useContext(AppContext);

//   let children = state.navigation.pageHeaderObject;
//   //console.log(location);

//   const navItem: Path | null =
//     navigation.find((nav) => {
//       if (nav.regExp && nav.regExp.test(location.pathname + " ")) return nav;
//       return false;
//     }) || null;

//   // if (!children) {
//   //   console.log("client: ", client);
//   //   console.log("record: ", record);
//   //   if (client) {
//   //     if (record) {
//   //       children = <RecordHeader record={record.record} />;
//   //     } else {
//   //       children = <ClientHeader />;
//   //     }
//   //   }
//   // }

//   useEffect(() => {
//     setIsScrollOnPageTop(window.scrollY < 20);

//     const onScroll = () => {
//       setIsScrollOnPageTop(window.scrollY < 20);
//     };
//     window.addEventListener("scroll", onScroll);

//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);
//   //console.log("navResult", navResult);

//   return (
//     <div
//       className={`fixed shadow-sm bg-white flex flex-col w-full  ${
//         isScrollOnPageTop &&
//         (!breadCrumbOnly ? "top-[4em] height-[5em]" : "top-[4em] height-[2em]")
//       },
//         ${
//           !isScrollOnPageTop &&
//           (!breadCrumbOnly
//             ? "top-[2em] height-[3em]"
//             : "top-[2em] height-[2em]")
//         }
//       }`}
//       // sx={[
//       //   {
//       //     boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
//       //     transition: "height",
//     >
//       <div
//         className={"flex ml-auto mr-auto flex-col w-full max-w-7xl h-full"}
//         // maxWidth="xl"
//       >
//         {/* <Breadcrumb
//           navItem={navItem}
//           sx={[
//             isScrollOnPageTop && {
//               height: "24px",
//               fontSize: "12px",
//             },
//             !isScrollOnPageTop && {
//               height: "20px",
//               fontSize: "10px",
//             },
//           ]}
//         /> */}
//         {!breadCrumbOnly && (
//           <div
//             className={
//               "flex flex-row ml-auto mr-auto justify-between w-full items-end  "
//             }
//             // sx={[
//             //   {
//             //     px: { sm: 3, md: 2, lg: 4 },
//             //     flex: "1 1 0",
//             //   },
//             //   isScrollOnPageTop && {
//             //     pt: 1,
//             //     pb: 0,
//             //   },
//             //   !isScrollOnPageTop && {
//             //     pt: 0,
//             //     pb: 0,
//             //   },
//             // ]}
//           >
//             <div className="flex-1 self-start">
//               <span
//                 className={cn(
//                   "font-bold text-gray-500",
//                   isScrollOnPageTop && "text-2xl",
//                   !isScrollOnPageTop && "text-xl",
//                 )}
//                 // component={"span"}
//                 // sx={[
//                 //   {
//                 //     fontWeight: "600",
//                 //     color: "rgb(107 114 128)",
//                 //   },
//                 //   isScrollOnPageTop && {
//                 //     fontSize: "1.125rem",
//                 //     lineHeight: "1.75rem",
//                 //   },
//                 //   !isScrollOnPageTop && {
//                 //     fontSize: "1rem",
//                 //     lineHeight: "1rem",
//                 //   },
//                 // ]}
//               >
//                 {navItem?.text}
//               </span>
//               {smallSecondaryText && (
//                 <span
//                   className={cn(
//                     "ml-2",
//                     isScrollOnPageTop && "text-xl",
//                     !isScrollOnPageTop && "text-lg",
//                   )}
//                   // component={"span"}
//                   // sx={[
//                   //   {
//                   //     ml: 2,
//                   //   },
//                   //   isScrollOnPageTop && {
//                   //     fontSize: "1.2rem",
//                   //     lineHeight: "2rem",
//                   //   },
//                   //   !isScrollOnPageTop && {
//                   //     fontSize: "1rem",
//                   //     lineHeight: "1.2rem",
//                   //   },
//                   // ]}
//                 >
//                   {smallSecondaryText}
//                 </span>
//               )}
//               {secondaryText && (
//                 <span
//                   className={cn(
//                     "ml-2",
//                     isScrollOnPageTop && "text-xl",
//                     !isScrollOnPageTop && "text-lg",
//                   )}
//                   // component={"span"}
//                   // sx={[
//                   //   {
//                   //     ml: 2,
//                   //   },
//                   //   isScrollOnPageTop && {
//                   //     fontSize: "1.2rem",
//                   //     lineHeight: "2rem",
//                   //   },
//                   //   !isScrollOnPageTop && {
//                   //     fontSize: "1rem",
//                   //     lineHeight: "1.2rem",
//                   //   },
//                   // ]}
//                 >
//                   {secondaryText}
//                 </span>
//               )}
//             </div>
//             {centerChildren && (
//               <div id="center-children" className="flex-1 text-center">
//                 {centerChildren}
//               </div>
//             )}
//             <div id="children" className="flex flex-nowrap flex-1 self-start">
//               {children}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
// export default memo(PageHeader);
