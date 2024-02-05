import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { Outlet } from "react-router";
import { MemberInfoTabs, memberInfoNav } from "~/app-navigation.tsx";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import { MEMBERS_SELECTED_TAB } from "~/const.ts";
import { getLocations } from "~/models/location.server.ts";
import { getUserById, getUsers } from "~/models/user.server.ts";
import { getSession } from "~/services/session.server.ts";
import { getUser } from "~/utils/auth.server.ts";
import { checkUUID, invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";
import MemberInfo from "./components/MemberInfo";

export async function loader({ request, params }: LoaderFunctionArgs) {
  //console.log("dashboard.client loader");
  const {
    user: sbUser,
    response,
    supabase,
  } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");
  const { memberId } = params;
  checkUUID(memberId);

  //get the last used tab and redirect if needed
  const session = await getSession(request);
  let memberInfoTab =
    (session.get(MEMBERS_SELECTED_TAB) as string) || MemberInfoTabs[0].url; //force string type
  //console.log(session.get(MEMBERS_SELECTED_TAB));
  //console.log("memberInfoTab: ", memberInfoTab);
  // const tabRegExp = ClientInfoTabs.filter(
  //   (tab) => tab.url === selectedClientId
  // )[0].regExp;

  //TODO: this is a hack to fix the issue of the clientInfoTab not being set
  //For add client, lets revisit this
  // console.log("memberId: ", memberId);
  if (memberId === "new") {
    return json({
      member: null,
      services: null,
      users: [],
      mode: "add",
      memberInfoTab: "details",
    });
  }

  let url = new URL(request.url);

  const searchLocationId = url.searchParams.get("locationId");
  //let pathname = url.pathname.split("/");
  //console.log("pathname: ", "'" + url.pathname + " " + "'");
  if (
    !memberInfoNav.regExp?.test(url.pathname + " ")
    //&&
    //pathname[pathname.length - 1] !== selectedClientId
  ) {
    console.log("Redirecting to: " + memberInfoTab);
    return redirect(memberInfoTab, { headers: response.headers });
  }

  //  const clients: ClientsItemType[] = await getClients(sbUser);  //required for the useUser function used in all pages/components
  //unless we are in records
  //if (!clientId) return json({});

  const [user, member, locations, users] = await Promise.all([
    getUser(request, sbUser, supabase),
    getUserById(memberId, sbUser),
    //getServicesAndForms({ entityId: entityId }),
    getLocations(sbUser),
    getUsers(sbUser),
  ]);

  const lookupLocations = locations.map((location) => {
    return {
      value: location.id,
      text: location.name,
    };
  });

  const userLocationId = (user.defaults && user.defaults.locationId) || "";
  // console.log("searchLocationId", searchLocationId);

  const locationId =
    searchLocationId || userLocationId || (locations && locations[0].id);
  // console.log(locationId);

  if (!member) return redirect("/dashboard/members", { status: 404 });

  return json(
    {
      member,
      locations,
      selectedLocationId: locationId,
      lookupLocations,
      //services,
      users,
      mode: "update",
      memberInfoTab,
    },
    { headers: response.headers },
  );
}

const Member = () => {
  return (
    <>
      <div className="grid grid-cols-12 h-full gap-2">
        <MemberInfo />

        <div className="flex-auto flex flex-col min-h-0 col-span-12 sm:col-span-7 lg:col-span-8">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Member;

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
