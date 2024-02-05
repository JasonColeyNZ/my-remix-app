import {
  isRouteErrorResponse,
  // useLoaderData,
  useRouteError,
} from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { Outlet } from "react-router";
import { ClientInfoTabs, clientInfoNav } from "~/app-navigation.tsx";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import { getClientById } from "~/models/client.server.ts";
import { getUsers } from "~/models/user.server.ts";
// import { getSession } from "~/services/session.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";

import ClientInfo from "./components/ClientInfo";
import { getTags } from "~/models/tag.server";
import { clientIntent, clientSchema } from "./clientSchema";
import { createClientTag, removeClientTag } from "~/models/clientTag.server";
import { TagType } from "@prisma/client";
import { parseWithZod } from "@conform-to/zod";

export async function action({ request, params }: ActionFunctionArgs) {
  // if the user isn't authenticated, this will redirect to login
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const { clientId } = params;
  invariantResponse(clientId, "clientId is required");

  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: clientSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  switch (submission.value.intent) {
    case clientIntent.UPDATETAGS: {
      const _clientTag = {
        ...submission.value,
        clientId,
      };
      if (_clientTag.checked) {
        const newClientTag = await createClientTag(_clientTag, sbUser);
        return json({ status: 200, data: newClientTag, submission } as const);
      } else {
        await removeClientTag(_clientTag, sbUser);
        return json({ status: 200, data: null, submission } as const);
      }
    }
  }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  console.log("dashboard.client loader");
  const { clientId } = params;
  invariantResponse(clientId, "clientId is required");
  const { user: sbUser, response } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  let url = new URL(request.url);
  if (!clientInfoNav.regExp?.test(url.pathname + " ")) {
    // console.log("Redirecting to: " + clientInfoTab);
    return redirect("bookings", { headers: response.headers });
  }
  let clientInfoTab = "details";

  ClientInfoTabs.forEach((tab) => {
    if (tab.regExp.test(url.pathname + " ")) {
      clientInfoTab = tab.url;
    }
  });

  const [client, users, rawTags] = await Promise.all([
    getClientById({ id: clientId }, sbUser),
    getUsers(sbUser),
    getTags(TagType.Client, sbUser),
  ]);

  // console.log("client", client);

  invariantResponse(client, "client should be defined", { status: 404 });

  if (!client) return redirect("/dashboard/clients", { status: 404 });

  const tags = rawTags.filter((tag) => tag.integrationTagId === null);
  const mailingLists = rawTags.filter((tag) => tag.integrationTagId !== null);

  return json(
    {
      client,
      tags,
      mailingLists,
      // clientId,
      users,
      mode: "update",
      clientInfoTab,
    },
    { headers: response.headers },
  );
}

const ClientDashboard = () => {
  // const { client } = useLoaderData<typeof loader>();
  // console.log("ClientDashboard Render", client);

  return (
    <>
      <div className="grid grid-cols-12 h-full gap-2">
        <ClientInfo />

        <div className="flex-auto flex flex-col min-h-0 col-span-12 sm:col-span-7 lg:col-span-8">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default ClientDashboard;

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
