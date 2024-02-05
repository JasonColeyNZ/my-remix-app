import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { MdAddCircle } from "react-icons/md/index.js";
import { Button } from "~/components/ui/button.tsx";

import { addFormSchema } from "../addFormSchema.ts";
import type { loader } from "../route.tsx";
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
import TextInput from "~/components/form-controls/text-input/TextInput.tsx";
import { FormProvider, getFormProps, useForm } from "@conform-to/react";
import { cn } from "~/utils/shadcn.utils.ts";
import TextArea from "~/components/form-controls/text-area/TextArea.tsx";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";

const AddForm = () => {
  const { areaTypes } = useLoaderData<typeof loader>();
  const [open, setOpen] = useState(false);
  // const navigate = useNavigate();
  const [selectedAreaId, setSelectedAreaId] = useState<string>("");

  const [form] = useForm({
    id: "add-form",
    constraint: getZodConstraint(addFormSchema),
    defaultValue: undefined,
    // lastSubmission:
    //   dataSubmitFetcher.data?.status === "error"
    //     ? dataSubmitFetcher.data.submission
    //     : undefined,
    // shouldValidate: "onBlur",
    onValidate({ formData }) {
      const parsed = parseWithZod(formData, {
        schema: addFormSchema,
      });
      if (parsed.status !== "success")
        console.log("onValidate: formData.error", parsed.error);
      return parsed;
    },
  });

  // const formDefinition = useMemo(() => {
  //   return addFormFormDefinition(areaTypes);
  // }, [areaTypes]);

  // const closeForm = () => {
  //   setOpen(false);
  // };

  // const onSuccessfulSave = (data: any) => {
  //   // console.log("onSuccessfulSave", data);
  //   closeForm();
  //   navigate(`/dashboard/settings/records/forms/${data.id}`);
  // };

  const handleListItemClick = (id: string) => {
    // console.log("handleListItemClick: ", id);
    setSelectedAreaId(id);
  };

  return (
    <Sheet>
      <FormProvider context={form.context}>
        <Form
          method="POST"
          {...getFormProps(form)}
          className="flex flex-col h-full"
        >
          <SheetTrigger asChild>
            <Button
              variant="link"
              className="ml-1 rounded-2xl p-0 bg-primary hover:bg-primary-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedAreaId("");
                // dispatch({
                //   type: open
                //     ? FormStateTypes.removeRecordEditor
                //     : FormStateTypes.addRecordEditor,
                //   payload: {
                //     recordEditor: AreaType.ADDFORM,
                //   },
                // });

                setOpen(!open);
              }}
            >
              <MdAddCircle className="h-9 w-8 text-white " />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col bg-card w-[220px] xl:w-[300px] p-0"
          >
            <input
              type="hidden"
              name="intent"
              value={formViewerIntent.CREATE}
            />
            <input type="hidden" name="area" value={selectedAreaId} />
            <SheetHeader className="p-3">
              <SheetTitle>Create New Form</SheetTitle>
              <SheetDescription>Select a form below.</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col flex-1 p-3">
              <div className="">
                <div className="text-sm font-light text-foreground">
                  Form Type
                </div>
                <div className="mt-1 group/outer border rounded-md bg-header shadow-md mb-4 overflow-hidden ">
                  <div className="flex flex-col p-2 gap-1">
                    {areaTypes &&
                      areaTypes.map((areaType, index) => (
                        <Button
                          type="button"
                          autoFocus={index === 0}
                          variant="toggle"
                          className={cn(
                            "normal-case flex w-full text-foreground shadow-none text-left border h-9 p-2 my-px",
                            // "hover:bg-primary-3 focus:outline-none focus:ring focus:ring-primary-3",
                            // "group/outer:focus:border-primary-6 group-focus/outer:bg-primary-6 group-focus/outer:text-white",
                            selectedAreaId === areaType.value
                              ? "text-white bg-primary-7 focus-visible:bg-primary-7 focus:bg-primary-7 hover:bg-primary-7 border-primary-7"
                              : "",
                          )}
                          key={areaType.value}
                          id={areaType.value}
                          onClick={() => handleListItemClick(areaType.value)}
                        >
                          {areaType.text}
                        </Button>
                      ))}
                  </div>
                </div>
              </div>
              <TextInput
                labelProps={{ children: "Form Name" }}
                fieldName="name"
              />
              <TextArea
                labelProps={{ children: "Description" }}
                fieldName="description"
                field={null}
              />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Add Form</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Form>
      </FormProvider>
    </Sheet>
  );
};
export default AddForm;
