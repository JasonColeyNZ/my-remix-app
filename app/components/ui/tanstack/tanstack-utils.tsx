// import {
//   ArrowDownIcon,
//   ArrowUpIcon,
//   CaretSortIcon,
//   EyeNoneIcon,
//   MixerHorizontalIcon,
// } from "@radix-ui/react-icons";
// import type {
//   Column,
//   ColumnFiltersState,
//   Table as ReactTable,
//   SortingState,
//   Table as TanStackTableType,
// } from "@tanstack/react-table";
// import { flexRender } from "@tanstack/react-table";
// import { useEffect, useState } from "react";
// import {
//   MdOutlineFilterList,
//   MdOutlineFirstPage,
//   MdOutlineLastPage,
//   MdOutlineNavigateBefore,
//   MdOutlineNavigateNext,
// } from "react-icons/md/index.js";
// import TableEmptySVG from "~/assets/table-empty.tsx";
// import { cn } from "~/utils/shadcn.utils.ts";

// import { Button } from "../button.tsx";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../drop-down-menu.tsx";
// import { Input } from "../input.tsx";
// import { Separator } from "../separator.tsx";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../table.tsx";

// // type Limit = 10 | 25 | 50 | 100 | 250;

// interface DataTableColumnHeaderProps<TData, TValue>
//   extends React.HTMLAttributes<HTMLDivElement> {
//   column: Column<TData, TValue>;
//   title: string;
// }

// export function DataTableColumnHeader<TData, TValue>({
//   column,
//   title,
//   className,
// }: DataTableColumnHeaderProps<TData, TValue>) {
//   if (!column.getCanSort()) {
//     return (
//       <div className={cn("text-center text-xs font-medium", className)}>
//         {title}
//       </div>
//     );
//   }

//   return (
//     <div className={cn("flex items-center space-x-2", className)}>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant="ghost"
//             size="sm"
//             className="-ml-3 h-8 data-[state=open]:bg-accent"
//           >
//             <span>{title}</span>
//             {column.getIsSorted() === "desc" ? (
//               <ArrowDownIcon className="ml-2 h-4 w-4" />
//             ) : column.getIsSorted() === "asc" ? (
//               <ArrowUpIcon className="ml-2 h-4 w-4" />
//             ) : (
//               <CaretSortIcon className="ml-2 h-4 w-4" />
//             )}
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="start">
//           <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
//             <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
//             Asc
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
//             <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
//             Desc
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
//             <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
//             Hide
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// }

// interface DataTableViewOptionsProps<TData> {
//   table: TanStackTableType<TData>;
// }

