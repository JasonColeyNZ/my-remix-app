import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import type { ProductSchemaType } from "./productSchema";
// import { useFieldset, type FieldConfig, conform } from "@conform-to/react";
// import { useRef } from "react";
import type { FieldName } from "@conform-to/react";
import { getInputProps, useField } from "@conform-to/react";

// interface FieldProps<Schema> extends FieldConfig<Schema> {
//   error?: string;
// }

export interface ProductTypeProps {
  prop: FieldName<ProductSchemaType>;
  productName: string;
}

const ProductItem = ({ productName, prop }: ProductTypeProps) => {
  // const ref = useRef<HTMLFieldSetElement>(null);

  const [productMeta] = useField(prop);

  const { productId, trackingType, qty } = productMeta.getFieldset();

  //remove type from the switch object
  const { type, ...rest } = {
    ...getInputProps(trackingType, { type: "checkbox" }),
  };

  return (
    <fieldset className="grid grid-cols-5 border-t pb-1 pt-1 gap-4">
      {/* <input type="hidden" {...conform.input(id)} /> */}
      <input {...getInputProps(productId, { type: "hidden" })} />
      <div className="flex text-sm col-span-3">{productName}</div>
      <div className="flex items-center gap-1">
        <Switch className="mx-auto" {...rest} />
      </div>
      <div>
        <Input
          className="w-20 mx-auto h-7"
          {...getInputProps(qty, { type: "number" })}
        />
      </div>
    </fieldset>
  );
};

export default ProductItem;
