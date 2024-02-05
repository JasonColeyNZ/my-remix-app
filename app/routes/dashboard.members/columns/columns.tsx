import AvatarColumn from "~/components/syncfusion/data-grid/columns/AvatarColumn";
import type { GetUserItemsType } from "~/models/user.server.ts";
import ContactColumn from "./ContactColumn";
import type { ColumnModel } from "~/components/syncfusion/data-grid";
import RoleColumn from "./RoleColumn";

export const usersColumns = () => {
  return [
    {
      field: "id",
      headerText: "Avatar",
      headerTemplate: () => <div></div>,
      width: 50,
      filterTemplate: () => <div></div>,
      template: (props: GetUserItemsType) => (
        <AvatarColumn
          firstName={props.firstName}
          lastName={props.lastName}
          avatarData={props.avatarData}
        />
      ),
      allowFiltering: false,
      allowSorting: false,
      allowEditing: false,
      allowResizing: false,
      showColumnMenu: false,
      filterBarTemplate: () => null,
    },
    { field: "firstName", headerText: "First", width: 100 },
    { field: "lastName", headerText: "Last", width: 100 },
    {
      field: "email",
      headerText: "Email",
      template: (props: any) => <ContactColumn props={props} />,
    },
    {
      field: "role.name",
      headerText: "Role",
      width: "140",
      template: (props: any) => <RoleColumn props={props} />,
    },
  ] as ColumnModel[];
  // [
  //   {
  //     accessorFn: (row) => row.avatarData,
  //     header: "",
  //     id: "avatarData",
  //     cell: ({ cell }) => (
  //       <Avatar>
  //         {(cell.getValue() as ImageUploadDataType).publicUrl && (
  //           <AvatarImage
  //             alt={`${cell.row.getValue("firstName")} ${cell.row.getValue(
  //               "lastName",
  //             )}`}
  //             src={
  //               `${(cell.getValue() as ImageUploadDataType).publicUrl}` ?? ""
  //             }
  //           />
  //         )}
  //         <AvatarFallback>
  //           {userInitials(
  //             cell.row.getValue("firstName"),
  //             cell.row.getValue("lastName"),
  //           )}
  //         </AvatarFallback>
  //       </Avatar>
  //     ),
  //     size: 40,
  //     // enableColumnDragging: false,
  //     enableColumnFilter: false,
  //     // enableColumnOrdering: false,
  //     // enableColumnActions: false,
  //   },
  //   {
  //     accessorFn: (row) => row.firstName,
  //     header: "First Name",
  //     id: "firstName",
  //   },
  //   {
  //     accessorFn: (row) => row.lastName,
  //     header: "Last Name",
  //     id: "lastName",
  //   },
  //   {
  //     accessorFn: (row) => row.email,
  //     header: "Email",
  //     id: "email",
  //   },
  //   {
  //     accessorFn: (row) => row.id, //alternate way
  //     id: "id", //id required if you use accessorFn instead of accessorKey
  //     header: "Action", //optional custom header render
  //     enableColumnFilter: false,
  //     enableSorting: false,
  //     enableGrouping: false,
  //     // enableColumnActions: false,
  //     // enableColumnOrdering: false,
  //     //sx: { maxWidth: 100 },
  //     // muiTableHeadCellProps: {
  //     //   sx: { "& .Mui-TableHeadCell-Content": { justifyContent: "center" } },
  //     // },
  //     cell: ({ cell }) => (
  //       <div className="flex">
  //         <Tooltip>
  //           <TooltipContent>View Client</TooltipContent>
  //           <TooltipTrigger asChild>
  //             <Button
  //               variant="outline"
  //               size="icon"
  //               onClick={() => navigate(`/dashboard/client/${cell.getValue()}`)}
  //             >
  //               <EyeOpenIcon />
  //             </Button>
  //           </TooltipTrigger>
  //         </Tooltip>
  //         <Form method="post">
  //           <input type="hidden" name="intent" value="client-delete" />
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
  //     minSize: 100,
  //   },
  // ];
};
