import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
import { json, redirect } from "@remix-run/cloudflare";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import {
  createBooking, // getBookingItem,
  updateBooking,
} from "~/models/booking.server.ts";
import { getUser } from "~/utils/auth.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";

import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import { BookingFormIntent, bookingSchema } from "./bookingSchema.ts";
import BookingForm from "./components/BookingForm.tsx";
import Modal from "~/components/modal/Modal.tsx";
import { parseWithZod } from "@conform-to/zod";

export async function loader({ request, params }: LoaderFunctionArgs) {
  // if the user isn't authenticated, this will redirect to login
  const { user: sbUser, response } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const { bookingId } = params;
  invariantResponse(bookingId, "Booking Id should be provided");

  const [user] = await Promise.all([getUser(request, sbUser)]);

  //get default location
  // const userLocationId = (user.defaults && user.defaults.locationId) || "";
  // console.log("searchLocationId", searchLocationId);

  // const [booking] = await Promise.all([
  //   getBookingItem(bookingId, sbUser),
  //   // getUsers(sbUser),
  //   //getLocationUserHours(locationId, sbUser, memberId),
  // ]);

  return json({}, { headers: response.headers });
}

export async function action({ request }: ActionFunctionArgs) {
  // if the user isn't authenticated, this will redirect to login
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: bookingSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  switch (submission.value.intent) {
    case BookingFormIntent.CREATE: {
      const newBooking = await createBooking(submission.value, sbUser);

      invariantResponse(newBooking, "Product not created");
      return redirect("..");
    }
    case BookingFormIntent.UPDATE: {
      const booking = await updateBooking(submission.value, sbUser);
      invariantResponse(booking, "Product not updated");
      return json({ status: 200, data: booking });
    }
  }
}

const Edit = () => {
  // const { booking } = useLoaderData<typeof loader>();

  const navigate = useNavigate();
  return (
    <Modal
      showTitle={true}
      // title={`${booking.id === "new" ? "New" : "Modify"} Appointment with ${
      //   booking.user.firstName
      // } ${booking.user.lastName}`}
      width={0}
      height={0}
      fullScreen={true}
      sx={{ m: 2 }}
      onClose={() => {
        navigate("..");
      }}
    >
      <BookingForm />
    </Modal>
  );
};
export default Edit;

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
