// import { useForm } from "@conform-to/react";
// import { getFieldsetConstraint, parse } from "@conform-to/zod";
// import { useActionData, useLoaderData } from "@remix-run/react";
// import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
// import { json } from "@remix-run/cloudflare";
// import { formViewerSchema } from "~/components/form-viewer/formViewerSchema.ts";
// import { CLIENTS_SELECTED_TAB } from "~/const.ts";
// import {
//   getAreaDefaultForm,
//   getProcessedFormDefinitionById,
// } from "~/models/form.server.ts";
// import {
//   // addUpdateNote,
//   getNoteById,
//   processNoteFormData,
// } from "~/models/note.server.ts";
// import { getSession, sessionStorage } from "~/services/session.server.ts";
// import { invariantResponse } from "~/utils/misc.tsx";
// import { requireUserSession } from "~/utils/session.server.ts";

// export async function action({ request, params }: LoaderFunctionArgs) {
//   //console.log("notes action", request);
//   const { user: sbUser } = await requireUserSession(request);
//   invariantResponse(sbUser, "User should be logged in");

//   const data = await request.formData();
//   const formId = data.get("formId")?.toString();
//   console.log("formId", formId);
//   invariantResponse(formId, "formId is required");
//   const { clientId } = params;
//   invariantResponse(clientId, "clientId is required");
//   const formDefinition = await getProcessedFormDefinitionById(
//     { id: formId },
//     sbUser,
//   );
//   if (!formDefinition) throw new Error("formDefinition not found");

//   const adding = data.get("id") === "new";
//   // const result = await withZod(formViewerSchema(formDefinition)).validate(data);
//   // //console.log("edit client", result);
//   // if (result.error) {
//   //   console.log("validation error", result.error);
//   //   invariantResponse(result.error !== null, "validation error");
//   // }

//   // //console.log("Before Processed ", result.data);
//   // const { processedData: noteData, formData } =
//   //   await processRecordForSave<addUpdateNoteItemType>(
//   //     result.data,
//   //     "ClientNote",
//   //     sbUser,
//   //     clientId,
//   //   );
//   //console.log("noteData", noteData);

//   //move them to the formData object
//   try {
//     // if (!noteData) throw { message: "No note data" };
//     // const newNote = await addUpdateNote(noteData, sbUser);
//     // if (!newNote)
//     //   return json({
//     //     status: 404,
//     //     data: null,
//     //     error: adding ? "Note not created" : "Note not updated",
//     //   });
//     // let newData = { ...newNote, ...formData };
//     // //return json({ status: 200, data: clientData });
//     // if (adding)
//     //   return redirect(`/dashboard/client/${clientId}/notes/${newNote.id}`);
//     // //return redirect(`/dashboard/clients`);
//     // else return json({ status: 200, data: newData });
//   } catch (error) {
//     //console.log("error", error);

//     throw new Response("Client Notes Action", {
//       status: 404,

//       //statusText: error,
//     });
//   }
// }

// export async function loader({ request, params }: LoaderFunctionArgs) {
//   //console.log("client loader");

//   const { user: sbUser } = await requireUserSession(request);
//   invariantResponse(sbUser, "User should be logged in");

//   const { noteId, clientId } = params;
//   invariantResponse(noteId, "noteId is required");
//   invariantResponse(clientId, "clientId is required");

//   const [rawNote, form] = await Promise.all([
//     getNoteById({ id: noteId }, sbUser),
//     getAreaDefaultForm({ area: "ClientNote" }, sbUser),
//   ]);
//   invariantResponse(form, "form is required");

//   if (!rawNote)
//     throw new Response("Client Note not found", {
//       status: 404,
//     });

//   if (rawNote.formId === "") {
//     rawNote.formId = form.id;
//   }
//   const formDefinition = await getProcessedFormDefinitionById(
//     {
//       id: rawNote.formId,
//       form,
//     },
//     sbUser,
//   );
//   const { note } = await processNoteFormData(rawNote, formDefinition, sbUser);
//   //console.log("rawClient", client);

//   const session = await getSession(request);
//   session.set(CLIENTS_SELECTED_TAB, "notes");
//   return json(
//     {
//       status: "ok",
//       formDefinition,
//       note,
//       clientId,
//     },
//     {
//       headers: {
//         "Set-Cookie": await sessionStorage.commitSession(session),
//       },
//     },
//   );
// }

const ClientNote = () => {
  // const { note, formDefinition } = useLoaderData<typeof loader>();
  // const actionData = useActionData<typeof action>();
  //console.log("note", note);

  // const [form, fields] = useForm({
  //   constraint: getFieldsetConstraint(formViewerSchema(formDefinition)),
  //   defaultValue: note,
  //   lastSubmission:
  //     actionData?.status === "error" ? actionData.submission : undefined,
  //   shouldValidate: "onBlur",
  //   onValidate({ formData }) {
  //     const parsed = parse(formData, {
  //       schema: formViewerSchema(formDefinition),
  //     });
  //     if (Object.keys(parsed.error).length > 0)
  //       console.log("onValidate: formData.error", parsed.error);
  //     return parsed;
  //   },
  // });

  return (
    <div className="p-1 flex flex-col flex-1 h-full">
      {/* {state.navigation.editMode && ( */}
      {/* <FormViewer form={form} fields={fields} formDefinition={formDefinition} /> */}
      {/* )}
      {!state.navigation.editMode && (
        <DataViewer
          formDefinition={formDefinition}
          defaultValues={(actionData && actionData.data) || note}
        />
      )} */}
    </div>
  );
};
export default ClientNote;
