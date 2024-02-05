import type { User } from "@supabase/supabase-js";
import type { FormDefinition } from "~/components/draggable-forms-editor/types.ts";
import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";
import type { UserNote } from "~/db.server.ts";
import { Prisma } from "~/db.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import type { ThenArg } from "~/utils/types.ts";

import { getFormById } from "./form.server.ts";

export type GetNotesItemType = {
  id: UserNote["id"];
  datetime: string;
  text: string;
  title: string;
};

//export type NoteItemsType = ThenArg<ReturnType<typeof getNotes>>;
export async function getNotes(
  { userId }: { userId: UserNote["userId"] },
  sbUser: User,
) {
  const notes = (await authenticatedPrismaClient(sbUser).userNote.findMany({
    where: { userId },
    select: {
      id: true,
      datetime: true,
      text: true,
      title: true,
    },
  })) as UserNote[];

  invariantResponse(notes, "No Notes found for id: " + userId);

  return notes.map(
    (note) =>
      ({
        id: note.id,
        datetime: note.datetime.toISOString(),
        text: note.text,
        title: note.title,
      }) as GetNotesItemType,
  ) as GetNotesItemType[];

  // return notes.map((note) => {
  //   return {
  //     id: note.id,
  //     datetime: note.datetime.toISOString(),
  //     text: note.text,
  //     title: note.title,
  //   };
  // });
}

export type NoteItemType = {
  id: UserNote["id"];
  title: UserNote["title"];
  datetime: UserNote["datetime"];
  text: UserNote["text"];
  formData: UserNote["formData"];
  formId: UserNote["formId"];
};
export async function getNoteById(
  { id }: { id: UserNote["id"] },
  sbUser: User,
) {
  if (id === "new") {
    return {
      id: "new",
      title: "",
      datetime: new Date(),
      text: "",
      formData: {},
      formId: "",
    } as NoteItemType;
  }

  const record = await authenticatedPrismaClient(sbUser).userNote.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      datetime: true,
      text: true,
      formData: true,
      formId: true,
    },
  });
  return record as NoteItemType;
}

export async function processNoteFormData(
  note: NoteItemType,
  formDefinition: FormDefinition,
  sbUser: User,
) {
  if (!note) throw new Error("User not found");
  const form = await getFormById({ id: note.formId }, sbUser);
  if (!form) {
    throw new Error("Form not found");
  }

  note = { ...note, ...formDefinition.usedFormFields };
  if (note.formData && typeof note.formData === "object") {
    note = { ...note, ...note.formData };
    note.formData = {};
  }

  return { note, formDefinition };
}

export type addUpdateNoteItemType = ThenArg<ReturnType<typeof addUpdateNote>>;
export async function addUpdateNote(
  {
    id,
    userId,
    title,
    datetime,
    text,
    formData,
    formId,
  }: {
    id: UserNote["id"];
    userId: UserNote["userId"];
    title: UserNote["title"];
    datetime: UserNote["datetime"];
    text: UserNote["text"];
    formData: UserNote["formData"];
    formId: UserNote["formId"];
  },
  sbUser: User,
) {
  try {
    if (id === "new") {
      const record = await authenticatedPrismaClient(sbUser).userNote.create({
        data: {
          userId,
          title,
          datetime,
          text,
          formData: formData != null ? formData : Prisma.JsonNull,
          formId,
          createdBy: sbUser.id,
        },
      });
      return record;
    }
    const record = await authenticatedPrismaClient(sbUser).userNote.update({
      where: { id },
      data: {
        title,
        datetime,
        text,
        formData: formData != null ? formData : Prisma.JsonNull,
        formId,
      },
    });

    return record;
  } catch (error) {
    console.error(error);
    return null;
  }
}
