// import { useState } from "react";
import { MdOutlineArchive } from "react-icons/md/index.js";
import { Button } from "~/components/ui/button";

import { letterIntent } from "../addLetterSchema";
import ObjectAdd from "~/components/object-add/ObjectAdd";
import ObjectRename from "~/components/object-rename/ObjectRename";

const Toolbar = () => {
  // const [hideOthers, setHideOthers] = useState(false);
  return (
    <div className="flex flex-row pt-2">
      <ObjectAdd
        formName={"letter-add"}
        postUrl={"/dashboard/settings/records/letters"}
        objectName={"Letter of Consent"}
        intent={letterIntent.ADD_LETTER}
      />
      <div className="flex ml-auto mr-2">
        <ObjectRename
          formName={"letter-rename"}
          postUrl={"/dashboard/settings/records/letters"}
          objectName={"Letter of Consent"}
          intent={letterIntent.RENAME}
          // setHideOthers={setHideOthers}
        />
        <Button variant="outline" className="h-8 text-primary-10 pl-1">
          <MdOutlineArchive className="pr-1 h-6 w-6" />
          Archive
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
