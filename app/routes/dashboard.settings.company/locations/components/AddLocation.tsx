// import { useForm } from "@conform-to/react";
// import { getFieldsetConstraint, parse } from "@conform-to/zod";
// import { Form, useActionData, useNavigate } from "@remix-run/react";
// import { useContext, useEffect } from "react";
// import { AppContext } from "~/store/appContext.tsx";

// import { addLocationSchema } from "../RoomAndLocationSchema.ts";
// import type { action } from "../route.tsx";

// const AddLocation = () => {
//   const { state, dispatch } = useContext(AppContext);
//   const navigate = useNavigate();
//   const actionData = useActionData<typeof action>();

//   const [form, fields] = useForm({
//     id: "location-form",
//     constraint: getFieldsetConstraint(addLocationSchema),
//     lastSubmission: actionData?.submission,
//     onValidate({ formData }) {
//       console.log("parse: ", parse(formData, { schema: addLocationSchema }));
//       return parse(formData, { schema: addLocationSchema });
//     },
//     shouldRevalidate: "onBlur",
//   });

//   useEffect(() => {
//     // console.log("actionData: ", actionData);
//     if (!actionData || actionData.status !== "success") return;
//     if (actionData.locationId === undefined || actionData.locationId === null)
//       return;

//     // dispatch({
//     //   type: NavigationTypes.addClicked,
//     //   payload: {
//     //     clicked: false,
//     //   },
//     // });
//     navigate(
//       `/dashboard/settings/company/locations/${actionData?.locationId}/details`,
//     );
//   }, [actionData, navigate, dispatch]);

//   // const isSubmitting = useIsSubmitting("location-form");
//   // const { error } = useField("name", { formId: "location-form" });

//   return (
//     <Modal
//       open={state.navigation.addClicked}
//       showTitle={true}
//       title="Add Location"
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
//         action="/dashboard/settings/company/locations"
//       >
//         {/* <DialogContent dividers>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <TextField label={"Location Name"} props={fields.name} />
//             </Grid>
//           </Grid>
//         </DialogContent>

//         <DialogActions>
//           <Button
//             type="submit"
//             name="intent"
//             value={RoomAndLocationIntent.ADDLOCATION}
//             labelDefault={"Add Location"}
//             // labelSubmitting={"Adding Location..."}
//             color="success"
//             variant="contained"
//             fullWidth={false}
//             sx={{ mr: 2 }}
//             url={null}
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
//     </Modal>
//   );
// };
// export default AddLocation;
