import type { FormArea } from "@prisma/client";
import type { ShouldRevalidateFunction } from "@remix-run/react";
import { Outlet } from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { useContext, useEffect } from "react";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema.ts";
import {
  SETTINGS_FORM_SELECTED,
  SETTINGS_RECORDS_SELECTED_TAB,
  SETTINGS_SELECTED_TAB,
} from "~/const.ts";
import clientConsentDefaultDefinition from "~/database/formDefs/formDef_ClientConsent_Default.json";
import clientQuestionnaireDefaultDefinition from "~/database/formDefs/formDef_ClientQuestionnaire_Default.json";
import serviceRecordDefaultDefinition from "~/database/formDefs/formDef_ServiceRecord_Default.json";
import header from "~/database/formDefs/header.json";
import type { FormType, FormsType } from "~/models/form.server.ts";
import { addForm, getForms } from "~/models/form.server.ts";
import {
  getSession,
  sessionStorage,
  within,
} from "~/services/session.server.ts";
import { AppContext } from "~/store/appContext.tsx";
import { FormStateTypes } from "~/store/formReducer.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { redirectToFirstId } from "~/utils/redirect-to-first-id.ts";
import { requireUserSession } from "~/utils/session.server.ts";

import { addFormSchema } from "./addFormSchema.ts";
import AppBar from "./components/AppBar.tsx";
import appInfo from "~/app-info.tsx";
import type { SavedFieldDefinition } from "~/components/draggable-forms-editor/schemas/field-schema.ts";
import { DraggableFormProvider } from "~/components/draggable-forms-editor/store/draggableFormContext.tsx";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import { savedFormSchema } from "~/components/draggable-forms-editor/schemas/saved-form-schema.ts";
import EditorQuestion from "~/components/editor-question/EditorQuestion.tsx";
import EditorRichText from "~/components/editor-richtext/EditorRichText.tsx";
import { AreaType } from "~/components/draggable-forms-editor/types.ts";
import { parseWithZod } from "@conform-to/zod";

export const shouldRevalidate: ShouldRevalidateFunction = () => {
  return true;
};

export const meta: MetaFunction = () => {
  return [{ title: appInfo.title + " - Settings - Forms" }];
};

export async function action({ request }: ActionFunctionArgs) {
  // if the user isn't authenticated, this will redirect to login
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: addFormSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  switch (submission.value.intent) {
    case formViewerIntent.CREATE: {
      let newForm = null;
      switch (submission.value.area) {
        case AreaType.CLIENT_CONSENT: {
          newForm = savedFormSchema.safeParse(clientConsentDefaultDefinition);
          break;
        }
        case AreaType.CLIENT_QUESTIONNAIRE: {
          newForm = savedFormSchema.safeParse(
            clientQuestionnaireDefaultDefinition,
          );
          break;
        }
        case AreaType.SERVICE_RECORD: {
          newForm = savedFormSchema.safeParse(serviceRecordDefaultDefinition);
          break;
        }
      }
      newForm = newForm && newForm.success ? newForm.data : { rows: [] };

      invariantResponse(newForm, "Form not created");
      invariantResponse(newForm.rows.length > 0, "Form not created");

      (newForm.rows[0].controls[0] as unknown as SavedFieldDefinition).text =
        header.replace("{name}", submission.value.name);

      const form = await within<FormType>(
        addForm(
          {
            ...submission.value,
            area: submission.value.area as FormArea,
            formDefinition: newForm,
          },
          sbUser,
        ),
        15,
      );

      invariantResponse(form, "Form not created");
      return redirect(`/dashboard/settings/records/forms/${form.id}`);
      // return json({ status: 200, submission: form });
    }
  }
}

interface groupedForm {
  area: string;
  forms: any[];
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const session = await getSession(request);
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");
  const { formId } = params;

  const forms = await within<FormsType>(getForms(false, sbUser), 15);

  //group forms by area and return into array
  const areas = forms.reduce((acc: groupedForm[], form) => {
    const area = form.area.toString();
    const existingArea = acc.find((a: any) => {
      return a.area === area;
    });
    if (existingArea) {
      existingArea.forms.push(form);
    } else {
      acc.push({ area: area, forms: [form] });
    }
    return acc;
  }, []);

  // console.log("forms", forms);

  //get the area Types
  const areaTypes = [
    { value: "ClientConsent", text: "Client Consent" },
    { value: "ClientQuestionnaire", text: "Client Questionnaire" },
    { value: "ServiceRecord", text: "Service Record" },
  ];
  if (!formId) {
    const obj = await redirectToFirstId(
      session,
      SETTINGS_FORM_SELECTED,
      params,
      "formId",
      "/dashboard/settings/records/forms/",
      forms,
      "id",
    );
    if (obj) return obj;
  }

  // console.log("Records.Forms.setCookie");
  session.set(SETTINGS_SELECTED_TAB, SETTINGS_RECORDS_SELECTED_TAB + "/forms");

  return json(
    { status: "ok", areas, areaTypes },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const SettingsRecordsForms = () => {
  //console.log("Render SettingsRecordsForms");
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (state.formState.formEditor) return;
    dispatch({
      type: FormStateTypes.formEditor,
      payload: {
        formEditor: true,
      },
    });
  }, [dispatch, state.formState.formEditor]);

  return (
    <div className="flex flex-col w-full h-full pt-4">
      <div className="flex flex-col px-4">
        <div className="text-2xl text-foreground">Easy MedSpa Forms</div>
        <div className="text-sm text-secondary-foreground">
          Easy MedSpa Forms are used to collect information from your clients.
          They can be used to collect information during the client intake
          process, or to record information about services performed on the
          client. You can create as many forms as you need, and you can use the
          same form in multiple places.
        </div>
      </div>
      <div className="flex flex-1">
        <DraggableFormProvider>
          <div className="flex flex-col flex-1">
            <AppBar />
            <Outlet />
          </div>
          <EditorQuestion />
          <EditorRichText />
        </DraggableFormProvider>
      </div>
    </div>

    // <div className="flex flex-1 flex-col sm:flex-row xs:flex-auto mx-auto w-full overflow-y-auto">
    //   <div id="forms-root" className="flex-1 flex min-h-0">
    //     <div className="flex-1 flex flex-col md:flex-row">
    //       <DraggableFormProvider>
    //         <div className="flex flex-col flex-1">
    //           <AppBar />
    //           <Outlet />
    //         </div>
    //       </DraggableFormProvider>
    //     </div>
    //   </div>
    // </div>
  );
};
export default SettingsRecordsForms;

export function ErrorBoundary() {
  return <GeneralErrorBoundary />;
}
