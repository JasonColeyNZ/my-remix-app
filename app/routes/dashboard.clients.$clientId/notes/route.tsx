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
import { deleteNoteById, getNotes } from "~/models/note.server.ts";
import { getTableDefault } from "~/models/user.default.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";
import type { Toast } from "~/utils/toast.server.ts";
import { createToastHeaders } from "~/utils/toast.server.ts";
import { TableTypes } from "~/utils/types.ts";

import NotesDataGrid from "./components/NotesDataGrid.tsx";
import appInfo from "~/app-info.tsx";
import { metaMatchesData } from "~/utils/routeData/route-matches.ts";

// VITE Imports
import "~/../node_modules/@syncfusion/ej2-react-grids/styles/tailwind.css";

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
      } Notes`,
    },
  ];
};

export async function action({ request, params }: ActionFunctionArgs) {
  // if the user isn't authenticated, this will redirect to login
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const clientId = params.clientId;
  invariantResponse(clientId, "clientId is required");

  let formData = await request.formData();

  switch (formData.get("intent")) {
    case "note-delete": {
      const id = formData.get("id")?.toString();
      if (id) {
        const deleted = await deleteNoteById({ id }, sbUser);
        invariantResponse(deleted, "Note could not be deleted");
        const toast: Toast = {
          type: "default",
          title: "Note deleted",
          description: `Note "${deleted.title}" has been deleted`,
        };
        return json({ status: 200, data: null } as const, {
          headers: await createToastHeaders(toast),
        });
      }
    }
  }
  return json(null);
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  console.log("client.notes:loader: ");
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");
  const { clientId } = params;
  invariantResponse(clientId, "clientId is required");

  const [notes, tableDefaults] = await Promise.all([
    getNotes({ clientId }, sbUser),
    getTableDefault(TableTypes.CLIENT_NOTES, sbUser),
  ]);

  return json({
    status: "ok",
    notes,
    clientId,
    tableDefaults,
  });
}

const ClientFiles = () => {
  // const deleteForm = useRef<HTMLFormElement>(null);

  // const handleAddClick = () => {
  //   setNoteId("new");
  //   setShowEditor(!showEditor);
  // };

  return (
    <>
      <FullScreenCardLayout>
        <NotesDataGrid />
        {/* HeaderButtons={
            <Button
              size="sm"
              className="hidden h-8 lg:flex "
              onClick={handleAddClick}
            >
              Add Note
            </Button>
          }
          columns={columns}
          data={notes}
          tableDefaults={tableDefaults}
          tableArea={TableTypes.CLIENT_NOTES}
          onRowClick={(row: any) => {
            handleViewClick(row.original.id);
          }}
        /> */}
      </FullScreenCardLayout>
    </>
  );
};
export default ClientFiles;

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
