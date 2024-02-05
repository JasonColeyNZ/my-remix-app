import { Outlet } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { SETTINGS_BOOKING_SELECTED_TAB } from "~/const.ts";
import { getSession, sessionStorage } from "~/services/session.server.ts";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);
  session.set(SETTINGS_BOOKING_SELECTED_TAB, "categories");
  return json(
    { status: "ok" },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const SettingsBookingCategories = () => {
  return (
    <div className="w-full flex-1 flex">
      <div className="w-full flex-1 flex">
        <div className="flex-1 w-full mb-2">
          <div className="header-panel">
            <h6>Categories</h6>
          </div>
          <div className="settings-list-outer">
            <div className="settings-list-toolbar"></div>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
};
export default SettingsBookingCategories;
