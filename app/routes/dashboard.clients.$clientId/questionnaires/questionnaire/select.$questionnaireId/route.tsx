// import { useLoaderData } from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
// import { useContext } from "react";
// import {
//   getQuestionnaireById,
//   getQuestionnaires,
// } from "~/models/questionnaire.server.ts";
// import { createClientQuestionnaireResponse } from "~/models/questionnaire_response.server.ts";
// import { getSession } from "~/services/session.server.ts";
// import { AppContext } from "~/store/appContext";
// import { NavigationTypes } from "~/store/navigationReducer.ts";
import { invariantResponse } from "~/utils/misc.tsx";

export async function action({ request, params }: ActionFunctionArgs) {
  //console.log(params);
  const questionnaireId = params.questionnaireId;
  const clientId = params.clientId;
  invariantResponse(questionnaireId, "questionnaireId is required");
  invariantResponse(clientId, "clientId is required");

  //save questionnaire to client
  // await createClientQuestionnaireResponse({
  //   questionnaireId,
  //   clientId,
  // });

  //redirect to client questionnaires
  return json({});
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  // const session = await getSession(request);
  const { clientId, questionnaireId } = params;
  invariantResponse(clientId, "clientId is required");
  invariantResponse(questionnaireId, "questionnaireId is required");
  // const entityId = session.get("entityId");
  // const questionnaires = await getQuestionnaires({ entityId });
  // const questionnaire =
  //   questionnaireId !== "new"
  //     ? await getQuestionnaireById({ id: questionnaireId })
  //     : null;

  return json({ questionnaireId });
}

const Questionnaire = () => {
  // const {  } = useLoaderData<typeof loader>();
  // const { dispatch } = useContext(AppContext);
  // const [selectedQuestionnaireId, setSelectedQuestionnaireId] =
  //   useState<string>("");

  // useEffect(() => {
  //   dispatch({
  //     type: NavigationTypes.selectButtonDisabled,
  //     payload: {
  //       disabled: questionnaire === null,
  //     },
  //   });

  //   //setSelectButtonDisabled && setSelectButtonDisabled(questionnaire === null);
  // }, [questionnaire, dispatch]);

  // const updateSelectedQuesionnaireId = (id: string) => {
  //   // console.log("updateSelectedQuesionnaireId", selectedQuestionnaireId);
  //   // console.log("updateSelectedQuesionnaireId", id);
  //   if (id === selectedQuestionnaireId || id === "") return;

  //   setSelectedQuestionnaireId(id);
  //   let url = location.pathname;
  //   // console.log(
  //   //   "SettingsRecordsQuestionnaires.updateSelectedQuesionnaireId",
  //   //   location.pathname
  //   // );
  //   // url = url.replace(
  //   //   /dashboard\/settings\/records\/questionnaires(?:\/\w+|\/|)/,
  //   //   `dashboard/settings/records/questionnaires/${id}`
  //   // );
  //   //console.log("url", url);
  //   // if (url !== location.pathname) {
  //   //   navigate(url);
  //   // }
  // };

  return (
    <>
      {/* <Paper
        id="questionnaires-root"
        elevation={1}
        sx={{
          flex: "1 1 0%",
          display: "flex",
          minHeight: 0,
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: "1 1 0%",
            flexDirection: { xs: "column", sm: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              display: { xs: "none", sm: "none", md: "flex" },
              //flex: "0 0 0",
            }}
          >
            <QuestionnaireList
              setSelectedId={updateSelectedQuesionnaireId}
              questionnaires={questionnaires}
              selectedId={selectedQuestionnaireId || questionnaireId || null}
              //questionnaires={questionnaires}
              //selectedId={questionnaire?.id || null}
            />
          </Box>
          <Box
            sx={{
              display: { xs: "inline-flex", sm: "inline-flex", md: "none" },
              flex: "0 0 0%",
            }}
          >
            <FormControl variant="filled" sx={{ m: 1, width: "100%" }}>
              <InputLabel>Select Questionnaire</InputLabel>
              <Select
                value={selectedQuestionnaireId || questionnaireId || ""}
                fullWidth={true}
                label="Select Questionnaire"
                onChange={(e) => {
                  updateSelectedQuesionnaireId(e.target.value);
                }}
              >
                {questionnaires.map((questionnaire) => (
                  <MenuItem key={questionnaire.id} value={questionnaire.id}>
                    {questionnaire.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box display={"flex"} flex={"1 1 0%"}>
            <QuestionnairePreview questionnaire={questionnaire} />
          </Box>
        </Box>
      </Paper>
 */}
    </>
  );
};
export default Questionnaire;
