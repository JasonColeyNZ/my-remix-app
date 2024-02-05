import { z } from "zod";
import { getZodType } from "~/utils/zod-utils.ts";

import {
  FieldType,
  type FormDefinition,
} from "../draggable-forms-editor/types.ts";

export type ZodObject = { [key: string]: z.ZodTypeAny };

export enum formViewerIntent {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  VALIDATE = "VALIDATE",
}

export enum formViewerProductListIntent {
  UPDATE = "UPDATEPRODUCTS",
}

export const formViewerSchema = (
  formDefinition: FormDefinition | null,
  objectIdName: string = "",
  includeObjectId: boolean = false,
) => {
  // console.log("formViewerSchema.formDefinition: ", formDefinition);
  let obj: ZodObject = {};
  obj["id"] = z.string();
  obj["formId"] = z.string();
  obj["intent"] = z.nativeEnum(formViewerIntent);
  if (includeObjectId) obj[objectIdName] = z.string();
  if (formDefinition) {
    try {
      if (formDefinition && formDefinition.rows.length > 0)
        formDefinition.rows.map((row) => {
          row.controls.length > 0 &&
            row.controls.reduce((obj, control) => {
              if (
                control.field.fieldType !== FieldType.PARAGRAPH &&
                control.field.fieldType !== FieldType.HEADER
              )
                obj[control.id] = getZodType(control);
              return obj;
            }, obj);
          return row;
        });
      // console.log("formViewerSchema", obj);
    } catch (error) {
      console.log("error: ", error);
    }
  }
  return z.object(obj);
};
