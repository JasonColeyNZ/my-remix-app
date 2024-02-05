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
import { useCallback, useEffect, useRef, useState } from "react";
import type { FieldOptionType } from "~/components/draggable-forms-editor/types";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/utils/shadcn.utils";
import type { ProductOnServiceType } from "~/utils/types";
import { Input } from "~/components/ui/input";
import { requestIntent, type FieldConfig, list } from "@conform-to/react";

interface AddProductProps {
  allMembers: FieldOptionType[] | undefined;
  formRef: React.RefObject<HTMLFormElement>;
  selectedMembers: ({
    key: string;
  } & FieldConfig<ProductOnServiceType>)[];
}

const AddMember = ({
  allMembers,
  formRef,
  selectedMembers,
}: AddProductProps) => {
  const [membersList, setMembersList] = useState<FieldOptionType[] | undefined>(
    [],
  );
  const [text, setText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAddItemClick = (item: FieldOptionType) => {
    const id = item.value;
    requestIntent(
      formRef.current,
      list.insert("users", {
        defaultValue: {
          userId: id.toString(),
          // trackingType: "on",
          // qty: 0,
        },
      }),
    );
    resetMembers(text);
  };

  const getMemberName = useCallback(
    (id: string) => {
      const member = allMembers?.find((product) => product.value === id);
      return member?.text || "";
    },
    [allMembers],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setText(searchValue);
    resetMembers(searchValue);
  };

  const handleClearClick = () => {
    setText("");
    resetMembers("");
    inputRef.current && inputRef.current.focus();
  };

  const handleRemoveItemClick = (index: number) => {
    requestIntent(
      formRef.current,
      list.remove("users", {
        index,
      }),
    );
    resetMembers(text);
  };

  const resetMembers = useCallback(
    (searchValue: string = "") => {
      const filteredMembers =
        (allMembers &&
          allMembers.filter(
            (member) =>
              member.text.toLowerCase().includes(searchValue.toLowerCase()) &&
              selectedMembers.filter(
                (p) => p.defaultValue.userId === member.value.toString(),
              ).length === 0,
          )) ||
        [];
      if (!filteredMembers) return;
      setMembersList(filteredMembers);
    },
    [allMembers, selectedMembers],
  );

  useEffect(() => {
    if (selectedMembers) {
      resetMembers();
    }
  }, [resetMembers, selectedMembers]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          className="pl-2 h-7 hover:no-underline normal-case whitespace-nowrap text-xs"
        >
          <MdAddCircle className="h-4 w-4 text-primary mr-1 group-hover:text-primary-2" />
          Add Member
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Select Service Members</SheetTitle>
          <SheetDescription>
            Select the members that will be able to perform this service.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col pt-3 p-0">
          {selectedMembers &&
            selectedMembers.map((member, index) => (
              <div
                key={member.key}
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
                  {getMemberName(member?.defaultValue.userId || "")}
                </div>
              </div>
            ))}
        </div>

        <div className="flex flex-col py-3 flex-1 p-0">
          <Card
            className={cn(
              "flex p-0 ",
              "rounded-none lg:rounded-md mr-0 shadow-card",
              "w-[180px] min-w-[180px] ",
              "overflow-hidden h-full w-full p-0 gap-2",
            )}
          >
            <CardContent className="w-full h-full p-2 pt-0">
              <div className="flex items-center w-full ml-[8px] mr-[-8px]">
                <MdOutlineSearch className="relative h-5 w-5 mr-[-30px]" />
                <Input
                  name="service-member-list-search"
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
              {membersList &&
                membersList.map((member) => (
                  <div
                    key={member.value}
                    className={cn(
                      "flex items-center text-sm mb-px cursor-pointer aria-selected:bg-primary aria-selected:text-primary-2 hover:bg-primary-6",
                      "border h-9 text-foreground mb-1 bg-gray-50 border-gray-100 rounded-md",
                      "",
                      member.checked ? "bg-primary-6 text-white" : "",
                    )}
                    onClick={() => {
                      handleAddItemClick(member);
                    }}
                  >
                    <div className="ml-2">{member.text}</div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default AddMember;
