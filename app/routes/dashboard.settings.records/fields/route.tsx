import {
  useRouteError,
  type ShouldRevalidateFunction,
  isRouteErrorResponse,
} from "@remix-run/react";
import type { ActionFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
// import { addField } from "~/models/field.server";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";

import { FieldIntent, fieldSchema } from "./controlSchema";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary";
import { parseWithZod } from "@conform-to/zod";

export const shouldRevalidate: ShouldRevalidateFunction = () => {
  return true;
};

export let action: ActionFunction = async ({ request }) => {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  let formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: fieldSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  switch (submission.value.intent) {
    case FieldIntent.ADD_FIELD: {
      console.log("Add Field");

      console.log("Result: ", submission.value);

      // return { field: await addField(submission.value, sbUser) };
    }
    case FieldIntent.UPDATE_FIELD: {
      console.log("Edit Field");
      // const result = await withZod(formAndFieldSchema).validate(formData);

      // //console.log(result);
      // if (result.error) {
      //   console.log("Error: ", result.error);
      //   return validationError(result.error);
      // }
      // console.log("Result: ", result.data);

      // //Process any fields with no id, usually a control
      // const formDefinition = JSON.parse(
      //   result.data.formDefinition as string,
      // ) as SavedFormDefinition;

      // for (const row of formDefinition.rows) {
      //   for (const control of row.controls) {
      //     if (control.id === "") {
      //       const field = await addField(
      //         {
      //           area: result.data.area,
      //           field: {
      //             label: control.label,
      //             type: control.fieldType,
      //           },
      //         },
      //         sbUser,
      //       );
      //       console.log("field", field);
      //       control.id = field.id;
      //       result.data.field.id = field.id;
      //     }
      //   }
      // }

      // const [form, field] = await Promise.all([
      //   updateFormDefinition(
      //     {
      //       id: result.data.formId,
      //       formDefinition: formDefinition,
      //     },
      //     sbUser,
      //   ),
      //   updateField(result.data.field, sbUser),
      // ]);

      // return { field, form };
    }
    case FieldIntent.DELETE_FIELD: {
      console.log("Delete Field");
      // const result = await withZod(deleteSchema).validate(formData);
      // //console.log(result);
      // if (result.error) {
      //   console.log("Error: ", result.error);
      //   return validationError(result.error);
      // }
      // console.log("Result: ", result.data);

      // return { field: await deleteField(result.data, sbUser) };
    }
  }

  return json({});
};

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
