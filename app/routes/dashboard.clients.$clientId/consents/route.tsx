import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import type {
  ActionFunctionArgs,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import FullScreenCardLayout from "~/layouts/page-layouts/FullScreenCard.tsx";
import {
  addClientConsent,
  // deleteClientConsent,
  getClientConsents,
} from "~/models/clientconsent.server.ts";
import { getConsents } from "~/models/consents.server.ts";
import { getTableDefault } from "~/models/user.default.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";
import type { Toast } from "~/utils/toast.server.ts";
import { createToastHeaders } from "~/utils/toast.server.ts";
import { TableTypes } from "~/utils/types.ts";

import ConsentsDataGrid from "./components/ConsentsDataGrid.tsx";
import appInfo from "~/app-info.tsx";
import { metaMatchesData } from "~/utils/routeData/route-matches.ts";
import { addConsentSchema } from "./addConsentSchema.ts";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema.ts";

//VITE Imports
import "~/../node_modules/@syncfusion/ej2-react-grids/styles/tailwind.css";
import { parseWithZod } from "@conform-to/zod";

// import reactgrids from "~/../node_modules/@syncfusion/ej2-react-grids/styles/tailwind.css";

// export const links: LinksFunction = () => {
//   return [{ rel: "stylesheet", href: reactgrids }];
// };

export const meta: MetaFunction = ({ matches }) => {
  const data = metaMatchesData(
    "routes/dashboard.clients.$clientId/route",
    matches,
  );
  return [
    {
      title: `${appInfo.title} -  ${
        data ? data.client.firstName + " " + data.client.lastName : "Client"
      } Consents`,
    },
  ];
};

export async function action({ request, params }: ActionFunctionArgs) {
  console.log("client.consents:action: ");
  // if the user isn't authenticated, this will redirect to login
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const clientId = params.clientId;
  invariantResponse(clientId, "clientId is required");

  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: addConsentSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  switch (submission.value.intent) {
    case formViewerIntent.CREATE: {
      const data = {
        clientId,
        formId: submission.value.formId,
      };
      const newConsent = await addClientConsent(data, sbUser);

      const toast: Toast = {
        type: "default",
        title: "Consent created",
        description: `${newConsent.consentTitle} consent has added to the client`,
      };

      return json({ status: 200, data: newConsent } as const, {
        headers: await createToastHeaders(toast),
      });
      // }
      // return json({ status: "error", data: null });
    }
    // case formViewerIntent. "consent-delete": {
    //   const id = formData.get("id")?.toString();
    //   if (id) {
    //     const deletedConsent = await deleteClientConsent({ id }, sbUser);
    //     const toast: Toast = {
    //       type: "default",
    //       title: "Consent deleted",
    //       description: `${deletedConsent.consentTitle} consent has deleted`,
    //     };

    //     return json({ status: 200, data: deletedConsent } as const, {
    //       headers: await createToastHeaders(toast),
    //     });
    //   }
    // }
  }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  console.log("client.consents:loader: ");
  // const session = await getSession(request);
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const { clientId } = params;
  invariantResponse(clientId, "clientId is required");
  //console.log("client.records:loader: ");
  const [consents, consentForms, tableDefaults] = await Promise.all([
    getClientConsents({ clientId: clientId }, sbUser),
    // getClientConsentById({ id: "new" }, sbUser),
    getConsents(sbUser),
    getTableDefault(TableTypes.CLIENT_CONSENTS, sbUser),
    //   //   //getServicesTexts({ entityId: entityId }),
  ]);

  invariantResponse(consents, "consents should be defined", { status: 404 });
  invariantResponse(consentForms, "letters should be defined", { status: 404 });

  return json({
    status: "ok",
    clientId,
    consents,
    consentForms,
    tableDefaults,
  });
}

const ClientConsents = () => {
  // console.log("consents: ", consents);
  // const fetcher = useFetcher();
  // const deleteForm = useRef<HTMLFormElement>(null);

  // const handleAddClick = (letterId: string) => {
  //   const data = { letterId, intent: "add-consent" };
  //   fetcher.submit(data, {
  //     method: "POST",
  //     // action: ``,
  //   });

  //   // setConsentId("new");
  //   // setShowEditor(!showEditor);
  // };

  return (
    <>
      <FullScreenCardLayout>
        <ConsentsDataGrid />
      </FullScreenCardLayout>
    </>
  );
};
export default ClientConsents;

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
