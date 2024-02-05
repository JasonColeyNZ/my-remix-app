import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
// import { getClientLocales } from "remix-utils/locales/server";
import { MEMBERS_SELECTED_TAB } from "~/const.ts";
import FullScreenCardLayout from "~/layouts/page-layouts/FullScreenCard.tsx";
import { getAllLocationHours, getLocations } from "~/models/location.server.ts";
import { setLocationDefault } from "~/models/user.default.server.ts";
import { getSession, sessionStorage } from "~/services/session.server.ts";
import { getUser } from "~/utils/auth.server.ts";
import { checkUUID, invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";

import Scheduler from "./components/Scheduler.tsx";

export async function action({ request }: ActionFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");
  const user = await getUser(request, sbUser);
  if (!user) return null;

  let formData = await request.formData();

  // let locales = getClientLocales(request);

  switch (formData.get("intent")) {
    case "add-event": {
      //console.log("Add Event");
      // const result = await withZod(addEventValidation).validate(formData);
      // if (result.error) return json({ status: "error", error: result.error });
      // console.log("Result: ", result.data);
      // const { memberId, locationId, start, end, dayOfWeek } = result.data;
      // console.log("result.data", result.data);
      // const newEvent = await addUserLocationHours(
      //   memberId,
      //   locationId,
      //   {
      //     start,
      //     end,
      //     dayOfWeek,
      //   },
      //   sbUser,
      // );
      // return json({ status: "ok", newEvent });
    }
    case "update-event": {
      console.log("Update Event");
      // const result = await withZod(updateEventValidation).validate(formData);
      // if (result.error) return json({ status: "error", error: result.error });
      // console.log("Result: ", result.data);
      // const { start, end, id, dayOfWeek } = result.data;
      // const newEvent = await updateUserLocationHours(
      //   {
      //     id,
      //     start,
      //     end,
      //     dayOfWeek,
      //   },
      //   sbUser,
      // );
      // return json({ status: "ok", newEvent });
    }

    case "delete-event": {
      //console.log("Delete Event");
      // const result = await withZod(deleteEventValidation).validate(formData);
      // invariantResponse(result.data?.id, "id should be defined");
      // await deleteUserLocationHours(result.data?.id, sbUser);
      // return json({ status: "ok" });
    }
    case "switch-location": {
      const locationId = formData.get("locationId");
      if (locationId)
        setLocationDefault(user.id, locationId.toString(), sbUser);
      break;
    }
  }

  // const { locationId } = formData;
  // if (locationId) setLocationDefault(user.id, locationId.toString(), sbUser);

  return null;
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  //console.log(request);
  //get user
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const { memberId } = params;
  checkUUID(memberId);

  const url = new URL(request.url);
  const searchLocationId = url.searchParams.get("locationId");

  const [user, locations] = await Promise.all([
    getUser(request, sbUser),
    getLocations(sbUser),
  ]);
  const lookupLocations = locations.map((location) => {
    return {
      value: location.id,
      text: location.name,
    };
  });

  //get default location
  const userLocationId = (user.defaults && user.defaults.locationId) || "";

  if (searchLocationId && userLocationId !== searchLocationId) {
    setLocationDefault(user.id, searchLocationId, sbUser);
  }

  //get first location if no default
  const locationId =
    searchLocationId || userLocationId || (locations && locations[0].id);
  // console.log(locationId);
  //console.log(locationId);

  //get location hours
  const [allLocationHours] = await Promise.all([
    getAllLocationHours(locationId, sbUser),
    // getLocationUserHours(locationId, sbUser, memberId),
  ]);

  // const locationHours: LocationHourItemsType = await getLocationHours(
  //   locationId
  // );

  // //get user hours
  // const userHours: UserHourItemsType = await getLocationUserHours(locationId);

  const session = await getSession(request);

  session.set(MEMBERS_SELECTED_TAB, "schedule");

  // const view: MbscEventcalendarView = {
  //   schedule: {
  //     type: "week",
  //     currentTimeIndicator: false,
  //     allDay: false,
  //     startDay: getFirstDay(allLocationHours.locationHours),
  //     endDay: getLastDay(allLocationHours.locationHours),
  //     startTime: getFirstStartTime(allLocationHours.locationHours),
  //     endTime: getLastEndTime(allLocationHours.locationHours),
  //   },
  // };

  return json(
    {
      status: "ok",
      selectedLocationId: locationId,
      locationClosedHours: allLocationHours.closedHours,
      // view,
      locations,
      lookupLocations,
      locationId,
      // userHours,
      memberId,
    },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const Schedule = () => {
  //const [currentDate, setCurrentDate] = useState(new Date(2021, 4, 25));
  // const { dispatch } = useContext(AppContext);
  // const location = useLocation();
  //console.log(userHours);

  //const utils = new Utils(locationHours);

  // const regExpNotes = new RegExp(
  //   `/dashboard/member/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/schedule`,
  // );
  // const notesForm = regExpNotes.test(location.pathname + " ");

  return (
    <>
      <Outlet />
      <FullScreenCardLayout>
        <Scheduler />
      </FullScreenCardLayout>
    </>
  );
};
export default Schedule;

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
