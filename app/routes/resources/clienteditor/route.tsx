import { json } from "@remix-run/cloudflare";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import FormViewer from "~/components/form-viewer/FormViewer";
import {
  formViewerIntent, // formViewerIntent,
  formViewerSchema,
} from "~/components/form-viewer/formViewerSchema.ts";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import { Card } from "~/components/ui/card.tsx";
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
} from "~/components/ui/dialog.tsx";
import type {
  ClientItemType,
  addUpdateClientItemType,
} from "~/models/client.server.ts";
import {
  addUpdateClient,
  getClientById,
  processClientFormData,
} from "~/models/client.server.ts";
import {
  getAreaDefaultForm,
  getProcessedFormDefinitionById,
} from "~/models/form.server.ts";
import { multiPartDataEditorAction } from "~/utils/data-editor-action.tsx";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";
import { useDataEditor } from "~/utils/useDataEditor.ts";
import { AreaType } from "~/components/draggable-forms-editor/types";

export async function action({ request }: ActionFunctionArgs) {
  const { user: sbUser, supabase } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const { data, submission, response } =
    await multiPartDataEditorAction<addUpdateClientItemType>(
      request,
      "clientId",
      AreaType.CLIENT_DETAIL,
      sbUser,
    );

  if (response) return response;

  invariantResponse(data, "data is required");
  invariantResponse(submission.value, "submission is required");

  // console.log("submission.value.intent", submission.value.intent);
  switch (submission.value.intent) {
    case formViewerIntent.CREATE: {
      const newClient = await addUpdateClient(data, sbUser, supabase);
      if (!newClient)
        return json({
          status: 404,
          data: null,
          error: "Client not created",
        });

      return json({ status: 200, data: newClient, submission: data } as const);
    }
    case formViewerIntent.UPDATE: {
      const newClient = await addUpdateClient(data, sbUser, supabase);
      if (!newClient)
        return json({
          status: 404,
          data: null,
          error: "Client not updated",
        });

      return json({ status: 200, data: newClient, submission: data } as const);
    }
  }

  return json({ status: "error", submission: data } as const, {
    status: 400,
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  console.log("clienteditor:loader: ");
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  const clientId = query;
  invariantResponse(clientId, "ClientId is required");

  const [rawClient, form] = await Promise.all([
    getClientById({ id: clientId }, sbUser),
    getAreaDefaultForm({ area: AreaType.CLIENT_DETAIL }, sbUser),
  ]);
  invariantResponse(form, "form is required");

  invariantResponse(rawClient, "Client not found", { status: 404 });

  // console.log("rawClient", rawClient);
  if (rawClient.formId === "") {
    rawClient.formId = form.id;
  }

  const formDefinition = await getProcessedFormDefinitionById(
    {
      id: rawClient.formId,
      form,
    },
    sbUser,
  );
  // console.log("formDefinition", formDefinition);

  const { client } = await processClientFormData(
    rawClient,
    formDefinition,
    sbUser,
  );

  return json({
    status: "ok",
    formDefinition,
    data: client,
  });
  // return json({})
}

const ClientEdit = ({
  clientId,
  setShowEditor,
  setClient,
}: {
  clientId: string | undefined;
  setShowEditor: (show: boolean) => void;
  setClient?: (client: any) => void;
}) => {
  const url = "/resources/clienteditor";

  const onSuccess = (data: any) => {
    // console.log("ClientEdit: onSuccess: data", data);
    setClient && setClient(data);
  };

  const {
    form,
    fields,
    formDefinition,
    data: client,
    onSave,
    onBackClick,
    dataSubmitFetcher,
  } = useDataEditor<ClientItemType>(clientId, url, setShowEditor, onSuccess);

  //this is needed for the validation conform object (button) on FormViewer
  form.props.action = url;

  if (!client) return null;

  return (
    <Dialog open={true}>
      <DialogPortal>
        <DialogOverlay className="flex items-center bg-gray-500/10 backdrop-blur-none">
          <Card className="my-auto mx-auto xs:w-full sm:w-max-lg ">
            <FormViewer
              title="Client Details"
              buttonsTop={true}
              onSave={onSave}
              backButtonLabel="Close"
              onBackClick={onBackClick}
              formDefinition={formDefinition}
              form={form}
              fields={fields}
              dataSchema={formViewerSchema(formDefinition, "clientId", true)}
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
export default ClientEdit;

export function ErrorBoundary() {
  return <GeneralErrorBoundary statusHandlers={{}} />;
}
