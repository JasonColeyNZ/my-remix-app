import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import {
  NEW_LOCATION_ID,
  SETTINGS_COMPANY_SELECTED_TAB,
  SETTINGS_SELECTED_TAB,
} from "~/const.ts";
import { addLocation } from "~/models/location.server.ts";
import { addRoom, deleteRoom } from "~/models/room.server.ts";
import { getLocationDefault } from "~/models/user.default.server.ts";
import { getSession, sessionStorage } from "~/services/session.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";

import {
  RoomAndLocationIntent,
  RoomAndLocationSchema,
} from "./RoomAndLocationSchema.ts";
import LocationsList from "./components/LocationsList.tsx";
import appInfo from "~/app-info.tsx";
import { parseWithZod } from "@conform-to/zod";

// export const shouldRevalidate: ShouldRevalidateFunction = () => {
//   return true;
// };

export const meta: MetaFunction = () => {
  return [{ title: appInfo.title + " - Settings - Company Locations" }];
};

export async function action({ request }: ActionFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  let formData = await request.formData();
  const submission = parseWithZod(formData, { schema: RoomAndLocationSchema });
  // console.log("submission: ", submission);

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  switch (submission.value.intent) {
    case RoomAndLocationIntent.ADDROOM: {
      // return json({
      //   status: "success",
      await addRoom(submission.value.locationId, sbUser);
      //   submission,
      //   locationId: null,
      // } as const);
      return json(submission.reply());
    }
    case RoomAndLocationIntent.DELETEROOM: {
      await deleteRoom(submission.value.id, sbUser);
      return json(submission.reply());
      // return json({
      //   status: "success",
      //   submission,
      //   locationId: null,
      // } as const);
    }
    case RoomAndLocationIntent.ADDLOCATION: {
      const session = await getSession(request);
      const entityId = session.get("entityId");

      const location = await addLocation(
        entityId,
        submission.value.name,
        sbUser,
      );
      if (!location)
        return json(
          submission.reply({ formErrors: ["Location could not be created"] }),
        );

      return json(submission.reply());
      // return json(
      //   { status: "success", submission, locationId: location.id } as const,
      //   {
      //     status: 200,
      //   },
      // );
    }
  }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const session = await getSession(request);

  // console.log("Locations loader: params: ", params);
  session.unset(NEW_LOCATION_ID);
  let locationId = params.locationId;
  if (!locationId) {
    locationId = await getLocationDefault(sbUser.id, sbUser);
    return redirect(
      `/dashboard/settings/company/locations/${locationId}/details`,
    );
  }

  // console.log("Company.Locations.setCookie");
  session.set(
    SETTINGS_SELECTED_TAB,
    SETTINGS_COMPANY_SELECTED_TAB + "/locations",
  );

  return json(
    { status: "ok" },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const SettingsCompanyLocations = () => {
  return (
    <div className="flex flex-col w-full h-full p-4">
      <div className="flex flex-col">
        <div className="text-2xl text-foreground">Company Locations</div>
        <div className="text-sm text-secondary-foreground">
          Configure your company locations
        </div>
      </div>
      <div className="flex">
        {/* <AddLocation /> */}
        <LocationsList />
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsCompanyLocations;

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
