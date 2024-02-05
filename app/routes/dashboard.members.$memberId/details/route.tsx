// import { useForm } from "@conform-to/react";
// import { getFieldsetConstraint, parse } from "@conform-to/zod";
import {
  isRouteErrorResponse,
  // useActionData,
  useLoaderData, // useActionData,
  // useLoaderData,
  // useLocation,
  useRouteError,
} from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary";
import FormViewerWithFetcher from "~/components/form-viewer/FormViewerWithFetcher";
import { formViewerSchema } from "~/components/form-viewer/formViewerSchema.ts";
// import { useContext, useEffect } from "react";
// import type { FormDefinition } from "~/components/draggable-forms-editor/types.ts";
// import { formViewerSchema } from "~/components/form-viewer/formViewerSchema.ts";
import { MEMBERS_SELECTED_TAB } from "~/const.ts";
import FullScreenCardLayout from "~/layouts/page-layouts/FullScreenCard";
import {
  getAreaDefaultForm,
  getProcessedFormDefinitionById,
} from "~/models/form.server.ts";
// import type { AddUpdateUserItemType } from "~/models/user.server.ts";
import {
  // addUpdateUser,
  getUserById,
  processUserFormData,
} from "~/models/user.server.ts";
import { getSession, sessionStorage } from "~/services/session.server.ts";
// import { AppContext } from "~/store/context.tsx";
// import { NavigationTypes } from "~/store/navigationReducer.ts";
// import { processRecordForSave } from "~/utils/form-data-utils.ts";
import { checkUUID, invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";
import { metaMatchesData } from "~/utils/routeData/route-matches";
import appInfo from "~/app-info";

export const meta: MetaFunction = ({ matches }) => {
  const data = metaMatchesData(
    "routes/dashboard.members.$memberId/route",
    matches,
  );
  return [
    {
      title: `${appInfo.title} -  ${
        data ? data.member.firstName + " " + data.member.lastName : "Member"
      } Details`,
    },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  //console.log("client action", request);
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const data = await request.formData();
  const formId = data.get("formId")?.toString();

  invariantResponse(formId, "formId is required");
  // const formDefinition = await getProcessedFormDefinitionById(
  //   { id: formId },
  //   sbUser,
  // );

  const adding = data.get("id") === "new";
  // const result = await withZod(formViewerSchema(formDefinition)).validate(data);
  // //console.log("edit client", result);
  // invariantResponse(result.error !== null, "Validation error");

  // //console.log("Before Processed ", result.data);
  // const { processedData: memberData, formData } =
  //   await processRecordForSave<AddUpdateUserItemType>(
  //     result.data,
  //     "MemberDetail",
  //     sbUser,
  //   );
  // console.log("memberData", memberData);

  //move them to the formData object
  try {
    // if (!memberData) throw { message: "No member data" };
    // const newMember = await addUpdateUser(memberData, sbUser, supabase);

    // if (!newMember)
    throw new Response("Member Details Action", {
      status: 404,
      statusText: adding ? "Member not created" : "Member not updated",
    });

    // let newData = { ...newMember, ...formData };

    // if (adding) return redirect(`/dashboard/member/${newData.id}/details`);
    // else return json({ status: 200, data: newData });
  } catch (error) {
    //console.log("error", error);

    throw new Response("Member Details Action", {
      status: 404,

      //statusText: error,
    });
  }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  //console.log("client loader");
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");
  checkUUID(params.memberId, "memberId is required");

  const session = await getSession(request);

  const [rawMember, form] = await Promise.all([
    getUserById(params.memberId, sbUser),
    getAreaDefaultForm({ area: "MemberDetail" }, sbUser),
  ]);
  invariantResponse(form, "No data entry form was found");

  if (!rawMember)
    throw new Response("Member Details Loader", {
      status: 404,
      statusText: "Member not found",
    });
  //return json({ status: 404, data: null, error: "Member not found" });
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
  const { user } = await processUserFormData(
    rawMember,
    formDefinition,
    sbUser,
    // supabase,
  );
  //console.log("rawClient", client);

  session.set(MEMBERS_SELECTED_TAB, "details");
  return json(
    {
      status: "ok",
      formDefinition,
      data: user,
    },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const MemberDetails = () => {
  const { data: member, formDefinition } = useLoaderData<typeof loader>();
  // const actionData = useActionData<typeof action>();
  // const { state, dispatch } = useContext(AppContext);
  // const location = useLocation();

  // //console.log("client", serverClient);
  // const regExpRecords = new RegExp(
  //   `/dashboard/member/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/details\\s`,
  // );
  // const detailsForm = regExpRecords.test(location.pathname + " ");

  // useEffect(() => {
  //   if (member) {
  //     dispatch({
  //       type: NavigationTypes.setObjectId,
  //       payload: {
  //         id: member.id,
  //       },
  //     });
  //     dispatch({
  //       type: NavigationTypes.setObjectType,
  //       payload: {
  //         type: "MemberDetail",
  //       },
  //     });
  //   }
  // }, [dispatch, member]);

  // useEffect(() => {
  //   if (detailsForm) {
  //     dispatch({
  //       type: NavigationTypes.setPageHeaderObject,
  //       payload: {
  //         object: <MemberHeader />,
  //       },
  //     });
  //   }
  // }, [detailsForm, dispatch]);

  // const [form, fields] = useForm({
  //   constraint: getFieldsetConstraint(formViewerSchema(formDefinition)),
  //   defaultValue: member,
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
    <FullScreenCardLayout>
      <div className="p-2 flex-1">
        {/* {state.navigation.editMode && ( */}
        <FormViewerWithFetcher
          title="Member Details"
          buttonsTop={true}
          // onSave={onSave}
          backButtonLabel="Close"
          // onBackClick={onBackClick}
          // actionUrl="/resources/clienteditor"
          formDefinition={formDefinition}
          // form={form}
          // fields={fields}
          dataSchema={formViewerSchema(formDefinition)}
          defaultValues={member}
          actionUrl={""} // clientId={memberId}
          // fetcher={dataSubmitFetcher}
        />

        {/* <FormViewer
          form={form}
          fields={fields}
          formDefinition={formDefinition}
        /> */}
        {/* )}
        {!state.navigation.editMode && (
          <DataViewer
            formDefinition={formDefinition as FormDefinition}
            defaultValues={(actionData && actionData.data) || member}
          />
        )} */}
      </div>
    </FullScreenCardLayout>
  );
};
export default MemberDetails;

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
