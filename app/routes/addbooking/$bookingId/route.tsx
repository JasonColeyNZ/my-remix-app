import type { ShouldRevalidateFunction } from "@remix-run/react";
import { Outlet } from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import {
  createBooking,
  getBookingBookingById,
  getBookingConsents,
  getClientBookings,
  updateBooking,
  updateBookingClient,
  updateBookingServices,
} from "~/models/booking.server";
import { invariantResponse } from "~/utils/misc";
import { requireUserSession } from "~/utils/session.server";
import ClientHistory from "./components/client/ClientHistory";
import ClientInfo from "./components/client/ClientInfo";
import ServiceInfo from "./components/service/ServiceInfo";
import { getGroupedServicesAndCategories } from "~/models/services.server";
import {
  BookingSchema,
  addUpdateBookingIntent,
} from "./addUpdateBookingSchema";
import { getClients } from "~/models/client.server";
import Consents from "./components/consent/Consents";
import { parseWithZod } from "@conform-to/zod";

export const shouldRevalidate: ShouldRevalidateFunction = () => {
  return true;
};

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
    case addUpdateBookingIntent.UPDATECLIENT: {
      const booking = await updateBookingClient(submission.value, sbUser);
      return json({ status: 200, data: booking, submission } as const);
    }
    case addUpdateBookingIntent.UPDATEBOOKING: {
      const booking = await updateBooking(submission.value, sbUser);
      return json({ status: 200, data: booking, submission } as const);
    }
    case addUpdateBookingIntent.UPDATESERVICE: {
      await updateBookingServices(submission.value, sbUser);
      return json({ status: 200, data: null, submission } as const);
    }
  }

  return json({ status: "ok", data: null });
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  // if the user isn't authenticated, this will redirect to login
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const { bookingId } = params;
  invariantResponse(bookingId, "BookingId should be provided");

  const [booking, categories, clients, consents] = await Promise.all([
    getBookingBookingById(bookingId, sbUser),
    getGroupedServicesAndCategories(sbUser),
    getClients(sbUser),
    getBookingConsents({ bookingId }, sbUser),
  ]);

  const [clientHistory] = await Promise.all([
    booking.client ? getClientBookings(booking.client.id, sbUser) : [],
  ]);

  return json({ booking, clientHistory, categories, clients, consents });
}

const Booking = () => {
  // const { booking } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="flex flex-col w-1/4 p-4 gap-2">
        <ClientInfo />
        <ClientHistory />
        <ServiceInfo />
        <Consents />
      </div>
      <Outlet />
    </>
  );
};

export default Booking;
