// import type { ColumnDef } from "@tanstack/react-table";
// import {
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import type { ReactElement } from "react";
// import { Separator } from "~/components/ui/separator.tsx";
// import {
//   DataTablePaginationOptions,
//   DataTableShowFilters,
//   DataTableViewOptions,
//   TanStackDataTable,
//   useTableStateManagement,
// } from "~/components/ui/tanstack/tanstack-utils.tsx";

// interface DataTableProps<T, TValue> {
//   columns: ColumnDef<T, TValue>[];
//   data: T[];
//   tableDefaults: any;
//   tableArea: string;
//   HeaderButtons?: ReactElement;
//   onRowClick: (row: any) => void;
// }

// export function DataTable<T, TValue>({
//   columns,
//   data,
//   tableDefaults,
//   tableArea,
//   onRowClick,
//   HeaderButtons,
// }: DataTableProps<T, TValue>) {
//   // const [showColumnFilters, setShowColumnFilters] = useState(
//   //   tableDefaults.showColumnFilters ?? false,
//   // );
//   // const [sorting, setSorting] = useState<SortingState>(
//   //   tableDefaults.sorting ?? [],
//   // );
//   // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
//   //   tableDefaults.columnFiltering ?? [],
//   // );

//   const {
//     showColumnFilters,
//     sorting,
//     columnFilters,
//     setSorting,
//     setShowColumnFilters,
//     setColumnFilters,
//   } = useTableStateManagement({ tableDefaults, tableArea });

//   const table = useReactTable<T>({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//     onColumnFiltersChange: setColumnFilters,
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     // onPaginationChange: setPagination,
//     defaultColumn: {
//       minSize: 0,
//       size: Number.MAX_SAFE_INTEGER,
//       maxSize: Number.MAX_SAFE_INTEGER,
//     },

//     enableColumnResizing: true,
//     state: {
//       sorting,
//       columnFilters,
//       // pagination,
//     },
//     // debugTable: true,
//   });

//   return (
//     <div className="flex flex-col flex-1 h-full overflow-hidden">
//       <div className="flex flex-col bg-header">
//         <div className="flex items-center py-4 px-3">
//           {/* <Input
//             placeholder="Filter First Name..."
//             value={
//               (table.getColumn("firstName")?.getFilterValue() as string) ?? ""
//             }
//             onChange={(event) =>
//               table.getColumn("firstName")?.setFilterValue(event.target.value)
//             }
//             className="max-w-sm"
//           /> */}
//           <div className="ml-auto flex flex-row gap-2">
//             {HeaderButtons && HeaderButtons}
//             <DataTableShowFilters
//               setShowColumnFilters={setShowColumnFilters}
//               showColumnFilters={showColumnFilters}
//             />
//             <DataTableViewOptions table={table} />
//           </div>
//         </div>
//         <Separator />
//       </div>
//       <div className="flex flex-col flex-auto overflow-hidden [&_>div]:h-full [&_>div]:overflow-y-scroll">
//         <TanStackDataTable
//           table={table}
//           columns={columns}
//           showFilters={showColumnFilters}
//           onRowClick={onRowClick}
//         />
//       </div>
//       <div className=" flex flex-col flex-grow-0 bg-header ">
//         <Separator />
//         <DataTablePaginationOptions table={table} />
//       </div>
//     </div>
//   );
// }

// export default DataTable;
