import type { ShouldRevalidateFunction } from "@remix-run/react";
import { Outlet, useNavigate } from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { getGroupedServicesAndCategories } from "~/models/services.server.ts";
import { getSession, sessionStorage } from "~/services/session.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { redirectToFirstId } from "~/utils/redirect-to-first-id.ts";
import { requireUserSession } from "~/utils/session.server.ts";

import ServicesList from "./components/ServicesList.tsx";
import appInfo from "~/app-info.tsx";
import {
  SETTINGS_SELECTED_TAB,
  SETTINGS_SERVICES_SELECTED_TAB,
} from "~/const.ts";

export const shouldRevalidate: ShouldRevalidateFunction = ({
  currentParams,
  nextParams,
}) => {
  // if (currentParams.serviceId !== nextParams.serviceId) return true;
  return true;
};

export const meta: MetaFunction = () => {
  return [{ title: appInfo.title + " - Settings - Services" }];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  //console.log("services:loader: ");
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");
  let { serviceId } = params;

  const url = new URL(request.url);
  let noRedirect = url.searchParams.get("noRedirect") || "false";

  // console.log("serviceId: ", serviceId);

  const session = await getSession(request);
  const [categories] = await Promise.all([
    getGroupedServicesAndCategories(sbUser),
  ]);
  // console.log("categories: ", categories);

  //check serviceId exists in the list of services
  // if (noRedirect === undefined) noRedirect = "false";

  if (noRedirect === "false") {
    const service = categories.find((c) =>
      c.services.find((s) => s.id === serviceId),
    );
    const services = categories.flatMap((c) => c.services);

    if (!service) serviceId = undefined;
    if (!serviceId) {
      const obj = await redirectToFirstId(
        session,
        "",
        params,
        "serviceId",
        "/dashboard/settings/services/services/",
        services,
        "id",
      );
      if (obj) return obj;
      // }
    }
  }
  // console.log("Services.Services.setCookie");
  session.set(
    SETTINGS_SELECTED_TAB,
    SETTINGS_SERVICES_SELECTED_TAB + "/services",
  );
  // console.log("send services", services);
  return json(
    { categories },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

export interface ServiceType {
  id: string;
  name: string;
  color: string;
  //description?: string;
  location: string;
}

const ServicesServices = () => {
  const navigate = useNavigate();
  // const { state, dispatch } = useContext(AppContext);

  const navigateToSelectedId = (id: string) => {
    // console.log("navigateToSelectedId: ", id);
    navigate(`/dashboard/settings/services/services/${id}`);
  };

  return (
    <div className="flex flex-col w-full h-full p-4">
      <div className="flex flex-col">
        <div className="text-2xl text-foreground">MedSpa Services</div>
        <div className="text-sm text-secondary-foreground">
          Manage the Services available for your MedSpa below.
        </div>
      </div>
      <div className="flex flex-1">
        <>
          <ServicesList navigateToSelectedId={navigateToSelectedId} />
          <Outlet />
        </>
      </div>
    </div>
  );
};

export default ServicesServices;
