import type { User } from "@supabase/supabase-js";
import {
  getAreaFields,
  getWorkingFormDefinitionFromSaved,
} from "~/components/draggable-forms-editor/formUtils.ts";
import type {
  AreaType,
  FormDefinition,
} from "~/components/draggable-forms-editor/types.ts";
import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";
import type { Form } from "~/db.server.ts";
import { FormArea, Prisma } from "~/db.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import type { ThenArg } from "~/utils/types.ts";

import { getAreaCustomFields } from "./field.server.ts";
import type { SavedFormDefinition } from "~/components/draggable-forms-editor/schemas/saved-form-schema.ts";
import { savedFormSchema } from "~/components/draggable-forms-editor/schemas/saved-form-schema.ts";

export type FormsType = FormType[];

export async function getForms(system: boolean, sbUser: User) {
  const forms = await authenticatedPrismaClient(sbUser).form.findMany({
    select: {
      id: true,
      area: true,
      name: true,
      description: true,
      default: true,
    },
    orderBy: {
      area: "asc",
    },
  });

  const filteredForms = forms.filter((form) => {
    // if (!system) {
    //   return !form.default;
    // } else {
    return form;
    // }
  });

  //quick way to remove ts error
  return filteredForms as unknown as FormsType;
}

type AreaFormType = {
  id: Form["id"];
  area: AreaType;
  name: Form["name"];
  description: Form["description"];
  formDefinition: SavedFormDefinition;
};

export type AreaFormsType = AreaFormType[];
export async function getAreaForms(
  { area }: { area: Form["area"] },
  sbUser: User,
) {
  const forms = await authenticatedPrismaClient(sbUser).form.findMany({
    where: { area },
    select: {
      id: true,
      area: true,
      name: true,
      description: true,
      formDefinition: true,
    },
  });
  return forms as AreaFormsType;
}

export type FormType = {
  id: Form["id"];
  area: AreaType;
  name: Form["name"];
  description: Form["description"];
  formDefinition: SavedFormDefinition | null;
};

export type AreaDefaultFormType = ThenArg<
  ReturnType<typeof getAreaDefaultForm>
>;
export async function getAreaDefaultForm(
  { area }: { area: string },
  sbUser: User,
) {
  const form = await authenticatedPrismaClient(sbUser).form.findFirst({
    where: {
      default: true,

      area: FormArea[area as keyof typeof FormArea],
    },

    // },
    // select: {
    //   id: true,
    //   area: true,
    //   name: true,
    //   description: true,
    //   formDefinition: true,
    // },
  });
  if (!form) {
    throw new Error("Form not found");
  }

  const savedForm = savedFormSchema.safeParse(form.formDefinition);

  return {
    ...form,
    formDefinition: savedForm.success ? savedForm.data : {},
  } as FormType;
}

//export type FormType = ThenArg<ReturnType<typeof getFormById>>;

export async function getFormById({ id }: { id: Form["id"] }, sbUser: User) {
  const form = await authenticatedPrismaClient(sbUser).form.findUnique({
    where: { id },
    select: {
      id: true,
      area: true,
      name: true,
      description: true,
      formDefinition: true,
    },
  });

  if (!form) {
    throw new Error("Form not found");
  }

  const savedForm = savedFormSchema.safeParse(form.formDefinition);
  // console.log("savedForm", savedForm.error);

  return {
    ...form,
    formDefinition: savedForm.success ? savedForm.data : {},
  } as FormType;
}

export async function addForm(
  {
    area,
    name,
    description,
    formDefinition,
  }: {
    area: FormArea;
    name: Form["name"];
    description?: Form["description"];
    formDefinition: SavedFormDefinition | null;
  },
  sbUser: User,
) {
  const form = await authenticatedPrismaClient(sbUser).form.create({
    data: {
      area,
      name,
      description,
      formDefinition: formDefinition != null ? formDefinition : Prisma.JsonNull,
    },
  });

  const savedForm = savedFormSchema.safeParse(form.formDefinition);

  return {
    ...form,
    formDefinition: savedForm.success ? savedForm.data : {},
  } as FormType;
}

type UpdateFormType = {
  id: Form["id"];
  name?: Form["name"];
  description?: Form["description"];
  area?: Form["area"];
  formDefinition?: Form["formDefinition"];
  entityId: Form["entityId"];
  default?: Form["default"];
};

export async function updateFormDefinition(
  {
    id,
    formDefinition,
  }: {
    id: Form["id"];
    formDefinition: SavedFormDefinition;
  },
  sbUser: User,
) {
  //console.log("updateFormDefinition", id, formDefinition);

  const record = (await authenticatedPrismaClient(sbUser).form.update({
    where: { id },
    data: {
      formDefinition: formDefinition != null ? formDefinition : Prisma.JsonNull,
    },
  })) as UpdateFormType;

  return record;
}

export async function getProcessedFormDefinitionById(
  {
    id,
    form,
  }: {
    id: Form["id"];
    form?: FormType;
  },
  sbUser: User,
) {
  let formDefinition: SavedFormDefinition;
  let area: AreaType;
  // console.log("getProcessedFormDefinitionById", id, form);
  if (!form) {
    const newForm = await getFormById({ id }, sbUser);

    invariantResponse(newForm, "No data entry form was found");
    // if (!newForm) {
    //   throw new Error("Form not found");
    // }
    area = newForm.area;
    formDefinition = newForm.formDefinition
      ? newForm.formDefinition
      : { rows: [] };
  } else {
    area = form.area;
    formDefinition = form.formDefinition ? form.formDefinition : { rows: [] };
  }
  invariantResponse(
    formDefinition,
    "No form definition found in data entry form",
  );
  // if (!formDefinition) {
  //   throw new Error("Form not found");
  // }

  //console.log("getProcessedFormDefinitionById", formDefinition);

  const areaCustomFields = await getAreaCustomFields(
    {
      area: area,
    },
    sbUser,
  );
  // console.log("areaCustomFields", areaCustomFields);

  const areaFields = getAreaFields(area);
  // console.log("areaFields", areaFields);

  //  const rawFormDefinition =
  //    formDefinition !== "" ? JSON.parse(formDefinition) : undefined;
  //  console.log("rawFormDefinition", rawFormDefinition);

  const processedFormDefinition = getWorkingFormDefinitionFromSaved(
    formDefinition,
    areaFields,
    areaCustomFields,
    id,
    area,
  );
  // console.log("processedFormDefinition", processedFormDefinition);
  return processedFormDefinition as FormDefinition;
}
