// import { useNavigate } from "@remix-run/react";
// // import {
// //   ColumnDef,
// //   ColumnFiltersState,
// //   SortingState,
// //   getCoreRowModel,
// //   getFilteredRowModel,
// //   getSortedRowModel,
// //   useReactTable,
// // } from "@tanstack/react-table";
// import React from "react";
// // import { Input } from "~/components/ui/input.tsx";
// // import {
// //   DataTableViewOptions,
// //   TanStackDataTable,
// // } from "~/components/ui/tanstack/tanstack-utils.tsx";

// // interface DataTableProps<TData, TValue> {
// //   columns: ColumnDef<TData, TValue>[];
// //   data: TData[];
// //   clientId: string;
// // }

// export function DataTable<TData, TValue>({
//   columns,
//   data,
//   clientId,
// }: DataTableProps<TData, TValue>) {
//   const navigate = useNavigate();
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     [],
//   );
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//     onColumnFiltersChange: setColumnFilters,
//     getFilteredRowModel: getFilteredRowModel(),
//     defaultColumn: {
//       minSize: 0,
//       size: Number.MAX_SAFE_INTEGER,
//       maxSize: Number.MAX_SAFE_INTEGER,
//     },
//     state: {
//       sorting,
//       columnFilters,
//     },
//   });

//   return (
//     <div>
//       <div className="flex items-center py-4 px-3">
//         {/* <Input
//           placeholder="Filter First Name..."
//           value={
//             (table.getColumn("firstName")?.getFilterValue() as string) ?? ""
//           }
//           onChange={(event) =>
//             table.getColumn("firstName")?.setFilterValue(event.target.value)
//           }
//           className="max-w-sm"
//         /> */}
//         <DataTableViewOptions table={table} />
//       </div>
//       <div>
//         <TanStackDataTable
//           table={table}
//           columns={columns}
//           onRowClick={(row) => {
//             console.log("row", row);
//             navigate(
//               `/dashboard/clients/${clientId}/records/${row.original.id}`,
//             );
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// export default DataTable;
