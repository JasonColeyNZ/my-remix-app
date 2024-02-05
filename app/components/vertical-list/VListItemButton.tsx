import { cn } from "~/utils/shadcn.utils.ts";

import { CommandItem } from "../ui/command.tsx";

type VListItemButtonProps = {
  // selected: boolean;
  className?: string;
  id: string;
  text: string;
  color?: string;

  secondRow?: React.ReactNode;
  secondary?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  onClick: (id: string) => void;
};

const VListItemButton = ({
  id,
  className,
  // selected,
  text,
  color,
  secondRow,
  secondary,
  secondaryAction,
  onClick,
}: VListItemButtonProps) => {
  // console.log("CommandItem.value: ", id, text);
  return (
    <CommandItem
      value={id}
      className={cn(
        "mb-px cursor-pointer aria-selected:bg-primary aria-selected:text-primary-2 hover:bg-primary-6",
        className,
      )}
      onSelect={(value) => {
        onClick(value);
      }}
    >
      <div className="flex flex-col w-full">
        <div className="flex items-center">
          {color && (
            <div
              className={`w-4 h-[15px]`}
              style={{ backgroundColor: color }}
            />
          )}
          <div className="flex-1 ml-2">{text}</div>
        </div>
        {secondRow && secondRow}
      </div>
    </CommandItem>
  );
};

export default VListItemButton;
