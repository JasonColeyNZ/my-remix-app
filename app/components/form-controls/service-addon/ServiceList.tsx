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
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/utils/shadcn.utils";
import type { ProductOnServiceType } from "~/utils/types";
import { Input } from "~/components/ui/input";
import { useField } from "@conform-to/react";
import type {
  GroupedServicesAndCategoriesType,
  GroupedServicesType,
} from "~/models/services.server";

interface AddServiceProps {
  allCategories: GroupedServicesAndCategoriesType[];
  disabled?: boolean;
  fieldName: string;
}

const AddService = ({
  allCategories,
  disabled,
  fieldName,
}: AddServiceProps) => {
  const [categoriesList, setCategoriesList] = useState<
    GroupedServicesAndCategoriesType[] | undefined
  >([]);
  // console.log("allCategories", allCategories, fieldName);
  const [text, setText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [servicesMeta, form] = useField<ProductOnServiceType[]>(
    "addon.servicesAddon",
  );
  const selectedServices = servicesMeta.getFieldList();

  const handleAddItemClick = (item: GroupedServicesType) => {
    // const id = item.value;
    // form.insert({
    //   name: servicesMeta.name,
    //   defaultValue: {
    //     serviceId: id.toString(),
    //     trackingType: "on",
    //     qty: "0",
    //   },
    // });
    // resetServices(text);
  };

  // const getServiceText = useCallback(
  //   (id: string) => {
  //     // const service = allCategories?.find((service) => service.value === id);
  //     // return service?.text || "";
  //     return "";
  //   },
  //   [allCategories],
  // );

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
      const filteredCategories =
        (allCategories &&
          allCategories.filter((category) => {
            const svs = category.services.filter((service) =>
              service.name.toLowerCase().includes(searchValue.toLowerCase()),
            );
            return svs.length > 0;
          })) ||
        [];
      console.log("filteredCategories", filteredCategories);
      if (!filteredCategories) return;
      setCategoriesList(filteredCategories);
    },
    [allCategories],
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
          disabled={disabled}
          className="pl-2 h-7 hover:no-underline normal-case whitespace-nowrap text-xs"
          onClick={() => resetServices()}
        >
          <MdAddCircle className="h-4 w-4 text-primary-10 mr-1 group-hover:text-primary-2" />
          Linked Services
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Select Linked Services</SheetTitle>
          <SheetDescription>
            Select services that this service can be an add-on to.
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
                  {/* {getServiceText(service?.initialValue?.serviceId || "")} */}
                </div>
              </div>
            ))}
        </div>

        <div className="flex flex-col pb-3 flex-1 p-0">
          <div className="flex items-center w-full ml-[8px] mr-[-8px]">
            <MdOutlineSearch className="relative h-5 w-5 mr-[-30px]" />
            <Input
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
                  {categoriesList &&
                    categoriesList.map((category) => (
                      <div key={category.id}>
                        <div
                          key={category.id}
                          className={cn(
                            "flex items-center text-sm mb-px cursor-pointer aria-selected:bg-primary aria-selected:text-primary-2 hover:bg-primary-6 hover:text-white",
                            "border h-6 text-foreground m-1 mb-0 rounded-sm",
                            // category.checked ? "bg-primary-6 text-white" : "",
                          )}
                          style={{
                            backgroundColor: category.color,
                            borderColor: category.color,
                            color: category.textColor,
                          }}
                          onClick={() => {
                            handleAddItemClick(category);
                          }}
                        >
                          <div className="ml-2">{category.name}</div>
                        </div>
                        <div className="m-2 mt-0 p-1 bg-gray-50 border border-gray-100 rounded-b-md">
                          {category.services.map((service) => (
                            <div
                              key={service.id}
                              className={cn(
                                "m-1 flex items-center text-sm cursor-pointer aria-selected:bg-primary aria-selected:text-primary-2 hover:bg-primary-6 hover:text-white",
                                "border h-9 text-foreground bg-gray-50 border-gray-100 rounded-md",
                                // category.checked ? "bg-primary-6 text-white" : "",
                              )}
                              onClick={() => {
                                handleAddItemClick(service);
                              }}
                            >
                              <div className="ml-2">{service.name}</div>
                            </div>
                          ))}
                        </div>
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
