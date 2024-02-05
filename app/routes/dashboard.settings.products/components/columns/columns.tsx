// import { EyeOpenIcon, TrashIcon } from "@radix-ui/react-icons";
import type { ColumnModel } from "~/components/syncfusion/data-grid";
// import { Locales } from "remix-utils/locales/server";
// import type { ProductItemsType } from "~/models/product.server.ts";

export const productsColumns = () => {
  // const navigate = useNavigate();
  return [
    { field: "name", headerText: "Name", width: 100 },
    { field: "productType", headerText: "Product Type", width: 100 },
    { field: "unitOfMeasure", headerText: "Unit of Measure", width: 100 },
  ] as ColumnModel[];

  // [
  //   {
  //     meta: "Name",
  //     accessorFn: (row) => row.name,
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="Name" />
  //     ),
  //     id: "name",
  //   },
  //   {
  //     meta: "Product Type",
  //     accessorFn: (row) => row.productType,
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="Type" />
  //     ),

  //     id: "productType",
  //   },
  //   {
  //     meta: "Unit of Measure",
  //     accessorFn: (row) => row.unitOfMeasure,
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="Unit" />
  //     ),
  //     id: "unitOfMeasure",
  //     size: 100,
  //     maxSize: 100,
  //   },
  //   {
  //     meta: "Action",
  //     accessorFn: (row) => row.id, //alternate way
  //     id: "id", //id required if you use accessorFn instead of accessorKey

  //     header: "Action", //optional custom header render
  //     enableColumnFilter: false,
  //     enableSorting: false,
  //     enableGrouping: false,
  //     enableHiding: false,
  //     size: 100,
  //     maxSize: 100,
  //     cell: ({ cell }) => (
  //       <div className="flex flex-row">
  //         <Tooltip>
  //           <TooltipContent>View Client</TooltipContent>
  //           <TooltipTrigger asChild>
  //             <Button
  //               variant="outline"
  //               size="icon"
  //               onClick={() => navigate(`${cell.getValue()}`)}
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
  //       // <div className="flex">
  //       //   <IconButton
  //       //     size="small"
  //       //     icon={<EditNoteIcon.default />}
  //       //     url={`${cell.getValue<string>()}`}
  //       //     title="Edit Consent"
  //       //   />
  //       //   <Form method="post">
  //       //     <input type="hidden" name="intent" value="product-delete" />
  //       //     <input type="hidden" name="id" value={cell.getValue<string>()} />
  //       //     <IconButton
  //       //       size="small"
  //       //       icon={<DeleteOutlineIcon.default />}
  //       //       url={null}
  //       //       title="Delete Consent"
  //       //     />
  //       //   </Form>
  //       // </div>
  //     ),
  //   },
  // ];
};
