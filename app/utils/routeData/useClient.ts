import type { ClientItemType } from "~/models/client.server.ts";
import { useMatchesData } from "./route-matches";
// import type { RecordAndServicesByRecordIdType } from "~/models/record.server.ts";

function isClient(client: any): client is ClientItemType {
  return (
    client && typeof client === "object" && typeof client.firstName === "string"
  );
}

export function useOptionalClient(): ClientItemType | null {
  let result = null;
  let data = useMatchesData<{ client: ClientItemType }>(
    "routes/dashboard.client.$clientId",
  );
  //console.log("useClient: routes/dashboard.client", data);
  if (data && isClient(data.client)) {
    result = data.client;
  }
  // const recordData = useMatchesData<{
  //   record: RecordAndServicesByRecordIdType;
  // }>("routes/dashboard.client.$clientId/records/route");
  // if (
  //   !result &&
  //   recordData &&
  //   recordData.record &&
  //   isClient(recordData.record.client)
  // ) {
  //   result = recordData.record.client;
  // }

  const clientData = useMatchesData<{ client: ClientItemType }>(
    "routes/dashboard.client.$clientId/record",
  );
  if (
    !result &&
    clientData &&
    clientData.client &&
    isClient(clientData.client)
  ) {
    result = clientData.client;
  }

  return result;
}

export function useClient(): ClientItemType | null {
  const maybeClient = useOptionalClient();
  //  if (!maybeClient) {
  //    throw new Error(
  //      "No client found in loaders, but client is required by useClient"
  //    );
  //  }
  return maybeClient;
}
