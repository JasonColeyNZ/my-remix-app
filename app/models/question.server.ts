// import type { Question } from "@prisma/client";
// import { prisma } from "~/db.server.ts";
// import type { ThenArg } from "~/utils/types.ts";

// import { addQuestionToSortOrder } from "./questionnaire.server.ts";

// export type QuestionItemType = ThenArg<ReturnType<typeof getQuestionById>>;
// export async function getQuestionById({ id }: { id: Question["id"] }) {
//   const record = await prisma.question.findUnique({
//     where: { id },
//     select: {
//       id: true,
//       question: true,
//       description: true,
//       type: true,
//       options: true,
//       required: true,
//     },
//   });
//   return record;
// }

// export type QuestionItemUpdateType = ThenArg<
//   ReturnType<typeof getQuestionById>
// >;
// export async function updateQuestion({
//   id,
//   question,
//   description,
//   type,
//   options,
//   required,
// }: {
//   id: Question["id"];
//   question: Question["question"];
//   description?: Question["description"];
//   type: Question["type"];
//   options: Question["options"];
//   required: Question["required"];
// }) {
//   const record = await prisma.question.update({
//     where: { id },
//     data: {
//       question,
//       description,
//       type,
//       options,
//       required,
//     },
//   });
//   return record;
// }

// export type QuestionItemAddType = ThenArg<ReturnType<typeof getQuestionById>>;
// export async function createQuestion({
//   question,
//   description,
//   type,
//   options,
//   required,
//   questionnaireId,
// }: {
//   question: Question["question"];
//   description?: Question["description"];
//   type: Question["type"];
//   options: Question["options"];
//   required: Question["required"];
//   questionnaireId: Question["questionnaireId"];
// }) {
//   const record = await prisma.question.create({
//     data: {
//       question,
//       description,
//       type,
//       options,
//       required,
//       questionnaireId,
//     },
//   });
//   //add question to sort order in question otherwise it won't show on the form
//   await addQuestionToSortOrder({
//     questionnaireId,
//     questionId: record.id,
//   });

//   return record;
// }
