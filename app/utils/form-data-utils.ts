//import { User } from "@prisma/client";
import type { User } from "@supabase/supabase-js";
import type { formDataObject } from "~/components/draggable-forms-editor/formUtils.ts";
import { FieldType } from "~/components/draggable-forms-editor/types";
import { getAreaCustomFields } from "~/models/field.server.ts";

export const flattenFormData = (data: any) => {
  const obj = { ...data, ...data.formData };
  delete obj.formData;
  return obj;
};

export const processRecordForSave = async <T>(
  data: any,
  area: string,
  sbUser: User,
  clientId?: string,
) => {
  //now process result.data to include the formData object
  const customFields = await getAreaCustomFields({ area }, sbUser);

  //get the custom fields and identify them in result.data
  const formData: formDataObject = {};
  // console.log("processRecordForSave.data", data);
  let processedData = { ...data };
  customFields.forEach((field) => {
    const value = processedData[field.id];
    if (value) {
      if (field.fieldType === FieldType.IMAGEUPLOAD) {
        formData[field.id] = JSON.parse(value);
      } else formData[field.id] = value;
      delete processedData[field.id];
    }
  });
  processedData.formData = formData;
  //processedData.entityId = entityId;
  if (clientId) processedData.clientId = clientId;
  return { processedData, formData } as {
    processedData: T;
    formData: formDataObject;
  };
};
