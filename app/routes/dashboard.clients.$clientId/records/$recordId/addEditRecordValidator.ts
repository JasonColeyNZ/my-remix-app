import { z } from "zod";
import { stringToNumberSchema } from "~/utils/zod-utils.ts";

// export const addEditRecordValidator = (formDefinition: FormDefinition) => {
//   let obj: ZodObject = {};
//   obj["id"] = z.string();
//   obj["formId"] = z.string();
//   formDefinition.rows.map((row) => {
//     row.controls.reduce((obj: ZodObject, control) => {
//       if (control.controlType !== "control")
//         obj[control.id] = getZodType(control);
//       return obj;
//     }, obj);
//     return row;
//   });

//   //console.log(obj);

//   return z.object(obj);
// };

export const addRecordValidator = z.object({
  //action: z.string(),
  id: z.string(),
  clientId: z.string(),
  userId: z.string(),
  locationId: z.string(),
  //bloodPressure: z.string().optional(),
  datetime: z
    .string()
    .or(z.date())
    .transform((arg) => new Date(arg)),
});

export const editRecordValidator = z.object({
  id: z.string(),
  clientId: z.string(),
  userId: z.string(),
  locationId: z.string(),
  datetime: z
    .string()
    .or(z.date())
    .transform((arg) => new Date(arg)),
  // totalDuration: z
  //   .preprocess(safePreprocessor(stringToNumberSchema(0)), z.number())
  //   .nullable(),
  // totalCost: z
  //   .preprocess(safePreprocessor(stringToNumberSchema(0)), z.number())
  //   .nullable(),
});

export const addEditServiceOnRecordValidator = z.object({
  recordId: z.string(),
  serviceId: z.string(),
  // actualDuration: z
  //   .preprocess(safePreprocessor(stringToNumberSchema(0)), z.number())
  //   .nullable(),
  // actualCost: z
  //   .preprocess(safePreprocessor(stringToNumberSchema(0)), z.number())
  //   .nullable(),
});

export const addEditRecordServicesValidator = z.object({
  //recordId
  id: z.string(),

  services: z.string(),
});
