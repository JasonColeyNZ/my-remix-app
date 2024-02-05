import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button.tsx";
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
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema.ts";
import type { loader } from "../route";
import { Checkbox } from "~/components/ui/checkbox";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { serialize } from "object-to-formdata";
import { clientIntent } from "../clientSchema";
import { MdOutlineModeEditOutline } from "react-icons/md/index.js";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

const ClientTags = () => {
  const { client, tags } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const handleCheckClick = async (checked: CheckedState, id: string) => {
    if (typeof checked !== "boolean") return;
    fetcher.submit(
      serialize({
        intent: clientIntent.UPDATETAGS,
        tagId: id,
        checked: checked,
      }),
      {
        method: "post",
      },
    );
  };

  return (
    <Tooltip delayDuration={1000}>
      <Sheet>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <Button
              className="p-1 ml-auto w-[25px] h-6 border-[1px] rounded-md border-gray-200 hover:bg-primary-6 hover:border-primary"
              variant="ghost"
              size="sm"
              // variant="secondary"
              // className="ml-auto px-1 h-6 hover:no-underline hover:bg-primary-10"
            >
              <MdOutlineModeEditOutline />
            </Button>
          </SheetTrigger>
        </TooltipTrigger>
        <SheetContent side="left" className="flex flex-col">
          <Form method="POST" className="flex flex-col h-full">
            <input
              type="hidden"
              name="intent"
              value={formViewerIntent.CREATE}
            />

            <SheetHeader>
              <SheetTitle>Client Tags</SheetTitle>
              <SheetDescription>
                Select tags for {client.firstName} {client.lastName} below.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col py-3 flex-1 p-0">
              {tags &&
                tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex my-1 p-2 bg-white rounded-md items-center"
                  >
                    <div
                      className="text-xs rounded-xl px-2 py-[2px]"
                      style={{
                        backgroundColor: tag.color,
                        color: tag.textColor,
                      }}
                    >
                      {tag.name}
                    </div>
                    <Checkbox
                      className="ml-auto"
                      name="tags"
                      // value={tag.id}
                      onCheckedChange={(checked: CheckedState) => {
                        handleCheckClick(checked, tag.id);
                      }}
                      checked={
                        client.tags?.findIndex((t) => t.id === tag.id) !== -1
                      }
                    />
                  </div>
                ))}
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Close</Button>
              </SheetClose>
            </SheetFooter>
          </Form>
        </SheetContent>
        <TooltipContent>Edit Tags</TooltipContent>
      </Sheet>
    </Tooltip>
  );
};
export default ClientTags;
