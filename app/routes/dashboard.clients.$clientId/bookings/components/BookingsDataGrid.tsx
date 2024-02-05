import { useMemo } from "react";
import { useLoaderData } from "@remix-run/react";
import type { loader } from "../route";
import { bookingsColumns } from "./columns/columns";
import DataGrid from "~/components/syncfusion/data-grid/DataGrid";

const BookingsDataGrid = () => {
  const { bookings } = useLoaderData<typeof loader>();
  // console.log("bookings", bookings);
  // const navigate = useNavigate();
  // const [pageSettings, setPageSettings] = useState<PageSettingsModel>();

  const columns = useMemo(() => {
    return bookingsColumns();
  }, []);

  return (
    <DataGrid
      data={bookings}
      columns={columns}
      recordClick={(args: any) => {
        console.log("recordClick", args.data);
        //     // setGridRefresh(false);
        //     // navigate(`/dashboard/clients/${args.data.id}`);
        //     // args.data
      }}
    />
    // <GridComponent
    //   width="100%"
    //   height="100%"
    //   toolbar={["Search"]}
    //   searchSettings={{ fields: ["firstName", "lastName"] }}
    //   selectionSettings={{
    //     type: "Single",
    //     mode: "Row",
    //     allowColumnSelection: false,
    //   }}
    //   filterSettings={{
    //     showFilterBarStatus: true,
    //     ignoreAccent: true,
    //     mode: "Immediate",
    //     type: "FilterBar",
    //   }}
    //   allowPaging={true}
    //   pageSettings={pageSettings}
    //   allowFiltering={true}
    //   allowSorting={true}
    //   showColumnMenu={true}
    //   dataSource={bookings}
    //   allowExcelExport={true}
    //   allowPdfExport={true}
    //   rowSelected={(args: RowSelectEventArgs) => {
    //     console.log("rowSelected", args.data);
    //     // setGridRefresh(false);
    //     // navigate(`/dashboard/clients/${args.data.id}`);
    //     // args.data
    //   }}
    //   columns={columns}
    //   // cellSelected={(args: CellSelectEventArgs) => {
    //   //   console.log("cellSelected");
    //   //   args.cancel = true;
    //   // }}
    //   // cellSelecting={(args: CellSelectingEventArgs) => {
    //   //   console.log("cellSelecting");
    //   //   args.cancel = true;
    //   // }}

    //   // cellSelecting={(args: CellSelectingEventArgs) => {
    //   //   console.log("cellSelecting");
    //   //   args.cancel = true;
    //   // }}
    // >
    //   <Inject
    //     services={[
    //       Sort,
    //       ColumnMenu,
    //       Filter,
    //       Page,
    //       Edit,
    //       Search,
    //       Toolbar,
    //       ColumnChooser,
    //     ]}
    //   />
    // </GridComponent>
  );
};

export default BookingsDataGrid;
