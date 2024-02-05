import { useMemo } from "react";
import DataGrid from "~/components/syncfusion/data-grid/DataGrid";
import { productsColumns } from "./columns/columns";
import type { loader } from "../route";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";

const ProductsDataGrid = () => {
  const { products } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const columns = useMemo(() => {
    return productsColumns();
  }, []);

  const toolbarClickHandler = (args: any) => {
    if (args.item.id === "add-product") {
      navigate("new");
      console.log("add-product");
      //don't do anything as the button opens the sheet
    }
  };

  return (
    <DataGrid
      data={products}
      columns={columns}
      toolbarClickHandler={toolbarClickHandler}
      headerButtons={[
        { text: "Print", tooltipText: "Print", prefixIcon: "e-print" },
        {
          text: "Add Product",
          id: "add-product",
          align: "Right",
          type: "Input",
          template: () => {
            return (
              <Button
                variant="success"
                className="uppercase font-light text-xs h-7"
              >
                Add Product
              </Button>
            );
          },
        },
        {
          text: "Search",
          tooltipText: "Search",
          prefixIcon: "e-search",
          align: "Right",
        },
      ]}
      recordClick={(args: any) => {
        //     // console.log("recordClick", args);
        if (!args.rowData) return; //cell click has no data object
        navigate(`/dashboard/settings/products/${args.rowData.id}`, {
          replace: true,
        });
      }}
    />
  );
};

export default ProductsDataGrid;
