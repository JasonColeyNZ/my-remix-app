import type { User } from "@supabase/supabase-js";
import { savedFieldSchema } from "~/components/draggable-forms-editor/schemas/field-schema";
// import { z } from "zod";
// import type {
//   AreaType,
//   ControlType,
//   FieldDefinition,
//   FieldType,
// } from "~/components/draggable-forms-editor/types";
import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";
import type { Field } from "~/db.server.ts";
import { Prisma, prisma } from "~/db.server.ts";
import type { ThenArg } from "~/utils/types.ts";

// import { DisplayOptions } from "./../components/draggable-forms-editor/types.ts";

// const fieldOptionSchema = z.array(
//   z.object({
//     text: z.string(),
//     value: z.number(),
//     textBox: z.string().optional(),
//     sortOrder: z.number(),
//   }),
// );

// const fieldValidationSchema = z.object({
//   minValue: z.number().optional(),
//   maxValue: z.number().optional(),
//   disableFutureDate: z.boolean().optional(),
//   disablePastDate: z.boolean().optional(),
// });

// const fieldDisplayOptionsSchema = z.object({
//   startInputAdornment: z.string().optional(),
//   textAlign: z.string().optional(),
//   readOnly: z.boolean().optional(),
//   displayColumns: z.number().optional(),
//   disablePastDates: z.boolean().optional(),
//   disableFutureDates: z.boolean().optional(),
//   openOn: z.enum(["day", "year", "month"]).optional(),
//   multiple: z.boolean().optional(),
// });

export type FormsType = ThenArg<ReturnType<typeof getAreaCustomFields>>;
export async function getAreaCustomFields(
  { area }: { area: string },
  sbUser: User,
) {
  const fields = (await authenticatedPrismaClient(sbUser).field.findMany({
    where: { area, deleted: false },
    select: {
      id: true,
      area: true,
      formId: true,
      demo: true,
      description: true,
      fieldType: true,
      options: true,
      validation: true,
      label: true,
      shortLabel: true,
      controlType: true,
      displayOptions: true,
    },
  })) as Field[];

  // const field: FieldDefinition[] = [];
  // console.log("fields", fields);

  return fields.map((curr) => {
    const field = savedFieldSchema.safeParse(curr);
    // console.log("field", field.error);
    if (!field.success) {
      throw new Error("Invalid field", field.error);
    }
    return field.data;
  });
}

export type FormFieldsType = ThenArg<ReturnType<typeof getFormFields>>;
export async function getFormFields(
  { formId }: { formId: string },
  sbUser: User,
) {
  const fields = (await authenticatedPrismaClient(sbUser).field.findMany({
    where: { formId, deleted: false },
    select: {
      id: true,
      area: true,
      formId: true,
      demo: true,
      description: true,
      fieldType: true,
      options: true,
      validation: true,
      label: true,
      shortLabel: true,
      controlType: true,
      displayOptions: true,
    },
  })) as Field[];

  // const field: FieldDefinition[] = [];
  // console.log("fields", fields);

  return fields.map((curr) => {
    const field = savedFieldSchema.safeParse(curr);
    // console.log("field", field.error);
    if (!field.success) {
      throw new Error("Invalid field", field.error);
    }
    return field.data;
  });
}

export async function addField(
  {
    field: {
      area,
      label,
      formId,
      shortLabel,
      description,
      fieldType,
      controlType,
      displayOptions,
      validation,
      options,
    },
  }: {
    field: {
      area: Field["area"];
      label: Field["label"];
      formId: Field["formId"];
      shortLabel?: Field["shortLabel"];
      description?: Field["description"];
      fieldType: Field["fieldType"];
      controlType?: Field["controlType"];
      displayOptions?: Field["displayOptions"];
      options?: Field["options"];
      validation?: Field["validation"];
    };
  },
  sbUser: User,
) {
  const field = await authenticatedPrismaClient(sbUser).field.create({
    data: {
      area,
      formId,
      label,
      shortLabel,
      description,
      fieldType,
      options: options != null ? options : Prisma.JsonNull,
      validation: validation != null ? validation : Prisma.JsonNull,
      controlType,
      displayOptions: displayOptions != null ? displayOptions : Prisma.JsonNull,
    },
  });

  return field;
}

export async function upsertField(
  {
    field: {
      id,
      formId,
      area,
      label,
      shortLabel,
      description,
      fieldType,
      controlType,
      displayOptions,
      validation,
      options,
    },
  }: {
    field: {
      id: Field["id"];
      formId: Field["formId"];
      area: Field["area"];
      label: Field["label"];
      shortLabel?: Field["shortLabel"];
      description?: Field["description"];
      fieldType: Field["fieldType"];
      controlType?: Field["controlType"];
      displayOptions?: Field["displayOptions"];
      options?: Field["options"];
      validation?: Field["validation"];
    };
  },
  sbUser: User,
) {
  const field = await prisma.field.upsert({
    where: { id },
    update: {
      label,
    },
    create: {
      id,
      formId,
      area,
      label,
      shortLabel,
      description,
      fieldType,
      options: options != null ? options : Prisma.JsonNull,
      validation: validation != null ? validation : Prisma.JsonNull,
      controlType,
      displayOptions: displayOptions != null ? displayOptions : Prisma.JsonNull,
    },
  });

  return field;
}

export async function updateField(
  {
    field: {
      id,
      formId,
      area,
      label,
      shortLabel,
      description,
      fieldType,
      controlType,
      displayOptions,
      validation,
      options,
    },
  }: {
    field: {
      id: Field["id"];
      formId: Field["formId"];
      area: Field["area"];
      label: Field["label"];
      shortLabel?: Field["shortLabel"];
      description?: Field["description"];
      fieldType: Field["fieldType"];
      controlType?: Field["controlType"];
      displayOptions?: Field["displayOptions"];
      options?: Field["options"];
      validation?: Field["validation"];
    };
  },
  sbUser: User,
) {
  const field = await authenticatedPrismaClient(sbUser).field.upsert({
    where: { id },
    create: {
      id,
      area,
      formId,
      label,
      shortLabel,
      description,
      fieldType,
      options: options != null ? options : Prisma.JsonNull,
      validation: validation != null ? validation : Prisma.JsonNull,
      controlType,
      displayOptions: displayOptions != null ? displayOptions : Prisma.JsonNull,
    },
    update: {
      label,
      shortLabel,
      description,
      fieldType,
      options: options != null ? options : Prisma.JsonNull,
      validation: validation != null ? validation : Prisma.JsonNull,
      controlType,
      displayOptions: displayOptions != null ? displayOptions : Prisma.JsonNull,
    },
  });

  return field;
}

export async function deleteField({ id }: { id: Field["id"] }, sbUser: User) {
  const field = await authenticatedPrismaClient(sbUser).field.update({
    where: { id },
    data: {
      deleted: true,
    },
  });

  return field;
}
