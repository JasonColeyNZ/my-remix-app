import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import type {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import { MEMBERS_SELECTED_TAB } from "~/const.ts";
import FullScreenCardLayout from "~/layouts/page-layouts/FullScreenCard";
import { getTableDefault } from "~/models/user.default.server.ts";
import { getNotes } from "~/models/usernote.server.ts";
import { getSession, sessionStorage } from "~/services/session.server.ts";
import { checkUUID, invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";
import { TableTypes } from "~/utils/types.ts";
import NotesDataGrid from "./components/NotesDataGrid";
import { metaMatchesData } from "~/utils/routeData/route-matches";
import appInfo from "~/app-info";

// VITE Imports
import "~/../node_modules/@syncfusion/ej2-react-grids/styles/tailwind.css";

// import reactgrids from "~/../node_modules/@syncfusion/ej2-react-grids/styles/tailwind.css";

// export const links: LinksFunction = () => {
//   return [{ rel: "stylesheet", href: reactgrids }];
// };

export const meta: MetaFunction = ({ matches }) => {
  const data = metaMatchesData(
    "routes/dashboard.members.$memberId/route",
    matches,
  );
  return [
    {
      title: `${appInfo.title} -  ${
        data ? data.member.firstName + " " + data.member.lastName : "Member"
      } Notes`,
    },
  ];
};
export async function loader({ request, params }: LoaderFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");
  const { memberId } = params;
  checkUUID(memberId);

  const session = await getSession(request);

  const [notes, tableDefaults] = await Promise.all([
    getNotes({ userId: memberId }, sbUser),
    getTableDefault(TableTypes.MEMBER_NOTES, sbUser),
  ]);

  session.set(MEMBERS_SELECTED_TAB, "notes");
  return json(
    {
      status: "ok",
      notes,
      memberId,
      tableDefaults,
    },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const MemberFiles = () => {
  return (
    <FullScreenCardLayout>
      <FullScreenCardLayout>
        <NotesDataGrid />
      </FullScreenCardLayout>
    </FullScreenCardLayout>
  );
};
export default MemberFiles;

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
