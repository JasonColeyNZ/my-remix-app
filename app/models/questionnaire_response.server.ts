import { prisma } from "~/db.server.ts";
import type { ThenArg } from "~/utils/types.ts";

// export type QuestionnaireResponseItemsType = ThenArg<
//   ReturnType<typeof getQuestionnaireResponses>
// >;
// export async function getQuestionnaireResponses({
//   clientId,
// }: {
//   clientId: string;
// }) {
//   const records = await prisma.questionnaireResponse.findMany({
//     where: { clientId },
//     select: {
//       id: true,
//       date: true,
//       questionnaire: {
//         select: {
//           name: true,
//           description: true,
//           _count: {
//             select: {
//               questions: { where: { required: { equals: true } } },
//             },
//           },
//         },
//       },
//       _count: {
//         select: {
//           responses: {
//             where: {
//               response: { equals: "" },
//               AND: { question: { required: { equals: true } } },
//             },
//           },
//         },
//       },
//     },
//   });
//   return records;
// }

// export type QuestionnaireResponseItemType = ThenArg<
//   ReturnType<typeof getQuestionnaireResponse>
// >;
// export async function getQuestionnaireResponse({ id }: { id: string }) {
//   let record = await prisma.questionnaireResponse.findUnique({
//     select: {
//       id: true,
//       date: true,
//       questionnaire: {
//         select: {
//           name: true,
//           description: true,
//           questionOrder: true,
//           _count: {
//             select: {
//               questions: true,
//             },
//           },
//         },
//       },
//       responses: {
//         select: {
//           id: true,
//           response: true,
//           question: {
//             select: {
//               id: true,
//               question: true,
//               type: true,
//               options: true,
//               description: true,
//               required: true,
//             },
//           },
//         },
//       },
//     },
//     where: { id },
//   });
//   //lets order by the questionnaire order of questions
//   if (
//     record &&
//     record.questionnaire &&
//     record.questionnaire.questionOrder &&
//     record.questionnaire.questionOrder
//   ) {
//     const sortArray = record.questionnaire.questionOrder.split(",") || [];

//     if (sortArray) {
//       const sortedResponses =
//         sortArray.reduce((acc, questionId) => {
//           const response = record?.responses.find(
//             (response) => response.question.id === questionId,
//           );
//           if (response) {
//             acc.push(response);
//           }
//           return acc;
//         }, [] as any) || [];

//       record.responses = sortedResponses;
//     }
//   }
//   //console.log(orderRecords);
//   //record?.responses && orderRecords && record.responses =  orderRecords.map((element)=> element);
//   return record;
// }

// export async function createClientQuestionnaireResponse({
//   questionnaireId,
//   clientId,
// }: {
//   questionnaireId: string;
//   clientId: string;
// }) {
//   const record = await prisma.questionnaireResponse.create({
//     data: {
//       questionnaireId,
//       clientId,
//       date: new Date(),
//     },
//   });

//   const questionnaire = await prisma.questionnaire.findUnique({
//     where: { id: questionnaireId },
//     select: {
//       questions: {
//         select: {
//           id: true,
//           questionnaireId: true,
//         },
//       },
//     },
//   });

//   if (questionnaire !== null) {
//     await prisma.questionResponse.createMany({
//       data: questionnaire.questions.map((question) => ({
//         response: "",
//         questionId: question.id,
//         questionnaireResponseId: record.id,
//       })),
//     });
//   }

//   return record.id;
// }

// export async function updateQuestionResponse({
//   id,
//   response,
// }: {
//   id: string;
//   response: string;
// }) {
//   try {
//     console.log("id", id);
//     console.log("response", response);
//     const record = await prisma.questionResponse.update({
//       where: { id },
//       data: { response },
//     });
//     return record;
//   } catch (e) {
//     console.log(e);
//   }
// }