// export function DataTablePaginationOptions<TData>({
//   table,
// }: DataTableViewOptionsProps<TData>) {
//   return (
//     <div className="flex items-center gap-2 ml-auto mr-4 my-2 text-xs font-normal">
//       <Button
//         className="p-1 h-6 text-primary rounded-none bg-white hover:text-white hover:bg-primary-10"
//         onClick={() => table.setPageIndex(0)}
//         disabled={!table.getCanPreviousPage()}
//       >
//         <MdOutlineFirstPage />
//       </Button>
//       <Button
//         className="p-1 h-6 text-primary rounded-none bg-white hover:text-white hover:bg-primary-10"
//         onClick={() => table.previousPage()}
//         disabled={!table.getCanPreviousPage()}
//       >
//         <MdOutlineNavigateBefore />
//       </Button>
//       <span className="flex items-center gap-1">
//         <div>Page</div>
//         <strong>
//           {table.getState().pagination.pageIndex + 1} of{" "}
//           {table.getPageCount() === 0 ? 1 : table.getPageCount()}
//         </strong>
//       </span>
//       <Button
//         className="p-1 h-6 text-primary rounded-none bg-white hover:text-white hover:bg-primary-10"
//         onClick={() => table.nextPage()}
//         disabled={!table.getCanNextPage()}
//       >
//         <MdOutlineNavigateNext />
//       </Button>
//       <Button
//         className="p-1 h-6 text-primary rounded-none bg-white hover:text-white hover:bg-primary-10"
//         onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//         disabled={!table.getCanNextPage()}
//       >
//         <MdOutlineLastPage />
//       </Button>
//       <span className="flex items-center gap-1 whitespace-nowrap">
//         Go to page:
//         <Input
//           name="pageIndex"
//           type="text"
//           defaultValue={table.getState().pagination.pageIndex + 1}
//           onChange={(e) => {
//             const page = e.target.value ? Number(e.target.value) - 1 : 0;
//             table.setPageIndex(page);
//           }}
//           className="w-14 py-0 h-6 px-1"
//         />
//       </span>
//       <select
//         name="pageSizeSelect"
//         value={table.getState().pagination.pageSize}
//         onChange={(e) => {
//           table.setPageSize(Number(e.target.value));
//         }}
//       >
//         {[10, 15, 20, 30, 40, 50].map((pageSize) => (
//           <option key={pageSize} value={pageSize}>
//             Rows per page: {pageSize}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// export function DataTableViewOptions<TData>({
//   table,
// }: DataTableViewOptionsProps<TData>) {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" size="sm" className="hidden h-8 lg:flex">
//           <MixerHorizontalIcon className="mr-2 h-4 w-4" />
//           View
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         {table
//           .getAllColumns()
//           .filter(
//             (column) =>
//               typeof column.accessorFn !== "undefined" && column.getCanHide(),
//           )
//           .map((column) => {
//             // console.log("column", column);
//             return (
//               <DropdownMenuCheckboxItem
//                 key={column.id}
//                 className="capitalize whitespace-nowrap"
//                 checked={column.getIsVisible()}
//                 onCheckedChange={(value) => column.toggleVisibility(!!value)}
//               >
//                 {column.columnDef.meta?.toString() ?? column.id}
//               </DropdownMenuCheckboxItem>
//             );
//           })}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

// export function DataTableShowFilters({
//   showColumnFilters,
//   setShowColumnFilters,
// }: {
//   setShowColumnFilters: (showColumnFilters: boolean) => void;
//   showColumnFilters: boolean;
// }) {
//   return (
//     <Button
//       variant="outline"
//       size="sm"
//       className={cn("hidden h-8 lg:flex ", showColumnFilters && "bg-accent")}
//       onClick={() => setShowColumnFilters(!showColumnFilters)}
//     >
//       <MdOutlineFilterList className="mr-2 h-4 w-4" />
//       Filters
//     </Button>
//   );
// }

// const getColumnWidth = (size: number | undefined) => {
//   if (!size) {
//     return "unset";
//   }
//   return size !== Number.MAX_SAFE_INTEGER ? size : "unset";
// };

// interface TanStackTableProps<TData> {
//   table: TanStackTableType<TData>;
//   columns: any[];
//   onRowClick: (row: any) => void;
//   showFilters?: boolean;
// }

// export function TanStackDataTable<TData>({
//   table,
//   columns,
//   onRowClick,
//   showFilters,
// }: TanStackTableProps<TData>) {
//   return (
//     <Table
//       className={
//         table.getPaginationRowModel().rows?.length === 0 ? "h-full" : ""
//       }
//     >
//       <TableHeader className="[&_tr]:border-0">
//         {table.getHeaderGroups().map((headerGroup) => (
//           <TableRow key={headerGroup.id}>
//             {headerGroup.headers.map((header) => {
//               return (
//                 <TableHead
//                   key={header.id}
//                   className={cn(
//                     "sticky z-10 bg-header h-9 px-0",
//                     showFilters && "h-14",
//                   )}
//                   style={{
//                     top: 0,
//                     width: getColumnWidth(header.column.columnDef.size),
//                     maxWidth: getColumnWidth(header.column.columnDef.maxSize),
//                   }}
//                 >
//                   <div
//                     className={cn("flex h-9 m-auto items-center [&_div]:pl-2")}
//                   >
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext(),
//                         )}
//                   </div>
//                   {showFilters &&
//                     (header.column.getCanFilter() ? (
//                       <Filter column={header.column} table={table} />
//                     ) : (
//                       <div className="h-6" />
//                     ))}
//                   <Separator />
//                 </TableHead>
//               );
//             })}
//           </TableRow>
//         ))}
//       </TableHeader>
//       <TableBody
//         className={
//           table.getPaginationRowModel().rows?.length === 0
//             ? ""
//             : "[&_tr:last-child]:border-1"
//         }
//       >
//         {table.getPaginationRowModel().rows?.length ? (
//           table.getPaginationRowModel().rows.map((row) => (
//             <TableRow
//               key={row.id}
//               data-state={row.getIsSelected() && "selected"}
//               onClick={() => onRowClick(row)}
//               className="max-h-24"
//             >
//               {row.getVisibleCells().map((cell) => (
//                 <TableCell
//                   key={cell.id}
//                   className="cursor-pointer"
//                   style={{
//                     width: getColumnWidth(cell.column.columnDef.size),
//                     maxWidth: getColumnWidth(cell.column.columnDef.maxSize),
//                   }}
//                 >
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </TableCell>
//               ))}
//             </TableRow>
//           ))
//         ) : (
//           <TableRow className="hover:bg-unset">
//             <TableCell colSpan={columns.length} className="text-center">
//               <div className="flex flex-col flex-1 mx-auto h-full">
//                 <TableEmptySVG label="No Data" />
//               </div>
//             </TableCell>
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   );
// }

