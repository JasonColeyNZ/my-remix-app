import type { LocationItemsType } from "~/models/location.server.ts";
import type { loader as DashboardLoader } from "~/routes/dashboard/route.tsx";
import { useMatchesData } from "./route-matches";

function isLocations(locations: any): locations is LocationItemsType {
  return locations && Array.isArray(locations);
}

//Not why we need both but this works, maybe because of flat routes?
export function useOptionalLocations(): LocationItemsType | null {
  let result = null;
  let data = useMatchesData<{ locations: typeof DashboardLoader }>(
    "routes/dashboard",
  );
  if (data && isLocations(data.locations)) {
    result = data.locations;
  }

  data = useMatchesData<{ locations: typeof DashboardLoader }>(
    "routes/dashboard/route",
  );
  //console.log("servicesData:  ", data.services);

  if (!result && data && data.locations && isLocations(data.locations)) {
    result = data.locations;
  }

  return result;
}

export function useLocations(): LocationItemsType | null {
  const maybeLocations = useOptionalLocations();
  if (!maybeLocations) {
    throw new Error(
      "No locations found in root loader, but locations is required by useLocations.",
    );
  }
  return maybeLocations;
}
