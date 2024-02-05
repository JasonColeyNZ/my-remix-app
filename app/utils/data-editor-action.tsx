import type { User } from "@supabase/supabase-js";
import { json } from "@remix-run/cloudflare";
import { formViewerSchema } from "~/components/form-viewer/formViewerSchema.ts";
import { getProcessedFormDefinitionById } from "~/models/form.server.ts";

import { processRecordForSave } from "./form-data-utils.ts";
import { invariantResponse } from "./misc.tsx";
import type { AreaType } from "~/components/draggable-forms-editor/types.ts";
import { parseMultipartFormData } from "@remix-run/server-runtime/dist/formData.js";
import { createMemoryUploadHandler } from "@remix-run/server-runtime/dist/upload/memoryUploadHandler.js";
import { parseWithZod } from "@conform-to/zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB

export async function dataEditorAction<T>(
  request: Request,
  objectIdName: string,
  areaType: AreaType,
  sbUser: User,
) {
  let formData = await request.formData();
  const formId = formData.get("formId")?.toString();
  const id = formData.get(objectIdName)?.toString();

  invariantResponse(formId, "formId is required");
  const formDefinition = await getProcessedFormDefinitionById(
    { id: formId },
    sbUser,
  );

  const formSchema = formViewerSchema(formDefinition, objectIdName, id !== "");
  invariantResponse(formSchema, "formSchema is required");
  const submission = parseWithZod(formData, {
    schema: formSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  const { processedData } = await processRecordForSave<T>(
    submission.value,
    areaType,
    sbUser,
    id,
  );
  return { data: processedData, submission };
}

export async function multiPartDataEditorAction<T>(
  request: Request,
  objectIdName: string,
  areaType: AreaType,
  sbUser: User,
) {
  const formData = await parseMultipartFormData(
    request,
    createMemoryUploadHandler({ maxPartSize: MAX_UPLOAD_SIZE }),
  );

  const formId = formData.get("formId")?.toString();
  const id = formData.get(objectIdName)?.toString();

  invariantResponse(formId, "formId is required");
  const formDefinition = await getProcessedFormDefinitionById(
    { id: formId },
    sbUser,
  );

  const formSchema = formViewerSchema(formDefinition, objectIdName, id !== "");
  invariantResponse(formSchema, "formSchema is required");

  const submission = parseWithZod(formData, {
    schema: formSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  const { processedData } = await processRecordForSave<T>(
    submission.value,
    areaType,
    sbUser,
    id,
  );
  return { data: processedData, submission };
}
