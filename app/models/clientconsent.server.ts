import type { User } from "@supabase/supabase-js";
import type { FormDefinition } from "~/components/draggable-forms-editor/types.ts";
import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";
import type { ClientConsent } from "~/db.server.ts";

import type { FormType } from "./form.server.ts";
import { getFormById } from "./form.server.ts";
import type { ImageUploadDataType } from "~/utils/types.ts";

export type ClientConsentItemsType = {
  id: ClientConsent["id"];
  // dateTime: string;
  // signedDateTime: string;
  clientSignatureDateTime: string;
  userSignatureDateTime: string;
  consentTitle: string;
  consentText: string;
  creator: {
    firstName: string;
    lastName: string;
    avatarData: ImageUploadDataType | null;
  };
  createdAt: string;
};

// type _ClientConsentItemsType = {
//   id: string;
//   dateTime: Date;
//   signedDateTime: Date;
//   consentTitle: string;
//   consentText: string;
//   creator:
// };
// type _ClientConsentsItemsType = _ClientConsentItemsType[];

export type ClientConsentsItemsType = ClientConsentItemsType[];
export async function getClientConsents(
  { clientId }: { clientId: string },
  sbUser: User,
) {
  const data = await authenticatedPrismaClient(sbUser).clientConsent.findMany({
    where: { clientId },
    select: {
      id: true,
      // dateTime: true,
      // signedDateTime: true,
      consentTitle: true,
      consentText: true,
      createdAt: true,
      clientSignatureDateTime: true,
      userSignatureDateTime: true,
      creator: {
        select: {
          firstName: true,
          lastName: true,
          avatarData: true,
        },
      },
    },
    orderBy: [{ createdAt: "asc" }],
  });

  // console.log("data", data);

  const processedConsents = data.map((consent) => {
    return {
      ...consent,
      // creator,
      clientSignatureDateTime: consent.clientSignatureDateTime
        ? consent.clientSignatureDateTime.toISOString()
        : "",
      userSignatureDateTime: consent.userSignatureDateTime
        ? consent.userSignatureDateTime.toISOString()
        : "",
      createdAt: consent.createdAt.toISOString(),
    };
  });
  return processedConsents as ClientConsentsItemsType;
}

export type ConsentType = {
  id: string;
  clientSignatureDateTime: string | null;
  clientAcceptance: boolean;
  clientSignature: string | null;
  userSignatureDateTime: string | null;
  userAcceptance: boolean;
  userSignature: string | null;
  createdAt: string;
  consentTitle: ClientConsent["consentTitle"];
  consentText: ClientConsent["consentText"];
  formId: ClientConsent["formId"];
  formData: ClientConsent["formData"];
  creator: string;
  form: FormType;
};

export async function getClientConsentById(
  { id }: { id: string },
  sbUser: User,
) {
  if (id === "new") {
    return {
      id: "new",
      createdAt: new Date().toISOString(),
      clientSignatureDateTime: null,
      userSignatureDateTime: null,
      consentTitle: "",
      consentText: "",
      formId: "",
      formData: "",
    } as ConsentType;
  }

  const data = await authenticatedPrismaClient(sbUser).clientConsent.findUnique(
    {
      where: { id },
      select: {
        id: true,
        clientSignatureDateTime: true,
        clientAcceptance: true,
        userSignatureDateTime: true,
        userAcceptance: true,
        clientSignature: {
          select: {
            signature: true,
          },
        },
        userSignature: {
          select: {
            signature: true,
          },
        },
        createdAt: true,
        consentTitle: true,
        consentText: true,
        formId: true,
        formData: true,
        creator: {
          select: {
            fullName: true,
          },
        },
      },
    },
  );
  if (!data) throw new Error("ClientConsent not found");

  const form = await getFormById({ id: data.formId }, sbUser);

  return {
    ...data,
    creator: data.creator.fullName,
    clientSignatureDateTime: data.clientSignatureDateTime?.toISOString(),
    clientSignature: data.clientSignature?.signature,
    userSignatureDateTime: data.userSignatureDateTime?.toISOString(),
    userSignature: data.userSignature?.signature,
    createdAt: data.createdAt.toISOString(),
    form: form,
  } as ConsentType;
}

export async function addClientConsent(
  {
    clientId,
    // dateTime,
    formId,
  }: {
    clientId: string;
    // dateTime: Date;
    formId: string;
  },
  sbUser: User,
) {
  const form = await getFormById({ id: formId }, sbUser);

  // const letter = await authenticatedPrismaClient(sbUser).form.findUnique({
  //   where: { id: letterOfConsentId },
  // });

  // if (!letter) throw new Error("Letter of consent not found");

  const data = await authenticatedPrismaClient(sbUser).clientConsent.create({
    data: {
      clientId,
      formId,
      consentTitle: form.name,
      consentText: "",
      // formId: form.id,
      createdBy: sbUser.id,
    },
  });
  return data;
}

export async function deleteClientConsent(
  { id }: { id: string },
  sbUser: User,
) {
  const data = await authenticatedPrismaClient(sbUser).clientConsent.delete({
    where: { id },
  });
  return data;
}

// export async function addEditClientConsent(
//   {
//     id,
//     dateTime,
//     signedDateTime,
//     consentTitle,
//     consentText,
//   }: {
//     id: string;
//     dateTime: string;
//     signedDateTime: string | null;
//     consentTitle: string;
//     consentText: string;
//   },
//   sbUser: User
// ) {
//   const data = await authenticatedPrismaClient(sbUser).clientConsent.upsert({
//     where: { id },
//     update: {
//       dateTime: new Date(dateTime),
//       signedDateTime: signedDateTime ? new Date(signedDateTime) : null,
//       consentTitle,
//       consentText,
//     },
//     // create: {
//     //   clientId: "",
//     //   letterOfConsentId: "",
//     //   dateTime: new Date(dateTime),
//     //   signedDateTime: signedDateTime ? new Date(signedDateTime) : null,
//     //   consentTitle,
//     //   consentText,
//     // },
//   });
//   return data;
// }

export async function signClientConsent(
  {
    id,
    signature,
    clientId,
  }: { id: string; signature: string; clientId: string },
  sbUser: User,
) {
  //insert signature into database
  const data = await authenticatedPrismaClient(sbUser).signature.create({
    data: {
      objectType: "ClientConsent",
      objectId: id,
      signature,
      createdBy: clientId,
    },
  });
  //update ClientConsent
  const data2 = await authenticatedPrismaClient(sbUser).clientConsent.update({
    where: { id },
    data: {
      clientSignatureDateTime: new Date(),
      clientSignatureId: data.id,
    },
  });

  return data2;
}

export async function processConsentFormData(
  consent: ConsentType,
  formDefinition: FormDefinition,
  sbUser: User,
) {
  if (!consent) throw new Error("Client not found");
  const form = await getFormById({ id: consent.formId }, sbUser);
  if (!form) {
    throw new Error("Form not found");
  }

  consent = { ...consent, ...formDefinition.usedFormFields };
  if (consent.formData && typeof consent.formData === "object") {
    consent = { ...consent, ...consent.formData };
    consent.formData = {};
  }

  return { consent, formDefinition };
}
