// import { useFetcher } from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
// import type { Dispatch, SetStateAction } from "react";
// import { useRef } from "react";
// import {
//   getQuestionnaireResponse,
//   updateQuestionResponse,
// } from "~/models/questionnaire_response.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
// import Question from "~/utils/questionnaire/components/Question";
//import { getSession } from "~/session.server";
import { useClient } from "~/utils/routeData/useClient.ts";

// import { useQuestionnaireResponse } from "~/utils/routeData/useQuestionnaireResponse";

export async function action({ request, params }: ActionFunctionArgs) {
  // const data = await request.formData();

  // let parameters: string[][] = JSON.parse(JSON.stringify([...data.entries()]));
  // console.log(parameters);
  // let parameters = [...data.entries()] // expand the elements from the .entries() iterator into an actual array
  //   .map((e) => encodeURIComponent(e[0]) + "=" + encodeURIComponent(e[1])); // transform the elements into encoded key-value-pairs
  //console.log("parameters: ", parameters);

  // parameters.forEach(async (e) => {
  //   const [key, value] = e;
  //   console.log("key", key);
  //   console.log("value", value);
  //   // await updateQuestionResponse({ id: key, response: value });
  // });

  //console.log("data", data);

  //console.log("params: ", params);
  const questionnaireId = params.questionnaireId;
  const clientId = params.clientId;
  invariantResponse(questionnaireId, "questionnaireId is required");
  invariantResponse(clientId, "clientId is required");

  //save questionnaire to client

  //redirect to client questionnaires
  return json({});
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  console.log("dashboard.client.questionnaire loader");
  //invariant(params.recordId, "recordId is required");
  invariantResponse(params.clientId, "clientId is required");

  //const session = await getSession(request);

  // const questionnaireId = params.questionnaireId;
  //console.log("questionnaireId: ", questionnaireId);
  // const questionnaireResponse = questionnaireId
  //   ? await getQuestionnaireResponse({ id: questionnaireId })
  //   : null;
  //const client =
  //  questionnaireId === "edit" ? await getClient({ id: params.clientId }) : null;

  return json({ status: "ok" });
}

// interface IFormSaveContext {
//   setSaveForm: Dispatch<SetStateAction<boolean>>;
// }

// export const formSaveContext = createContext<IFormSaveContext>({
//   setSaveForm: () => {},
// });

const Questionnaire = () => {
  //const location = useLocation();
  //const navigate = useNavigate();
  // const [saveForm, setSaveForm] = useState(false);
  // const [percentage, setPercentage] = useState(0);

  const client = useClient();
  // const questionnaireResponse = useQuestionnaireResponse();
  // const fetcher = useFetcher();
  // const formRef = useRef<HTMLFormElement>(null);

  // useEffect(() => {
  //   if (!questionnaireResponse) return;
  //   const total = questionnaireResponse.responses.filter(
  //     (r) => r.question.required,
  //   ).length;
  //   const answered = questionnaireResponse.responses.filter(
  //     (r) => r.response !== "" && r.question.required,
  //   ).length;
  //   const percent = (answered / total) * 100;
  //   setPercentage(percent);
  // }, [questionnaireResponse]);

  // useEffect(() => {
  //   //console.log("useEffect saveForm", saveForm);

  //   if (fetcher.state !== "idle") return;
  //   if (!saveForm) return;
  //   if (!formRef.current) {
  //     setSaveForm(false);
  //     return;
  //   }
  //   const formData = new FormData(formRef.current);

  //   let parameters: string[][] = JSON.parse(
  //     JSON.stringify([...formData.entries()]),
  //   );
  //   //console.log("formData", parameters);

  //   const parametersToDelete = parameters.filter((e) => {
  //     const [key, value] = e;
  //     if (key.startsWith(":")) {
  //       return true;
  //     }
  //     const previousValue = questionnaireResponse?.responses.find(
  //       (r) => r.id === key,
  //     )?.response;
  //     if (previousValue === value) {
  //       return true;
  //     }
  //     return false;
  //   });
  //   parametersToDelete.forEach((e) => {
  //     formData.delete(e[0]);
  //   });

  //   parameters = JSON.parse(JSON.stringify([...formData.entries()]));
  //   //console.log("formData", parameters);

  //   if (parameters.length === 0) {
  //     setSaveForm(false);
  //     return;
  //   }

  //   console.log("About to Save");
  //   setSaveForm(false);
  //   fetcher.submit(formData, {
  //     method: "post",
  //     replace: true,
  //     action: "",
  //   });

  //   //console.log("saveForm");
  // }, [fetcher, questionnaireResponse?.responses, saveForm]);

  if (!client) return null;

  return (
    <>
      {/* <Paper
        sx={{
          width: "100%",
          maxWidth: "800px",
          ml: "auto",
          mr: "auto",
          mt: -8,
          pt: 8,
        }}
      >
        <fetcher.Form action={""} method="post" ref={formRef}>
          <List
            dense={true}
            sx={{
              width: "100%",
              px: 2,
            }}
          >
            {questionnaireResponse?.responses.map((responses, index) => (
                <ListItem
                  key={responses.id}
                  sx={[
                    {
                      pb: 1,
                    },

                    index != 0 && {
                      borderTop: "1px solid #eaeaea",
                      pt: 1,
                    },
                  ]}
                >
                  <Question
                    question={responses.question}
                    response={responses.response}
                    responseId={responses.id}
                  />
                </ListItem>
              ))}
          </List>
        </fetcher.Form>
      </Paper> */}
    </>
  );
};
export default Questionnaire;
