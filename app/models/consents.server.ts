import { FormArea } from "@prisma/client";
import type { User } from "@supabase/supabase-js";
import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";

export type ConsentItemsType = {
  id: string;
  name: string;
  services: {
    name: string;
    color: string;
    textColor: string;
  }[];
};

export type ConsentsItemsType = ConsentItemsType[];
export async function getConsents(sbUser: User) {
  const data = await authenticatedPrismaClient(sbUser).form.findMany({
    where: {
      area: {
        equals: FormArea.ClientConsent,
      },
    },
    select: {
      id: true,
      name: true,
      services: {
        select: {
          service: {
            select: {
              name: true,
              color: true,
              textColor: true,
              category: {
                select: {
                  color: true,
                  textColor: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: [{ name: "asc" }],
  });

  // console.log("data", data);
  return data.map((consent) => {
    return {
      id: consent.id,
      name: consent.name,
      services: consent.services.map((service) => {
        return {
          name: service.service.name,
          color: service.service.color
            ? service.service.color
            : service.service.category.color,
          textColor: service.service.textColor
            ? service.service.textColor
            : service.service.category.textColor,
        };
      }),
    };
  }) as ConsentsItemsType;
}

// export async function createLetterOfConsent(
//   { name }: { name: string },
//   sbUser: User,
// ) {
//   const data = await authenticatedPrismaClient(sbUser).letterOfConsent.create({
//     data: {
//       name,
//       text: "",
//     },
//   });
//   return data;
// }

export type ConsentType = {
  id: string;
  name: string;
  text: string;
};

// export async function getLetterById({ id }: { id: string }, sbUser: User) {
//   if (id === "new") {
//     return {
//       id: "new",
//       name: "",
//       text: "",
//     } as LetterType;
//   }

//   const data = await authenticatedPrismaClient(
//     sbUser,
//   ).letterOfConsent.findUnique({
//     where: { id },
//     select: {
//       id: true,
//       name: true,
//       text: true,
//     },
//   });
//   return data as LetterType;
// }

// export async function updateTextLetter(
//   {
//     id,
//     text,
//   }: {
//     id: string;
//     text: string;
//   },
//   sbUser: User,
// ) {
//   const data = await authenticatedPrismaClient(sbUser).letterOfConsent.update({
//     where: { id },
//     data: {
//       text,
//     },
//   });
//   return data;
// }
