import { Outlet } from "@remix-run/react";
import { json, redirect } from "@remix-run/cloudflare";
import type {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import appInfo from "~/app-info";
import { getLocations } from "~/models/location.server.ts";
import { getUser } from "~/utils/auth.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";

// VITE Imports
import "~/../node_modules/@syncfusion/ej2-react-schedule/styles/tailwind.css";
import "~/../node_modules/@syncfusion/ej2-schedule/styles/tailwind.css";

// import schedule from "~/../node_modules/@syncfusion/ej2-schedule/styles/tailwind.css";
// import reactschedule from "~/../node_modules/@syncfusion/ej2-react-schedule/styles/tailwind.css";

// export const links: LinksFunction = () => {
//   return [
//     { rel: "stylesheet", href: schedule },
//     { rel: "stylesheet", href: reactschedule },
//   ];
// };

export const meta: MetaFunction = () => {
  return [{ title: appInfo.title + " - Team Schedule" }];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  console.log("MembersSchedule loader");
  const { user: sbUser, supabase } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");
  const locationIdParam = params.locationId;

  if (!locationIdParam) {
    //get user and locations
    const [user, locations] = await Promise.all([
      getUser(request, sbUser, supabase),
      getLocations(sbUser),
    ]);
    console.log("user", user);

    //get default location
    let locationId = user.defaults && user.defaults.locationId;

    //get first location if no default
    locationId = locationId || (locations && locations[0].id);

    return redirect(locationId);
  }

  return json(null);
}

const TeamSchedule = () => {
  return <Outlet />;
};
export default TeamSchedule;
