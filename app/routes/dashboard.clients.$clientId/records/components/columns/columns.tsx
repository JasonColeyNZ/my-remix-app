// import { EyeOpenIcon, TrashIcon } from "@radix-ui/react-icons";
import type { ColumnModel } from "~/components/syncfusion/data-grid";
import AvatarColumn from "~/components/syncfusion/data-grid/columns/AvatarColumn";
import type {
  GetRecordsItemType,
  // ServiceOnRecordType,
} from "~/models/record.server.ts";
// import type { EntityServicesType } from "~/models/services.server.ts";

export const recordsColumns = () =>
  // navigate: any,
  // serviceItems: {
  //   text: string;
  //   value: any;
  // }[],
  // services: EntityServicesType[],
  // clientId: string,
  // locales: Locales,
  {
    return [
      {
        field: "datetime",
        headerText: "Created",
        width: 100,
        type: "date",
        format: "dd/MM/yy",

        // template: (props: ClientBookingItemType) => (
        //   <TimeColumn date={props.startDate} />
        // ),
      },
      {
        field: "location",
        headerText: "Location",
        //   showColumnMenu: false,
        //   allowSorting: false,
        //   allowFiltering: false,
        //   width: 100,
        //   headerTemplate: () => <div>Duration</div>,
        //   filterTemplate: () => <div></div>,
        //   template: (props: ClientBookingItemType) => (
        //     <DurationColumn start={props.startDate} end={props.endDate} />
        //   ),
      },
      {
        field: "user",
        headerText: "Team Member",
        width: 100,
        template: (props: GetRecordsItemType) => (
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
    //     accessorFn: (row) => new Date(row.datetime),
    //     //accessorKey: "datetime", //simple recommended way to define a column

    //     meta: "Date",
    //     header: ({ column }) => (
    //       <DataTableColumnHeader column={column} title="Date" />
    //     ),
    //     id: "datetime",
    //     // filterFn: "lessThanOrEqualTo",
    //     sortingFn: "datetime",
    //     //muiTableHeadCellProps: { sx: { color: "green" } }, //optional custom props
    //     size: 100,
    //     maxSize: 100,
    //     cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(locales),

    //     // Filter: ({ column }) => (
    //     //   <DatePicker
    //     //     onChange={(newValue) => {
    //     //       column.setFilterValue(newValue);
    //     //     }}
    //     //     slotProps={{
    //     //       textField: {
    //     //         size: "small",
    //     //         helperText: "",
    //     //         sx: { minWidth: "120px" },
    //     //         variant: "standard",
    //     //       },
    //     //     }}
    //     //     value={column.getFilterValue()}
    //     //   />
    //     // ),
    //   },
    //   {
    //     accessorFn: (row) => row.user, //alternate way
    //     id: "user", //id required if you use accessorFn instead of accessorKey
    //     // enableColumnFilterModes: false,
    //     meta: "Team Member", //optional custom header render
    //     header: ({ column }) => (
    //       <DataTableColumnHeader column={column} title="Team Member" />
    //     ),
    //     size: 150,
    //   },
    //   {
    //     accessorFn: (row) => row.location, //alternate way
    //     id: "location", //id required if you use accessorFn instead of accessorKey
    //     // enableColumnFilterModes: false,
    //     meta: "Location",
    //     header: ({ column }) => (
    //       <DataTableColumnHeader column={column} title="Location" />
    //     ),
    //     size: 150,
    //   },
    //   {
    //     accessorFn: (row) => row.services, //alternate way
    //     id: "services", //id required if you use accessorFn instead of accessorKey
    //     meta: "Services", //optional custom header render
    //     header: ({ column }) => (
    //       <DataTableColumnHeader column={column} title="Services" />
    //     ),
    //     // filterVariant: "multi-select",
    //     // enableColumnFilterModes: false,
    //     // filterSelectOptions: serviceItems,
    //     // filterFn: (row, id, filterValue) => {
    //     //   if (filterValue.length === 0) return true;
    //     //   const value = row.getValue(id);
    //     //   if (Array.isArray(value) && Array.isArray(filterValue)) {
    //     //     for (let i = 0; i < filterValue.length; i++) {
    //     //       if (value.includes(filterValue[i])) {
    //     //         return true;
    //     //       }
    //     //     }
    //     //   }
    //     //   return false;
    //     // },
    //     enableGrouping: false,
    //     cell: ({ cell }) => (
    //       <div
    //         className="flex flex-row flex-wrap"
    //         // sx={{ "& :not(:last-child)": { mb: 0.5 } }}
    //       >
    //         {cell.getValue<ServiceOnRecordType[]>().map((service) => (
    //           <></>
    //           // <Chip
    //           //   size="small"
    //           //   key={service.id}
    //           //   label={
    //           //     services.filter((_service) => _service.id === service.id)?.[0]
    //           //       ?.name || ""
    //           //   }
    //           //   sx={[
    //           //     {
    //           //       mr: 0.5,
    //           //       backgroundColor: service.color,
    //           //       "& span": {
    //           //         color: service.color,
    //           //         //"invert(100%)",
    //           //         filter:
    //           //           "saturate(0) grayscale(1) brightness(0.2) contrast(100%) invert(1)",
    //           //       },
    //           //     },
    //           //   ]}
    //           // />
    //         ))}
    //       </div>
    //     ),
    //   },
    //   {
    //     accessorFn: (row) => row.totalCost, //alternate way
    //     id: "totalCost", //id required if you use accessorFn instead of accessorKey
    //     meta: "Cost", //optional custom header render
    //     header: ({ column }) => (
    //       <DataTableColumnHeader column={column} title="Cost" />
    //     ),
    //     enableColumnFilter: false,
    //     enableGrouping: false,
    //     // enableColumnOrdering: false,
    //     cell: ({ cell }) => {
    //       return (
    //         <div
    //           className="align-right pr-1"
    //           // sx={{ textAlign: "right", pr: 1 }}
    //         >
    //           {cell.getValue<number>()}
    //         </div>
    //       );
    //     },
    //     size: 150,
    //     maxSize: 150,
    //   },
    //   {
    //     accessorFn: (row) => row.totalDuration, //alternate way
    //     id: "totalDuration", //id required if you use accessorFn instead of accessorKey
    //     meta: "Duration", //optional custom header render
    //     header: ({ column }) => (
    //       <DataTableColumnHeader column={column} title="Duration" />
    //     ),
    //     enableColumnFilter: false,
    //     enableGrouping: false,
    //     // enableColumnOrdering: false,
    //     aggregationFn: "sum",
    //     cell: ({ cell }) => {
    //       return (
    //         <div className="align-right pr-1">
    //           {durationString(cell.getValue<number>())}
    //         </div>
    //       );
    //     },
    //     size: 150,
    //     maxSize: 150,
    //   },
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
    //     // enableColumnActions: false,
    //     // enableColumnOrdering: false,
    //     //sx: { maxWidth: 100 },
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
    //                   `/dashboard/client/${clientId}/records/${cell.getValue()}`,
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
    //     size: 100,
    //     maxSize: 100,
    //   },
    // ];
  };
