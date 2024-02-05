import { type ReactElement, useContext } from "react";
import { AppContext } from "~/store/appContext";
import { cn } from "~/utils/shadcn.utils";
// import type { ConformForm } from "~/utils/types";

import {
  FieldType,
  type FormDefinition,
} from "../draggable-forms-editor/types";
import FormRow from "./FormRow";
import { ClientOnly } from "remix-utils/client-only";
import { ScrollArea } from "../ui/scrollarea";

interface FormRowsProps {
  formDefinition: FormDefinition;
  fullHeight: boolean;
  topSummary?: ReactElement;
  // fields: Fieldset<{
  //   [x: string]: any;
  // }>;
  // form: ConformForm;
}

const FormRows = ({
  formDefinition,
  fullHeight,
  topSummary, // form,
} // fields,
: FormRowsProps) => {
  const { state } = useContext(AppContext);
  // console.log("FormRows state: ", state.formState.recordEditors);
  return (
    <ClientOnly>
      {() => (
        <ScrollArea>
          <div
            id="rows-outer"
            className={`flex flex-col h-full gap-2 pr-4 overflow-y-auto overflow-x-hidden`}
          >
            {topSummary && topSummary}
            {formDefinition.rows.map((row, rowIndex) => (
              <div
                className={cn(
                  "flex flex-row pl-1",
                  1 === formDefinition.rows.length && fullHeight
                    ? "flex-1"
                    : "",
                  state.formState.preview && "my-2",
                  row.controls.length === 1 &&
                    row.controls[0].field.fieldType === FieldType.RICHTEXT &&
                    // ((state.formState.preview && state.formState.formEditor) ||
                    // !state.formState.formEditor) &&
                    "overflow-y-auto border border-input cursor-pointer shadow-sm border-gray-300 rounded-md",

                  fullHeight && "overflow-hidden",
                )}
                id="row-outer"
                key={row.id}
              >
                <FormRow
                  row={row}
                  // fields={fields}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </ClientOnly>
  );
};

export default FormRows;
