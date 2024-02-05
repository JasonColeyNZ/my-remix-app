import { json } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/server-runtime";
import { OAuthPopup } from "@tasoskakour/react-use-oauth2";

export async function loader({ request }: LoaderFunctionArgs) {
  // console.log("auth.callback", request.url);
  const requestUrl = new URL(request.url);
  // const response = new Response();

  const payload = Object.fromEntries(requestUrl.searchParams);
  const code = payload && payload.code;
  // const error = payload && payload.error;

  const tokenResponse = await fetch(process.env.MC_TOKEN_URI, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.MC_CLIENT_ID || "",
      client_secret: process.env.MC_CLIENT_SECRET || "",
      redirect_uri: `~/mailchimp/auth/callback`,
      code,
    }),
  });

  const { access_token } = (await tokenResponse.json()) as any;
  console.log(access_token);

  const metadataResponse = await fetch(
    "https://login.mailchimp.com/oauth2/metadata",
    {
      headers: {
        Authorization: `OAuth ${access_token}`,
      },
    },
  );

  const { dc } = (await metadataResponse.json()) as any;
  console.log(dc);

  // mailchimp.setConfig({
  //   accessToken: access_token,
  //   server: dc,
  // });

  // const response = await mailchimp.ping.get();
  // console.log(response);

  return json(`
    <p>This user's access token is ${access_token} and their server prefix is ${dc}.</p>

  `);
  // console.log("response.code", code);
  // console.log("response.state", state);
  // console.log("response.error", error);

  // const checkState = (receivedState: string) => {
  //   const state = sessionStorage.getItem(OAUTH_STATE_KEY);
  //   return state === receivedState;
  // };

  // const queryToObject = (query: string) => {
  //   const parameters = new URLSearchParams(query);
  //   return Object.fromEntries(parameters.entries());
  // };

  // if (error) {
  //   window.opener.postMessage({
  //     type: OAUTH_RESPONSE,
  //     error: decodeURI(error) || "OAuth error: An error has occured.",
  //   });
  // } else if (checkState(state)) {
  //   window.opener.postMessage({
  //     type: OAUTH_RESPONSE,
  //     payload,
  //   });
  // }

  // return json({ error, success: state, payload });
}

export default function AuthCallback(props: any) {
  return <OAuthPopup />;

  // const { error, success, payload } = useLoaderData<typeof loader>();

  // const {
  //   Component = (
  //     <div style={{ margin: "12px" }} data-testid="popup-loading">
  //       Loading...
  //     </div>
  //   ),
  // } = props;

  // // On mount
  // useEffect(() => {
  //   if (!window.opener) {
  //     throw new Error("No window opener");
  //   }

  //   if (error) {
  //     window.opener.postMessage({
  //       type: OAUTH_RESPONSE,
  //       error: decodeURI(error) || "OAuth error: An error has occurred.",
  //     });
  //   } else if (success) {
  //     window.opener.postMessage({
  //       type: OAUTH_RESPONSE,
  //       payload,
  //     });
  //   } else {
  //     window.opener.postMessage({
  //       type: OAUTH_RESPONSE,
  //       error: "OAuth error: State mismatch.",
  //     });
  //   }
  // }, [error, payload, success]);

  // return Component;
}
