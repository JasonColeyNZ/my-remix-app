import {
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useLocation,
  // useNavigate,
  useRouteError,
} from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useContext, useEffect } from "react";
// import { useLocales } from "remix-utils/locales/react";
// import { ClientInfoTabs } from "~/app-navigation";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
// import { CLIENTS_SELECTED_TAB } from "~/const";
import FullScreenCardLayout from "~/layouts/page-layouts/FullScreenCard";
// import type {
//   GetRecordsItemType,
//   RecordByIdType,
//   RecordItemsType,
// } from "~/models/record.server.ts";
import {
  // addEditRecord,
  deleteRecord,
  getRecordAndServicesByRecordId,
  getRecords,
} from "~/models/record.server.ts";
// import type { EntityServicesType } from "~/models/services.server.ts";
import { getEntityServices } from "~/models/services.server.ts";
import { getTableDefault } from "~/models/user.default.server.ts";
// import theme from "~/mui/theme.ts";
// import { getSession, sessionStorage } from "~/services/session.server.ts";
import { AppContext } from "~/store/appContext.tsx";
// import { NavigationTypes } from "~/store/navigationReducer.ts";
import { invariantResponse } from "~/utils/misc.tsx";
// import { setSessionVariable } from "~/utils/misc";
import { requireUserSession } from "~/utils/session.server.ts";
import { TableTypes } from "~/utils/types.ts";
import RecordsDataGrid from "./components/RecordsDataGrid";
import appInfo from "~/app-info";
import { metaMatchesData } from "~/utils/routeData/route-matches";

// import { addRecordValidator } from "./$recordId/addEditRecordValidator.ts";
// import AddRecord from "./components/AddRecord.tsx";
// import { recordsColumns } from "./tableColumns.tsx";

export const meta: MetaFunction = ({ matches }) => {
  const data = metaMatchesData(
    "routes/dashboard.clients.$clientId/route",
    matches,
  );
  return [
    {
      title: `${appInfo.title} -  ${
        data ? data.client.firstName + " " + data.client.lastName : "Client"
      } Records`,
    },
  ];
};

export async function action({ request, params }: ActionFunctionArgs) {
  // if the user isn't authenticated, this will redirect to login
  const { user: sbUser, response } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const clientId = params.clientId;
  invariantResponse(clientId, "clientId is required");

  let formData = await request.formData();

  // const formData = await parseFormData<{ action: string; id: string }>(request);
  // if (!formData || !formData.action)
  //   return json({ status: 400, data: null, error: "Invalid form data" });

  switch (formData.get("intent")) {
    case "record": {
      // const result = await withZod(addRecordValidator).validate(formData);

      // if (result.error) {
      //   console.log("result.error: ", result.error);
      //   return validationError(result.error, result.submittedData);
      // }
      // const data = {
      //   ...result.data,
      //   totalCost: new Prisma.Decimal(0),
      //   totalDuration: 0,
      // };
      // const newRecord = await addEditRecord(data, sbUser);

      // //console.log("result.data: ", result.data);
      // if (!newRecord)
      return json({
        status: 404,
        //data: null,
        error: "Record not created",
      });

      // const session = await getSession(request);
      // session.set("NEW_RECORD", newRecord.id);

      // return redirect(`/dashboard/client/${clientId}/records/${newRecord.id}`, {
      //   status: 302,
      //   headers: {
      //     ...response.headers,
      //     "Set-Cookie": await sessionStorage.commitSession(session),
      //   },
      // });
    }
    case "record-delete": {
      const id = formData.get("id")?.toString();
      if (id) {
        await deleteRecord({ id }, sbUser);
        return json({ status: 200 }, { headers: response.headers });
      }
    }
  }
  return json(null);
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  console.log("client.records:loader: ");
  // const session = await getSession(request);
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const { clientId } = params;
  invariantResponse(clientId, "clientId is required");
  //console.log("client.records:loader: ");
  const [records, services, { record: newRecord }, tableDefaults] =
    await Promise.all([
      getRecords({ clientId: clientId }, sbUser),
      getEntityServices(sbUser),
      getRecordAndServicesByRecordId({ id: "new" }, sbUser),
      getTableDefault(TableTypes.CLIENT_RECORDS, sbUser),
    ]);
  //console.log("textTemplates: ", textTemplates);
  // console.log("services: ", services);
  // setSessionVariable(
  //   request,
  //   session,
  //   CLIENTS_SELECTED_TAB,
  //   "records",
  //   ClientInfoTabs,
  // );
  return json(
    {
      status: "ok",
      records,
      services,
      clientId,
      tableDefaults,
      newRecord: { ...newRecord, userId: sbUser.id, clientId },
    },
    // {
    //   headers: {
    //     "Set-Cookie": await sessionStorage.commitSession(session),
    //   },
    // },
  );
}

const ClientRecords = () => {
  // const locales = useLocales();

  // const { records, services, clientId, tableDefaults } =
  useLoaderData<typeof loader>();

  const { dispatch } = useContext(AppContext);

  const location = useLocation();
  // const navigate = useNavigate();
  const regExpRecords = new RegExp(
    `/dashboard/clients/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/records\\s`,
  );
  const recordsForm = regExpRecords.test(location.pathname + " ");

  useEffect(() => {
    if (recordsForm) {
      // dispatch({
      //   type: NavigationTypes.setPageHeaderObject,
      //   payload: {
      //     object: <ClientHeader />,
      //   },
      // });
    }
  }, [dispatch, recordsForm]);

  // const serviceItems = useMemo(() => {
  //   if (!services) return [];
  //   return services.map((service) => {
  //     return {
  //       value: service.id,
  //       text: service.name,
  //     };
  //   });
  // }, [services]);

  // const columns = useMemo(
  //   () => recordsColumns(navigate, serviceItems, services, clientId, locales),
  //   [clientId, locales, navigate, serviceItems, services],
  // );

  return (
    <>
      {!recordsForm && <Outlet />}
      {recordsForm && (
        <>
          {/* <AddRecord /> */}
          <FullScreenCardLayout>
            <RecordsDataGrid />
            {/* <DataTable
              columns={columns}
              data={records}
              tableDefaults={tableDefaults}
              tableArea={TableTypes.CLIENT_RECORDS}
              onRowClick={(row: any) => {
                navigate(
                  `/dashboard/clients/${clientId}/records/${row.original.id}`,
                );
              }}
            /> */}
          </FullScreenCardLayout>
        </>
      )}
    </>
  );
};
export default ClientRecords;

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        400: ({ params }) => {
          return (
            <div>
              <h1 style={{ fontSize: "2em" }}>400</h1>
              <p>{isRouteErrorResponse(error) ? error.data : "unknown"}</p>
            </div>
          );
        },
        404: ({ params }) => {
          return (
            <div>
              <h1 style={{ fontSize: "2em" }}>400</h1>
              <p>Page not found</p>
            </div>
          );
        },
      }}
    />
  );
}
