// import { useActionData, useLoaderData } from "@remix-run/react";
// import type { ActionFunctionArgs,  LoaderFunctionArgs } from "@remix-run/cloudflare";
// import { json } from "@remix-run/cloudflare";
// import { useContext, useEffect } from "react";
// import { CLIENTS_SELECTED_TAB } from "~/const.ts";
// import { getProcessedFormDefinitionById } from "~/models/form.server.ts";
// import { getRecordAndServicesByRecordId } from "~/models/record.server.ts";
// import { getServicesAndForms } from "~/models/services.server.ts";
// import { getSession, sessionStorage } from "~/services/session.server.ts";
// import { AppContext } from "~/store/appContext.tsx";
// import { NavigationTypes } from "~/store/navigationReducer.ts";
// import { invariantResponse } from "~/utils/misc.tsx";
// import { requireUserSession } from "~/utils/session.server.ts";
// import type { TabType } from "~/utils/types.ts";

// // import {
// //   addEditRecordServicesValidator,
// //   editRecordValidator,
// // } from "./addEditRecordValidator.ts";
// import RecordHeader from "./components/RecordHeader.tsx";
// import ServiceHeader from "./components/ServiceHeader.tsx";
// import ServiceSelect from "./components/ServiceSelect.tsx";

// export async function action({ request, params }: ActionFunctionArgs) {
//   // if the user isn't authenticated, this will redirect to login
//   const { user: sbUser } = await requireUserSession(request);
//   invariantResponse(sbUser, "User should be logged in");

//   const clientId = params.clientId;
//   invariantResponse(clientId, "clientId is required");

//   let formData = await request.formData();
//   console.log(formData.get("intent"));
//   switch (formData.get("intent")) {
//     case "record": {
//       const adding = formData.get("id") === "new";
//       // const result = await withZod(editRecordValidator).validate(formData);

//       // invariantResponse(result.error !== null, "validation error");
//       // invariantResponse(result.data, "validation error");
//       // //console.log("result.data: ", result.data);
//       // const newRecord = await addEditRecord(result.data, sbUser);
//       // if (!newRecord)
//       return json({
//         status: 404,
//         data: null,
//         error: adding ? "Record not created" : "Record not updated",
//       });

//       // if (adding) {
//       //   const session = await getSession(request);
//       //   session.set("NEW_RECORD", newRecord.id);

//       //   return redirect(
//       //     `/dashboard/client/${clientId}/records/${newRecord.id}`,
//       //     {
//       //       status: 302,
//       //       headers: {
//       //         "Set-Cookie": await sessionStorage.commitSession(session),
//       //       },
//       //     },
//       //   );
//       // } else return json({ status: 200, data: newRecord });
//     }
//     case "record-services": {
//       // const result = await withZod(addEditRecordServicesValidator).validate(
//       //   formData,
//       // );
//       // invariantResponse(result.error !== null, "validation error");
//       // invariantResponse(result.data, "validation error");
//       // const newRecord = await updateRecordServices(result.data, sbUser);
//       // invariantResponse(newRecord, "Record Services not updated");
//       // if (!newRecord)
//       //   return json({
//       //     status: 404,
//       //     data: null,
//       //     error: "Record Services not updated",
//       //   });
//       // return json({ status: 200, data: newRecord });
//     }
//     default: {
//       //This can be where the action is actually a formId
//       console.log("action: ", formData.get("intent"));
//       const formId = formData.get("formId")?.toString();
//       invariantResponse(formId, "formId is required");
//       //this needs to separate record and an array of form data objects
//       //Do we split the data into form objects first?
//       const formDefinition = await getProcessedFormDefinitionById(
//         {
//           id: formId,
//         },
//         sbUser,
//       );

//       //this formData is a record type
//       // const result = await withZod(formViewerSchema(formDefinition)).validate(
//       //   formData,
//       // );

//       // //each block of data needs to be validated separately
//       // invariantResponse(result.error !== null, "validation error");
//       // invariantResponse(result.data, "validation error");
//       // // if (result.error) {
//       // //   console.log("validation error", result.error);
//       // //   return json({ error: validationError(result.error), formId: formId });
//       // // }
//       // console.log("result.data", result.data);

//       // const newRecord = await addEditRecord(
//       //   result.data as AddUpdateRecordItemType,
//       //   sbUser,
//       // );

//       // return json({ status: 200, data: newRecord });
//     }
//   }
// }

// export async function loader({ request, params }: LoaderFunctionArgs) {
//   const session = await getSession(request);
//   const newRecordId = session.get("NEW_RECORD");
//   session.unset("NEW_RECORD");
//   const { user: sbUser } = await requireUserSession(request);
//   invariantResponse(sbUser, "User should be logged in");
//   //console.log("dashboard.client.$clientId.records loader");

//   const { recordId, clientId } = params;
//   invariantResponse(recordId, "recordId is required");
//   invariantResponse(clientId, "clientId is required");

