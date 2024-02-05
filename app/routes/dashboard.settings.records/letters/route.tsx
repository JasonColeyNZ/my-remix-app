import type { ShouldRevalidateFunction } from "@remix-run/react";
import {
  Outlet,
  isRouteErrorResponse, // useActionData,
  // useNavigate,
  useRouteError,
} from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
// import { useEffect } from "react";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import {
  SETTINGS_LETTER_SELECTED,
  SETTINGS_RECORDS_SELECTED_TAB,
} from "~/const.ts";
import { getConsents } from "~/models/consents.server.ts";
import { getSession, sessionStorage } from "~/services/session.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { redirectToFirstId } from "~/utils/redirect-to-first-id.ts";
import { requireUserSession } from "~/utils/session.server.ts";

import { addLetterSchema, letterIntent } from "./addLetterSchema.tsx";
import LetterList from "./components/LetterList.tsx";
import Toolbar from "./components/Toolbar.tsx";
import { parseWithZod } from "@conform-to/zod";

export const shouldRevalidate: ShouldRevalidateFunction = ({
  currentParams,
  nextParams,
}) => {
  if (currentParams.letterId !== nextParams.letterId) return true;
  return false;
};

export async function action({ request }: ActionFunctionArgs) {
  // if the user isn't authenticated, this will redirect to login
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  let formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: addLetterSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  switch (submission.value.intent) {
    case letterIntent.ADD_LETTER: {
      return json({
        // letter: await createLetterOfConsent(submission.value, sbUser),
      } as const);
    }
    default:
      invariantResponse({}, 'Invalid "intent" parameter');
  }
}
export async function loader({ request, params }: LoaderFunctionArgs) {
  const session = await getSession(request);

  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const { letterId } = params;

  session.set(SETTINGS_RECORDS_SELECTED_TAB, "letters");
  const letters = await getConsents(sbUser);

  if (!letterId) {
    const obj = await redirectToFirstId(
      session,
      SETTINGS_LETTER_SELECTED,
      params,
      "letterId",
      "/dashboard/settings/records/letters/",
      letters,
      "id",
    );
    if (obj) return obj;
  }

  return json(
    { status: "ok", letters },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

export interface LetterType {
  name: string;
  id: string;
}

const SettingsRecordsLetters = () => {
  // const actionData = useActionData<typeof action>();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (actionData && actionData.letter) {
  //     navigate(actionData.letter.id);
  //   }
  // }, [actionData, navigate]);

  return (
    <div className="flex flex-1 flex-col sm:flex-row xs:flex-auto mx-auto xs:w-full sm:w-max-lg overflow-auto">
      <div id="letters-root" className="flex-1 flex min-h-0">
        <div className="flex-1 flex flex-col md:flex-row">
          <LetterList />
          <div className="flex flex-1 min-h-0 flex-col">
            <Toolbar />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsRecordsLetters;

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
