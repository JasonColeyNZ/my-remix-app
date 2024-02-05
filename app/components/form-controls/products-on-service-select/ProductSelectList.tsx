import React, { useId } from "react";
import type { ListOfErrors } from "../ErrorList";
import ErrorList from "../ErrorList";
import type {
  FieldDefinition,
  FieldOptionType,
} from "~/components/draggable-forms-editor/types";
// import type { ProductOnServiceType } from "~/utils/types";
import ProductItem from "./ProductItem";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { MdOutlineHelp } from "react-icons/md/index.js";
import AddProduct from "./ProductList";
// import type { FieldConfig } from "@conform-to/react";
import type { ProductSchemaType } from "./productSchema";
// import type { FieldName } from "@conform-to/react";
import { useField } from "@conform-to/react";

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

// interface FieldProps<Schema> extends Omit<FieldConfig<Schema>, "defaultValue"> {
//   error?: string;
//   defaultValue?: ProductOnServiceType[];
// }

interface ProductSelectProps {
  // formRef: React.RefObject<HTMLFormElement>;
  // prop: FieldName<ProductSchemaType[], ServiceItemType, string[]>;
  options: FieldOptionType[] | undefined;
  errors?: ListOfErrors;
  descriptionProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  fieldName: string;
  field?: FieldDefinition;
}

const ProductSelectList = ({
  options,
  errors,
  // prop,
  // formRef,
  descriptionProps,
  labelProps,
  field,
  fieldName,
}: ProductSelectProps) => {
  const fallbackId = useId();
  const id = field && field.id ? field.id : fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;

  const [productsMeta] = useField<ProductSchemaType[]>(fieldName);

  const products = productsMeta.getFieldList();

  const getProductName = (id: string) => {
    const product = options?.find((option) => option.value === id);
    return product?.text || "";
  };

  return (
    <div className="grid w-full items-center gap-1">
      <div className="flex gap-6">
        <div className="flex flex-col">
          {labelProps && labelProps.children && (
            <div className="pb-1 text-sm font-base">
              {labelProps.children}
              <span className="text-destructive">
                {field && field.validation?.required ? "*" : "" || ""}
              </span>
            </div>
          )}
          {descriptionProps && descriptionProps.children ? (
            <div className="pl-2 text-xs font-light pb-1  text-secondary-foreground">
              {descriptionProps.children}
            </div>
          ) : null}
        </div>
        <div>
          <AddProduct allProducts={options} fieldName={fieldName} />
        </div>
      </div>

      <div className="p-2">
        {products.length > 0 && (
          <div className="grid grid-cols-5 gap-4 pb-1">
            <div className="text-xs text-foreground col-span-3">Product</div>
            <div className="flex text-xs text-foreground mx-auto items-center gap-1">
              Track Qty Used
              <Tooltip delayDuration={200}>
                <TooltipTrigger>
                  <MdOutlineHelp className="text-primary-7 w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  Allows tracking of actual product used at Client appointment
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex text-xs text-foreground mx-auto items-center gap-1">
              Qty
              <Tooltip delayDuration={200}>
                <TooltipTrigger>
                  <MdOutlineHelp className="text-primary-7 w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>Qty required to perform service</TooltipContent>
              </Tooltip>
            </div>
          </div>
        )}
        {products?.map((selectedProduct) => (
          <ProductItem
            key={selectedProduct.key}
            prop={selectedProduct.name}
            productName={getProductName(
              selectedProduct?.initialValue?.productId || "",
            )}
          />
        ))}
      </div>
      {
        <div className="min-h-[20px] px-4 py-0 pt-1">
          {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
        </div>
      }
    </div>
  );
};

export default ProductSelectList;
