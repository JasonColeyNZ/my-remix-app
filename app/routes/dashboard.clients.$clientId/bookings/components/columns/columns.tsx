// import { EyeOpenIcon, TrashIcon } from "@radix-ui/react-icons";
// import type { Locales } from "remix-utils/locales/server";
import DurationColumn from "~/components/syncfusion/data-grid/columns/DurationColumn";
import type { ClientBookingItemType } from "~/models/booking.server.ts";
import ServicesColumn from "./ServicesColumn";
import AvatarColumn from "~/components/syncfusion/data-grid/columns/AvatarColumn";
import type { ColumnModel } from "~/components/syncfusion/data-grid";

// import type { EntityServicesType } from "~/models/services.server.ts";
// import { durationString } from "~/utils/strings.tsx";

export const bookingsColumns = () =>
  // navigate: any,
  // clientId: string,
  // locales: Locales,
  {
    return [
      {
        field: "startDate",
        headerText: "Start",
        width: 100,
        type: "date",
        format: "dd/MM/yy",

        // template: (props: ClientBookingItemType) => (
        //   <TimeColumn date={props.startDate} />
        // ),
      },
      {
        field: "endDate",
        headerText: "Duration",
        showColumnMenu: false,
        allowSorting: false,
        allowFiltering: false,
        width: 100,
        headerTemplate: () => <div>Duration</div>,
        filterTemplate: () => <div></div>,
        template: (props: ClientBookingItemType) => (
          <DurationColumn start={props.startDate} end={props.endDate} />
        ),
      },
      {
        field: "services",
        headerText: "Services",
        filter: {
          operator: "like",
          params: { ignoreAccent: true }, //still not working....
        },
        type: "string",
        template: (props: ClientBookingItemType) => (
          <ServicesColumn services={props.services} />
        ),
      },
      {
        field: "user",
        headerText: "Team Member",
        width: 100,
        template: (props: ClientBookingItemType) => (
          <AvatarColumn
            firstName={props.user.firstName}
            lastName={props.user.lastName}
            avatarData={props.user.avatarData}
          />
        ),
      },
    ] as ColumnModel[];
    // [
    //   {
    //     accessorFn: (row) => new Date(row.startDate),
    //     meta: "Date",
    //     header: ({ column }) => (
    //       <DataTableColumnHeader column={column} title="Date" />
    //     ),
    //     id: "startDate",
    //     size: 100,
    //     cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(locales),
    //   },
    //   {
    //     accessorFn: (row) => new Date(row.startDate),
    //     meta: "Time",
    //     header: ({ column }) => (
    //       <DataTableColumnHeader column={column} title="Time" />
    //     ),
    //     id: "endDate",
    //     size: 100,
    //     cell: ({ cell }) => cell.getValue<Date>()?.toLocaleTimeString(locales),
    //   },
    //   {
    //     accessorFn: (row) => new Date(row.startDate),
    //     meta: "Duration",
    //     header: ({ column }) => (
    //       <DataTableColumnHeader column={column} title="Duration" />
    //     ),
    //     id: "duration",
    //     size: 100,
    //     cell: ({ cell }) =>
    //       appointmentDuration(
    //         cell.row.original.startDate,
    //         cell.row.original.endDate,
    //       ),
    //   },
    //   {
    //     accessorFn: (row) => row.user, //alternate way
    //     id: "user", //id required if you use accessorFn instead of accessorKey
    //     header: ({ column }) => (
    //       <DataTableColumnHeader column={column} title="Team Member" />
    //     ),
    //     meta: "Team Member", //optional custom header render
    //     cell: ({ cell }) => (
    //       <Avatar>
    //         {cell.row.original.user.avatarData &&
    //           (cell.row.original.user.avatarData as ImageUploadDataType)
    //             .publicUrl && (
    //             <AvatarImage
    //               alt={`${cell.row.original.user.firstName} ${cell.row.getValue(
    //                 "lastName",
    //               )}`}
    //               src={
    //                 `${(cell.getValue() as ImageUploadDataType).publicUrl}` ?? ""
    //               }
    //             />
    //           )}
    //         <AvatarFallback>
    //           {userInitials(
    //             cell.row.original.user.firstName,
    //             cell.row.original.user.lastName,
    //           )}
    //         </AvatarFallback>
    //       </Avatar>
    //     ),

    //     size: 150,
    //   },
    //   // {
    //   //   accessorFn: (row) => row.location, //alternate way
    //   //   id: "location", //id required if you use accessorFn instead of accessorKey
    //   //   enableColumnFilterModes: false,
    //   //   header: "Location", //optional custom header render
    //   //   size: 150,
    //   // },
    //   // {
    //   //   accessorFn: (row) => row.services, //alternate way
    //   //   id: "services", //id required if you use accessorFn instead of accessorKey
    //   //   header: "Services", //optional custom header render
    //   //   filterVariant: "multi-select",
    //   //   enableColumnFilterModes: false,
    //   //   filterSelectOptions: serviceItems,
    //   //   filterFn: (row, id, filterValue) => {
    //   //     if (filterValue.length === 0) return true;
    //   //     const value = row.getValue(id);
    //   //     if (Array.isArray(value) && Array.isArray(filterValue)) {
    //   //       for (let i = 0; i < filterValue.length; i++) {
    //   //         if (value.includes(filterValue[i])) {
    //   //           return true;
    //   //         }
    //   //       }
    //   //     }
    //   //     return false;
    //   //   },
    //   //   enableGrouping: false,
    //   //   Cell: ({ cell }) => (
    //   //     <div
    //   //       display="flex"
    //   //       flexDirection={"row"}
    //   //       flexWrap={"wrap"}
    //   //       sx={{ "& :not(:last-child)": { mb: 0.5 } }}
    //   //     >
    //   //       {cell.getValue<ServiceOnRecordType[]>().map((service) => (
    //   //         <Chip
    //   //           size="small"
    //   //           key={service.id}
    //   //           label={
    //   //             services.filter((_service) => _service.id === service.id)?.[0]
    //   //               ?.name || ""
    //   //           }
    //   //           sx={[
    //   //             {
    //   //               mr: 0.5,
    //   //               backgroundColor: service.color,
    //   //               "& span": {
    //   //                 color: service.color,
    //   //                 //"invert(100%)",
    //   //                 filter:
    //   //                   "saturate(0) grayscale(1) brightness(0.2) contrast(100%) invert(1)",
    //   //               },
    //   //             },
    //   //           ]}
    //   //         />
    //   //       ))}
    //   //     </div>
    //   //   ),
    //   // },
    //   // {
    //   //   accessorFn: (row) => row.totalCost, //alternate way
    //   //   id: "totalCost", //id required if you use accessorFn instead of accessorKey
    //   //   header: "Cost", //optional custom header render
    //   //   enableColumnFilter: false,
    //   //   enableGrouping: false,
    //   //   enableColumnOrdering: false,
    //   //   muiTableHeadCellProps: {
    //   //     sx: { "& .Mui-TableHeadCell-Content": { justifyContent: "end" } },
    //   //   },
    //   //   Cell: ({ cell }) => {
    //   //     return (
    //   //       <div sx={{ textAlign: "right", pr: 1 }}>
    //   //         {cell.getValue<number>()}
    //   //       </div>
    //   //     );
    //   //   },
    //   //   size: 150,
    //   // },
    //   // {
    //   //   accessorFn: (row) => row.totalDuration, //alternate way
    //   //   id: "totalDuration", //id required if you use accessorFn instead of accessorKey
    //   //   header: "Duration", //optional custom header render
    //   //   enableColumnFilter: false,
    //   //   enableGrouping: false,
    //   //   enableColumnOrdering: false,
    //   //   aggregationFn: "sum",
    //   //   muiTableHeadCellProps: {
    //   //     sx: { "& .Mui-TableHeadCell-Content": { justifyContent: "end" } },
    //   //   },
    //   //   Cell: ({ cell }) => {
    //   //     return (
    //   //       <div sx={{ textAlign: "right", pr: 1 }}>
    //   //         {durationString(cell.getValue<number>())}
    //   //       </div>
    //   //     );
    //   //   },
    //   //   size: 150,
    //   // },
    //   {
    //     accessorFn: (row) => row.id, //alternate way
    //     id: "id", //id required if you use accessorFn instead of accessorKey
    //     meta: "Action", //optional custom header render
    //     header: ({ column }) => (
    //       <DataTableColumnHeader column={column} title="Action" />
    //     ),
    //     enableColumnFilter: false,
    //     enableSorting: false,
    //     enableGrouping: false,
    //     cell: ({ cell }) => (
    //       <div className="flex">
    //         <Tooltip>
    //           <TooltipContent>View Client</TooltipContent>
    //           <TooltipTrigger asChild>
    //             <Button
    //               variant="outline"
    //               size="icon"
    //               onClick={() =>
    //                 navigate(
    //                   `/dashboard/client/${clientId}/bookings/${cell.getValue()}`,
    //                 )
    //               }
    //             >
    //               <EyeOpenIcon />
    //             </Button>
    //           </TooltipTrigger>
    //         </Tooltip>
    //         <Form method="post">
    //           <input type="hidden" name="intent" value="record-delete" />
    //           <input type="hidden" name="id" value={cell.getValue<string>()} />
    //           <Tooltip>
    //             <TooltipContent>Remove Client</TooltipContent>
    //             <TooltipTrigger asChild>
    //               <Button className="ml-2" variant="outline" size="icon">
    //                 <div className="text-destructive">
    //                   <TrashIcon />
    //                 </div>
    //               </Button>
    //             </TooltipTrigger>
    //           </Tooltip>
    //         </Form>
    //       </div>
    //     ),
    //     // size: 100,
    //   },
    // ];
  };
