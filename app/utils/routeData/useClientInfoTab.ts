import { useMatchesData } from "./route-matches";

function isClientInfoTab(clientInfoTab: any): clientInfoTab is string {
  return clientInfoTab && typeof clientInfoTab === "string";
}

export function useOptionalClientInfoTab(): string | null {
  let result = null;
  let data = useMatchesData<{ clientInfoTab: string }>(
    "routes/dashboard.client.$clientId",
  );
  //console.log("useClient: routes/dashboard.client", data);
  if (data && isClientInfoTab(data.clientInfoTab)) {
    result = data.clientInfoTab;
  }

  return result;
}

export function useClientInfoTab(): string | null {
  const maybeClientInfoTab = useOptionalClientInfoTab();
  //  if (!maybeClient) {
  //    throw new Error(
  //      "No client found in loaders, but client is required by useClient"
  //    );
  //  }
  return maybeClientInfoTab;
}
