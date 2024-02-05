// import { useForm } from "@conform-to/react";
// import { getFieldsetConstraint, parse } from "@conform-to/zod";
// import {
//   isRouteErrorResponse,
//   useActionData,
//   useLoaderData, // useLocation,
//   useNavigate,
//   useRouteError,
// } from "@remix-run/react";
// import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
// import { json } from "@remix-run/cloudflare";
// import { useContext, useEffect } from "react";
// import { formViewerSchema } from "~/components/form-viewer/formViewerSchema.ts";
// // import { ClientInfoTabs } from "~/app-navigation";
// import { Card } from "~/components/ui/card.tsx";
// // import { CLIENTS_SELECTED_TAB } from "~/const";
// // import ClientPageLayout from "~/layouts/page-layouts/ClientPage.tsx";
// // import type { addUpdateClientItemType } from "~/models/client.server.ts";
// import {
//   // addUpdateClient,
//   getClientById,
//   processClientFormData,
// } from "~/models/client.server.ts";
// import {
//   getAreaDefaultForm,
//   getProcessedFormDefinitionById,
// } from "~/models/form.server.ts";
// // import { getSession, sessionStorage } from "~/services/session.server";
// import { AppContext } from "~/store/appContext";
// // import { NavigationTypes } from "~/store/navigationReducer.ts";
// // import { processRecordForSave } from "~/utils/form-data-utils.ts";
// import { invariantResponse } from "~/utils/misc.tsx";
// // import { setSessionVariable } from "~/utils/misc";
// import { requireUserSession } from "~/utils/session.server.ts";

// export async function action({ request }: LoaderFunctionArgs) {
//   //console.log("client action", request);
//   const { user: sbUser } = await requireUserSession(request);
//   invariantResponse(sbUser, "User should be logged in");

//   let data = await request.formData();
//   const formId = data.get("formId")?.toString();

//   invariantResponse(formId, "formId is required");
//   const formDefinition = await getProcessedFormDefinitionById(
//     { id: formId },
//     sbUser,
//   );

//   const adding = data.get("id") === "new";
//   // const result = await withZod(formViewerSchema(formDefinition)).validate(data);
//   // //console.log("edit client", result);
//   // if (result.error) {
//   //   console.log("validation error", result.error);
//   //   invariantResponse(result.error !== null, "validation error");
//   // }

//   //console.log("Before Processed ", result.data);
//   // const { processedData: clientData, formData } =
//   //   await processRecordForSave<addUpdateClientItemType>(
//   //     result.data,
//   //     "ClientDetail",
//   //     sbUser,
//   //   );
//   // console.log("clientData", clientData);

//   //move them to the formData object
//   try {
//     // if (!clientData) throw { message: "No client data" };
//     // const newClient = await addUpdateClient(clientData, sbUser);
//     // if (!newClient)
//     //   return json({
//     //     status: 404,
//     //     data: null,
//     //     error: adding ? "Client not created" : "Client not updated",
//     //   });
//     // let newData = { ...newClient, ...formData };
//     // //return json({ status: 200, data: clientData });
//     // if (adding) return redirect(`/dashboard/client/${newData.id}/details`);
//     // //return redirect(`/dashboard/clients`);
//     // else return json({ status: 200, data: newData });
//     // //return redirect(`/dashboard/clients`);
//     // //else return json(newData);
//   } catch (error) {
//     //console.log("error", error);

//     throw new Response("Client Details Action", {
//       status: 404,

//       //statusText: error,
//     });
//   }
// }

// export async function loader({ request, params }: LoaderFunctionArgs) {
//   //console.log("client.details:loader: ");
//   const { user: sbUser } = await requireUserSession(request);
//   invariantResponse(sbUser, "User should be logged in");

//   // const session = await getSession(request);

//   invariantResponse(params.clientId, "clientId is required");

//   const [rawClient, form] = await Promise.all([
//     getClientById({ id: params.clientId }, sbUser),
//     getAreaDefaultForm({ area: "ClientDetail" }, sbUser),
//   ]);
//   invariantResponse(form, "form is required");

