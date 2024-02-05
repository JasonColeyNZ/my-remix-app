// import { useLoaderData } from "@remix-run/react";
// import { useRef, useState } from "react";
// import { ClientOnly } from "remix-utils/client-only";
import type { LocationHourItemType } from "~/models/location.server.ts";

// import DataCell from "~/utils/scheduler/DataCell";
// import Utils from "~/utils/scheduler/utils";

// import { useSelectedCellData } from "./useSelectedCellData";

interface Props {
  hours: LocationHourItemType[];
}

const LocationsHours = ({ hours }: Props) => {
  console.log("hours ", hours);
  // const { locationId } = useLoaderData<{ locationId: string }>();
  // const schedulerRef = useRef<Scheduler>(null);

  // const [contextMenu, setContextMenu] = useState<{
  //   mouseX: number;
  //   mouseY: number;
  // } | null>(null);
  // const { selectedCellData, setSelectedCellData, addHours } =
  //   useSelectedCellData(locationId, hours);

  // let utils = new Utils(hours);

  // const handleClose = () => {
  //   setContextMenu(null);
  // };
  // const handleContextMenu = (event: React.MouseEvent) => {
  //   event.preventDefault();
  //   setContextMenu(
  //     contextMenu === null
  //       ? {
  //           mouseX: event.clientX + 2,
  //           mouseY: event.clientY - 6,
  //         }
  //       : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
  //         // Other native context menus might behave different.
  //         // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
  //         null,
  //   );
  // };
  // const renderDataCell = (itemData: any) => {
  //   //   //const CellTemplate = currentView === "month" ? DataCellMonth : DataCell;
  //   const CellTemplate = DataCell;

  //   return <CellTemplate itemData={itemData} utils={utils} />;
  // };

  // const addToClosed = (e: any) => {
  //   handleClose();
  //   addHours("addClosed");
  // };

  // const addToOpen = (e: any) => {
  //   handleClose();
  //   addHours("addOpen");
  // };

  // const onOptionChanged = (e: OptionChangedEventInfo<dxScheduler>) => {
  //   if (e.name === "selectedCellData") setSelectedCellData(e.value);
  // };

  return (
    <>
      <div className="h-full">
        {/* <Menu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
        >
          <MenuItem onClick={addToOpen} disabled={!selectedCellData}>
            Mark as Open
          </MenuItem>
          <MenuItem onClick={addToClosed} disabled={!selectedCellData}>
            Mark as Closed
          </MenuItem>
        </Menu> */}
        {/* <ClientOnly
          children={() => (
            <Scheduler
              ref={schedulerRef}
              style={{ height: "100%" }}
              //dataSource={hours}
              //currentDate={currentDate}
              id="scheduler"
              //itemRender={renderItem}
              dataCellRender={renderDataCell}
              onAppointmentFormOpening={(e) => {
                //console.log(e);
                e.cancel = true;
                //e.appointmentData && addHours(e.appointmentData);
                //createDateRange(e.appointmentData);
              }}
              onOptionChanged={onOptionChanged}
              showAllDayPanel={false}
              showCurrentTimeIndicator={false}
              defaultCurrentView="week"
              firstDayOfWeek={1}
              timeZone="Africa/Abidjan"
              dateCellRender={(e: { date: Date }) => {
                return (
                  <>
                    <div
                      sx={{ textAlign: "center", color: "#0000008a" }}
                      className="dx-scheduler-header-panel-cell-date"
                    >
                      {e.date.toLocaleDateString("en-us", { weekday: "long" })}
                    </div>
                    <span className="dx-scheduler-header-panel-cell-date">
                      &nbsp;
                    </span>
                  </>
                );
              }}
              //onAppointmentFormOpening={onAppointmentFormOpening}
            >
              <Editing allowDragging={true} allowResizing={true} />
              <View type="week" startDayHour={0} endDayHour={24} />
            </Scheduler>
          )}
        /> */}
      </div>
    </>
  );
};
export default LocationsHours;
