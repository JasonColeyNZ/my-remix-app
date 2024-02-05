import { useLoaderData } from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { useContext } from "react";
import DraggableFormEditor from "~/components/draggable-forms-editor/DraggableFormEditor.tsx";
import {
  getAreaFields,
  getWorkingFormDefinitionFromSaved,
} from "~/components/draggable-forms-editor/formUtils.ts";
import type {
  FieldDefinition,
  LoaderFormType,
} from "~/components/draggable-forms-editor/types.ts";
import FormViewerWithFetcher from "~/components/form-viewer/FormViewerWithFetcher.tsx";
import { formViewerSchema } from "~/components/form-viewer/formViewerSchema.ts";
import { SETTINGS_FORM_SELECTED } from "~/const.ts";
import type { FormFieldsType } from "~/models/field.server.ts";
import { addField, getFormFields, updateField } from "~/models/field.server.ts";
import type { FormType } from "~/models/form.server.ts";
import { getFormById, updateFormDefinition } from "~/models/form.server.ts";
import { getTextTemplates } from "~/models/textTemplate.server.ts";
import {
  getSession,
  sessionStorage,
  within,
} from "~/services/session.server.ts";
import { AppContext } from "~/store/appContext.tsx";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";

import {
  formEditorIntent,
  formDefinitionSchema,
} from "./updateFormDefinitionSchema.ts";
import { savedToControlSchema } from "~/components/draggable-forms-editor/schemas/saved-field-schema.ts";
import { savedFormSchema } from "~/components/draggable-forms-editor/schemas/saved-form-schema.ts";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import { DraggableFormContext } from "~/components/draggable-forms-editor/store/draggableFormContext.tsx";
import { parseWithZod } from "@conform-to/zod";

export async function action({ request }: ActionFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  let formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: formDefinitionSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  switch (submission.value.intent) {
    case formEditorIntent.UPDATE: {
      const formDefinition = await updateFormDefinition(
        {
          id: submission.value.id,
          formDefinition: submission.value.formDefinition,
        },
        sbUser,
      );
      invariantResponse(formDefinition, "Form not updated");
      return json(submission.reply());
    }
    case formEditorIntent.ADDFIELD: {
      // console.log("Add Field", submission.value.field);
      const field = await addField({ field: submission.value.field }, sbUser);
      // console.log("Saved Field: ", field);
      const savedField = savedToControlSchema.safeParse(field);
      if (savedField.success) {
        const newFormDefinition = savedFormSchema.safeParse({
          ...submission.value.formDefinition,
          rows: [
            ...submission.value.formDefinition.rows,
            {
              sortOrder: submission.value.formDefinition.rows.length,
              controls: [
                {
                  ...savedField.data,
                },
              ],
            },
          ],
        });

        if (!newFormDefinition.success) {
          throw new Error("Invalid form");
        }
        // invariantResponse(!newFormDefinition.error, "Form not updated");
        const formDefinition = await updateFormDefinition(
          {
            id: submission.value.id,
            formDefinition: newFormDefinition.data,
          },
          sbUser,
        );
        invariantResponse(formDefinition, "Form not updated");
        return json(submission.reply());
      } else {
        console.log("Error: ", savedField.error);
      }
      return json({ status: 500, data: null } as const);
    }
    case formEditorIntent.UPDATEFIELD: {
      const field = await updateField(
        { field: submission.value.field },
        sbUser,
      );

      const savedField = savedToControlSchema.safeParse(field);
      if (savedField.success) {
        const newFormDefinition = savedFormSchema.safeParse({
          ...submission.value.formDefinition,
          rows: submission.value.formDefinition.rows.map((row) => {
            return {
              ...row,
              controls: [
                ...row.controls.map((control) => {
                  if (control && control.id === savedField.data.id) {
                    return savedField.data;
                  }
                  return control;
                }),
              ],
            };
            return row;
          }),
        });
        if (!newFormDefinition.success) {
          throw new Error("Invalid form");
        }
        const formDefinition = await updateFormDefinition(
          {
            id: submission.value.id,
            formDefinition: newFormDefinition.data,
          },
          sbUser,
        );
        invariantResponse(formDefinition, "Form not updated");
        return json(submission.reply());
      } else {
        console.log("Error: ", savedField.error);
      }
      return json({ status: 500, data: null } as const);
    }
  }

  return json(submission.reply());
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");
  // const resp = new Response();
  const { formId } = params;
  invariantResponse(formId, "formId is required");
  // try {
  const [form, areaCustomFields] = await Promise.all([
    within<FormType>(getFormById({ id: formId }, sbUser), 15),
    within<FormFieldsType>(getFormFields({ formId }, sbUser), 15),
  ]);

  invariantResponse(form, "Form not found");
  invariantResponse(areaCustomFields, "Area custom fields not found");
  console.log("Form: ", form);

  if (!form) {
    redirect("/dashboard/settings/records/forms");
  }
  invariantResponse(form.formDefinition, "Form definition is required");

  // const areaCustomFields = await getFormFields(
  //   {
  //     formId
  //   },
  //   sbUser,
  // );

  const areaFields = getAreaFields(form ? form.area : "");
  const session = await getSession(request);
  const textTemplates = await getTextTemplates(sbUser);

  const newFormDefinition = getWorkingFormDefinitionFromSaved(
    form.formDefinition,
    areaFields,
    areaCustomFields,
    formId,
    form.area,
  );

  session.set(SETTINGS_FORM_SELECTED, formId);

  return json(
    {
      form: { ...form, formDefinition: newFormDefinition },
      areaCustomFields,
      areaFields,
      textTemplates,
    },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
  // } catch (e) {
  //   console.log("Error: ", e);
  //   // redirect("/dashboard/settings/records/forms");
  // }
  return json({});
}

const Form = () => {
  const {
    form: customFormData,
    areaCustomFields,
    areaFields,
  } = useLoaderData<{
    form: LoaderFormType;
    areaCustomFields: FieldDefinition[];
    areaFields: FieldDefinition[];
  }>();
  const { state } = useContext(DraggableFormContext);
  const { state: appState } = useContext(AppContext);

  const schema = formViewerSchema(
    customFormData ? customFormData.formDefinition : null,
    "",
    false,
  );

  // console.log("Form: ", customFormData.formDefinition);
  //console.log("Render Forms", form);
  return (
    <div
      className="relative flex w-full flex-1 overflow-hidden"
      id="forms-templates-outer"
    >
      {appState.formState.preview ? (
        <div className="flex flex-row m-2 bg-white rounded-md shadow-card w-full ">
          <FormViewerWithFetcher
            formDefinition={customFormData.formDefinition}
            title={`Client Consent - ${state.formState.selectedForm?.name}`}
            dataSchema={schema}
            defaultValues={undefined}
            actionUrl={""}
          />
        </div>
      ) : (
        <DraggableFormEditor
          formData={customFormData}
          areaCustomFields={areaCustomFields}
          areaFields={areaFields}
          dataSchema={schema}
        />
      )}
    </div>
  );
};
export default Form;

export function ErrorBoundary() {
  return <GeneralErrorBoundary />;
}
