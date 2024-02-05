import { Button } from "~/components/ui/button.tsx";
import {
  MdAddCircle,
  MdOutlineClose,
  MdOutlineSearch,
} from "react-icons/md/index.js";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet.tsx";
import { useCallback, useRef, useState } from "react";
import type { FieldOptionType } from "~/components/draggable-forms-editor/types";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/utils/shadcn.utils";
// import type { ProductOnServiceType } from "~/utils/types";
import { Input } from "~/components/ui/input";
import type { ProductSchemaType } from "./productSchema";
import { useField } from "@conform-to/react";

interface AddProductProps {
  allProducts: FieldOptionType[] | undefined;
  fieldName: string;
  // selectedProducts: ({
  //   key: string;
  // } & FieldName<ProductOnServiceType>)[];
  // prop: FieldName<ProductSchemaType[]>;
}

const AddProduct = ({
  allProducts,
  fieldName, // prop, // selectedProducts,
}: AddProductProps) => {
  const [productsList, setProductsList] = useState<
    FieldOptionType[] | undefined
  >([]);
  const [text, setText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [productsMeta, form] = useField<ProductSchemaType[]>(fieldName);
  const selectedProducts = productsMeta.getFieldList();

  const handleAddItemClick = (item: FieldOptionType) => {
    const id = item.value;
    form.insert({
      name: productsMeta.name,
      defaultValue: {
        productId: id.toString(),
        trackingType: "on",
        qty: "0",
      },
    });
    resetProducts(text);
  };

  const getProductText = useCallback(
    (id: string) => {
      const product = allProducts?.find((product) => product.value === id);
      return product?.text || "";
    },
    [allProducts],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setText(searchValue);
    resetProducts(searchValue);
  };

  const handleClearClick = () => {
    setText("");
    resetProducts("");
    inputRef.current && inputRef.current.focus();
  };

  const handleRemoveItemClick = (index: number) => {
    form.remove({
      name: productsMeta.name,
      index,
    });
    resetProducts(text);
  };

  const resetProducts = useCallback(
    (searchValue: string = "") => {
      const filteredProducts =
        (allProducts &&
          allProducts.filter(
            (product) =>
              product.text.toLowerCase().includes(searchValue.toLowerCase()) &&
              selectedProducts.filter(
                (p) => p.initialValue?.productId === product.value.toString(),
              ).length === 0,
          )) ||
        [];
      if (!filteredProducts) return;
      setProductsList(filteredProducts);
    },
    [allProducts, selectedProducts],
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          className="pl-2 h-7 hover:no-underline normal-case whitespace-nowrap text-xs"
          onClick={() => resetProducts()}
        >
          <MdAddCircle className="h-4 w-4 text-primary mr-1 group-hover:text-primary-2" />
          Add Product
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Select Service Products</SheetTitle>
          <SheetDescription>
            Select the products used in the service.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col pt-3 p-0">
          {selectedProducts &&
            selectedProducts.map((product, index) => (
              <div
                key={product.key}
                className={cn(
                  "flex items-center text-sm mb-px cursor-pointer aria-selected:bg-primary aria-selected:text-primary-2 hover:bg-primary-6",
                  "border h-9 text-foreground mb-1 bg-gray-50 border-gray-100 rounded-md",
                  "",
                  "bg-primary-6 text-white",
                )}
                onClick={() => {
                  handleRemoveItemClick(index);
                }}
              >
                <div className="ml-2">
                  {getProductText(product?.initialValue?.productId || "")}
                </div>
              </div>
            ))}
        </div>

        <div className="flex flex-col py-3 flex-1 p-0">
          <Card
            className={cn(
              "flex p-0 ",
              "rounded-none lg:rounded-md mr-0 shadow-card",
              "w-[180px] min-w-[180px] ",
              "overflow-hidden h-full w-full p-0 gap-2",
            )}
          >
            <CardContent className="w-full h-full p-2 pt-0">
              <div className="flex items-center w-full ml-[8px] mr-[-8px]">
                <MdOutlineSearch className="relative h-5 w-5 mr-[-30px]" />
                <Input
                  name="products-on-service-list-search"
                  ref={inputRef}
                  value={text}
                  className="bg-white my-2 px-[35px]"
                  autoFocus
                  onChange={handleSearchChange}
                />
                <MdOutlineClose
                  className="cursor-pointer relative w-5 h-5 ml-[-30px]"
                  onClick={handleClearClick}
                />
              </div>
              {productsList &&
                productsList.map((product) => (
                  <div
                    key={product.value}
                    className={cn(
                      "flex items-center text-sm mb-px cursor-pointer aria-selected:bg-primary aria-selected:text-primary-2 hover:bg-primary-6",
                      "border h-9 text-foreground mb-1 bg-gray-50 border-gray-100 rounded-md",
                      "",
                      product.checked ? "bg-primary-6 text-white" : "",
                    )}
                    onClick={() => {
                      handleAddItemClick(product);
                    }}
                  >
                    <div className="ml-2">{product.text}</div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default AddProduct;
