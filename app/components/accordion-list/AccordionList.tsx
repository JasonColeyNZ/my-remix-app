import React from "react";
import { cn } from "~/utils/shadcn.utils.ts";

import { Accordion } from "../ui/accordion.tsx";
import { Card, CardContent } from "../ui/card.tsx";

const AccordionList = ({
  selectedId,
  setSelectedId,
  children,
}: {
  selectedId: string[];
  setSelectedId: (id: string[]) => void;
  children: React.ReactNode;
}) => {
  // console.log("Command.value: ", selectedId);
  return (
    <div className="flex p-2">
      <Card
        className={cn(
          "flex p-0  ",
          "rounded-none lg:rounded-md mr-0 shadow-card",
          "w-[180px] md:w-[240px] min-w-[180px] md:min-w-[240px]",
          "overflow-hidden ",
          // className,
        )}

        // className="flex p-0 h-full rounded-none lg:rounded-xl mr-0 lg:mr-1 w-[180px] md:w-[240px] min-w-[180px] md:min-w-[240px] overflow-hidden "
      >
        <CardContent className="w-full h-full p-1 overflow-y-auto ">
          <Accordion
            className=""
            type="multiple"
            value={selectedId}
            onValueChange={(value: string[]) => {
              // console.log("AccordionList: ", value);
              setSelectedId(value);
            }}
          >
            {children}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccordionList;
