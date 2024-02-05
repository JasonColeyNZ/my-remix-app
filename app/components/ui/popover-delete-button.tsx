import { TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import { Button } from "./button";
import PopoverTooltipButton from "./popover-tooltip-button";

interface PopoverDeleteProps {
  confirmText: string;

  onSubmit: () => void;
}

const PopoverDeleteButton = ({ confirmText, onSubmit }: PopoverDeleteProps) => {
  const [open, setOpen] = useState(false);
  return (
    <PopoverTooltipButton
      open={open}
      triggerChildren={
        <Button
          className="ml-2"
          variant="outline"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          <div className="text-destructive">
            <TrashIcon />
          </div>
        </Button>
      }
      tooltipChildren={"Delete Consent"}
    >
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Confirm Delete</h4>
          <p
            className="text-sm text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: confirmText }}
          />
        </div>
        <div className="flex gap-2">
          <Button
            type="submit"
            variant="destructive"
            className="ml-auto"
            onClick={() => {
              if (onSubmit) {
                console.log("yes");

                onSubmit();
              }
              setOpen(false);
            }}
          >
            Yes
          </Button>
          <Button
            type="button"
            variant="outline"
            className=""
            onClick={(e) => {
              e.stopPropagation();
              console.log("no");
              setOpen(false);
            }}
          >
            No
          </Button>
        </div>
      </div>
    </PopoverTooltipButton>
  );
};

export default PopoverDeleteButton;
