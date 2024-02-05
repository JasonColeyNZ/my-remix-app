import type { RecordItemsType } from "~/models/record.server.ts";
import { useMatchesData } from "./route-matches";

function isRecord(records: any): records is RecordItemsType {
  return records && Array.isArray(records);
}

export function useOptionalRecords(): RecordItemsType | null {
  let result = null;
  // let data = useMatchesData<{ records: ProcedureItemsType }>(
  //   "routes/dashboard.records"
  // );
  // if (data && isProcedure(data.records)) {
  //   result = data.records;
  // }
  const data = useMatchesData<{ records: RecordItemsType }>(
    "routes/dashboard.client.$clientId.records",
  );
  if (data && isRecord(data.records)) {
    result = data.records;
  }

  return result;
}

export function useRecords(): RecordItemsType | null {
  const maybeClient = useOptionalRecords();
  //  if (!maybeClient) {
  //    throw new Error(
  //      "No records found in loaders, but records is required by useClient"
  //    );
  //  }
  return maybeClient;
}
