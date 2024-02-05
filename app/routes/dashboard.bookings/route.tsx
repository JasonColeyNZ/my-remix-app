import {
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import type {
  ActionFunctionArgs,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import SectionPage from "~/layouts/page-layouts/SectionPage.tsx";
import { getBookingItems } from "~/models/booking.server.ts";
// import { getBookingItems } from "~/models/booking.server.ts";
import { getClients } from "~/models/client.server.ts";
import { getAllLocationHours, getLocations } from "~/models/location.server.ts";
import { getLocationServices } from "~/models/services.server.ts";
import { setLocationDefault } from "~/models/user.default.server.ts";
import { getUsers } from "~/models/user.server.ts";
import { getUser } from "~/utils/auth.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { getFirstStartTime, getLastEndTime } from "~/utils/scheduler/utils.ts";
import { requireUserSession } from "~/utils/session.server.ts";

import CalendarView from "./components/CalendarView.tsx";
import SideBar from "./components/SideBar.tsx";
import { useContext, useEffect } from "react";
import { AppContext } from "~/store/appContext.tsx";
import { SchedulerStateTypes } from "~/store/schedulerReducer.ts";
import type { appTeamMember, appView } from "~/utils/types.ts";
import { AppointmentView } from "~/utils/types.ts";
import appInfo from "~/app-info.tsx";

//VITE Imports
import "~/../node_modules/@syncfusion/ej2-schedule/styles/tailwind.css";
import "~/../node_modules/@syncfusion/ej2-react-schedule/styles/tailwind.css";

// import schedule from "~/../node_modules/@syncfusion/ej2-schedule/styles/tailwind.css";
// import reactschedule from "~/../node_modules/@syncfusion/ej2-react-schedule/styles/tailwind.css";

// export const links: LinksFunction = () => {
//   return [
//     { rel: "stylesheet", href: schedule },
//     { rel: "stylesheet", href: reactschedule },
//   ];
// };

export async function action({ request }: ActionFunctionArgs) {
  const {
    user: sbUser,
    response,
    supabase,
  } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const user = await getUser(request, sbUser, supabase);
  if (!user) return null;
  // const formData = Object.fromEntries(await request.formData());
  // const { locationId } = formData;
  // if (locationId) setLocationDefault(user.id, locationId.toString(), sbUser);

  return json({}, { headers: response.headers });
}

export const meta: MetaFunction = () => {
  return [{ title: appInfo.title + " - Bookings" }];
};

// type viewType = "day" | "week" | "month";

export async function loader({ request }: LoaderFunctionArgs) {
  //console.log(request);
  const {
    user: sbUser,
    response,
    supabase,
  } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const url = new URL(request.url);
  ///console.log(url.search);
  //TODO: Change this to use session cookies, action sets cookies, loader reads them
  //see epic web cookie session storage to implement a session cookie for the bookings views
  const searchLocationId = url.searchParams.get("locationId");
  const from = url.searchParams.get("from")?.toString() || "";
  const to = url.searchParams.get("to");
  // const viewType = (url.searchParams.get("viewType") as viewType) || "week";
  const dateFrom = from ? new Date(from) : null;
  const dateTo = to ? new Date(to) : null;

  // console.log("dateFrom", dateFrom);
  // console.log("dateTo", to);
  //get user and locations

  const [user, locations] = await Promise.all([
    getUser(request, sbUser, supabase),
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
  // console.log("searchLocationId", searchLocationId);
  if (searchLocationId && userLocationId !== searchLocationId) {
    setLocationDefault(user.id, searchLocationId, sbUser);
  }
  //get first location if no default
  const locationId =
    searchLocationId || userLocationId || (locations && locations[0].id);
  // console.log(locationId);

  //get services

  const [services, users, clients, bookingItems, allLocationHours] =
    await Promise.all([
      getLocationServices(locationId, sbUser),
      getUsers(sbUser),
      getClients(sbUser),
      getBookingItems(locationId, sbUser),
      getAllLocationHours(locationId, sbUser),
      //getLocationUserHours(locationId, sbUser, memberId),
    ]);

  const selectedUsers: appTeamMember[] = users.map((user) => {
    //console.log("user ", user);
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      img: (user.avatarData?.publicUrl && user.avatarData.publicUrl) || null,
      checked: true, //TODO: get from user settings
      // color: "rgba(191, 191, 191, 0.15)",
      // description: "",
      // eventOverlap: true,
    };
  });

  const view: appView = {
    view: AppointmentView.Week,
    startHour: getFirstStartTime(allLocationHours.locationHours),
    endHour: getLastEndTime(allLocationHours.locationHours),
  };

  return json(
    {
      user,
      view,
      dateFrom,
      dateTo,
      bookings: bookingItems,
      locationId,
      locations,
      lookupLocations,
      locationClosedHours: allLocationHours.closedHours,
      openDays: allLocationHours.openDays,
      selectedLocationId: locationId,
      services,
      users,
      selectedUsers,
      clients,
    },
    { headers: response.headers },
  );
}

const Schedule = () => {
  const {
    view,
    selectedUsers,
    //   locationClosedHours,
    bookings,
    //   dateFrom,
    //   // dateTo,
  } = useLoaderData<typeof loader>();
  // console.log("bookings", bookings);

  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({
      type: SchedulerStateTypes.appointments,
      payload: {
        appointments: bookings.map((booking) => {
          // console.log("booking", booking);
          return {
            ...booking,
            StartTime: new Date(booking.StartTime),
            EndTime: new Date(booking.EndTime),
          };
        }),
      },
    });
  }, [bookings, dispatch]);

  useEffect(() => {
    dispatch({
      type: SchedulerStateTypes.teamMembers,
      payload: {
        teamMembers: selectedUsers,
      },
    });
  }, [dispatch, selectedUsers]);

  useEffect(() => {
    dispatch({
      type: SchedulerStateTypes.view,
      payload: {
        view,
      },
    });
  }, [dispatch, view]);

  return (
    <>
      <SectionPage id="client-background" breadcrumbOnly={true} hideUI={false}>
        <div className={`flex flex1 w-full h-full flex-row gap-4`}>
          <SideBar />

          <div className={`flex1 w-full h-full flex-column`}>
            <CalendarView />
          </div>
        </div>
      </SectionPage>
      <Outlet />
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
