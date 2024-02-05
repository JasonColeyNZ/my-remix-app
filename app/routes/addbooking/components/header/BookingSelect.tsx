import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button.tsx";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet.tsx";
import { memo, useContext, useEffect, useState } from "react";
import ServiceBadge from "~/components/ui/service-badge.tsx";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema.ts";
import VList from "~/components/vertical-list/VList.tsx";
import VListItemButton from "~/components/vertical-list/VListItemButton.tsx";
import type { loader } from "../../route";
import { AddBookingContext } from "../../store/addBookingContext";
import type { ClientBookingItemType } from "~/models/booking.server";

const BookingSelect = () => {
  const { bookings } = useLoaderData<typeof loader>();
  const { state } = useContext(AddBookingContext);
  const navigate = useNavigate();
  const [selectedConsentId, setSelectedConsentId] = useState<string>("");

  useEffect(() => {
    if (state.addBookingState.activeBooking?.id === "new") return;
    setSelectedConsentId(state.addBookingState.activeBooking.id);
  }, [state.addBookingState.activeBooking?.id]);

  const handleListItemClick = (booking: ClientBookingItemType) => {
    navigate(`/addbooking/${booking.id}`);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="pl-2 h-7 hover:no-underline text-primary-2 bg-primary hover:bg-primary-10">
          Select Booking
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <Form method="POST" className="flex flex-col h-full">
          <input type="hidden" name="intent" value={formViewerIntent.CREATE} />
          <input type="hidden" name="formId" value={selectedConsentId} />

          <SheetHeader>
            <SheetTitle>Select Booking</SheetTitle>
            <SheetDescription>
              Select a booking below to complete.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col py-3 flex-1 p-0">
            <VList
              selectedId={selectedConsentId}
              className="h-full w-full p-0 gap-2"
            >
              {bookings &&
                bookings.map((booking) => (
                  <VListItemButton
                    className="border-[1px] mb-1 bg-gray-50 border-gray-100 rounded-md"
                    key={booking.id}
                    id={booking.id}
                    text={
                      booking.client.firstName + " " + booking.client.lastName
                    }
                    onClick={() => handleListItemClick(booking)}
                    secondRow={
                      <div className="flex mx-3 text-xs gap-1 flex-wrap">
                        {booking.services.map((service) => {
                          return (
                            <ServiceBadge
                              key={service.name}
                              name={service.name}
                              color={service.color}
                              textColor={service.textColor}
                            />
                          );
                        })}
                      </div>
                    }
                  />
                ))}
            </VList>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Close</Button>
            </SheetClose>
          </SheetFooter>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
export default memo(BookingSelect);