//   invariantResponse(rawClient, "Client not found", { status: 404 });
//   if (rawClient.formId === "") {
//     rawClient.formId = form.id;
//   }
//   const formDefinition = await getProcessedFormDefinitionById(
//     {
//       id: rawClient.formId,
//       form,
//     },
//     sbUser,
//   );
//   const { client } = await processClientFormData(
//     rawClient,
//     formDefinition,
//     sbUser,
//   );
//   //console.log("rawClient", client);
//   // setSessionVariable(
//   //   request,
//   //   session,
//   //   CLIENTS_SELECTED_TAB,
//   //   "details",
//   //   ClientInfoTabs,
//   // );

//   return json(
//     {
//       status: "ok",
//       formDefinition,
//       data: client,
//     },
//     // {
//     //   headers: {
//     //     "Set-Cookie": await sessionStorage.commitSession(session),
//     //   },
//     // },
//   );
// }

// const ClientEdit = () => {
//   //console.log("ClientEdit Render");
//   const { data: client, formDefinition } = useLoaderData<typeof loader>();
//   const { state, dispatch } = useContext(AppContext);
//   const navigate = useNavigate();
//   //console.log("client", serverClient);
//   // const location = useLocation();
//   const actionData = useActionData<typeof action>();

//   // const regExpRecords = new RegExp(
//   //   `/dashboard/client/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/details\\s`,
//   // );
//   // const detailsForm = regExpRecords.test(location.pathname + " ");

//   // useEffect(() => {
//   //   dispatch({
//   //     type: NavigationTypes.setObjectId,
//   //     payload: {
//   //       id: client.id,
//   //     },
//   //   });
//   //   dispatch({
//   //     type: NavigationTypes.setObjectType,
//   //     payload: {
//   //       type: "ClientDetail",
//   //     },
//   //   });
//   // }, [client.id, dispatch]);

//   // useEffect(() => {
//   //   if (detailsForm) {
//   //     dispatch({
//   //       type: NavigationTypes.setPageHeaderObject,
//   //       payload: {
//   //         object: <ClientHeader />,
//   //       },
//   //     });
//   //   }
//   // }, [detailsForm, dispatch]);

//   useEffect(() => {
//     if (
//       client.id === "new" &&
//       (state.navigation.cancelClicked || !state.navigation.editMode)
//     ) {
//       // dispatch({
//       //   type: NavigationTypes.cancelClicked,
//       //   payload: {
//       //     clicked: false,
//       //   },
//       // });
//       navigate("/dashboard/clients");
//     }
//   }, [
//     client.id,
//     dispatch,
//     navigate,
//     state.navigation.cancelClicked,
//     state.navigation.editMode,
//   ]);

//   const [form, fields] = useForm({
//     constraint: getFieldsetConstraint(formViewerSchema(formDefinition)),
//     defaultValue: client,
//     lastSubmission:
//       actionData?.status === "error" ? actionData.submission : undefined,
//     shouldValidate: "onBlur",
//     onValidate({ formData }) {
//       const parsed = parse(formData, {
//         schema: formViewerSchema(formDefinition),
//       });
//       if (Object.keys(parsed.error).length > 0)
//         console.log("onValidate: formData.error", parsed.error);
//       return parsed;
//     },
//   });
//   return (
//     <Card className="flex flex-1 flex-col md:min-w-l ">
//       {/* {state.navigation.editMode && ( */}
//       <FormViewer
//         title="Client Details"
//         buttonsTop={true}
//         // formId={client.formId}
//         formDefinition={formDefinition}
//         form={form}
//         fields={fields}
//       />
//       {/* )}
//         {!state.navigation.editMode && (
//           <DataViewer
//             formDefinition={formDefinition}
//             defaultValues={(actionData && actionData.data) || client}
//           />
//         )} */}
//     </Card>
//   );
// };
// export default ClientEdit;

// export function ErrorBoundary() {
//   const error = useRouteError();
//   return (
//     <GeneralErrorBoundary
//       statusHandlers={{
//         400: ({ params }) => {
//           return (
//             <div>
//               <h1 style={{ fontSize: "2em" }}>400</h1>
//               <p>{isRouteErrorResponse(error) ? error.data : "unknown"}</p>
//             </div>
//           );
//         },
//         404: ({ params }) => {
//           return (
//             <div>
//               <h1 style={{ fontSize: "2em" }}>400</h1>
//               <p>Page not found</p>
//             </div>
//           );
//         },
//       }}
//     />
//   );
// }
