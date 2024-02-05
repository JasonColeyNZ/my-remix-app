import { useMemo } from "react";
import { useLoaderData, useNavigate } from "@remix-run/react";
import type { loader } from "./route";
import { usersColumns } from "./columns/columns";
import DataGrid from "~/components/syncfusion/data-grid/DataGrid";

const MembersDataGrid = () => {
  const { users } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const columns = useMemo(() => {
    return usersColumns();
  }, []);

  return (
    <DataGrid
      data={users}
      columns={columns}
      recordClick={(args: any) => {
        //     // console.log("recordClick", args);
        if (!args.rowData) return; //cell click has no data object
        navigate(`/dashboard/members/${args.rowData.id}`);
      }}
    />
    // <GridComponent
    //   width="100%"
    //   height="100%"
    //   toolbar={[
    //     "Search",
    //     "Print",
    //     // "ExcelExport",
    //     // "PdfExport",
    //     // "WordExport",
    //     "ColumnChooser",
    //   ]}
    //   contextMenuItems={[
    //     { text: "Dummy to launch context", target: ".e-content", id: "dummy" },
    //   ]}
    //   searchSettings={{ fields: ["firstName", "lastName"] }}
    //   selectionSettings={{
    //     type: "Single",
    //     mode: "Row",
    //     allowColumnSelection: false,
    //   }}
    //   filterSettings={{ type: "FilterBar" }}
    //   allowPaging={true}
    //   // pageSettings={pageSettings}
    //   allowFiltering={true}
    //   allowSorting={true}
    //   showColumnMenu={true}
    //   dataSource={users}
    //   allowExcelExport={true}
    //   allowPdfExport={true}
    //   contextMenuOpen={(args: any) => {
    //     args.cancel = true;
    //     // args.rowInfo.rowData //record
    //     console.log("contextMenuOpen", args);
    //   }}
    //   recordClick={(args: any) => {
    //     // console.log("recordClick", args);
    //     if (!args.rowData) return; //cell click has no data object
    //     navigate(`/dashboard/clients/${args.rowData.id}`);
    //   }}
    //   // rowSelected={(args: RowSelectEventArgs) => {
    //   //   if (!args.data || !args.data || rightClick) return;
    //   //   console.log("rowSelected", args);
    //   //   // setGridRefresh(false);
    //   //   // navigate(`/dashboard/clients/${args.data.id}`);
    //   //   // args.data
    //   // }}
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
    //       // ExcelExport,
    //       // PdfExport,
    //       ContextMenu,
    //     ]}
    //   />
    // </GridComponent>
  );
};

export default MembersDataGrid;
