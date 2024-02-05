import { useContext } from "react";
import {
  ControlType,
  FieldType,
} from "~/components/draggable-forms-editor/types";
import CheckList from "~/components/draggable-forms-editor/draggable-controls/DCCheckList";
import RadioList from "~/components/draggable-forms-editor/draggable-controls/DCRadioList";
import TextArea from "~/components/form-controls/text-area/TextArea";
import { AppContext } from "~/store/appContext";
import TextInput from "~/components/form-controls/text-input/TextInput";
import { FormProvider, getFormProps, useForm } from "@conform-to/react";
import { Form } from "@remix-run/react";

const ControlPreview = () => {
  const { state } = useContext(AppContext);

  //may need work here to show default values etc....
  const [form] = useForm({
    id: "qe-control-preview",
  });

  return (
    <div className="flex flex-col p-2 rounded-sm border-[1px] border-slate-200 max-h-72 overflow-hidden">
      <FormProvider context={form.context}>
        <Form {...getFormProps(form)}>
          {/* {state.questionState.fieldDefinition.controlType ===
            ControlType.RADIO && (
            <RadioList
              field={state.questionState.fieldDefinition}
              fieldName="name"
              // prop={{ name: "", defaultValue: "0" }}
            />
          )}
          {state.questionState.fieldDefinition.controlType ===
            ControlType.CHECKBOX && (
            <CheckList
              field={state.questionState.fieldDefinition}
              fieldName="name"
              // prop={{ name: "", defaultValue: "0" }}
            />
          )} */}
          {/* {state.questionState.fieldDefinition.fieldType ===
            FieldType.TEXTINPUT && (
            <TextInput
              labelProps={{
                children: state.questionState.fieldDefinition.label,
              }}
              fieldName="description"
              // inputProps={{ defaultValue: "" }}
              descriptionProps={{
                children: state.questionState.fieldDefinition.description,
              }}
              field={state.questionState.fieldDefinition}
            />
          )} */}
          {/* {state.questionState.fieldDefinition.fieldType ===
            FieldType.TEXTAREA && (
            <TextArea
              labelProps={{
                children: state.questionState.fieldDefinition.label,
              }}
              fieldName="description"
              // inputProps={{ defaultValue: "" }}
              descriptionProps={{
                children: state.questionState.fieldDefinition.description,
              }}
              field={state.questionState.fieldDefinition}
            />
          )} */}
        </Form>
      </FormProvider>
    </div>
  );
};

export default ControlPreview;
