// import type { ShouldRevalidateFunction } from "@remix-run/react";
import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { json, redirect } from "@remix-run/cloudflare";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useContext, useEffect } from "react";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import { SETTINGS_SELECTED_TAB, SETTINGS_SERVICES_SELECTED_TAB } from "~/const";
import { getSession, sessionStorage } from "~/services/session.server";
import { AppContext } from "~/store/appContext";
import { FormStateTypes } from "~/store/formReducer";
import { invariantResponse } from "~/utils/misc.tsx";
import { moduleInRoles, requireUserSession } from "~/utils/session.server.ts";
import { ModuleIdentifier } from "~/utils/types";

// export const shouldRevalidate: ShouldRevalidateFunction = () => {
//   return true;
// };

export async function loader({ request }: LoaderFunctionArgs) {
  //console.log("services:loader: ");
  const { user: sbUser, roles } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  if (
    !moduleInRoles(
      roles,
      [ModuleIdentifier.ServicesSettings, ModuleIdentifier.CategoriesSettings],
      "Read",
    )
  )
    return redirect("/dashboard", { headers: {} });

  if (request.url.endsWith("/dashboard/settings/services")) {
    if (moduleInRoles(roles, [ModuleIdentifier.ServicesSettings], "Read")) {
      console.log('redirect to "/dashboard/settings/services/services"');
      return redirect("/dashboard/settings/services/services", {
        headers: {},
      });
    }
    if (moduleInRoles(roles, [ModuleIdentifier.CategoriesSettings], "Read")) {
      console.log('redirect to "/dashboard/settings/services/categories"');
      return redirect("/dashboard/settings/services/categories", {
        headers: {},
      });
    }
  }

  const session = await getSession(request);
  session.set(SETTINGS_SELECTED_TAB, SETTINGS_SERVICES_SELECTED_TAB);

  return json(
    {},
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const Services = () => {
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
    <div className="flex flex-1 flex-col sm:flex-row min-h-0 xs:flex-auto mx-auto xs:w-full sm:w-max-lg xl:w-max-xl">
      <Outlet />
    </div>
  );
};
export default Services;

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
