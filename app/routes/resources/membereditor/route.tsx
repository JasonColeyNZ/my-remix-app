import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
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
import {
  getAreaDefaultForm,
  getProcessedFormDefinitionById,
} from "~/models/form.server.ts";
import { dataEditorAction } from "~/utils/data-editor-action.tsx";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";
import { useDataEditor } from "~/utils/useDataEditor.ts";
import type { UserItemType, AddUpdateUserItemType } from "~/models/user.server";
import {
  addUpdateUser,
  getUserById,
  processUserFormData,
} from "~/models/user.server";
import { AreaType } from "~/components/draggable-forms-editor/types";

export async function action({ request }: ActionFunctionArgs) {
  const { user: sbUser, supabase } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const { data, submission, response } =
    await dataEditorAction<AddUpdateUserItemType>(
      request,
      "userId",
      AreaType.MEMBER_DETAIL,
      sbUser,
    );

  if (response) return response;

  invariantResponse(data, "data is required");
  invariantResponse(submission.value, "submission is required");

  console.log("submission.value.intent", submission.value.intent);
  switch (submission.value.intent) {
    case formViewerIntent.CREATE: {
      const newMember = await addUpdateUser(data, sbUser, supabase);
      if (!newMember)
        return json({
          status: 404,
          data: null,
          error: "Member not created",
        });

      return json({ status: 200, data: newMember, submission: data } as const);
    }
    case formViewerIntent.UPDATE: {
      const newMember = await addUpdateUser(data, sbUser, supabase);
      if (!newMember)
        return json({
          status: 404,
          data: null,
          error: "Member not updated",
        });

      return json({ status: 200, data: newMember, submission: data } as const);
    }
  }

  return json({ status: "error", submission: data } as const, {
    status: 400,
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  console.log("memberEditor:loader: ");
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  const memberId = query;
  invariantResponse(memberId, "MemberId is required");

  const [rawMember, form] = await Promise.all([
    getUserById(memberId, sbUser),
    getAreaDefaultForm({ area: AreaType.MEMBER_DETAIL }, sbUser),
  ]);

  invariantResponse(form, "form is required");

  invariantResponse(rawMember, "Member not found", { status: 404 });

  console.log("rawMember", rawMember);
  if (rawMember.formId === "") {
    rawMember.formId = form.id;
  }

  const formDefinition = await getProcessedFormDefinitionById(
    {
      id: rawMember.formId,
      form,
    },
    sbUser,
  );
  // console.log("formDefinition", formDefinition);

  const { user } = await processUserFormData(rawMember, formDefinition, sbUser);

  return json({
    status: "ok",
    formDefinition,
    data: user,
  });
  // return json({})
}

const MemberEdit = ({
  memberId,
  setShowEditor,
  setMember,
}: {
  memberId: string | undefined;
  setShowEditor: (show: boolean) => void;
  setMember?: (member: any) => void;
}) => {
  const url = "/resources/membereditor";

  const onSuccess = (data: any) => {
    // console.log("ClientEdit: onSuccess: data", data);
    setMember && setMember(data);
  };

  const {
    form,
    fields,
    formDefinition,
    data: member,
    onSave,
    onBackClick,
    dataSubmitFetcher,
  } = useDataEditor<UserItemType>(memberId, url, setShowEditor, onSuccess);

  //this is needed for the validation conform object (button) on FormViewer
  // form.props.action = url;

  if (!member) return null;

  return (
    <Dialog open={true}>
      <DialogPortal>
        <DialogOverlay className="flex items-center bg-gray-500/10 backdrop-blur-none">
          <Card className="my-auto mx-auto xs:w-full sm:w-max-lg ">
            <FormViewer
              title="Member Details"
              buttonsTop={true}
              onSave={onSave}
              backButtonLabel="Close"
              onBackClick={onBackClick}
              formDefinition={formDefinition}
              form={form}
              fields={fields}
              dataSchema={formViewerSchema(formDefinition, "userId", true)}
              objectId={memberId}
              objectIdName={"userId"}
              fetcher={dataSubmitFetcher}
            />
          </Card>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
};
export default MemberEdit;

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        400: ({ params }) => {
          return (
            <div>
              <h1 style={{ fontSize: "2em" }}>400</h1>
              <p>{isRouteErrorResponse(error) ? error.data : "unknown"}</p>
            </div>
          );
        },
        404: ({ params }) => {
          return (
            <div>
              <h1 style={{ fontSize: "2em" }}>400</h1>
              <p>Page not found</p>
            </div>
          );
        },
      }}
    />
  );
}
