import type { User } from "@supabase/supabase-js";
import type { FormDefinition } from "~/components/draggable-forms-editor/types.ts";
import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";
import type { Note } from "~/db.server.ts";
import { Prisma } from "~/db.server.ts";
import type { ImageUploadDataType, ThenArg } from "~/utils/types.ts";

import { getFormById } from "./form.server.ts";

export type GetNotesItemType = {
  id: Note["id"];
  datetime: string;
  text: string;
  title: string;
  creator: {
    firstName: string;
    lastName: string;
    avatarData: ImageUploadDataType | null;
  };
};

// export type GetNotesItemType2 = {
//   id: Note["id"];
//   datetime: Date;
//   text: string;
//   title: string;
//   creator: string;
// };

export type NoteItemsType = ThenArg<ReturnType<typeof getNotes>>;
export async function getNotes(
  { clientId }: { clientId: Note["clientId"] },
  sbUser: User,
) {
  const result = await authenticatedPrismaClient(sbUser).note.findMany({
    where: { clientId },
    select: {
      id: true,
      datetime: true,
      text: true,
      title: true,
      createdAt: true,
      creator: {
        select: {
          firstName: true,
          lastName: true,
          avatarData: true,
        },
      },
    },
  });
  return result.map((note) => {
    return {
      ...note,
      // creator: note.creator.fullName
    };
  });
}

export type NoteItemType = {
  id: Note["id"];
  title: Note["title"];
  datetime: Note["datetime"];
  text: Note["text"];
  formData: Note["formData"];
  formId: Note["formId"];
  creator: string;
  createdAt: Note["createdAt"];
};
export async function getNoteById({ id }: { id: Note["id"] }, sbUser: User) {
  if (id === "new") {
    return {
      id: "new",
      title: "",
      datetime: new Date(),
      text: "",
      formData: {},
      formId: "",
      creator: "",
      createdAt: new Date(),
    } as NoteItemType;
  }

  const record = await authenticatedPrismaClient(sbUser).note.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      datetime: true,
      text: true,
      formData: true,
      formId: true,
      creator: {
        select: {
          fullName: true,
        },
      },
      createdAt: true,
    },
  });
  return {
    ...record,
    creator: record?.creator.fullName,
  } as NoteItemType;
}

export async function processNoteFormData(
  note: NoteItemType,
  formDefinition: FormDefinition,
  sbUser: User,
) {
  if (!note) throw new Error("Client not found");
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
    clientId,
    title,
    datetime,
    text,
    formData,
    formId,
  }: {
    id: Note["id"];
    clientId: Note["clientId"];
    title: Note["title"];
    datetime: Note["datetime"];
    text: Note["text"];
    formData: Note["formData"];
    formId: Note["formId"];
  },
  sbUser: User,
) {
  try {
    if (id === "new") {
      const record = await authenticatedPrismaClient(sbUser).note.create({
        data: {
          clientId,
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
    const record = await authenticatedPrismaClient(sbUser).note.update({
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

export async function deleteNoteById({ id }: { id: Note["id"] }, sbUser: User) {
  try {
    const record = await authenticatedPrismaClient(sbUser).note.delete({
      where: { id },
    });
    return record;
  } catch (error) {
    console.error(error);
    return null;
  }
}
