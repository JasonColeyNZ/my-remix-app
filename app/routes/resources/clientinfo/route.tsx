import {
  isRouteErrorResponse,
  useFetcher,
  useRouteError,
} from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useEffect, useState } from "react";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import type { ClientItemType } from "~/models/client.server.ts";
import { getClientById } from "~/models/client.server.ts";
import ClientInfo from "~/routes/dashboard.clients.$clientId/components/ClientInfo";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";

export async function loader({ request }: LoaderFunctionArgs) {
  console.log("clienteditor:loader: ");
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  const clientId = query;
  invariantResponse(clientId, "ClientId is required");

  const [client] = await Promise.all([getClientById({ id: clientId }, sbUser)]);

  invariantResponse(client, "Client not found", { status: 404 });

  return json({
    status: "ok",
    client,
  });
  // return json({})
}

const ClientInfoRoute = ({ clientId }: { clientId: string | undefined }) => {
  const dataLoadFetcher = useFetcher<typeof loader>();
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [client, setClient] = useState<ClientItemType | null>(null);

  //load from fetcher on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (clientId === undefined) return;
    if (dataLoaded) return;
    if (dataLoadFetcher.state !== "idle") return;
    dataLoadFetcher.submit(
      { query: clientId ?? "" },
      {
        method: "get",
        action: "/resources/clientinfo",
      },
    );
    setDataLoaded(true);
  });

  useEffect(() => {
    console.log("dataLoadFetcher.data", dataLoadFetcher.data);
    if (!dataLoadFetcher.data) return;
    if (dataLoadFetcher.data.client) {
      setClient(dataLoadFetcher.data.client);
    }
  }, [dataLoadFetcher]);

  if (!client) return null;

  return <ClientInfo client={client} />;
};
export default ClientInfoRoute;

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
