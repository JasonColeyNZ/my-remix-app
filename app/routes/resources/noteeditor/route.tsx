import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { AreaType } from "~/components/draggable-forms-editor/types";
import FormViewer from "~/components/form-viewer/FormViewer";
import {
  formViewerIntent,
  formViewerSchema,
} from "~/components/form-viewer/formViewerSchema.ts";
import { Card } from "~/components/ui/card.tsx";
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
} from "~/components/ui/dialog.tsx";
import {
  getAreaDefaultForm,
  getProcessedFormDefinitionById,
} from "~/models/form.server.ts";
import type {
  // addUpdateNote,
  NoteItemType,
  addUpdateNoteItemType,
} from "~/models/note.server.ts";
import {
  addUpdateNote,
  getNoteById,
  processNoteFormData,
} from "~/models/note.server.ts";
import { dataEditorAction } from "~/utils/data-editor-action.tsx";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";
import { type Toast, createToastHeaders } from "~/utils/toast.server.ts";
import { useDataEditor } from "~/utils/useDataEditor.ts";

// export const config = { runtime: "edge" };

export async function action({ request, params }: ActionFunctionArgs) {
  console.log("notes action", request);
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const { data, submission, response } =
    await dataEditorAction<addUpdateNoteItemType>(
      request,
      "clientId",
      AreaType.CLIENT_NOTE,
      sbUser,
    );

  if (response) return response;

  invariantResponse(data, "data is required");
  invariantResponse(submission.value, "submission is required");

  switch (submission.value.intent) {
    case formViewerIntent.CREATE: {
      // console.log("notes action: CREATE", data);
      const newNote = await addUpdateNote(data, sbUser);
      if (!newNote)
        return json({
          status: 404,
          data: null,
          error: "Note not created",
        });
      const toast: Toast = {
        type: "default",
        title: "Note created",
        description: "A new Note has been created",
      };

      return json({ status: 200, data: newNote, submission } as const, {
        headers: await createToastHeaders(toast),
      });
    }
    case formViewerIntent.UPDATE: {
      const newNote = await addUpdateNote(data, sbUser);
      if (!newNote)
        return json({
          status: 404,
          data: null,
          error: "Note not updated",
        });

      const toast: Toast = {
        type: "default",
        title: "Note updated",
        description: "Note has been saved successfully",
      };
      return json({ status: 200, data: newNote, submission } as const, {
        headers: await createToastHeaders(toast),
      });
    }
  }

  return json({ status: "error", submission: data } as const, {
    status: 400,
  });

  // //move them to the formData object
  // try {
  //   // if (!noteData) throw { message: "No note data" };
  //   // const newNote = await addUpdateNote(noteData, sbUser);
  //   // if (!newNote)
  //   //   return json({
  //   //     status: 404,
  //   //     data: null,
  //   //     error: adding ? "Note not created" : "Note not updated",
  //   //   });
  //   // let newData = { ...newNote, ...formData };
  //   // //return json({ status: 200, data: clientData });
  //   // if (adding)
  //   //   return redirect(`/dashboard/client/${clientId}/notes/${newNote.id}`);
  //   // //return redirect(`/dashboard/clients`);
  //   // else return json({ status: 200, data: newData });
  // } catch (error) {
  //   //console.log("error", error);

  //   throw new Response("Client Notes Action", {
  //     status: 404,

  //     //statusText: error,
  //   });
  // }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  console.log("noteeditor:loader ");
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  const noteId = query;
  invariantResponse(noteId, "noteId is required");

  const [rawNote, form] = await Promise.all([
    getNoteById({ id: noteId }, sbUser),
    getAreaDefaultForm({ area: "ClientNote" }, sbUser),
  ]);
  invariantResponse(form, "form is required");

  if (!rawNote)
    throw new Response("Client Note not found", {
      status: 404,
    });

  if (rawNote.formId === "") {
    rawNote.formId = form.id;
  }
  const formDefinition = await getProcessedFormDefinitionById(
    {
      id: rawNote.formId,
      form,
    },
    sbUser,
  );
  const { note } = await processNoteFormData(rawNote, formDefinition, sbUser);
  //console.log("rawClient", client);

  // const session = await getSession(request);
  // session.set(CLIENTS_SELECTED_TAB, "notes");
  return json({
    status: "ok",
    formDefinition,
    data: note,
  });
}

const NoteEditor = ({
  noteId,
  clientId,
  setShowEditor,
}: {
  noteId: string | undefined;
  clientId: string | undefined;
  setShowEditor: (show: boolean) => void;
}) => {
  const {
    form,
    fields,
    formDefinition,
    data: note,
    onSave,
    onBackClick,
    dataSubmitFetcher,
  } = useDataEditor<NoteItemType>(
    noteId,
    "/resources/noteeditor",
    setShowEditor,
  );

  if (!note) return null;

  return (
    <Dialog open={true}>
      <DialogPortal>
        <DialogOverlay>
          <Card className="flex flex-col mt-36 mx-auto  xs:w-full sm:w-max-lg sm:h-[500px] ">
            <FormViewer
              title="Client Note"
              buttonsTop={true}
              onSave={onSave}
              backButtonLabel="Close"
              onBackClick={onBackClick}
              formDefinition={formDefinition}
              form={form}
              fields={fields}
              dataSchema={formViewerSchema(formDefinition, "clientId", true)}
              fullHeight={true}
              objectId={clientId}
              objectIdName={"clientId"}
              fetcher={dataSubmitFetcher}
            />
          </Card>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
};
export default NoteEditor;
