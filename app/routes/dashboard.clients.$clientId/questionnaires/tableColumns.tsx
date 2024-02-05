// import { EyeOpenIcon, TrashIcon } from "@radix-ui/react-icons";
// import { Form, useNavigate } from "@remix-run/react";
// import { ColumnDef } from "@tanstack/react-table";
// import { Locales } from "remix-utils/locales/server";
// import { Button } from "~/components/ui/button.tsx";
// import { DataTableColumnHeader } from "~/components/ui/tanstack/tanstack-utils.tsx";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "~/components/ui/tooltip.tsx";
// import type {
//   GetRecordsItemType,
//   ServiceOnRecordType,
// } from "~/models/record.server.ts";
// import { durationString } from "~/utils/strings.tsx";

// export const questionnaireColumns = (
//   clientId: string,
//   locales: Locales,
// ): ColumnDef<GetRecordsItemType>[] => {
//   const navigate = useNavigate();
//   return [
//     {
//       accessorFn: (row) => new Date(row.datetime),
//       //accessorKey: "datetime", //simple recommended way to define a column

//       meta: "Date",
//       header: ({ column }) => (
//         <DataTableColumnHeader column={column} title="Date" />
//       ),
//       id: "datetime",
//       // filterFn: "lessThanOrEqualTo",
//       sortingFn: "datetime",
//       //muiTableHeadCellProps: { sx: { color: "green" } }, //optional custom props
//       size: 100,
//       maxSize: 100,
//       cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(locales),

//       // Filter: ({ column }) => (
//       //   <DatePicker
//       //     onChange={(newValue) => {
//       //       column.setFilterValue(newValue);
//       //     }}
//       //     slotProps={{
//       //       textField: {
//       //         size: "small",
//       //         helperText: "",
//       //         sx: { minWidth: "120px" },
//       //         variant: "standard",
//       //       },
//       //     }}
//       //     value={column.getFilterValue()}
//       //   />
//       // ),
//     },
//     {
//       accessorFn: (row) => row.user, //alternate way
//       id: "user", //id required if you use accessorFn instead of accessorKey
//       // enableColumnFilterModes: false,
//       meta: "Team Member", //optional custom header render
//       header: ({ column }) => (
//         <DataTableColumnHeader column={column} title="Team Member" />
//       ),
//       size: 150,
//     },
//     {
//       accessorFn: (row) => row.location, //alternate way
//       id: "location", //id required if you use accessorFn instead of accessorKey
//       // enableColumnFilterModes: false,
//       meta: "Location",
//       header: ({ column }) => (
//         <DataTableColumnHeader column={column} title="Location" />
//       ),
//       size: 150,
//     },
//     {
//       accessorFn: (row) => row.id, //alternate way
//       id: "id", //id required if you use accessorFn instead of accessorKey
//       meta: "Action", //optional custom header render
//       header: ({ column }) => (
//         <DataTableColumnHeader column={column} title="Action" />
//       ),
//       enableColumnFilter: false,
//       enableSorting: false,
//       enableGrouping: false,
//       // enableColumnActions: false,
//       // enableColumnOrdering: false,
//       //sx: { maxWidth: 100 },
//       cell: ({ cell }) => (
//         <div className="flex">
//           <Tooltip>
//             <TooltipContent>View Client</TooltipContent>
//             <TooltipTrigger asChild>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() =>
//                   navigate(
//                     `/dashboard/client/${clientId}/bookings/${cell.getValue()}`,
//                   )
//                 }
//               >
//                 <EyeOpenIcon />
//               </Button>
//             </TooltipTrigger>
//           </Tooltip>
//           <Form method="post">
//             <input type="hidden" name="intent" value="record-delete" />
//             <input type="hidden" name="id" value={cell.getValue<string>()} />
//             <Tooltip>
//               <TooltipContent>Remove Client</TooltipContent>
//               <TooltipTrigger asChild>
//                 <Button className="ml-2" variant="outline" size="icon">
//                   <div className="text-destructive">
//                     <TrashIcon />
//                   </div>
//                 </Button>
//               </TooltipTrigger>
//             </Tooltip>
//           </Form>
//         </div>
//       ),
//       size: 100,
//       maxSize: 100,
//     },
//   ];
// };
