// import { useLoaderData, useSearchParams } from "@remix-run/react";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuList,
// } from "~/components/ui/navigation-menu.tsx";

// import type { loader } from "../route.tsx";
// import { tabs } from "./displayTabs.ts";

// const SchedulerDisplay = () => {
//   const { view } = useLoaderData<typeof loader>();
//   const [searchParams, setSearchParams] = useSearchParams();

//   return (
//     <NavigationMenu
//       value={view.schedule?.type || "week"}
//       className="NavigationMenuRoot"
//     >
//       <NavigationMenuList className="NavigationMenuList">
//         {tabs.map((tab, index) => {
//           return (
//             <NavigationMenuItem
//               className="NavigationMenuLink"
//               // sx={{
//               //   px: "0.6rem !important",
//               //   py: "0.5rem !important",
//               //   minHeight: "30px",
//               //   minWidth: "30px",
//               // }}
//               key={index}
//               // label={tab.label}
//               value={tab.value}
//               onClick={() => {
//                 //if we select week, then we need to use the first day, get the start of the week and end
//                 if (tab.value === "week") {
//                   const from = searchParams.get("from");
//                   const currentDay = from ? new Date(from) : new Date();
//                   const startDay = new Date(
//                     currentDay.setDate(
//                       currentDay.getDate() - currentDay.getDay(),
//                     ),
//                   );
//                   const endDay = new Date(
//                     currentDay.setDate(
//                       currentDay.getDate() - currentDay.getDay() + 6,
//                     ),
//                   );
//                   setSearchParams((prev) => {
//                     prev.set("from", startDay.toISOString());
//                     prev.set("to", endDay.toISOString());
//                     prev.set("viewType", tab.value);
//                     return prev;
//                   });
//                 } else {
//                   setSearchParams((prev) => {
//                     prev.set("viewType", tab.value);
//                     return prev;
//                   });
//                 }
//               }}
//             >
//               {tab.label}
//             </NavigationMenuItem>
//           );
//         })}
//       </NavigationMenuList>
//     </NavigationMenu>
//   );
// };

// export default SchedulerDisplay;