// function Filter({
//   column,
//   table,
// }: {
//   column: Column<any, any>;
//   table: ReactTable<any>;
// }) {
//   const firstValue = table
//     .getPreFilteredRowModel()
//     .flatRows[0]?.getValue(column.id);

//   const columnFilterValue = column.getFilterValue();

//   return typeof firstValue === "number" ? (
//     <div className="flex space-x-2">
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[0] ?? ""}
//         onChange={(e) =>
//           column.setFilterValue((old: [number, number]) => [
//             e.target.value,
//             old?.[1],
//           ])
//         }
//         placeholder={`Min`}
//         className="w-24 border shadow rounded"
//       />
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[1] ?? ""}
//         onChange={(e) =>
//           column.setFilterValue((old: [number, number]) => [
//             old?.[0],
//             e.target.value,
//           ])
//         }
//         placeholder={`Max`}
//         className="w-24 border shadow rounded"
//       />
//     </div>
//   ) : (
//     <Input
//       type="text"
//       value={(columnFilterValue ?? "") as string}
//       onChange={(e) => column.setFilterValue(e.target.value)}
//       placeholder={`Search ${column.columnDef.meta}...`}
//       className="font-light text-xs h-6 w-full border-0 rounded-none shadow-none bg-primary-2"
//     />
//   );
// }

// export function useTableStateManagement({
//   tableDefaults,
//   tableArea,
// }: {
//   tableDefaults: any;
//   tableArea: string;
// }) {
//   const [showColumnFilters, setShowColumnFilters] = useState(
//     tableDefaults.showColumnFilters ?? false,
//   );
//   const [sorting, setSorting] = useState<SortingState>(
//     tableDefaults.sorting ?? [],
//   );
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
//     tableDefaults.columnFiltering ?? [],
//   );

//   // const fetcher = useFetcher();
//   // const { submit } = fetcher;

//   useEffect(() => {
//     //send data to new resources route
//     // if (state === "submitting") return;
//     if (
//       sorting === tableDefaults.sorting &&
//       showColumnFilters === tableDefaults.showColumnFilters &&
//       columnFilters === tableDefaults.columnFiltering
//     )
//       return;

//     fetch("/services/tablestate", {
//       body: new URLSearchParams({
//         table: tableArea,
//         sorting: JSON.stringify(sorting),
//         showColumnFilters: JSON.stringify(showColumnFilters),
//         columnFiltering: JSON.stringify(columnFilters),
//       }).toString(),
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       method: "POST",
//     });
//   }, [
//     sorting,
//     showColumnFilters,
//     columnFilters,
//     tableDefaults.sorting,
//     tableDefaults.showColumnFilters,
//     tableDefaults.columnFiltering,
//     tableArea,
//   ]);

//   return {
//     showColumnFilters,
//     setShowColumnFilters,
//     sorting,
//     setSorting,
//     columnFilters,
//     setColumnFilters,
//   };
// }
