// import type {
//   FieldMetadata,
//   Pretty,
//   Primitive,
// } from "#node_modules/@conform-to/react/context";
// import { getFormControlProps } from "#node_modules/@conform-to/react/helpers";

function getAriaAttributes(metadata: any, options: any) {
  var options =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (
    typeof options.ariaAttributes !== "undefined" &&
    !options.ariaAttributes
  ) {
    return {};
  }
  var invalid =
    options.ariaInvalid === "allErrors"
      ? !metadata.valid
      : typeof metadata.errors !== "undefined";
  var ariaDescribedBy = options.ariaDescribedBy;
  return simplify({
    "aria-invalid": invalid || undefined,
    "aria-describedby": invalid
      ? ""
          .concat(metadata.errorId, " ")
          .concat(
            ariaDescribedBy !== null && ariaDescribedBy !== void 0
              ? ariaDescribedBy
              : "",
          )
          .trim()
      : ariaDescribedBy,
  });
}

function getFieldsetProps(metadata: any, options: any) {
  return simplify({
    id: metadata.id,
    name: metadata.name,
    form: metadata.formId,

    ...getAriaAttributes(metadata, options),
  });
}

function getFormControlProps(metadata: any, options: any) {
  return simplify({
    key: metadata.key,
    required: metadata.required || undefined,
    ...getFieldsetProps(metadata, options),
  });
}

function simplify(props: any) {
  for (var key in props) {
    if (props[key] === undefined) {
      delete props[key];
    }
  }
  return props;
}

export function getAutoCompleteProps(metadata: any, options?: any) {
  var options =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var props = {
    ...getFormControlProps(metadata, options),
    multiple: metadata.multiple,
  };
  if (typeof options.value === "undefined" || options.value) {
    props.defaultValue = Array.isArray(metadata.initialValue)
      ? metadata.initialValue.map((item: any) =>
          "".concat(item !== null && item !== void 0 ? item : ""),
        )
      : metadata.initialValue;
  }
  return simplify(props);
}

export {};
