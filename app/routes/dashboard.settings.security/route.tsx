import { Outlet } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { useContext, useEffect } from "react";
import { SETTINGS_SECURITY_SELECTED_TAB, SETTINGS_SELECTED_TAB } from "~/const";
import { getSession, sessionStorage } from "~/services/session.server";
import { AppContext } from "~/store/appContext";
import { FormStateTypes } from "~/store/formReducer";
import { invariantResponse } from "~/utils/misc";
import { requireUserSession } from "~/utils/session.server";
import { securitySettingsTabs } from "./tabs";

// export const shouldRevalidate: ShouldRevalidateFunction = () => {
//   return true;
// };

export async function loader({ request }: LoaderFunctionArgs) {
  //console.log("services:loader: ");
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const pathname = new URL(request.url).pathname;

  // console.log("pathname: ", pathname);
  const tabInfo = securitySettingsTabs.find((x) => x.regExp.test(pathname));
  // console.log("tabInfo: ", tabInfo);
  if (!tabInfo) {
    return redirect("roles");
  }
  // // console.log("location: ", request.url);
  // if (request.url.endsWith("/dashboard/settings/security")) {
  //   return redirect("/dashboard/settings/security/roles");
  // }

  const session = await getSession(request);
  session.set(SETTINGS_SELECTED_TAB, SETTINGS_SECURITY_SELECTED_TAB);

  return json(
    {},
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const Security = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (!state.formState.formEditor) return;
    dispatch({
      type: FormStateTypes.formEditor,
      payload: {
        formEditor: false,
      },
    });
  }, [state.formState.formEditor, dispatch]);

  return (
    <div className="flex flex-1 flex-col sm:flex-row min-h-0 xs:flex-auto mx-auto xs:w-full lg:w-max-lg xl:w-max-xl">
      <Outlet />
    </div>
  );
};

export default Security;
