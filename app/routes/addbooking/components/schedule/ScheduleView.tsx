import { useFetcher } from "@remix-run/react";
import { memo, useContext, useEffect, useState } from "react";
// import CalendarView from "~/routes/dashboard.bookings/components/CalendarView";
// import type { loader } from "~/routes/dashboard.bookings/route";
// import { AppContext } from "~/store/appContext";
// import { SchedulerStateTypes } from "~/store/schedulerReducer";

const ScheduleView = () => {
  console.log("Render ScheduleView");
  const fetcher = useFetcher();
  // const [loaded, setLoaded] = useState(false);

  // const { dispatch: appDispatch } = useContext(AppContext);

  // useEffect(() => {
  //   if (loaded) return;
  //   setLoaded(true);
  //   console.log("ScheduleView.fetcher.load");
  //   fetcher.load(`/dashboard/bookings`);
  // }, [fetcher, loaded]);

  // useEffect(() => {
  //   if (!fetcher.data || !fetcher.data.bookings) return;
  //   console.log("ScheduleView.fetcher", fetcher.data);
  //   // setLoaded(true);

  //   appDispatch({
  //     type: SchedulerStateTypes.view,
  //     payload: {
  //       view: fetcher.data.view,
  //     },
  //   });

  //   appDispatch({
  //     type: SchedulerStateTypes.teamMembers,
  //     payload: {
  //       teamMembers: fetcher.data.selectedUsers,
  //     },
  //   });

  //   appDispatch({
  //     type: SchedulerStateTypes.appointments,
  //     payload: {
  //       appointments: fetcher.data.bookings.map((booking) => {
  //         // console.log("booking", booking);
  //         return {
  //           ...booking,
  //           StartTime: new Date(booking.StartTime),
  //           EndTime: new Date(booking.EndTime),
  //         };
  //       }),
  //     },
  //   });
  // }, [appDispatch, fetcher.data]);

  return null;
  // return <CalendarView />;
};

export default memo(ScheduleView);
