import validator from "validator";
import type { ZodType } from "zod";
import { z } from "zod";
import {
  ControlType,
  FieldType,
  type FormFieldDefinition,
} from "~/components/draggable-forms-editor/types.ts";

// import { ImageFieldsetSchema } from "~/components/file-upload/uploadImageValidation.ts";
import { ACCEPTED_IMAGE_TYPES } from "./types.ts";

// import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "./types.ts";

export const stringToNumberSchema = (def: number) =>
  z.string().default(`${def}`).transform(Number);

export const safePreprocessor =
  <O, Z extends ZodType<O>>(preprocessorSchema: Z) =>
  (val: unknown): O | null => {
    //console.log("val: ", val);

    //console.log("typeof val: ", typeof val);

    if (typeof val === "string") {
      const parsed = preprocessorSchema.safeParse(val);
      //console.log("parsed: ", parsed);
      if (!parsed.success) {
        return null;
      }
      return parsed.data;
    } else if (typeof val === "number") {
      //console.log("val: ", val);
      return val as O;
    }
    return null;
  };

export const zodStringCheckValidation = (
  //zodType: ZodString,
  control: FormFieldDefinition,
) => {
  // console.log("zodStringCheckValidation.control: ", control);
  if (control.field.validation && control.field.validation.required) {
    let zodType = z.string({
      required_error: "Please enter a value",
      invalid_type_error: `Please enter a ${control.field.label}`,
    });
    if (
      control.field.validation.minLength &&
      control.field.validation.minLength > 0
    ) {
      zodType = zodType.min(
        control.field.validation.minLength,
        `Please enter at least ${control.field.validation.minLength} characters`,
      );
    }
    if (
      control.field.validation.maxLength &&
      control.field.validation.maxLength > 0
    ) {
      zodType = zodType.max(
        control.field.validation.maxLength,
        `Please enter less than ${control.field.validation.maxLength} characters`,
      );
    }

    return zodType; //.nonempty();
  }

  return z.string(); //.nullable();// zodType;
};
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB

export const getZodType = (control: FormFieldDefinition) => {
  // console.log("getZodType.control: ", control);
  // return z.string().optional();
  switch (control.field.fieldType) {
    case FieldType.TEXTINPUT: {
      //let zodObj: ZodString | ZodNullable<ZodString> = z.string();

      let zodObj = zodStringCheckValidation(control);

      if (control.field.controlType === ControlType.TEL) {
        zodObj.refine(validator.isMobilePhone);
      } else if (control.field.controlType === ControlType.EMAIL) {
        return zodObj.email();
      }
      //nullable must be last
      if (control.field.validation && !control.field.validation.required)
        return zodObj.optional();
      return zodObj.min(1, `Please enter a ${control.field.label}`);
    }
    case FieldType.DATETIME: {
      let zodObj = z
        .string({
          required_error: "Please enter a value",
          invalid_type_error: `Please enter a ${control.field.label}`,
        })
        .transform((value) => (value === "" ? null : value))
        .or(z.string().datetime());
      if (control.field.validation && !control.field.validation.required)
        return zodObj.optional();
      return zodObj;
    }

    case FieldType.SELECT: {
      let zodObject = z.string({ required_error: "Please select a value" });
      if (control.field.validation && !control.field.validation.required)
        return zodObject.optional();
      else {
        return zodObject.min(1, "Please select a value");
      }
    }

    case FieldType.IMAGEUPLOAD: {
      let zodObject = z.any();
      if (control.field.validation && !control.field.validation.required)
        zodObject.optional();

      zodObject
        .refine((files) => files?.length === 0, "Image is required.") // if no file files?.length === 0, if file files?.length === 1
        .refine(
          (files) => files?.[0]?.size >= MAX_UPLOAD_SIZE,
          `Max file size is 5MB.`,
        ) // this should be greater than or equals (>=) not less that or equals (<=)
        .refine(
          (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
          ".jpg, .jpeg, .png and .webp files are accepted.",
        ); //ImageFieldsetSchema;
      // if (!control.field.validation.required) zodObject.optional();
      // console.log("zodObject.fileUpload: ", zodObject);
      return zodObject;
    }
    case FieldType.COLORPICKER:
      let zodObject = z.string();
      if (control.field.validation && !control.field.validation.required)
        zodObject.optional();
      return zodObject;

    default:
      return z.string().optional();
  }
};