//   //console.log("sbUser: ", sbUser);
//   const [record, services] = await Promise.all([
//     getRecordAndServicesByRecordId({ id: recordId }, sbUser),
//     getServicesAndForms(sbUser),
//   ]);
//   if (record.record?.id === "new") {
//     record.record.clientId = clientId;
//     record.record.userId = sbUser.id;
//     record.record.locationId = session.get("locationId");
//   }
//   invariantResponse(record, "Record not found");

//   const tabs: TabType[] = record.services.map((s) => {
//     return {
//       text: s.name,
//       url: s.id,
//       regExp: new RegExp(``),
//       detailRegExp: new RegExp(``),
//     };
//   });

//   const selectedServiceId =
//     new URL(request.url).searchParams.get("serviceId") ||
//     (record.services.length > 0 && record.services[0].id);

//   const selectedService = record.services.find(
//     (s) => s.id === selectedServiceId,
//   );
//   const serviceForms = selectedService ? selectedService.forms : null;

//   //console.log("selectedService: ", selectedService);

//   session.set(CLIENTS_SELECTED_TAB, "records");
//   return json(
//     {
//       status: "ok",
//       tabs,
//       record,
//       selectedService,
//       serviceForms,
//       allServices: services,
//       newRecord: newRecordId === recordId ? true : false,
//     },
//     {
//       headers: {
//         "Set-Cookie": await sessionStorage.commitSession(session),
//       },
//     },
//   );
// }

// const ClientRecord = () => {
//   const { record, newRecord, tabs, serviceForms } =
//     useLoaderData<typeof loader>();
//   const { state, dispatch } = useContext(AppContext);
//   //const [forms, setForms] = useState<any>([]);
//   //const [recordServiceData, setRecordServiceData] = useState<any>();
//   const actionData = useActionData<typeof action>();

//   useEffect(() => {
//     if (newRecord) {
//       dispatch({
//         type: NavigationTypes.addClicked,
//         payload: {
//           clicked: false,
//         },
//       });
//     }
//   }, [newRecord, dispatch]);

//   useEffect(() => {
//     dispatch({
//       type: NavigationTypes.setPageHeaderObject,
//       payload: {
//         object: <RecordHeader record={record.record} />,
//       },
//     });
//   }, [record, dispatch]);

//   useEffect(() => {
//     dispatch({
//       type: NavigationTypes.alternativeTabs,
//       payload: {
//         tabs: tabs as TabType[],
//       },
//     });

//     //setAlternativeTabs && setAlternativeTabs(tabs);
//     //setAlternativeTabSelectedId &&
//     //if (tabs.length > 0) {
//     dispatch({
//       type: NavigationTypes.alternativeTabQueryParam,
//       payload: {
//         queryParam: "serviceId",
//       },
//     });

//     //setAlternativeTabSelectedId(tabs[0].url);
//     //}
//   }, [dispatch, tabs]);

//   // useEffect(() => {
//   //   if (!state.navigation.alternativeTabSelectedId) return;
//   //   const service = record.services.find(
//   //     (s) => s.id === state.navigation.alternativeTabSelectedId,
//   //   );
//   //   const forms = service ? service.forms : null;
//   //   setRecordServiceData(service);

//   //   setForms(forms);
//   // }, [record.services, state.navigation.alternativeTabSelectedId]);

//   //console.log("forms: ", forms);

//   // const [form, fields] = useForm({
//   //   constraint: getFieldsetConstraint(productSchema),
//   //   defaultValue: f.formData,
//   //   lastSubmission:
//   //     actionData?.status === "error" ? actionData.submission : undefined,
//   //   shouldValidate: "onBlur",
//   //   onValidate({ formData }) {
//   //     const parsed = parse(formData, { schema: productSchema });
//   //     if (Object.keys(parsed.error).length > 0)
//   //       console.log("onValidate: formData.error", parsed.error);
//   //     return parsed;
//   //   },
//   // });

//   return (
//     <>
//       <div className="flex flex-row p-0 flex-1 h-full overflow-hidden">
//         <div className="flex flex-col flex-1 h-full">
//           <ServiceHeader />
//           <div className="p-1 flex flex-col flex-1 h-full overflow-hidden">
//             {serviceForms &&
//               serviceForms.length > 0 &&
//               serviceForms.map((f: any) => {
//                 return (
//                   <div key={f.id}>
//                     {state.navigation.editMode && (
//                       <></>
//                       // <FormViewer
//                       //   formId={f.id}
//                       //   formDefinition={f.formDefinition}
//                       //   customDataForm={true}

//                       // />
//                     )}
//                     {!state.navigation.editMode && (
//                       <DataViewer
//                         formDefinition={f.formDefinition}
//                         defaultValues={
//                           (actionData && actionData.data) || f.formData
//                         }
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//           </div>
//         </div>
//         {/* if we use conditional rendering then we lose the animation */}
//         {/* {drawerOpen && ( */}
//         <ServiceSelect />
//         {/* )} */}
//       </div>
//     </>
//   );
// };
// export default ClientRecord;
