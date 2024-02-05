// import { useFieldList, type FieldConfig } from "@conform-to/react";
import type {
  FieldDefinition,
  FieldOptionType,
} from "~/components/draggable-forms-editor/types";
import type { ListOfErrors } from "../ErrorList";
import type { ServiceMemberSchemaType } from "./serviceMemberSchema";
import type { ServiceMemberType } from "~/utils/types";
import { useId } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { MdOutlineHelp } from "react-icons/md/index.js";
import ErrorList from "../ErrorList";
import AddMember from "./MemberList";

// interface FieldProps<Schema> extends Omit<FieldConfig<Schema>, "defaultValue"> {
//   error?: string;
//   defaultValue?: ServiceMemberType[];
// }

interface ServiceMemberProps {
  // formRef: React.RefObject<HTMLFormElement>;
  // prop: FieldProps<ServiceMemberSchemaType[]>;
  options: FieldOptionType[] | undefined;
  errors?: ListOfErrors;
  descriptionProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  field?: FieldDefinition;
}

const ServiceMembers = ({
  // formRef,
  labelProps,
  field,
  descriptionProps,
  errors,
  options,
  prop,
}: ServiceMemberProps) => {
  const fallbackId = useId();
  const id = field && field.id ? field.id : fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;

  // const getServiceName = (id: string) => {
  //   const service = options?.find((option) => option.value === id);
  //   return service?.text || "";
  // };

  const members = useFieldList(formRef, prop);

  return (
    <div className="grid w-full items-center gap-1">
      <div className="flex gap-6 w-full">
        <div className="flex flex-col flex-1">
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
          <AddMember
            allMembers={options}
            selectedMembers={members}
            formRef={formRef}
          />
        </div>
      </div>

      <div className="p-2">
        {members.length > 0 && (
          <div className="grid grid-cols-5 gap-4 pb-1">
            <div className="text-xs text-foreground col-span-3">Service</div>
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
        {members?.map((selectedService) => (
          <></>
          // <ServiceItem
          //   key={selectedService.key}
          //   config={selectedService}
          //   serviceName={getServiceName(selectedService.defaultValue.serviceId)}
          // />
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

export default ServiceMembers;
