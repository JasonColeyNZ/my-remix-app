import type { ServiceItemsType } from "~/models/services.server.ts";
import type { loader as DashboardBookingsLoader } from "~/routes/dashboard.bookings/route.tsx";
import { useMatchesData } from "./route-matches";

function isServices(locations: any): locations is ServiceItemsType {
  return locations && Array.isArray(locations);
}

export function useOptionalServices(): ServiceItemsType | null {
  let result = null;
  let data: any = useMatchesData<{ services: ServiceItemsType }>(
    "routes/dashboard.client.$clientId/records",
  );
  //console.log("useClient: routes/dashboard.client", data);
  if (data && isServices(data.services)) {
    result = data.services;
  }
  data = useMatchesData<{
    services: typeof DashboardBookingsLoader;
  }>("routes/dashboard.client.$clientId/records/$recordId");
  //console.log("servicesData:  ", data.services);

  if (!result && data && data.services && isServices(data.services)) {
    result = data.services;
  }

  data = useMatchesData<{
    services: typeof DashboardBookingsLoader;
  }>("routes/dashboard.client.$clientId/records/new");
  //console.log("servicesData:  ", servicesData.services);
  if (!result && data && data.services && isServices(data.services)) {
    result = data.services;
  }

  data = useMatchesData<{
    services: typeof DashboardBookingsLoader;
  }>("routes/dashboard.bookings");
  // console.log("servicesData:  ", data);
  if (!result && data && data.services && isServices(data.services)) {
    result = data.services;
  }

  // const data = useMatchesData("routes/dashboard.bookings");
  // if (!data || !isServices(data.services)) {
  //   return undefined;
  // }
  return result;
}

export function useServices(): ServiceItemsType | null {
  const maybeServices = useOptionalServices();
  if (!maybeServices) {
    throw new Error(
      "No services found in loader, but services is required by useServices.",
    );
  }
  return maybeServices;
}
