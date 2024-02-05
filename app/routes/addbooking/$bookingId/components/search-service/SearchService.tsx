import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../../../components/ui/sheet";
import { Button } from "../../../../../components/ui/button";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { Card, CardContent } from "../../../../../components/ui/card";
// import { Input } from "../../../../../components/ui/input";
import { cn } from "~/utils/shadcn.utils";
import ServiceItem from "./ServiceItem";
import type { action, loader } from "../../route";
import { serialize } from "object-to-formdata";
import { addUpdateBookingIntent } from "../../addUpdateBookingSchema";

const SearchService = ({ className }: { className?: string }) => {
  const { categories, booking } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  // const [servicesLoaded, setServicesLoaded] = useState<boolean>(false);
  // const [categories, setCategories] = useState<
  //   GroupedServicesAndCategoriesType[]
  // >([]);

  // const loaderFetcher = useFetcher<typeof loader>();
  // const [text, setText] = useState<string>("");
  // const inputRef = useRef<HTMLInputElement | null>(null);

  // useEffect(() => {
  //   if (servicesLoaded) return;
  //   setServicesLoaded(true);
  //   loaderFetcher.load("/dashboard/settings/services/services?noRedirect=true");
  // }, [servicesLoaded, loaderFetcher]);

  // useEffect(() => {
  //   if (!loaderFetcher.data) return;
  //   setCategories(
  //     loaderFetcher.data.categories as GroupedServicesAndCategoriesType[],
  //   );
  // }, [loaderFetcher.data]);

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const searchValue = e.target.value;
  //   setText(searchValue);
  //   //   if (!searchValue) return;
  //   //   const filteredClients = loaderFetcher.data?.services.filter(
  //   //     (client) =>
  //   //       client.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
  //   //       client.lastName.toLowerCase().includes(searchValue.toLowerCase()),
  //   //   );
  //   //   if (!filteredClients) return;
  //   //   setCategories(filteredClients);
  // };

  // const handleClearClick = () => {
  //   setText("");
  //   // dispatch({
  //   //   type: AddBookingStateTypes.selectServices,
  //   //   payload: { selectServices: [] },
  //   // });
  //   setCategories(
  //     loaderFetcher.data
  //       ? (loaderFetcher.data?.categories as GroupedServicesAndCategoriesType[])
  //       : [],
  //   );
  //   inputRef.current && inputRef.current.focus();
  // };

  const handleItemClick = (id: string) => {
    const services = [...booking.services.map((s) => s?.id)];
    const service = services.find((s) => s === id);
    //if service found, we are removing, if not then add
    if (service) {
      services.splice(services.indexOf(service), 1);
    } else {
      services.push(id);
    }

    fetcher.submit(
      serialize({
        intent: addUpdateBookingIntent.UPDATESERVICE,
        id: booking.id,
        services: services.join(","),
      }),
      {
        method: "POST",
      },
    );

    // const services = state.addBookingState.activeBooking?.services || [];
    // if (selected) {
    //   // dispatch({
    //   //   type: AddBookingStateTypes.selectServices,
    //   //   payload: {
    //   //     selectServices: services?.filter((s) => s.id !== service.id),
    //   //   },
    //   // });
    //   setSelected(false);
    //   return;
    // } else {
    //   services.push({
    //     id: service.id,
    //     name: service.name,
    //     color: service.color,
    //     textColor: service.textColor,
    //   });
    //   // dispatch({
    //   //   type: AddBookingStateTypes.selectServices,
    //   //   payload: {
    //   //     selectServices: services,
    //   //   },
    //   // });
    //   setSelected(true);
    //   return;
    // }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" className={cn("h-7", className)}>
          Select Services
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col gap-1">
        <SheetHeader>
          <SheetTitle>Select Services</SheetTitle>
          <SheetDescription>Select from the services below.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col pb-3 flex-1 p-0">
          <div className="flex w-full items-center">
            <div className="flex items-center w-full ml-[8px] mr-[-8px]">
              {/* <MdOutlineSearch className="relative h-5 w-5 mr-[-30px]" />
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
              /> */}
            </div>
            {/* <Button
                className="p-1 rounded-2xl my-2"
                variant="secondary"
              ></Button> */}
          </div>
          <Card
            className={
              "rounded-md flex p-0 h-full lg:rounded-md mr-0 shadow-card overflow-hidden w-full"
            }
          >
            <CardContent className="relative flex w-full p-0">
              <div className="absolute h-full flex flex-col w-full overflow-y-auto">
                {categories.map((category) => {
                  return (
                    <div key={category.id} className="flex flex-col w-full">
                      <div
                        className="text-xs p-1 font-medium text-foreground text-center m-1 rounded-md shadow-sm"
                        style={{
                          backgroundColor: category.color,
                          color: category.textColor,
                        }}
                      >
                        {category.name}
                      </div>
                      <div className="flex flex-col gap-1 px-2 py-1">
                        {category.services.map((service) => {
                          const s = {
                            ...service,
                            selected: booking?.services?.find(
                              (s) => s?.id === service.id,
                            )
                              ? true
                              : false,
                            color: service.color
                              ? service.color
                              : category.color,
                            textColor: service.textColor
                              ? service.textColor
                              : category.textColor,
                          };
                          return (
                            <ServiceItem
                              key={service.id}
                              service={s}
                              handleItemClick={handleItemClick}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SearchService;
