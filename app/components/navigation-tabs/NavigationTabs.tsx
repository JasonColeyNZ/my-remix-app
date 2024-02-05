// import {
//   Link,
//   NavLink,
//   PrefetchPageLinks,
//   useLocation,
//   useNavigate,
//   useSearchParams,
//   useSubmit,
// } from "@remix-run/react";
// import { useContext, useEffect, useState } from "react";
// import { AppContext } from "~/store/context.tsx";
// import { cn } from "~/utils/shadcn.utils.ts";
// import type { BasicTabType, TabType } from "~/utils/types.ts";

// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "../ui/navigation-menu.tsx";
// import { Tabs, TabsList, TabsTrigger } from "../ui/tabs.tsx";
// import AddButton from "./AddButton.tsx";
// import CancelButton from "./CancelButton.tsx";
// import DrawerButton from "./DrawerButton.tsx";
// import EditButton from "./EditButton.tsx";
// import SaveButton from "./SaveButton.tsx";
// import SelectButton from "./SelectButton.tsx";

// interface Props {
//   tabs: TabType[] | BasicTabType[];
//   selectedSavedTab?: string;
//   disableAllTabs?: boolean;
// }

// const isTabType = (x: any): x is TabType => true;

// const NavigationTabs = ({ tabs, selectedSavedTab, disableAllTabs }: Props) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const submit = useSubmit();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const prefetchUrl = location.pathname.split("/").slice(0, -1).join("/");
//   //console.log("prefetchUrl", prefetchUrl);
//   // console.log("NavigationTabs.location", location);
//   //console.log("location.pathname", location.pathname);
//   //  console.log("navigation", navigation);

//   const { state } = useContext(AppContext);

//   //console.log("searchParams", searchParams);
//   const selectedAlternativeTabId =
//     (state.navigation.alternativeTabQueryParam &&
//       searchParams.get(state.navigation.alternativeTabQueryParam)) ||
//     (state.navigation.alternativeTabs &&
//       state.navigation.alternativeTabs.length > 0 &&
//       state.navigation.alternativeTabs[0].url) ||
//     "";
//   // console.log(
//   //   "state.navigation.alternativeTabQueryParam",
//   //   state.navigation.alternativeTabQueryParam,
//   // );
//   //console.log("selectedAlternativeTabId", selectedAlternativeTabId);

//   const [selectedTab, setSelectedTab] = useState<string>(
//     selectedSavedTab || "",
//   );
//   // const [selectedAlternativeTab, setSelectedAlternativeTab] =
//   //   useState<string>("");

//   const tab = tabs.find((tab) => tab.url === selectedSavedTab) || null;
//   const [selectedTabData, setSelectedTabData] = useState<
//     TabType | BasicTabType | null
//   >(tab);
//   const [inTabRootUrl, setInTabRootUrl] = useState<boolean>(true);

//   const handleSelectClick = () => {
//     const form = document.getElementById("selectForm") as HTMLFormElement;
//     form.action = location.pathname;
//     submit(form);
//   };

//   useEffect(() => {
//     //This allows the tabs to hide when in add/edit mode, but leaves it open when navigating tabs
//     if (!isTabType(selectedTabData)) return;
//     if (!selectedTabData) return;
//     if (
//       selectedTabData.detailRegExp &&
//       selectedTabData.detailRegExp.test(location.pathname + " ")
//     ) {
//       //console.log("in detail page", selectedTabData);
//       setInTabRootUrl(false);
//     } else setInTabRootUrl(true);
//   }, [location, selectedTabData]);

//   useEffect(() => {
//     const tab = tabs.find((tab) => tab.url === selectedTab) || null;
//     setSelectedTabData(tab);
//   }, [selectedTab, tabs]);

//   // useEffect(() => {
//   //   if (
//   //     !state.navigation.alternativeTabs ||
//   //     state.navigation.alternativeTabs.length === 0
//   //   )
//   //     return;
//   //   //console.log("alternativeTabs", alternativeTabs[0]);
//   //   //setSelectedAlternativeTab(state.navigation.alternativeTabs[0].url);
//   // }, [state.navigation.alternativeTabs]);

//   // useEffect(() => {
//   //   //console.log("selectedTab", selectedTab);
//   //   if (!alternativeTabs || alternativeTabs.length === 0) return;
//   //   const tab =
//   //     alternativeTabs.find((tab) => tab.url === selectedAlternativeTab) || null;
//   //   setSelectedAlternativeTabData(tab);
//   // }, [selectedAlternativeTab, alternativeTabs]);
//   // console.log("NavigationTabs", tabs);
//   return (
//     // <div sx={{ bgcolor: "background.paper" }}>
//     <div
//       position="static"
//       sx={{
//         display: "flex",
//         flexDirection: "row",
//         paddingRight: 1,
//         height: "48px",
//         mb: 1,
//       }}
//     >
//       <div sx={{ flexGrow: 1, display: "flex" }}>
//         {state.navigation.title && (
//           <Typography variant="h6" component="div" sx={{ py: 1, px: 2 }}>
//             {state.navigation.title}
//           </Typography>
//         )}
//         {inTabRootUrl && tabs.length > 1 && (
//           <>
//             <NavigationMenu className="NavigationMenuRoot">
//               <NavigationMenuList className="NavigationMenuList">
//                 {tabs.map((tab) => (
//                   <NavLink key={tab.url} to={tab.url} prefetch="intent">
//                     {({ isActive }) => (
//                       <div
//                         className={cn(
//                           "block outline-none select-none mx-1 p-1 px-4 rounded-lg font-xl hover:bg-primary-200",
//                           {
//                             "bg-primary-100 text-primary-600": isActive,
//                             "text-primary-500": !isActive,
//                           },
//                         )}
//                       >
//                         {tab.text}
//                       </div>
//                     )}
//                   </NavLink>

