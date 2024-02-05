import {
  Outlet,
  isRouteErrorResponse,
  // useLoaderData,
  useRouteError,
} from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import appInfo from "~/app-info";
import { getSession, sessionStorage } from "~/services/session.server.ts";
import TagsList from "./components/TagsList";
import { requireUserSession } from "~/utils/session.server";
import { invariantResponse } from "~/utils/misc";
import { redirectToFirstId } from "~/utils/redirect-to-first-id";
import { getTags } from "~/models/tag.server";
import { TagType } from "@prisma/client";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary";
import { SETTINGS_CLIENT_SELECTED_TAB, SETTINGS_SELECTED_TAB } from "~/const";

export const meta: MetaFunction = () => {
  return [{ title: appInfo.title + " - Settings - Client Detail" }];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  //console.log("services:loader: ");
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");
  const { tagId } = params;

  const session = await getSession(request);
  const [tags] = await Promise.all([getTags(TagType.Client, sbUser)]);

  if (!tagId) {
    const obj = await redirectToFirstId(
      session,
      "",
      params,
      "tagId",
      "/dashboard/settings/client/tags/",
      tags,
      "id",
    );
    if (obj) return obj;
  }

  // console.log("Client.Tags.setCookie");
  session.set(SETTINGS_SELECTED_TAB, SETTINGS_CLIENT_SELECTED_TAB + "/tags");

  // console.log("send services", services);
  return json(
    { tags },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const ClientDetail = () => {
  // const { tags } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col w-full h-full p-4">
      <div className="flex flex-col">
        <div className="text-2xl text-foreground">Client Tags</div>
        <div className="text-sm text-secondary-foreground">
          Manage the Tags available for Clients below. If you have any
          integrations with other systems, may be possible to map those tags to
          the tags in Easy MedSpa.
        </div>
      </div>
      <div className="flex flex-1">
        <TagsList />
        {/* {tags.length === 0 && (
          <div className="flex justify-center w-full h-full">
            <div className="text-center">
              <h2 className="text-foreground font-light">
                Click Create new to create your first tag click below
              </h2>
            </div>
          </div>
        )} */}
        <Outlet />
      </div>
    </div>
  );
};
export default ClientDetail;

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
