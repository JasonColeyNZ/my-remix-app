import TableEmptySVG from "~/assets/table-empty";
import {
  GridComponent,
  type ColumnModel,
  type RecordClickEventArgs,
  Sort,
  ColumnMenu,
  Filter,
  Page,
  Search,
  Toolbar,
  ContextMenu,
} from ".";
import { Inject } from "..";

const DataGrid = ({
  data,
  columns,
  recordClick,
  headerButtons,
  toolbarClickHandler,
}: {
  data: any;
  columns: ColumnModel[];
  recordClick: (args: RecordClickEventArgs) => void;
  headerButtons?: any;
  toolbarClickHandler?: (args: any) => void;
}) => {
  const toolbarOptions = [
    { text: "Search", tooltipText: "Search", prefixIcon: "e-search" },
    { text: "Print", tooltipText: "Print", prefixIcon: "e-print" },
  ];

  const template: any = TableEmptySVG;

  return (
    <GridComponent
      width="100%"
      height="100%"
      loadingIndicator={{ indicatorType: "Shimmer" }}
      //TODO: this causes major flickering.....
      emptyRecordTemplate={template}
      toolbar={headerButtons ? headerButtons : toolbarOptions}
      contextMenuItems={[
        { text: "Dummy to launch context", target: ".e-content", id: "dummy" },
      ]}
      toolbarClick={toolbarClickHandler}
      searchSettings={{ fields: ["firstName", "lastName"] }}
      selectionSettings={{
        type: "Single",
        mode: "Row",
        allowColumnSelection: false,
      }}
      filterSettings={{ type: "FilterBar" }}
      allowPaging={true}
      // pageSettings={pageSettings}
      allowFiltering={true}
      allowSorting={true}
      showColumnMenu={true}
      dataSource={data}
      allowExcelExport={true}
      allowPdfExport={true}
      contextMenuOpen={(args: any) => {
        args.cancel = true;
        console.log("contextMenuOpen", args);
      }}
      recordClick={recordClick}
      columns={columns}
    >
      <Inject
        services={[
          Sort,
          ColumnMenu,
          Filter,
          Page,
          // Edit,
          Search,
          Toolbar,
          // ColumnChooser,
          // ExcelExport,
          // PdfExport,
          ContextMenu,
        ]}
      />
    </GridComponent>
  );
};

export default DataGrid;
