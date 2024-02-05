// import { Form, useLoaderData } from "@remix-run/react";
// import { durationString } from "~/utils/strings.tsx";

// // import { addEditServiceOnRecordValidator } from "../addEditRecordValidator.ts";
// // import type { loader } from "../route.tsx";

// const ServiceHeader = () => {
//   //console.log("recordServiceData: ", recordServiceData);
//   const { selectedService: recordServiceData } = useLoaderData<typeof loader>();
//   // const { formContext, control, register, formRef } = useRHF(
//   //   "service-record",
//   //   addEditServiceOnRecordValidator,
//   //   recordServiceData || {},
//   // );

//   if (!recordServiceData) return null;

//   return (
//     // <FormProvider {...formContext}>
//     <Form
//       id="record-form"
//       // ref={formRef}
//       //onSubmit={handleSubmit}
//       method="POST"
//       style={{
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* <input type="hidden" name="intent" value="record" />
//         <input type="hidden" {...register("id")} />
//         <input type="hidden" {...register("clientId")} /> */}
//       <div
//         className="flex flex-row p-0 px-2 "
//         // sx={{
//         //   p: 0,
//         //   // pb: 0.5,
//         //   px: 2,
//         //   borderBottom: "1px solid #ccc",
//         //   backgroundColor: "#f5f5f5",
//         // }}
//       >
//         <div className="flex-1 self-center" id="record-service">
//           <div className="font-lg">{recordServiceData.name}</div>
//         </div>
//         <div className="w-[80px]" id="record-service-actual-cost">
//           <div>
//             <HeaderData label={"Recommended"} data={""} />
//           </div>
//         </div>
//         <div className="w-[140px] pr-1 pb-0.5" id="record-service-actual-cost">
//           <div>
//             <HeaderData
//               label={""}
//               data={`$ ${recordServiceData.serviceCost}`}
//             />
//           </div>
//           {/* <TextFieldController
//               label={"Cost"}
//               required={false}
//               id={"actualCost"}
//               name={"actualCost"}
//               control={control}
//               variant={"filled"}
//               type={"text"}
//               inputProps={{ sx: { textAlign: "right", py: 0.2, pr: 1 } }}
//               // InputProps={{
//               //   startAdornment: (
//               //     <InputAdornment position="start">$</InputAdornment>
//               //   ),
//               // }}
//             /> */}
//         </div>

//         <div className="w-[140px]" id="record-service-actual-duration">
//           <div>
//             <HeaderData
//               label={""}
//               data={`${durationString(recordServiceData.serviceDuration || 0)}`}
//             />
//           </div>
//           {/* <TextFieldController
//               label={"Duration"}
//               required={false}
//               id={"actualDuration"}
//               name={"actualDuration"}
//               type={"text"}
//               control={control}
//               variant="filled"
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               inputProps={{
//                 sx: { textAlign: "right", py: 0.2, pr: 1 },
//               }}
//             /> */}
//         </div>
//       </div>
//     </Form>
//     // </FormProvider>
//   );
// };
// export default ServiceHeader;
