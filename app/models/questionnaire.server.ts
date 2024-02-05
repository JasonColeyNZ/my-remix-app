// import type { Question, Questionnaire } from "~/db.server.ts";
// import { prisma } from "~/db.server.ts";
// import type { ThenArg } from "~/utils/types.ts";

// export type QuestionnaireItemsType = ThenArg<
//   ReturnType<typeof getQuestionnaires>
// >;
// export async function getQuestionnaires({
//   entityId,
// }: {
//   entityId: Questionnaire["entityId"];
// }) {
//   const records = await prisma.questionnaire.findMany({
//     where: { entityId },
//     include: {
//       _count: {
//         select: {
//           questions: true,
//         },
//       },
//     },
//   });
//   return records;
// }

// export type QuestionnaireItemType = ThenArg<
//   ReturnType<typeof getQuestionnaireById>
// >;
// export async function getQuestionnaireById({
//   id,
// }: {
//   id: Questionnaire["id"];
// }) {
//   const record = await prisma.questionnaire.findUnique({
//     where: { id },
//     select: {
//       id: true,
//       name: true,
//       description: true,
//       questionOrder: true,
//       questions: {
//         select: {
//           id: true,
//           question: true,
//           description: true,
//           type: true,
//           options: true,
//           required: true,
//         },
//       },
//     },
//   });
//   return record;
// }

// export async function createQuestionnaire({
//   name,
//   description,
//   entityId,
// }: {
//   name: Questionnaire["name"];
//   description?: Questionnaire["description"];
//   entityId: Questionnaire["entityId"];
// }) {
//   const record = await prisma.questionnaire.create({
//     data: {
//       name,
//       description,
//       entityId,
//     },
//   });
//   return record;
// }

// export async function addQuestionToSortOrder({
//   questionnaireId,
//   questionId,
// }: {
//   questionnaireId: Questionnaire["id"];
//   questionId: Question["id"];
// }) {
//   const questionnaire = await prisma.questionnaire.findUnique({
//     where: { id: questionnaireId },
//     select: {
//       id: true,
//       questionOrder: true,
//     },
//   });
//   if (!questionnaire) throw new Error("Questionnaire not found");
//   if (questionnaire?.questionOrder) {
//     questionnaire.questionOrder += "," + questionId;
//   } else {
//     questionnaire.questionOrder = questionId;
//   }

//   await prisma.questionnaire.update({
//     where: { id: questionnaireId },
//     data: {
//       questionOrder: questionnaire?.questionOrder,
//     },
//   });
// }
