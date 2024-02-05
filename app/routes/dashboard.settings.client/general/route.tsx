import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import appInfo from "~/app-info";
import {
  SETTINGS_CLIENT_SELECTED_TAB,
  SETTINGS_SELECTED_TAB,
} from "~/const.ts";
import { getSession, sessionStorage } from "~/services/session.server.ts";

export const meta: MetaFunction = () => {
  return [{ title: appInfo.title + " - Settings - Client General" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);
  // session.set(SETTINGS_CLIENT_SELECTED_TAB, "general");

  // console.log("Client.General.setCookie");
  session.set(SETTINGS_SELECTED_TAB, SETTINGS_CLIENT_SELECTED_TAB + "/general");

  return json(
    { status: "ok" },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const SettingsRecordsGeneral = () => {
  return (
    <div className="w-full p-4">
      <div className="flex flex-col">
        <div className="text-2xl text-foreground">Client General</div>
        <div className="text-sm text-secondary-foreground">
          General settings for Clients?
        </div>
      </div>
    </div>
  );
};
export default SettingsRecordsGeneral;
