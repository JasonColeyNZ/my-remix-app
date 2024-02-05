import type { ShouldRevalidateFunction } from "@remix-run/react";
import { Outlet } from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { getCategories } from "~/models/category.server.ts";
import { getSession, sessionStorage } from "~/services/session.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { redirectToFirstId } from "~/utils/redirect-to-first-id.ts";
import { requireUserSession } from "~/utils/session.server.ts";

import CategoriesList from "./components/CategoriesList.tsx";
import appInfo from "~/app-info.tsx";
import {
  SETTINGS_SELECTED_TAB,
  SETTINGS_SERVICES_SELECTED_TAB,
} from "~/const.ts";

export const shouldRevalidate: ShouldRevalidateFunction = ({
  currentParams,
  nextParams,
}) => {
  // if (currentParams.categoryId !== nextParams.categoryId) return true;
  return true;
};

export const meta: MetaFunction = () => {
  return [{ title: appInfo.title + " - Settings - Service Categories" }];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  //console.log("services:loader: ");
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");
  const { categoryId } = params;

  // console.log("categoryId: ", categoryId);
  const session = await getSession(request);
  const [categories] = await Promise.all([getCategories(sbUser)]);

  if (!categoryId) {
    const obj = await redirectToFirstId(
      session,
      "",
      params,
      "categoryId",
      "/dashboard/settings/services/categories/",
      categories,
      "id",
    );
    if (obj) return obj;
  }
  // console.log("Services.Categories.setCookie");
  session.set(
    SETTINGS_SELECTED_TAB,
    SETTINGS_SERVICES_SELECTED_TAB + "/categories",
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

const ServicesServices = () => {
  return (
    <div className="flex flex-col w-full h-full p-4">
      <div className="flex flex-col">
        <div className="text-2xl text-foreground">Service Categories</div>
        <div className="text-sm text-secondary-foreground">
          Mange the categories for your services below. You can add, edit, and
          delete categories along with set the color scheme for the categories.
        </div>
      </div>
      <div className="flex flex-1">
        <CategoriesList />
        <Outlet />
      </div>
    </div>
  );
};

export default ServicesServices;
