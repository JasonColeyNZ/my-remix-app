// import { Form, useLoaderData } from "@remix-run/react";
// import { useContext, useEffect, useState } from "react";
// import { MdOutlineChevronLeft } from "react-icons/md/index.js";
// import type { ServiceAndFormItemsType } from "~/models/services.server.ts";
// import { AppContext } from "~/store/appContext.tsx";
// import { NavigationTypes } from "~/store/navigationReducer.ts";

// // import { addEditRecordServicesValidator } from "../addEditRecordValidator.ts";
// import type { loader } from "../route.tsx";

// const drawerWidth = 240;

// // const DrawerHeader = styled("div")(({ theme }) => ({
// //   display: "flex",
// //   alignItems: "center",
// //   padding: theme.spacing(0, 1),
// // }));

// const ServiceSelect = () => {
//   const {
//     record: { record, services: recordServices },
//     allServices,
//   } = useLoaderData<typeof loader>();
//   const { state, dispatch } = useContext(AppContext);
//   //console.log("services", services);
//   //console.log("recordServices", recordServices);

//   const [serviceIds, setServiceIds] = useState<string[]>(
//     recordServices.map((s) => s.id),
//   );
//   const [filteredServices, setFilteredServices] =
//     useState<ServiceAndFormItemsType>([]);

//   // const { formContext, setValue, submitForm, register, formRef } = useRHF(
//   //   "select-service",
//   //   addEditRecordServicesValidator,
//   //   record,
//   // );

//   const handleDrawerClose = () => {
//     dispatch({
//       type: NavigationTypes.drawerOpen,
//       payload: {
//         open: false,
//       },
//     });
//   };

//   useEffect(() => {
//     //console.log("record", record);
//     const locationServices = allServices.filter((service) => {
//       return service.locationId === record.locationId;
//     });
//     //console.log("locationServices", locationServices);
//     setFilteredServices(locationServices);
//   }, [record, recordServices, allServices]);

//   const handleToggle = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     checked: boolean,
//     serviceId: string,
//   ) => {
//     if (!record) return;
//     const oldServices = [...serviceIds];

//     const newServices = checked
//       ? [
//           ...oldServices,
//           ...allServices.reduce((acc: string[], s) => {
//             if (s.id === serviceId) {
//               acc.push(s.id);
//             }
//             return acc;
//           }, []),
//         ]
//       : oldServices.filter((s) => s !== serviceId);
//     // const newRecord = {
//     //   ...record,
//     //   services: newServices,
//     // };
//     //const newServiceIds = newServices.map((s) => s).join(";");
//     setServiceIds(newServices);
//     // setValue("services", newServices.join(";"), { shouldDirty: true });
//     // submitForm();
//     //Save Service if checked
//     //Do we also create a data object linking the service to the record?
//     //Then when the record loader is refreshed the new data object can be
//     //attached to the FormViewer instance
//   };
//   return null;
//   // return (
//   //   <Drawer
//   //     sx={{
//   //       flexShrink: 0,
//   //       width: state.navigation.drawerOpen ? drawerWidth : 0,
//   //       position: "relative",
//   //       "& .MuiDrawer-paper": {
//   //         width: drawerWidth,
//   //         boxSizing: "border-box",
//   //         position: "absolute",
//   //       },
//   //     }}
//   //     PaperProps={{
//   //       variant: "elevation",
//   //     }}
//   //     elevation={4}
//   //     variant="persistent"
//   //     anchor="right"
//   //     open={state.navigation.drawerOpen}
//   //   >
//   //     <Form
//   //       id="record-services-form"
//   //       // ref={formRef}
//   //       method="POST"
//   //       style={{
//   //         display: "none",
//   //       }}
//   //     >
//   //       <input type="hidden" name="intent" value="record-services" />
//   //     </Form>
//   //     <DrawerHeader>
//   //       <Typography>Add Services</Typography>
//   //       <IconButton sx={{ marginLeft: "auto" }} onClick={handleDrawerClose}>
//   //         <MdOutlineChevronLeft />
//   //       </IconButton>
//   //     </DrawerHeader>
//   //     <Divider />
//   //     <List>
//   //       {filteredServices.map((service) => (
//   //         <ListItem
//   //           key={service.id}
//   //           disablePadding
//   //           secondaryAction={
//   //             <Checkbox
//   //               edge="end"
//   //               onChange={(e, checked) => handleToggle(e, checked, service.id)}
//   //               checked={serviceIds.includes(service.id)}
//   //               inputProps={{ "aria-labelledby": service.name }}
//   //             />
//   //           }
//   //         >
//   //           <ListItemButton>
//   //             <ListItemText primary={service.name} />
//   //           </ListItemButton>
//   //         </ListItem>
//   //       ))}
//   //     </List>
//   //   </Drawer>
//   // );
// };
// export default ServiceSelect;
