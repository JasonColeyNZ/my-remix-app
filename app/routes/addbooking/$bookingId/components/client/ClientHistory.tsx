import { useLoaderData } from "@remix-run/react";
import BookingHistoryItem from "./BookingHistoryItem";
import Section from "../Section";
import type { loader } from "../../route";

const ClientHistory = () => {
  const { clientHistory } = useLoaderData<typeof loader>();

  return (
    <Section header="Client Appointment History">
      {clientHistory.length === 0 && (
        <div className="text-xs font-normal text-foreground text-center italic">
          No history found
        </div>
      )}
      {clientHistory.map((booking) => {
        return booking ? (
          <BookingHistoryItem key={booking.id} booking={booking} />
        ) : null;
      })}
    </Section>
  );
};

export default ClientHistory;
