import type { RecordAndServicesByRecordIdType } from "~/models/record.server.ts";
import { useMatchesData } from "./route-matches";

function isRecord(record: any): record is RecordAndServicesByRecordIdType {
  return (
    record && typeof record === "object" && typeof record.title === "string"
  );
}

export function useOptionalRecord(): RecordAndServicesByRecordIdType | null {
  let data = useMatchesData<{ record: RecordAndServicesByRecordIdType }>(
    "routes/dashboard.client.$clientId.records.$recordId",
  );
  //console.log("useRecord: routes/dashboard.client.record", data);
  if (data && isRecord(data.record)) {
    return data.record;
  }

  return null;
}

export function useRecord(): RecordAndServicesByRecordIdType | null {
  const maybeProcedure = useOptionalRecord();
  //  if (!maybeClient) {
  //    throw new Error(
  //      "No record found in loaders, but record is required by useClient"
  //    );
  //  }
  return maybeProcedure;
}
