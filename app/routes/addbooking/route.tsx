import { json } from "@remix-run/cloudflare";
import type {
  ActionFunctionArgs,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";

import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary";
import { requireUserSession } from "~/utils/session.server";
import { invariantResponse } from "~/utils/misc";
import {
  addUpdateBookingIntent,
  BookingSchema,
} from "./addUpdateBookingSchema";
import {
  createBooking,
  getPreparingBookings,
  updateBooking,
} from "~/models/booking.server";

import AddBookingHeader from "./components/header/AddBookingHeader";
import { redirectToFirstId } from "~/utils/redirect-to-first-id";
import { getSession } from "~/services/session.server";

// VITE Imports
import "~/../node_modules/@syncfusion/ej2-react-schedule/styles/tailwind.css";
import "~/../node_modules/@syncfusion/ej2-schedule/styles/tailwind.css";
import { parseWithZod } from "@conform-to/zod";

// import schedule from "~/../node_modules/@syncfusion/ej2-schedule/styles/tailwind.css";
// import reactschedule from "~/../node_modules/@syncfusion/ej2-react-schedule/styles/tailwind.css";

// export const links: LinksFunction = () => {
//   return [
//     { rel: "stylesheet", href: schedule },
//     { rel: "stylesheet", href: reactschedule },
//   ];
// };

export async function action({ request }: ActionFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: BookingSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  switch (submission.value.intent) {
    case addUpdateBookingIntent.ADDBOOKING: {
      const booking = await createBooking(submission.value, sbUser);
      return json({ status: 200, data: booking, submission } as const);
    }
    case addUpdateBookingIntent.UPDATEBOOKING: {
      const booking = await updateBooking(submission.value, sbUser);
      return json({ status: 200, data: booking, submission } as const);
    }
  }

  // let formData = await request.formData();

  // const result = await withZod(deleteClientSchema).validate(formData);
  // if (result.error) {
  //   return validationError(result.error);
  // }
  // if (result.data.action !== "client-delete") {
  //   return json({ status: "action-invalid" });
  // }

  // await deleteClient(result.data.id, sbUser);

  return json({ status: "ok", data: null });
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  // if the user isn't authenticated, this will redirect to login
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");
  const { bookingId } = params;
  const [bookings] = await Promise.all([getPreparingBookings(sbUser)]);

  if (!bookingId) {
    const session = await getSession(request);

    const obj = await redirectToFirstId(
      session,
      "",
      params,
      "bookingId",
      "/addbooking/",
      bookings,
      "id",
    );
    if (obj) return obj;
  }

  return json({ bookings });
}

const Add = () => {
  console.log("Render AddBooking");
  return (
    <div
      id="add-booking"
      className="flex flex-col bg-background flex-1 min-h-[calc(100dvh)]"
    >
      <AddBookingHeader />
      <Outlet />
    </div>
  );
};
export default Add;

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
