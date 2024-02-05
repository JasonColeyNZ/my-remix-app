// import { EyeOpenIcon, TrashIcon } from "@radix-ui/react-icons";
// import type { Locales } from "remix-utils/locales/server";
import type { ColumnModel } from "~/components/syncfusion/data-grid";
import AvatarColumn from "~/components/syncfusion/data-grid/columns/AvatarColumn";
import type { MessageItemType } from "~/models/message.server.ts";

export const messagesColumns = () =>
  // navigate: any,
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
        field: "title",
        headerText: "Title",
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
        template: (props: MessageItemType) => (
          <AvatarColumn
            firstName={props.creator.firstName}
            lastName={props.creator.lastName}
            avatarData={props.creator.avatarData}
          />
        ),
      },
    ] as ColumnModel[];
    // [
    //   {
    //     accessorFn: (row) => new Date(row.datetime),
    //     meta: "Date",
    //     header: ({ column }) => (
    //       <DataTableColumnHeader column={column} title="Date" />
    //     ),
    //     id: "datetime",
    //     //muiTableHeadCellProps: { sx: { color: "green" } }, //optional custom props
    //     size: 100,
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
    //     accessorFn: (row) => row.subject,
    //     meta: "Subject",
    //     header: ({ column }) => (
    //       <DataTableColumnHeader column={column} title="Subject" />
    //     ),
    //     id: "subject",
    //     size: 600,
    //   },
    //   // {
    //   //   accessorFn: (row) => row.user, //alternate way
    //   //   id: "user", //id required if you use accessorFn instead of accessorKey
    //   //   enableColumnFilterModes: false,
    //   //   header: "Team Member", //optional custom header render
    //   //   //Cell: ({ cell }) => cell.getValue<number>(),
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
    //                   `/dashboard/client/${clientId}/messages/${cell.getValue()}`,
    //                 )
    //               }
    //             >
    //               <EyeOpenIcon />
    //             </Button>
    //           </TooltipTrigger>
    //         </Tooltip>
    //         <Form method="post">
    //           <input type="hidden" name="intent" value="message-delete" />
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
    //   },
    // ];
  };
