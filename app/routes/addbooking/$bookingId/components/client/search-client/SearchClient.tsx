import { MdOutlineClose, MdOutlinePersonSearch } from "react-icons/md/index.js";
import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "@remix-run/react";
import type { ClientsItemsType } from "~/models/client.server";
import ClientRowsVirtual from "./ClientRowsVirtual";
import { cn } from "~/utils/shadcn.utils";
import AddClient from "./AddClient";
import type { loader } from "../../../route";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent } from "~/components/ui/card";

const SearchClient = ({
  clientId,
  className,
}: {
  clientId?: string;
  className?: string;
}) => {
  const { booking, clients: rawClients } = useLoaderData<typeof loader>();
  const [clients, setClients] = useState<ClientsItemsType>([]);
  const [text, setText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setClients(rawClients);
  }, [rawClients]);

  useEffect(() => {
    setOpen(!booking?.client);
  }, [booking?.client]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setText(searchValue);
    if (!searchValue) return;
    const filteredClients = rawClients.filter(
      (client) =>
        client.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
        client.lastName.toLowerCase().includes(searchValue.toLowerCase()),
    );
    if (!filteredClients) return;
    setClients(filteredClients);
  };

  const handleClearClick = () => {
    setText("");
    setClients(rawClients);
    inputRef.current && inputRef.current.focus();
  };

  return (
    <Sheet open={open}>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          className={cn("h-7", className)}
          onClick={() => setOpen(!open)}
        >
          {clientId ? "Change Client" : "Select Client"}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col gap-1">
        <SheetHeader>
          <SheetTitle>Select Client</SheetTitle>
          <SheetDescription>
            Select a client from below.
            <AddClient showEditor={showEditor} setShowEditor={setShowEditor} />
          </SheetDescription>
        </SheetHeader>
        <div className="flex items-center select-none h-6 text-primary font-bold text-sm">
          {booking?.client &&
            `${booking?.client?.firstName || ""} ${
              booking?.client?.lastName || ""
            } selected`}
        </div>
        <div className="flex flex-col pb-3 flex-1 p-0">
          <div className="flex w-full items-center">
            <div className="flex items-center w-full ml-[8px] mr-[-8px]">
              <MdOutlinePersonSearch className="relative h-5 w-5 mr-[-30px]" />
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
              <ClientRowsVirtual clients={clients} />
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

export default SearchClient;
