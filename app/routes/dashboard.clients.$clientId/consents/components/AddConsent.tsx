import { Form, useLoaderData } from "@remix-run/react";
import type { loader } from "../route.tsx";
import { Button } from "~/components/ui/button.tsx";
import { MdAddCircle } from "react-icons/md/index.js";
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
import { useState } from "react";
import ServiceBadge from "~/components/ui/service-badge.tsx";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema.ts";
import VList from "~/components/vertical-list/VList.tsx";
import VListItemButton from "~/components/vertical-list/VListItemButton.tsx";

const AddConsent = () => {
  const { consentForms } = useLoaderData<typeof loader>();
  const [selectedConsentId, setSelectedConsentId] = useState<string>("");

  const handleListItemClick = (id: string) => {
    console.log("handleListItemClick: ", id);
    setSelectedConsentId(id);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="pl-2 h-7 hover:no-underline text-primary-2 bg-primary hover:bg-primary-10">
          <MdAddCircle className="h-5 w-5 text-white mr-1" />
          Add Consent
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <Form method="POST" className="flex flex-col h-full">
          <input type="hidden" name="intent" value={formViewerIntent.CREATE} />
          <input type="hidden" name="formId" value={selectedConsentId} />

          <SheetHeader>
            <SheetTitle>Add Letter of Consent</SheetTitle>
            <SheetDescription>
              Select a letter of consent for the client to sign.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col py-3 flex-1 p-0">
            <VList
              selectedId={selectedConsentId}
              className="h-full w-full p-0 gap-2"
            >
              {consentForms &&
                consentForms.map((consentForm) => (
                  <VListItemButton
                    className="border-[1px] h-14 mb-1 bg-gray-50 border-gray-100 rounded-md"
                    key={consentForm.id}
                    id={consentForm.id}
                    text={consentForm.name}
                    onClick={handleListItemClick}
                    secondRow={
                      <div className="mx-3 text-xs">
                        {consentForm.services.map((service) => {
                          return (
                            <ServiceBadge
                              key={service.name}
                              name={service.name}
                              color={service.color}
                              textColor={service.textColor}
                            />
                          );
                        })}
                      </div>
                    }
                  />
                ))}
            </VList>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Add Consent</Button>
            </SheetClose>
          </SheetFooter>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
export default AddConsent;
