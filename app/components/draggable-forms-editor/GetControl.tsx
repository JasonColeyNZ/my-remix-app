// import DraggableControl from "../draggable-forms-editor/draggable-field/DraggableControl.tsx";
import { ControlType, FieldParentType, FieldType } from "./types.ts";
import type { FieldDefinition } from "./types.ts";
import Address from "../form-controls/address/Address.tsx";
import CheckBoxField from "../form-controls/checkbox/CheckBox.tsx";
// import BloodPressure from "./BloodPressure.tsx";
import CheckList from "./draggable-controls/DCCheckList.tsx";
import DateTime from "./draggable-controls/DCDateTime.tsx";
import Header from "./draggable-controls/DCHeader.tsx";
import Paragraph from "./draggable-controls/DCParagraph.tsx";
import RadioList from "./draggable-controls/DCRadioList.tsx";
import Signature from "./draggable-controls/DCSignature.tsx";
// import TextAreaDraggable from "./TextArea.tsx";
import TextInputDraggable from "./draggable-controls/DCTextInput.tsx";
import DCRichText from "./draggable-controls/DCRichText.tsx";
import EditorTextField from "./draggable-controls/DCTextSkeleton.tsx";
import TextAreaDraggable from "./draggable-controls/DCTextArea.tsx";
import AutocompleteDraggable from "./draggable-controls/DCAutocomplete.tsx";
import { TimeitDraggable } from "./draggable-controls/DCTimeit.tsx";
import { ColorPickerDraggable } from "./draggable-controls/DCColorPicker.tsx";
import UploadButtonViewer from "../file-upload/FileUpload.tsx";
import TextViewer from "../text-viewer/TextViewer.tsx";
import ProductSelectList from "../form-controls/products-on-service-select/ProductSelectList.tsx";
import ServiceSelectList from "../form-controls/services-on-product-select/ServiceSelectList.tsx";
import ServiceAddon from "../form-controls/service-addon/ServiceAddon.tsx";

