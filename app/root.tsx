import {
  Links,
  // LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { cssBundleHref } from "@remix-run/css-bundle";
import { registerLicense } from "@syncfusion/ej2-base/src/validate-lic.js";
import type {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useEffect } from "react";
// import { AuthenticityTokenProvider } from "remix-utils/csrf/react";
import { HoneypotProvider } from "remix-utils/honeypot/react";
import { useLocales } from "remix-utils/locales/react";
import { getClientLocales } from "remix-utils/locales/server";

// VITE IMPORTS
import "./styles/tailwind.css";
import "./assets/favicon.svg";
import "~/../node_modules/@syncfusion/ej2-base/styles/tailwind.css";
import "~/../node_modules/@syncfusion/ej2-buttons/styles/tailwind.css";
import "~/../node_modules/@syncfusion/ej2-dropdowns/styles/tailwind.css";
import "~/../node_modules/@syncfusion/ej2-icons/styles/tailwind.css";
import "~/../node_modules/@syncfusion/ej2-inputs/styles/tailwind.css";
import "~/../node_modules/@syncfusion/ej2-navigations/styles/tailwind.css";
import "~/../node_modules/@syncfusion/ej2-notifications/styles/tailwind.css";
import "~/../node_modules/@syncfusion/ej2-popups/styles/tailwind.css";
import "~/../node_modules/@syncfusion/ej2-richtexteditor/styles/tailwind.css";
import "~/../node_modules/@syncfusion/ej2-splitbuttons/styles/tailwind.css";
import "~/../node_modules/@syncfusion/ej2-lists/styles/tailwind.css";
import "~/../node_modules/@syncfusion/ej2-react-popups/styles/tailwind.css";

//REMIX IMPORTS
// import reactgrids from "~/../node_modules/@syncfusion/ej2-react-grids/styles/tailwind.css";
// import reactschedule from "~/../node_modules/@syncfusion/ej2-react-schedule/styles/tailwind.css";
// import richtexteditor from "~/../node_modules/@syncfusion/ej2-richtexteditor/styles/tailwind.css";
// import grids from "~/../node_modules/@syncfusion/ej2-grids/styles/tailwind.css";
// import schedule from "~/../node_modules/@syncfusion/ej2-schedule/styles/tailwind.css";

// import calendars from "~/../node_modules/@syncfusion/ej2-calendars/styles/tailwind.css";

// import base from "~/../node_modules/@syncfusion/ej2-base/styles/tailwind.css";
// import buttons from "~/../node_modules/@syncfusion/ej2-buttons/styles/tailwind.css";
// import icons from "~/../node_modules/@syncfusion/ej2-icons/styles/tailwind.css";
// import dropdowns from "~/../node_modules/@syncfusion/ej2-dropdowns/styles/tailwind.css";
// import inputs from "~/../node_modules/@syncfusion/ej2-inputs/styles/tailwind.css";
// import lists from "~/../node_modules/@syncfusion/ej2-lists/styles/tailwind.css";
// import navigations from "~/../node_modules/@syncfusion/ej2-navigations/styles/tailwind.css";
// import notifications from "~/../node_modules/@syncfusion/ej2-notifications/styles/tailwind.css";
// import popups from "~/../node_modules/@syncfusion/ej2-popups/styles/tailwind.css";
// import splitbuttons from "~/../node_modules/@syncfusion/ej2-splitbuttons/styles/tailwind.css";
// import reactpopups from "~/../node_modules/@syncfusion/ej2-react-popups/styles/tailwind.css";
// import favIconAssetUrl from "./assets/favicon.svg";
// import tailwindStylesheetUrl from "./styles/tailwind.css";

// import fontStylestylesheetUrl from "./styles/font.css";

import appInfo from "./app-info.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { useToast } from "./components/ui/use-toast.ts";
import { getUser } from "./utils/auth.server.ts";
// import { csrf } from "./utils/csrf.server.ts";
import { getEnv } from "./utils/env.server.ts";
import { honeypot } from "./utils/honeypot.server.ts";
import { combineHeaders } from "./utils/misc.tsx";
import { requireUserSession } from "./utils/session.server.ts";
import { getToast } from "./utils/toast.server.ts";
import Error404 from "./components/Error/Error404.tsx";

export const meta: MetaFunction = () => {
  return [
    { charset: "utf-8" },
    { title: appInfo.title },
    { viewport: "width=device-width,initial-scale=1" },
    //  { "theme-color": theme.palette.primary.main },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  // const [csrfToken, csrfCookieHeader] = await csrf.commitToken(request);
  const { toast, headers: toastHeaders } = await getToast(request);

  // const ENV = {
  //   GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  // };
  // console.log("root:loader: ", toast);
  const { user: sbUser, supabase } = await requireUserSession(request, true);

  const locales = getClientLocales(request);

  let user = null;

  //required for the useUser function used in all pages/components
  if (sbUser) {
    user = await getUser(request, sbUser, supabase);
  }

  const honeyProps = honeypot.getInputProps();

  return json(
    {
      user,
      locales,
      toastMessage: toast,
      // csrfToken,
      ENV: getEnv(),
      honeyProps,
    },
    {
      status: 200,
      headers: combineHeaders(
        // csrfCookieHeader ? { "set-cookie": csrfCookieHeader } : null,
        toastHeaders,
      ),
    },
  );
}

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

const Document = ({ children }: DocumentProps) => {
  const { ENV, honeyProps } = useLoaderData<typeof loader>();

  let locales = useLocales();
  if (!locales) locales = ["en"];
  registerLicense(
    "ORg4AjUWIQA/Gnt2UVhhQlVFfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn9RdEViUHpacnFXQ2Zb",
    // "ORg4AjUWIQA/Gnt2VlhhQlJCfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn9RdkxiUXpdcXVTQWZe",
  );

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <meta name="charset" content="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, maximum-scale=1, width=device-width,initial-scale=1.0"
        />
      </head>
      <body style={{}} className="flex overflow-y-scroll">
        <TooltipProvider>
          <HoneypotProvider {...honeyProps}>{children}</HoneypotProvider>
        </TooltipProvider>
        <ScrollRestoration />
        <Scripts />
        {/* <LiveReload /> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)};`,
          }}
        ></script>
      </body>
    </html>
  );
};

function App() {
  const { toastMessage } = useLoaderData<typeof loader>();
  const { toast } = useToast();

  useEffect(() => {
    if (toastMessage) {
      toast({
        title: toastMessage.title,
        description: toastMessage.description,
        variant: toastMessage.type,
      });
    }
  }, [toastMessage, toast]);

  return (
    <Document>
      <Outlet />
      <Toaster />
    </Document>
  );
}

export default function AppWithProviders() {
  // const data = useLoaderData<typeof loader>();
  return (
    // <AuthenticityTokenProvider token={data.csrfToken}>
    <App />
    // </AuthenticityTokenProvider>
  );
}
