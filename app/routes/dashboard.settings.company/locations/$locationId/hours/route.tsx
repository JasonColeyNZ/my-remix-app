import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import { getLocationHours } from "#app/models/location.server.ts";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { CardContent } from "~/components/ui/card.tsx";
import SettingsRightCard from "~/layouts/section-layouts/SettingsRightCard.tsx";
import {
  addLocationHours,
  deleteLocationHours,
  updateLocationHours,
} from "~/models/locationHours.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { useLocations } from "~/utils/routeData/useLocations.ts";
import { getDayNames } from "~/utils/scheduler/utils.ts";
import { requireUserSession } from "~/utils/session.server.ts";

import LocationsHours from "./components/LocationsHours.tsx";
import {
  LocationHourFormIntent,
  locationHoursSchema,
} from "./locationHoursSchema.ts";
import { parseWithZod } from "@conform-to/zod";

export async function action({ request, params }: ActionFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const { locationId } = params;
  invariantResponse(locationId, "locationId is required");

  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: locationHoursSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  switch (submission.value.intent) {
    case LocationHourFormIntent.ADD: {
      console.log(submission.value);
      //Add Location Hours
      const data = await addLocationHours(
        { locationId, hour: submission.value },
        sbUser,
      );

      return json({ data, status: 200, submission });
    }
    case LocationHourFormIntent.UPDATE: {
      console.log(submission.value);
      //Add Location Hours
      const data = await updateLocationHours(
        { locationId, hour: submission.value },
        sbUser,
      );

      return json({ data, status: 200, submission });
    }
    case LocationHourFormIntent.DELETE: {
      console.log(submission.value);
      await deleteLocationHours({ id: submission.value.id }, sbUser);

      return json({ status: 200, submission });
    }
  }
  return invariantResponse(null, "Invalid intent");
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  // console.log("location hour params ", params);
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");
  const { locationId } = params;
  invariantResponse(locationId, "locationId is required");
  const [locationHours] = await Promise.all([
    getLocationHours(locationId, sbUser),
  ]);
  // console.log("locationHours ", locationHours);
  const dayNames = getDayNames();

  return json({ locationHours, locationId, dayNames });
}

const LocationHours = () => {
  const { locationId } = useLoaderData<typeof loader>();
  const locations = useLocations();
  const currentLocation =
    (locations && locations.find((location) => location.id === locationId)) ||
    null;
  // console.log("locations ", locations);
  //console.log("locationHours ", locationHours);
  return (
    <SettingsRightCard>
      <CardContent>
        <div className="font-xl font-medium">
          {currentLocation && currentLocation.name} Operating Hours
        </div>
        <LocationsHours />
      </CardContent>
    </SettingsRightCard>
  );
};
export default LocationHours;

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
