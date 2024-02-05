import { useContext, useEffect, useState } from "react";
import { AddBookingContext } from "../../store/addBookingContext";
import { useFetcher } from "@remix-run/react";
import type { loader } from "~/routes/dashboard.clients.$clientId/bookings/route";
import BookingHistoryItem from "./BookingHistoryItem";
import type { ClientBookingItemType } from "~/models/booking.server";
import Section from "../Section";

const ClientHistory = () => {
  const { state } = useContext(AddBookingContext);

  const [loaded, setLoaded] = useState(false);
  const [clientId, setClientId] = useState<string>("new");
  const [bookingHistory, setBookingHistory] = useState<ClientBookingItemType[]>(
    [],
  );
  const fetcher = useFetcher<typeof loader>();

  useEffect(() => {
    if (loaded) return;
    if (!state.addBookingState.activeBooking.client) return;
    setLoaded(true);
    setClientId(state.addBookingState.activeBooking.client.id);
    fetcher.load(
      `/dashboard/clients/${state.addBookingState.activeBooking.client.id}/bookings`,
    );
  }, [fetcher, loaded, state.addBookingState.activeBooking?.client]);

  useEffect(() => {
    if (!fetcher.data || !fetcher.data.bookings) return;
    // console.log(fetcher.data);
    // setLoaded(true);
    setBookingHistory(fetcher.data.bookings);
  }, [fetcher.data]);

  useEffect(() => {
    if (!state.addBookingState.activeBooking.client) return;
    if (clientId === state.addBookingState.activeBooking.client.id) return;
    setLoaded(false);
  }, [clientId, state.addBookingState.activeBooking.client]);

  if (!state.addBookingState.activeBooking.client) {
    return null;
  }

  return (
    <Section header="Client History">
      {bookingHistory.length === 0 && (
        <div className="text-xs font-normal text-foreground text-center italic">
          No history found
        </div>
      )}
      {bookingHistory.map((booking) => {
        return <BookingHistoryItem key={booking.id} booking={booking} />;
      })}
    </Section>
  );
};

export default ClientHistory;
