import { Transition } from "@headlessui/react";
import { Form } from "@remix-run/react";
import { useState } from "react";
import { MdDriveFileRenameOutline } from "react-icons/md/index.js";
import { Button } from "~/components/ui/button";
import TextInput from "../form-controls/text-input/TextInput";

interface ObjectRenameProps {
  formName: string;
  postUrl: string;
  objectName: string;
  intent: string;
}

const ObjectRename = ({
  formName,
  objectName,
  postUrl,
  intent,
}: ObjectRenameProps) => {
  const [show, setShow] = useState(false);
  return (
    <Form id={formName} method="POST" action={postUrl}>
      <input type="hidden" name="intent" value={intent} />
      <div className="flex flex-row ml-1 w-full text-center pr-[10px]">
        <Transition
          show={show}
          enter="transition-all ease-in-out duration-500 delay-200"
          enterFrom="opacity-0 translate-y-6"
          enterTo="opacity-100 translate-y-0"
          leave="transition-all ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex text-left ml-1">
            <TextInput
              labelProps={{ children: "" }}
              inputProps={{
                name: "name",
                autoFocus: true,
                className: "w-full h-8 bg-white",
                placeholder: `${objectName} name`,
              }}
              hideError={true}
            />
            <Button
              variant="secondary"
              className="ml-1 h-8 bg-primary-10 text-white"
              onClick={() => setShow(!show)}
            >
              Save
            </Button>
          </div>
        </Transition>
        <Button
          type="button"
          variant="outline"
          className="mx-auto text-primary-10 h-8 pl-1 hover:bg-primary-6 hover:text-primary-10"
          onClick={() => setShow(!show)}
        >
          <MdDriveFileRenameOutline className="h-6 w-6 mr-1" />
          Rename
        </Button>
      </div>
    </Form>
  );
};
export default ObjectRename;
