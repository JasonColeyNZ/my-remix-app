import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import type { ServiceSchemaType } from "./serviceSchema";
import { useRef } from "react";
import { useField, getInputProps } from "@conform-to/react";

export interface ServiceTypeProps {
  // prop: FieldName<ServiceSchemaType>;
  serviceName: string;
  fieldName: string;
}

const ServiceItem = ({ serviceName, fieldName }: ServiceTypeProps) => {
  const ref = useRef<HTMLFieldSetElement>(null);

  const [serviceMeta] = useField<ServiceSchemaType>(fieldName);

  const { serviceId, trackingType, qty } = serviceMeta.getFieldset();

  //remove type from the switch object
  const { type, ...rest } = {
    ...getInputProps(trackingType, { type: "checkbox" }),
  };

  return (
    <fieldset ref={ref} className="grid grid-cols-5 border-t pb-1 pt-1 gap-4">
      {/* <input type="hidden" {...conform.input(id)} /> */}
      <input {...getInputProps(serviceId, { type: "hidden" })} />
      <div className="flex text-sm col-span-3">{serviceName}</div>
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

export default ServiceItem;
