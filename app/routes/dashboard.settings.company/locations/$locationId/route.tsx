import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");
  const { locationId, roomId } = params;
  invariantResponse(locationId, "locationId is required");

  return json({ locationId, roomId });
}

// export async function action({ request }: ActionFunctionArgs) {
//   const { user: sbUser } = await requireUserSession(request);
//   invariantResponse(sbUser, "User should be logged in");

//   const user = await getUser(request, sbUser);

//   const formData = Object.fromEntries(await request.formData());
//   const { name } = formData;

//   // if (!success) {
//   //   //TODO: Handle error
//   //   return;
//   // }
//   //Add Location
//   const newLocation = await addLocation(
//     user.entity.id,
//     name.toString(),
//     sbUser,
//   );
//   const session = await getSession(request);
//   session.set(NEW_LOCATION_ID, newLocation?.id);

//   return redirect("..", {
//     headers: {
//       "Set-Cookie": await sessionStorage.commitSession(session),
//     },
//   });

//   //return redirect("..");
// }

const Location = () => {
  return <Outlet />;
};
export default Location;

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
