import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import appInfo from "~/app-info";
import {
  SETTINGS_BOOKING_SELECTED_TAB,
  SETTINGS_SELECTED_TAB,
} from "~/const.ts";
import { getSession, sessionStorage } from "~/services/session.server.ts";

export const meta: MetaFunction = () => {
  return [{ title: appInfo.title + " - Settings - Booking Details" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);
  // session.set(SETTINGS_BOOKING_SELECTED_TAB, "details");

  // console.log("Booking.Detail.setCookie");
  session.set(
    SETTINGS_SELECTED_TAB,
    SETTINGS_BOOKING_SELECTED_TAB + "/details",
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

const SettingsBookingFields = () => {
  return (
    <div className="flex flex-col w-full h-full p-4">
      <div className="flex flex-col">
        <div className="text-2xl text-foreground">Booking Detail</div>
        <div className="text-sm text-secondary-foreground">
          Manage the Booking Details?
        </div>
      </div>
      <div className="flex flex-1"></div>
    </div>
  );
};
export default SettingsBookingFields;
