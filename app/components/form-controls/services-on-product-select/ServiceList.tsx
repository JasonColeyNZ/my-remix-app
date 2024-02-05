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
import type { ProductOnServiceType } from "~/utils/types";
import { Input } from "~/components/ui/input";
import { useField } from "@conform-to/react";

interface AddServiceProps {
  allServices: FieldOptionType[] | undefined;
  // prop: FieldName<ProductOnServiceType[]>;
  fieldName: string;
}

const AddService = ({ allServices, fieldName }: AddServiceProps) => {
  const [servicesList, setServicesList] = useState<
    FieldOptionType[] | undefined
  >([]);
  // console.log("selectedServices", selectedServices);
  const [text, setText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [servicesMeta, form] = useField<ProductOnServiceType[]>(fieldName);
  const selectedServices = servicesMeta.getFieldList();

  const handleAddItemClick = (item: FieldOptionType) => {
    const id = item.value;
    form.insert({
      name: servicesMeta.name,
      defaultValue: {
        serviceId: id.toString(),
        trackingType: "on",
        qty: "0",
      },
    });

    resetServices(text);
  };

  const getServiceText = useCallback(
    (id: string) => {
      const service = allServices?.find((service) => service.value === id);
      return service?.text || "";
    },
    [allServices],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setText(searchValue);
    resetServices(searchValue);
  };

  const handleClearClick = () => {
    setText("");
    resetServices("");
    inputRef.current && inputRef.current.focus();
  };

  const handleRemoveItemClick = (index: number) => {
    form.remove({
      name: servicesMeta.name,
      index,
    });
    resetServices(text);
  };

  const resetServices = useCallback(
    (searchValue: string = "") => {
      const filteredServices =
        (allServices &&
          allServices.filter(
            (service) =>
              service.text.toLowerCase().includes(searchValue.toLowerCase()) &&
              selectedServices.filter(
                (p) => p.initialValue?.serviceId === service.value.toString(),
              ).length === 0,
          )) ||
        [];
      if (!filteredServices) return;
      setServicesList(filteredServices);
    },
    [allServices, selectedServices],
  );

  // useEffect(() => {
  //   if (selectedServices) {
  //     resetServices();
  //   }
  // }, [resetServices, selectedServices]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          className="pl-2 h-7 hover:no-underline normal-case whitespace-nowrap text-xs"
          onClick={() => resetServices()}
        >
          <MdAddCircle className="h-4 w-4 text-primary-10 mr-1 group-hover:text-primary-2" />
          Add Service
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
          {selectedServices &&
            selectedServices.map((service, index) => (
              <div
                key={service.key}
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
                  {getServiceText(service?.initialValue?.serviceId || "")}
                </div>
              </div>
            ))}
        </div>

        <div className="flex flex-col pb-3 flex-1 p-0">
          <div className="flex items-center w-full ml-[8px] mr-[-8px]">
            <MdOutlineSearch className="relative h-5 w-5 mr-[-30px]" />
            <Input
              name="services-on-product-list-search"
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

          <Card
            className={cn(
              "flex p-0 ",
              "rounded-none lg:rounded-md mr-0 shadow-card",
              "w-[180px] min-w-[180px] ",
              "overflow-hidden h-full w-full p-0 gap-2",
            )}
          >
            <CardContent className="flex flex-col w-full h-full p-0 overflow-hidden">
              <div className="relative h-full">
                <div className="absolute top-0 bottom-0 overflow-y-scroll w-full">
                  {servicesList &&
                    servicesList.map((service) => (
                      <div
                        key={service.value}
                        className={cn(
                          "flex items-center text-sm mb-px cursor-pointer aria-selected:bg-primary aria-selected:text-primary-2 hover:bg-primary-6 hover:text-white",
                          "border h-9 text-foreground m-1 bg-gray-50 border-gray-100 rounded-md",
                          "",
                          service.checked ? "bg-primary-6 text-white" : "",
                        )}
                        onClick={() => {
                          handleAddItemClick(service);
                        }}
                      >
                        <div className="ml-2">{service.text}</div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" type="button">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default AddService;
