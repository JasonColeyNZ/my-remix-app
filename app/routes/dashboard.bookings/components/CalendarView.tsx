import { Card, CardContent, CardHeader } from "~/components/ui/card";
// import type { loader } from "../route";
import { useContext, useMemo } from "react";
import { AppContext } from "~/store/appContext";
import { quickInfoTemplates } from "./QuickView";
import {
  ScheduleComponent,
  type EventRenderedArgs,
  type ResourcesModel,
  type ViewsModel,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  DragAndDrop,
  Resize,
} from "~/components/syncfusion/schedule";
import { Inject } from "~/components/syncfusion";

const CalendarView = () => {
  const { state } = useContext(AppContext);

  const eventSettings = useMemo(() => {
    return { dataSource: state.schedulerState.appointments };
  }, [state.schedulerState.appointments]);

  const onEventRendered = (args: EventRenderedArgs) => {
    args.element.style.backgroundColor = args.data.color;
  };

  const views: ViewsModel[] = useMemo(() => {
    return [
      {
        option: "Day",
        startHour: state.schedulerState.view.startHour,
        endHour: state.schedulerState.view.endHour,
      },
      {
        option: "Week",
        startHour: state.schedulerState.view.startHour,
        endHour: state.schedulerState.view.endHour,
      },
      {
        option: "WorkWeek",
        startHour: state.schedulerState.view.startHour,
        endHour: state.schedulerState.view.endHour,
      },
    ];
  }, [state.schedulerState.view.endHour, state.schedulerState.view.startHour]);

  const resources: ResourcesModel[] = useMemo(() => {
    return [
      {
        field: "teamMemberId",
        title: "Team Members",
        name: "Members",
        allowMultiple: true,
        dataSource: state.schedulerState.selectedTeamMembers,
        textField: "firstName",
        idField: "id",
        colorField: "color",
      },
    ];
  }, [state.schedulerState.selectedTeamMembers]);

  return (
    <Card className="flex flex-1 w-full h-full">
      <CardHeader></CardHeader>
      <CardContent>
        <ScheduleComponent
          eventSettings={eventSettings}
          timezone="UTC"
          selectedDate={new Date()}
          allowMultiDrag={true}
          allowResizing={true}
          allowDragAndDrop={true}
          quickInfoTemplates={quickInfoTemplates}
          popupOpen={(args) => {
            // args.cancel = true;
            // console.log("popupOpen", args);
          }}
          eventRendered={onEventRendered}
          group={state.schedulerState.grouping}
          // cellHeaderTemplate={ }
          // cellTemplate={ }
          views={views}
          resources={resources}
        >
          <Inject
            services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]}
          />
        </ScheduleComponent>
        {/* <ContextMenuComponent></ContextMenuComponent> */}
      </CardContent>
    </Card>
  );
};

export default CalendarView;
