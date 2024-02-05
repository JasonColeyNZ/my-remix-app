// import { EyeOpenIcon } from "@radix-ui/react-icons";
import type { ColumnModel } from "~/components/syncfusion/data-grid";
import AvatarColumn from "~/components/syncfusion/data-grid/columns/AvatarColumn";
import type { GetNotesItemType } from "~/models/note.server.ts";

// interface NotesColumnsProps {
//   locales: Locales;
//   viewClick: (noteId: string) => void;
// }

export const NotesColumns = () =>
  // props: NotesColumnsProps,
  // ref: ForwardedRef<any>,
  {
    // const { locales, viewClick } = props;

    // Existing code...
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
        template: (props: GetNotesItemType) => (
          <AvatarColumn
            firstName={props.creator.firstName}
            lastName={props.creator.lastName}
            avatarData={props.creator.avatarData}
          />
        ),
      },
    ] as ColumnModel[];

    //   {
    //     accessorFn: (row) => new Date(row.datetime),
    //     meta: "Created Date",
    //     header: ({ column }) => (
    //       <DataTableColumnHeader column={column} title="Created" />
    //     ),
    //     id: "datetime",
    //     size: 100,
    //     maxSize: 100,
    //     cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(locales),
    //   },
    //   {
    //     accessorFn: (row) => row.title,
    //     meta: "Title",
    //     header: ({ column }) => (
    //       <DataTableColumnHeader column={column} title="Title" />
    //     ),
    //     id: "title",
    //     size: 600,
    //   },
    //   {
    //     accessorFn: (row) => row.creator, //alternate way
    //     id: "creator", //id required if you use accessorFn instead of accessorKey
    //     // enableColumnFilterModes: false,
    //     meta: "Team Member", //optional custom header render
    //     enableSorting: false,
    //     header: ({ column }) => (
    //       <DataTableColumnHeader column={column} title="Team Member" />
    //     ),
    //     cell: ({ cell }) => {
    //       return (
    //         <Avatar className="mx-auto">
    //           <AvatarFallback>
    //             {userInitials(cell.getValue<string>())}
    //           </AvatarFallback>
    //         </Avatar>
    //       );
    //     },
    //     size: 100,
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
    //     cell: ({ cell }) => (
    //       <div className="flex">
    //         <Tooltip>
    //           <TooltipContent>View Client</TooltipContent>
    //           <TooltipTrigger asChild>
    //             <Button
    //               variant="outline"
    //               size="icon"
    //               onClick={() => viewClick(cell.getValue<string>())}
    //             >
    //               <EyeOpenIcon />
    //             </Button>
    //           </TooltipTrigger>
    //         </Tooltip>
    //         <Form method="post" ref={ref}>
    //           <input type="hidden" name="intent" value="note-delete" />
    //           <input type="hidden" name="id" value={cell.getValue<string>()} />
    //           <PopoverDeleteButton
    //             onSubmit={() => {
    //               //@ts-expect-error
    //               ref && ref.current && ref.current?.submit();
    //             }}
    //             confirmText={`Are you sure you want to delete the Note <span class="text-primary text-medium">${cell.row.original.title}</span>?`}
    //           />
    //         </Form>
    //       </div>
    //     ),
    //     size: 100,
    //     maxSize: 100,
    //   },
    // ];
  };
