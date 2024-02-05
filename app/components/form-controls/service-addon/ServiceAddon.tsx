import React, { useEffect, useState } from "react";
import type { FieldDefinition } from "~/components/draggable-forms-editor/types";
import AddService from "./ServiceList";
import { Switch } from "~/components/ui/switch";
// import type { ServiceSchemaType } from "./serviceAddonSchema";
import TextInput from "../text-input/TextInput";
import TimeitSelect from "../timeit-select/TimeitSelect";
import { getFieldsetProps, getInputProps, useField } from "@conform-to/react";
import type { ServiceAddonSchemaType } from "./serviceAddonSchema";
import type { GroupedServicesAndCategoriesType } from "~/models/services.server";

// interface FieldProps<Schema> extends FieldConfig<Schema> {
//   error?: string;
//   // defaultValue?: ProductOnServiceType[];
// }

interface ServiceAddonProps {
  options: GroupedServicesAndCategoriesType[];
  descriptionProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  field?: FieldDefinition;
  fieldName: string;
}

const ServiceAddon = ({
  labelProps,
  descriptionProps,
  field,
  options,
  fieldName,
}: ServiceAddonProps) => {
  const [disabled, setDisabled] = useState(true);

  const [addonMeta] = useField<ServiceAddonSchemaType>(fieldName);
  const { isAddon } = addonMeta.getFieldset();

  //remove type from the switch object
  const { type, ...addonRest } = {
    ...getInputProps(isAddon, { type: "checkbox" }),
  };

  useEffect(() => {
    if (isAddon) {
      setDisabled(false);
    }
  }, [isAddon]);

  return (
    <div className="grid w-full items-center gap-1">
      <fieldset {...getFieldsetProps(addonMeta)}>
        <div className="flex gap-6 w-full">
          <div className="flex flex-col flex-1">
            <div className="flex items-center">
              <div className="pb-1 text-sm font-base">
                {labelProps.children}
                <span className="text-destructive">
                  {field && field.validation?.required ? "*" : "" || ""}
                </span>
              </div>
              <Switch
                onCheckedChange={(e) => {
                  setDisabled(!e);
                }}
                className="ml-2 mb-1"
                {...addonRest}
              />
            </div>
            {descriptionProps && descriptionProps.children ? (
              <div className="pl-2 text-xs font-light pb-1  text-secondary-foreground">
                {descriptionProps.children}
              </div>
            ) : null}
          </div>
          <AddService
            allCategories={options}
            disabled={disabled}
            fieldName={fieldName}
          />
        </div>

        <div className="flex gap-2">
          <div className="flex gap-2 ml-8">
            <div className="w-24">
              <TextInput
                labelProps={{ children: "Price" }}
                fieldName={"addonPrice"}
              />
            </div>
            <div className="w-20">
              <TimeitSelect
                labelProps={{ children: "Duration" }}
                fieldName={"addonDuration"}
              />
            </div>
            <div className="w-20">
              <TimeitSelect
                labelProps={{ children: "Time Margin" }}
                labelClassName="text-xs"
                fieldName={"addonTimeMargin"}
              />
            </div>
          </div>
          <div className="flex flex-1">
            <div className="ml-auto"></div>
          </div>
        </div>
      </fieldset>
      {/* {
        <div className="min-h-[20px] px-4 py-0 pt-1">
          {meta.errorId ? (
            <ErrorList id={meta.errorId} errors={meta.errors} />
          ) : null}
        </div>
      } */}
    </div>
  );
};

export default ServiceAddon;
