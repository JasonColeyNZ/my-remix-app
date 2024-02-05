import React from "react";

import { Label } from "../ui/label.tsx";

const FormLabel = ({
  id,
  labelProps,
}: {
  id: string;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
}) => {
  return <Label htmlFor={id} {...labelProps} />;
};

export default FormLabel;
