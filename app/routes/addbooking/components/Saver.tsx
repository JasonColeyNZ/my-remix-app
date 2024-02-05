import { useContext, useEffect } from "react";
import { AddBookingContext } from "../store/addBookingContext";
import { useFetcher } from "@remix-run/react";
import type { action } from "../route";
import { serialize } from "object-to-formdata";
import { addUpdateBookingIntent } from "../addUpdateBookingSchema";
import { AddBookingStateTypes } from "../store/addBookingReducer";

const Saver = () => {
  const { state, dispatch } = useContext(AddBookingContext);
  // const [header, setHeader] = useState<string>("Add Booking");
  const fetcher = useFetcher<typeof action>();

  useEffect(() => {
    if (!state.addBookingState.postUpdate) return;

    fetcher.submit(
      serialize({
        intent:
          state.addBookingState.activeBooking.id === "new"
            ? addUpdateBookingIntent.ADDBOOKING
            : addUpdateBookingIntent.UPDATEBOOKING,
        id: state.addBookingState.activeBooking.id,
        clientId: state.addBookingState.activeBooking.client.id,
        services: state.addBookingState.activeBooking.services
          .map((s) => s.id)
          .join(","),
      }),
      {
        method: "POST",
      },
    );

    dispatch({
      type: AddBookingStateTypes.setPostUpdate,
      payload: {
        postUpdate: false,
      },
    });

    // console.log(
    //   "state.addBookingState.activeBooking: ",
    //   state.addBookingState.activeBooking,
    // );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.addBookingState.postUpdate,
    // state.addBookingState.activeBooking.client,
    // state.addBookingState.activeBooking.services.length,
  ]);

  useEffect(() => {
    if (!fetcher.data?.data || state.addBookingState.activeBooking.id !== "new")
      return;
    dispatch({
      type: AddBookingStateTypes.setId,
      payload: {
        id: fetcher.data?.data.id,
      },
    });
  }, [dispatch, fetcher.data, state.addBookingState.activeBooking.id]);

  return null;
};

export default Saver;
