import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema.ts";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import { getLocationById, updateLocation } from "~/models/location.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";

import LocationDetails from "./components/LocationDetails.tsx";
import { locationSchema } from "./locationSchema.ts";
import { parseWithZod } from "@conform-to/zod";

export async function loader({ request, params }: LoaderFunctionArgs) {
  console.log("location details params ", params);

  const city = request.headers.get("x-vercel-ip-city") || "Emerald";
  const country = request.headers.get("x-vercel-ip-country") || "AU";
  const region = request.headers.get("x-vercel-ip-country-region") || "QLD";

  //console.log("request: ", request);
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");
  const { locationId } = params;
  invariantResponse(locationId, "locationId is required");

  const [location] = await Promise.all([getLocationById(locationId, sbUser)]);
  // console.log("location: ", location);
  return json({ location, locationId, city, region, country });
}

export async function action({ request }: ActionFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: locationSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  switch (submission.value.intent) {
    case formViewerIntent.UPDATE: {
      console.log(submission.value);
      await updateLocation(
        { ...submission.value, address: submission.value.address ?? undefined },
        sbUser,
      );

      return json(submission.reply());
    }
  }

  // return json({ status: "ok", data: updatedLocation });
}

const Location = () => {
  return <LocationDetails />;
};
export default Location;

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