const GetControl = (
  parent: FieldParentType,
  field: FieldDefinition,
  disabled: boolean = true,
  focus: boolean,
  // formRef: RefObject<HTMLFormElement>,
  defaultValue?: any,
) => {
  if (!field) return null;
  // console.log(parent);
  if (parent === FieldParentType.TOOLBOX) {
    return (
      <EditorTextField
        labelProps={{
          children: field.label,
        }}
        readonly={true}
        clipLabel={true}
        field={field}
      />
    );

    //   // console.log("Toolbox: ", field);
    //   return (
    //     <DraggableControl
    //       label={field.label}
    //       icon={undefined}
    //     />
    //   );
  }
  // console.log("Field: ", field);

  // console.log("Field.type: ", field.type);
  switch (field.fieldType) {
    case FieldType.PARAGRAPH:
      return <Paragraph field={field} />;
    case FieldType.HEADER:
      return <Header field={field} disabled={disabled} />;
    // case "texttemplate":
    //   if (parent === FieldParentType.VIEWER) {
    //     return <TextViewer defaultValue={defaultValue} field={field} />;
    //   } else
    //     return (
    //       <TextTemplate
    //         field={field}
    //         prop={fields[field.id]}
    //         disabled={disabled}
    //         preview={preview}
    //         showTemplates={false}
    //       />
    //     );
    case FieldType.IMAGEUPLOAD:
      return (
        <UploadButtonViewer
          field={field}
          fieldName={field.id}
          disabled={parent === FieldParentType.VIEWER}
          defaultValue={defaultValue}
          // config={fields[field.id]}
        />
      );
    case FieldType.ADDRESS:
      return (
        <Address
          // formRef={formRef}
          fieldName={field.id}
          // field={field}
          // address={fields.address}
          // disabled={parent === FieldParentType.VIEWER || !preview}
          // defaultValue={defaultValue}
        />
      );
    // case "bloodpressure":
    //   if (parent === FieldParentType.VIEWER) {
    //     return <TextViewer defaultValue={defaultValue} field={field} />;
    //   } else
    //     return (
    //       <BloodPressure
    //         field={field}
    //         disabled={disabled}
    //         preview={preview}
    //         // register={register}
    //         // setValue={setValue}
    //       />
    //     );
    case FieldType.RICHTEXT:
      if (parent === FieldParentType.VIEWER) {
        return <TextViewer defaultValue={defaultValue} field={field} />;
      }
      // else if (!preview)
      //   return (
      //     <TextInputDraggable
      //       field={field}
      //       prop={fields[field.id]}
      //       disabled={disabled}
      //       preview={preview}
      //       focus={focus}
      //     />
      //   );
      else
        return (
          <DCRichText
            field={field}
            fieldName={field.id}
            // prop={fields[field.id]}
            disabled={disabled}
            showTemplates={false}
            // defaultValue={defaultValue}
          />
        );
    case FieldType.TIMEITSELECT:
      if (parent === FieldParentType.VIEWER) {
        return <TextViewer defaultValue={defaultValue} field={field} />;
      } else
        return (
          <TimeitDraggable
            field={field}
            fieldName={field.id}
            // prop={fields[field.id]}
          />
        );
    case FieldType.PRODUCTSELECT:
      return (
        <ProductSelectList
          // formRef={formRef}
          options={field.options}
          // prop={fields[field.id]}
          fieldName={field.id}
          labelProps={{
            children: field.label,
          }}
          field={field}
          descriptionProps={{
            children: field.description,
          }}
        />
      );
    case FieldType.SERVICESELECT:
      return (
        <ServiceSelectList
          fieldName={field.id}
          // formRef={formRef}
          // prop={fields[field.id]}
          options={field.options}
          labelProps={{
            children: field.label,
          }}
          field={field}
          descriptionProps={{
            children: field.description,
          }}
        />
      );
    case FieldType.SERVICEADDON:
      return (
        <ServiceAddon
          // formRef={formRef}
          // prop={fields[field.id]}
          options={field.options}
          labelProps={{
            children: field.label,
          }}
          field={field}
          fieldName={field.id}
          descriptionProps={{
            children: field.description,
          }}
        />
      );
    case FieldType.COLORPICKER:
      if (parent === FieldParentType.VIEWER) {
        return <TextViewer defaultValue={defaultValue} field={field} />;
      } else
        return (
          <ColorPickerDraggable
            field={field}
            fieldName={field.id}
            // prop={fields[field.id]}
            // errors={fields[field.id]. errors}
          />
        );

    case FieldType.SIGNATURE:
      return (
        <Signature
          field={field}
          fieldName={field.id}
          disabled={disabled}
          // prop={fields[field.id]}
        />
      );
    case FieldType.TEXTINPUT:
      if (parent === FieldParentType.VIEWER) {
        return <TextViewer defaultValue={defaultValue} field={field} />;
      } else
        return (
          <TextInputDraggable
            field={field}
            fieldName={field.id}
            // prop={fields[field.id]}
            disabled={disabled}
            focus={focus}
          />
        );
    // case "number":
    //   if (parent === FieldParentType.VIEWER) {
    //     return <TextViewer defaultValue={defaultValue} field={field} />;
    //   } else
    //     return (
    //       <TextInputDraggable
    //         type="number"
    //         field={field}
    //         disabled={disabled}
    //         preview={preview}
    //         defaultValue={defaultValue}
    //       />
    //     );
    case FieldType.TEXTAREA:
      if (parent === FieldParentType.VIEWER) {
        return <TextViewer defaultValue={defaultValue} field={field} />;
      } else
        return (
          <TextAreaDraggable
            field={field}
            fieldName={field.id}
            // prop={fields[field.id]}
            disabled={disabled}
            focus={focus}
          />
        );
    // case "checklist":
    //   return (
    //     <CheckList
    //       field={field}
    //       disabled={disabled}
    //       preview={preview}
    //       // control={control}
    //       // setValue={setValue}
    //     />
    //   );
    case FieldType.CHECKBOX:
      return (
        <CheckBoxField
          labelProps={{ children: field.label }}
          fieldName={field.id}
          // inputProps={{
          //   ...conform.input(fields[field.id]),
          //   autoFocus: focus,
          //   disabled: disabled,
          //   required: field.validation?.required,
          // }}
          hideError={false}
        />
      );
    // case "radio":
    //   return <div>Radio</div>;
    // case "radiolist":
    //   return (
    //     <RadioList
    //       field={field}
    //       disabled={disabled}
    //       preview={preview}
    //       // setValue={setValue}
    //       // register={register}
    //     />
    //   );
    case FieldType.DATETIME:
      // console.log("parent: ", parent);
      if (parent === FieldParentType.VIEWER) {
        return <TextViewer defaultValue={defaultValue} field={field} />;
      } //if (preview)
      else
        return (
          <DateTime
            field={field}
            fieldName={field.id}
            // prop={fields[field.id]}
          />
        );
    // else
    //   return (
    //     <TextInputDraggable
    //       field={field}
    //       disabled={true}
    //       toolbox={true}
    //       preview={preview}
    //     />
    //   );
    // case "file":
    //   return <div>File</div>;
    // case "image":
    //   return <div>Image</div>;
    case FieldType.SELECT:
      //   //console.log("Select: ", field)
      switch (field.controlType) {
        case ControlType.RADIO:
          return (
            <RadioList
              field={field}
              fieldName={field.id}
              disabled={parent === FieldParentType.VIEWER || disabled}
              // prop={fields[field.id]}
            />
          );
        case ControlType.CHECKBOX:
          return (
            <CheckList
              field={field}
              fieldName={field.id}
              // prop={fields[field.id]}
            />
          );
        //     case "radio":
        //       return (
        //         <RadioList
        //           field={field}
        //           disabled={parent === FieldParentType.VIEWER || disabled}
        //           preview={preview}
        //           // setValue={setValue}
        //           // register={register}
        //         />
        //       );
        case ControlType.SELECT:
        default:
          if (parent === FieldParentType.VIEWER) {
            return <TextViewer defaultValue={defaultValue} field={field} />;
          }
          // else if (!preview) {
          //   return (
          //     <TextInputDraggable
          //       field={field}
          //       prop={fields[field.id]}
          //       disabled={true}
          //       toolbox={true}
          //       focus={focus}
          //     />
          //   );
          // }
          else
            return (
              <AutocompleteDraggable
                field={field}
                fieldName={field.id}
                // prop={fields[field.id]}
                disabled={disabled}
                defaultValue={defaultValue}
                multiple={field.displayOptions?.multiple}
                focus={focus}
              />
            );
      }
    default:
      return <div></div>;
  }
};

export default GetControl;
