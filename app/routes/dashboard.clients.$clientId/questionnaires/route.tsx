import { Outlet, useLocation } from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import appInfo from "~/app-info";
// import { useMemo } from "react";
// import { useLocales } from "remix-utils/locales/react";
import FullScreenCardLayout from "~/layouts/page-layouts/FullScreenCard";
import { invariantResponse } from "~/utils/misc.tsx";
import { metaMatchesData } from "~/utils/routeData/route-matches";

// import DataTable from "./data-table.tsx";
// import { questionnaireColumns } from "./tableColumns.tsx";

export const meta: MetaFunction = ({ matches }) => {
  const data = metaMatchesData(
    "routes/dashboard.clients.$clientId/route",
    matches,
  );
  return [
    {
      title: `${appInfo.title} -  ${
        data ? data.client.firstName + " " + data.client.lastName : "Client"
      } Questionnaires`,
    },
  ];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { clientId } = params;
  invariantResponse(clientId, "clientId is required");

  // const session = await getSession(request);

  //load all questionnaireResponses for client
  const questionnaireResponses = null; //await getQuestionnaireResponses({ clientId });
  return json(
    {
      status: "ok",
      questionnaireResponses,
      clientId,
    },
    // {
    //   headers: {
    //     "Set-Cookie": await sessionStorage.commitSession(session),
    //   },
    // },
  );
}

// const questionnaireProgress = (questionnaireResponse: any) => {
//   return (
//     ((questionnaireResponse.questionnaire._count.questions -
//       questionnaireResponse._count.responses) /
//       questionnaireResponse.questionnaire._count.questions) *
//     100
//   );
// };

const ClientQuestionnaires = () => {
  // const { questionnaireResponses, clientId } = useLoaderData<typeof loader>();
  // const locales = useLocales();
  const location = useLocation();

  const regExpQuestionnaires = new RegExp(
    `/dashboard/clients/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/questionnaires\\s`,
  );
  const questionnairesForm = regExpQuestionnaires.test(location.pathname + " ");
  // const columns = useMemo(
  //   () => questionnaireColumns(clientId, locales),
  //   [clientId, locales],
  // );

  return (
    <>
      {!questionnairesForm && <Outlet />}
      {questionnairesForm && (
        <>
          {/* <AddRecord /> */}
          <FullScreenCardLayout>
            <div className="w-full min-h-0 notWide:sm:rounded-md">
              {/* <DataTable
                columns={columns}
                data={questionnaireResponses}
                clientId={clientId}
              /> */}
            </div>
          </FullScreenCardLayout>
        </>
      )}
    </>
  );
};

export default ClientQuestionnaires;
