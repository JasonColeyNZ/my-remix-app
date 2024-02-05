// import { useForm } from "@conform-to/react";
// import { getFieldsetConstraint, parse } from "@conform-to/zod";
// import { Form, useActionData, useLoaderData } from "@remix-run/react";
// import { useContext, useMemo } from "react";
// import { AppContext } from "~/store/appContext.tsx";
// import { NavigationTypes } from "~/store/navigationReducer.ts";
// import { invariantResponse } from "~/utils/misc.tsx";
// import { useLocationId } from "~/utils/routeData/dashboard.ts";
// import { useLocations } from "~/utils/routeData/useLocations.ts";
// import { useUsers } from "~/utils/routeData/useUsers.ts";

// import { addRecordValidator } from "../$recordId/addEditRecordValidator.ts";
// import type { action, loader } from "../route.tsx";

// const AddRecord = () => {
//   const { newRecord: record } = useLoaderData<typeof loader>();
//   const { state, dispatch } = useContext(AppContext);
//   //console.log("record", record);
//   //console.log("useMatches: ", useMatches());

//   const users = useUsers();
//   const locations = useLocations();
//   const locationId = useLocationId();
//   invariantResponse(locationId, "locationId is required");
//   record.locationId = locationId;
//   // record.action = "record";

//   const actionData = useActionData<typeof action>();

//   const [form, fields] = useForm({
//     id: "add-record",
//     constraint: getFieldsetConstraint(addRecordValidator),
//     lastSubmission: actionData?.submission,
//     onValidate({ formData }) {
//       return parse(formData, { schema: addRecordValidator });
//     },
//     shouldRevalidate: "onBlur",
//   });

//   const processedUsers = useMemo(() => {
//     if (!users) return [];
//     return users.map((user: any) => {
//       return {
//         value: user.id,
//         text: `${user.firstName} ${user.lastName}`,
//       };
//     });
//   }, [users]);

//   const processedLocations = useMemo(() => {
//     if (!locations) return [];
//     return locations.map((location: any) => {
//       return {
//         value: location.id,
//         text: `${location.name}`,
//       };
//     });
//   }, [locations]);

//   // const handleSubmitForm = async () => {
//   //   const isValid = await formContext.trigger();
//   //   if (isValid) {
//   //     submitForm();
//   //   }
//   // };

//   return (
//     <Modal
//       open={state.navigation.addClicked}
//       showTitle={true}
//       title="Add Client Record"
//       width={590}
//       height={0}
//       onClose={() =>
//         dispatch({
//           type: NavigationTypes.addClicked,
//           payload: {
//             clicked: false,
//           },
//         })
//       }
//     >
//       <Form
//         {...form.props}
//         method="POST"
//         style={{
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <input type="hidden" name="intent" value="record" />
//         {/* <input type="hidden" {...register("id")} />
//           <input type="hidden" {...register("clientId")} /> */}
//         {/* <DialogContent dividers>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <AutoComplete
//                 label={"Team Member"}
//                 options={processedUsers}
//                 props={fields.userId}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <AutoComplete
//                 label={"Location"}
//                 options={processedLocations}
//                 props={fields.locationId}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <DatePicker label={"Date"} props={fields.datetime} />
//             </Grid>
//           </Grid>
//         </DialogContent>

//         <DialogActions>
//           <SubmitButton
//             // loading={isSubmitting}
//             label={"Add Record"}
//             labelSubmitting={"Adding Record..."}
//             color="success"
//             variant="contained"
//             fullWidth={false}
//             sx={{ mr: 2 }}
//           />
//           <Button
//             onClick={() =>
//               dispatch({
//                 type: NavigationTypes.addClicked,
//                 payload: {
//                   clicked: false,
//                 },
//               })
//             }
//             labelDefault={"Cancel"}
//             url={null}
//           />
//         </DialogActions> */}
//       </Form>
//       {/* </FormProvider> */}
//     </Modal>
//   );
// };
// export default AddRecord;