//                   // <NavigationMenuItem className="NavigationMenuLink">
//                   //   <NavLink
//                   //     className={
//                   //       "NavigationMenuLink " + selectedAlternativeTabId ===
//                   //       tab.url
//                   //         ? "active"
//                   //         : ""
//                   //     }
//                   //     to={`${prefetchUrl}/${tab.url}`}
//                   //     // legacyBehavior
//                   //     // passHref
//                   //   >
//                   //     <NavigationMenuLink>{tab.text}</NavigationMenuLink>
//                   //   </NavLink>
//                   // </NavigationMenuItem>
//                 ))}
//               </NavigationMenuList>
//             </NavigationMenu>
//           </>
//         )}
//         {!inTabRootUrl &&
//           state.navigation.alternativeTabs &&
//           state.navigation.alternativeTabs.length > 0 && (
//             <>
//               <NavigationMenu>
//                 <NavigationMenuList className="NavigationMenuList">
//                   {state.navigation.alternativeTabs.map((tab) => (
//                     <NavigationMenuItem
//                       key={tab.url}
//                       className={
//                         "NavigationMenuLink " + selectedAlternativeTabId ===
//                         tab.url
//                           ? "active"
//                           : ""
//                       }
//                     >
//                       <NavLink to={`${prefetchUrl}/${tab.url}`}>
//                         {tab.text}
//                       </NavLink>
//                     </NavigationMenuItem>
//                   ))}
//                 </NavigationMenuList>
//               </NavigationMenu>

//               {/* <Tabs
//                 value={selectedAlternativeTabId || false}
//                 indicatorColor="secondary"
//                 textColor="inherit"
//                 variant="scrollable"
//                 scrollButtons="auto"
//                 //sx={{ flexGrow: 1, minHeight: "42px" }}
//                 onChange={(event: React.SyntheticEvent, newValue: string) => {
//                   //console.log("newValue", newValue);
//                   if (state.navigation.alternativeTabQueryParam !== "") {
//                     setSearchParams((prev) => {
//                       prev.set(
//                         state.navigation.alternativeTabQueryParam || "",
//                         newValue,
//                       );
//                       return prev;
//                     });
//                   }
//                   //navigate(`?serviceId=${newValue}`);

//                   //setSelectedAlternativeTab(newValue);
//                   // dispatch({
//                   //   type: NavigationTypes.alternativeTabSelectedId,
//                   //   payload: { id: newValue },
//                   // });
//                   // setAlternativeTabSelectedId &&
//                   //   setAlternativeTabSelectedId(newValue);
//                 }}
//               >
//                 {state.navigation.alternativeTabs.map((tab) => (
//                   <Tab
//                     key={tab.url}
//                     label={tab.text}
//                     value={tab.url}
//                     //disabled={disableAllTabs}
//                     disableFocusRipple={true}
//                     sx={{ py: 1 }}
//                   />
//                 ))}
//               </Tabs>
//               {tabs.map((tab) => (
//                 <PrefetchPageLinks
//                   key={tab.url}
//                   page={`${prefetchUrl}/${tab.url}`}
//                 />
//               ))} */}
//             </>
//           )}
//       </Box>

//       {isTabType(selectedTabData) && (
//         <>
//           {!state.navigation.editMode && (
//             <EditButton
//               selectedTabData={selectedTabData}
//               pathname={location.pathname}
//             />
//           )}

//           {state.navigation.editMode && (
//             <>
//               <SaveButton
//                 selectedTabData={selectedTabData}
//                 pathname={location.pathname}
//               />

//               <CancelButton
//                 selectedTabData={selectedTabData}
//                 pathname={location.pathname}
//               />
//             </>
//           )}
//           <DrawerButton
//             selectedTabData={selectedTabData}
//             pathname={location.pathname}
//           />
//           <AddButton
//             selectedTabData={selectedTabData}
//             pathname={location.pathname}
//           />
//           <SelectButton
//             selectedTabData={selectedTabData}
//             onClick={handleSelectClick}
//             pathname={location.pathname}
//           />
//         </>
//       )}
//     </Box>
//     // </Box>
//   );
// };
// export default NavigationTabs;
