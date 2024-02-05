import { redirect } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/server-runtime";
import {
  getIntegrationByState,
  updateIntegration,
} from "~/models/integration.server";
import { invariantResponse } from "~/utils/misc";
import { requireUserSession } from "~/utils/session.server";
import { IntegrationType } from "~/utils/types";
// import { useEffect } from "react";
// import { cleanup } from "~/utils/oauth2/tools";

export async function loader({ request }: LoaderFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  // console.log("auth.callback", request.url);
  const requestUrl = new URL(request.url);
  const baseUrl = requestUrl.origin;
  // console.log(baseUrl);
  // const response = new Response();

  const payload = Object.fromEntries(requestUrl.searchParams);
  // console.log(payload);
  const code = payload && payload.code;
  const state = payload && payload.state;
  const error = payload && payload.error;

  //find the integration
  const integration = await getIntegrationByState(
    IntegrationType.MAILCHIMP,
    state,
    sbUser,
  );
  // console.log(code);
  // const error = payload && payload.error;
  if (!integration || integration.state !== state) {
    return redirect("/dashboard/settings/company/integrations?error=" + error);
  }

  const tokenResponse = await fetch(process.env.MC_TOKEN_URI, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.MC_CLIENT_ID || "",
      client_secret: process.env.MC_CLIENT_SECRET || "",
      redirect_uri: `${baseUrl}/mailchimp/auth/callback`,
      code,
    }),
  })
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => {
      // console.log(error);
    });

  if (!tokenResponse) {
    return redirect(
      "/dashboard/settings/company/integrations?error=Notokenresponse",
    );
  }
  // console.log(tokenResponse);
  const { access_token } = (await tokenResponse.json()) as any;

  if (!access_token) {
    return redirect(
      "/dashboard/settings/company/integrations?error=Noaccesstoken",
    );
  }

  console.log(access_token);

  const metadataResponse = await fetch(
    "https://login.mailchimp.com/oauth2/metadata",
    {
      headers: {
        Authorization: `OAuth ${access_token}`,
      },
    },
  );

  const integrationData = await metadataResponse.json();

  await updateIntegration(
    {
      id: integration.id,
      accessToken: access_token,
      integrationData: integrationData || "",
    },
    sbUser,
  );

  return redirect("/dashboard/settings/company/integrations");
}
