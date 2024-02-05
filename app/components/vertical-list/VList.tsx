import React from "react";
import { cn } from "~/utils/shadcn.utils.ts";

import { Card, CardContent } from "../ui/card.tsx";
import { Command, CommandList } from "../ui/command.tsx";

const VList = ({
  selectedId,
  children,
  className,
  headerChild,
}: {
  selectedId: string;
  children: React.ReactNode;
  className?: string;
  headerChild?: React.ReactNode;
}) => {
  // console.log("Command.value: ", selectedId);
  return (
    // <div className="flex w-full h-full p-0">
    <Card
      className={cn(
        "flex p-0 ",
        "rounded-none lg:rounded-md mr-0 shadow-card",
        "w-[180px] min-w-[180px] ",
        "overflow-hidden ",
        className,
      )}
    >
      <CardContent className="w-full h-full p-0 pl-[10px] ">
        {headerChild && headerChild}
        <Command value={selectedId}>
          <CommandList className="pt-[10px] pr-[10px]">{children}</CommandList>
        </Command>
      </CardContent>
    </Card>
    // </div>
  );
};

export default VList;
