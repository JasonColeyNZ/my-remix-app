import { NavLink } from "@remix-run/react";
import { memo, useCallback, useContext, useMemo } from "react";
import AppIcon from "~/assets/app";
import { cn } from "~/utils/shadcn.utils";
import { AddBookingContext } from "../../store/addBookingContext";
import appInfo from "~/app-info";
import BookingSelect from "./BookingSelect";
import { Button } from "~/components/ui/button";

const AddBookingHeader = () => {
  console.log("Render AddBookingHeader");
  const { state } = useContext(AddBookingContext);

  const handleClose = useCallback(() => {
    // console.log("handleClose");
    window.close();
  }, []);

  const header = useMemo(() => {
    if (!state.addBookingState.activeBooking.client) {
      return "Add Booking";
    }
    return `Add Booking for ${state.addBookingState.activeBooking.client.firstName} ${state.addBookingState.activeBooking.client.lastName}`;
  }, [state.addBookingState.activeBooking.client]);

  return (
    <>
      <div
        className={`w-full shadow-md bg-header t-0 h-max-[3em] h-min-[3em] h-[3em]`}
      >
        <div className="flex w-full flex-1 md:max-w-[1000px] lg:max-w-[1200px] mx-auto lg:mr-auto lg:ml-auto bg-header ">
          <div
            className="hidden md:flex text-sm  text-primary-10 text-decoration-none
              mr-2 ml-3 md:text-xl whitespace-nowrap w-full p-2"
          >
            <span>
              <AppIcon className={cn(" mr-1")}></AppIcon>
            </span>
            <div className="flex flex-col pr-4">
              <NavLink
                className="font-[monospace] tracking-wider font-bold"
                to={"/"}
              >
                {appInfo.title}
              </NavLink>
            </div>
            <div className="flex flex-1">{header}</div>

            <div className="flex gap-2">
              <BookingSelect />
              <Button variant="outline" className="h-7" onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(AddBookingHeader);
