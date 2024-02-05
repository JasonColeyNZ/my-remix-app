// import type {
//   MbscEventClickEvent,
//   MbscEventCreateFailedEvent,
//   MbscEventDeleteEvent,
//   MbscEventUpdateFailedEvent,
//   MbscResource,
// } from "@mobiscroll/react";
// import { Eventcalendar, Toast } from "@mobiscroll/react";
import { useLoaderData } from "@remix-run/react";
// import { useCallback, useState } from "react";
import { useLocales } from "remix-utils/locales/react";

// import { AppContext } from "~/store/context";
import type { loader } from "../route.tsx";

// const { Eventcalendar, Toast } = pkg;

const SchedulerView = () => {
  const { locationClosedHours, selectedUsers } = useLoaderData<typeof loader>();
  const locales = useLocales();
  // const [currentDate, setCurrentDate] = useState(new Date());
  // const groups = ["userID"];
  // const { state, dispatch } = useContext(AppContext);
  // const utils = new Utils(locationHours);
  // console.log("view ", view);
  console.log("locationHours ", locationClosedHours);

  //  const [myEvents, setEvents] = useState<MbscCalendarEvent[]>([]);
  // const [isToastOpen, setToastOpen] = useState<boolean>(false);
  // const [toastText, setToastText] = useState<string>();
  // const [myResources] = useState(selectedUsers);

  // useEffect(() => {
  //   getJson(
  //     "https://trial.mobiscroll.com/events/?vers=5",
  //     (events) => {
  //       setEvents(events);
  //     },
  //     "jsonp",
  //   );
  // }, []);

  // const closeToast = useCallback(() => {
  //   setToastOpen(false);
  // }, []);

  // const onEventClick = useCallback((event: MbscEventClickEvent) => {
  //   setToastText(event.event.title);
  //   setToastOpen(true);
  // }, []);

  // const onEventDelete = useCallback((event: MbscEventDeleteEvent) => {
  //   setToastText(event.event.title + " deleted");
  //   setToastOpen(true);
  // }, []);

  // const onEventCreateFailed = useCallback(
  //   (event: MbscEventCreateFailedEvent) => {
  //     if (event.overlap) {
  //       setToastText("Available hours cannot overlap, please try again");
  //       setToastOpen(true);
  //     } else if (event.invalid) {
  //       setToastText("Member hours must fall within open hours");
  //       setToastOpen(true);
  //     }
  //   },
  //   [],
  // );

  // const onEventUpdateFailed = useCallback(
  //   (event: MbscEventUpdateFailedEvent) => {
  //     if (event.overlap) {
  //       setToastText("Available hours cannot overlap, please try again");
  //       setToastOpen(true);
  //     } else if (event.invalid) {
  //       setToastText("Member hours must fall within open hours");
  //       setToastOpen(true);
  //     }
  //   },
  //   [],
  // );

  // const renderCustomResource = (resource: MbscResource) => {
  //   return (
  //     <div sx={{ backgroundColor: "white" }}>
  //       <div
  //         sx={{
  //           fontSize: "1em",
  //           fontWeight: 600,
  //           textAlign: "center",
  //           p: "0.5em",
  //           display: "flex",
  //           flexDirection: "column",
  //           alignItems: "center",
  //         }}
  //       >
  //         {resource.img && <Avatar alt="Avatar" src={resource.img} />}
  //         {resource.name}
  //       </div>
  //     </div>
  //   );
  // };

  const renderDay = (day: any) => {
    return (
      <div className="day-template-content">
        <div className="day-template-date">
          {day.date.toLocaleDateString(locales, { weekday: "short" })}
        </div>
      </div>
    );
  };
  const extendDefaultEvent = (event: any) => {
    return {
      ...event,
      color: "#26c57d",
      textColor: "#fff",
      title: "Available",
    };
  };

  return (
    <>
      {/* <Eventcalendar
        theme="material"
        themeVariant="light"
        clickToCreate={true}
        dragToCreate={true}
        dragToMove={true}
        dragToResize={true}
        eventDelete={true}
        groupBy="date"
        //data={myEvents}
        view={view}
        resources={myResources}
        renderResource={renderCustomResource}
        onEventClick={onEventClick}
        onEventDelete={onEventDelete}
        onEventCreateFailed={onEventCreateFailed}
        onEventUpdateFailed={onEventUpdateFailed}
        invalid={locationClosedHours}
        renderDay={renderDay}
        showControls={false}
        extendDefaultEvent={extendDefaultEvent}
      />

      <Toast
        theme="ios"
        themeVariant="light"
        message={toastText}
        isOpen={isToastOpen}
        onClose={closeToast}
      /> */}
    </>
  );
};
export default SchedulerView;
