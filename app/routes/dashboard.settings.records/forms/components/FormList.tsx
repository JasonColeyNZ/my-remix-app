import { NavLink, useLoaderData, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { MdArrowCircleRight } from "react-icons/md/index.js";
import { Button } from "~/components/ui/button.tsx";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet.tsx";

import type { loader } from "../route.tsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion.tsx";
import { cn } from "~/utils/shadcn.utils.ts";
import { Checkbox } from "~/components/ui/checkbox.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip.tsx";

const FormList = ({ selectedFormName }: { selectedFormName: string }) => {
  const { areas } = useLoaderData<typeof loader>();
  const { formId } = useParams();
  const [selectedAreaId, setSelectedAreaId] = useState<string[]>([]);

  useEffect(() => {
    const form = areas.find((c) =>
      c.forms.find((s) => {
        return s.id === formId;
      }),
    );
    setSelectedAreaId(form ? [form.area] : []);
  }, [areas, formId]);

  return (
    <Tooltip delayDuration={1000}>
      <Sheet>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <Button className="justify-start shadow-card rounded-none w-[172px] xl:w-[252px] rounded-r-3xl pr-[2px] hover:bg-primary-10">
              <div className="flex flex-1 w-full mr-0 text-white ">
                <div className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden self-center ">
                  {selectedFormName}
                </div>
                <MdArrowCircleRight className="relative right-0 h-8 w-8 mr-[-1px] " />
              </div>
            </Button>
          </SheetTrigger>
        </TooltipTrigger>
        <SheetContent
          side="left"
          className="flex flex-col bg-card w-[220px] xl:w-[300px] p-0"
        >
          <SheetHeader className="p-3">
            <SheetTitle>Load Form</SheetTitle>
            <SheetDescription>Select a form below.</SheetDescription>
          </SheetHeader>
          <Accordion
            className="flex-1"
            type="multiple"
            value={selectedAreaId}
            onValueChange={(value: string[]) => {
              setSelectedAreaId(value);
            }}
          >
            {areas &&
              areas.map((area) => (
                <div key={area.area}>
                  <AccordionItem value={area.area} className="select-none">
                    <AccordionTrigger className=" px-2 py-2 hover:bg-primary-11 bg-primary-9 text-white border-b-primary-6">
                      {area.area.replace(/([A-Z])/g, " $1").trim()}
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col flex-1 w-full pb-0">
                      {area.forms &&
                        area.forms.map((form) => (
                          <SheetClose key={form.id} asChild>
                            <NavLink
                              key={form.id}
                              to={`/dashboard/settings/records/forms/${form.id}`}
                              end
                              replace={true}
                            >
                              {({ isActive }) => (
                                <div
                                  className={cn(
                                    "flex items-center gap-2 p-2 hover:bg-primary-6",
                                    isActive ? "bg-primary-4" : "bg-white",
                                  )}
                                >
                                  <div className={`w-[15px] h-[15px]`} />
                                  {form.name}
                                </div>
                              )}
                            </NavLink>
                          </SheetClose>
                        ))}
                    </AccordionContent>
                  </AccordionItem>
                </div>
              ))}
          </Accordion>
          <div className="flex text-xs mx-2 my-2">
            <div className="items-center w-6">
              <Checkbox className="px-1" />
            </div>
            Show System Forms
          </div>
        </SheetContent>
        <TooltipContent>Load Forms</TooltipContent>
      </Sheet>
    </Tooltip>
  );
};
export default FormList;
