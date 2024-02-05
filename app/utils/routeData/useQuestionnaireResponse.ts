// import type { QuestionnaireResponseItemType } from "~/models/questionnaire_response.server.ts";

// function isQuestionnaireResponse(
//   questionnaireResponse: any
// ): questionnaireResponse is QuestionnaireResponseItemType {
//   return (
//     questionnaireResponse &&
//     typeof questionnaireResponse === "object" &&
//     typeof questionnaireResponse.questionnaire === "object" &&
//     typeof questionnaireResponse.responses === "object"
//   );
// }

// export function useOptionalQuestionnaireResponse(): QuestionnaireResponseItemType | null {
//   let data = useMatchesData<{
//     questionnaireResponse: QuestionnaireResponseItemType;
//   }>("routes/dashboard.client.$clientId.questionnaire.$questionnaireId");
//   // console.log(
//   //   "useQuestionnaireResponse: routes/dashboard.client.questionnaire",
//   //   data
//   // );
//   if (data && isQuestionnaireResponse(data.questionnaireResponse)) {
//     return data.questionnaireResponse;
//   }

//   return null;
// }

// export function useQuestionnaireResponse(): QuestionnaireResponseItemType | null {
//   const maybeQuestionnaireResponse = useOptionalQuestionnaireResponse();
//   //  if (!maybeClient) {
//   //    throw new Error(
//   //      "No record found in loaders, but record is required by useClient"
//   //    );
//   //  }
//   return maybeQuestionnaireResponse;
// }
