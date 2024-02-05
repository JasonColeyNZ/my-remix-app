import { useEffect, useState } from "react";
import { cn } from "~/utils/shadcn.utils.ts";

import type { FieldDefinition } from "../types.ts";

interface DraggableFieldProps {
  type?: string;
  field: FieldDefinition;
  disabled?: boolean;
  toolbox?: boolean;
  preview?: boolean;
  register?: any;
  setValue?: any;
}

const BloodPressure = ({
  type = "text",
  field,
  disabled = false,
  toolbox = false,
  preview = false,
  register,
  setValue,
}: DraggableFieldProps) => {
  const [stolic, setStolic] = useState(0);
  const [diastolic, setDiastolic] = useState(0);
  const [text, setText] = useState("");
  const [alert, setAlert] = useState("");
  const [severity, setSeverity] = useState<
    "success" | "error" | "warning" | "info" | undefined
  >(undefined); //["success", "error", "warning", "info"
  const [bloodValue, setBloodValue] = useState("");

  const handleChange = (e: any) => {
    setValue(field.id, e.target.value);
    setBloodValue(e.target.value);
    if (/^\d{1,3}\/\d{1,3}$/.test(e.target.value)) {
      const [stolic, diastolic] = e.target.value.split("/");
      setStolic(Number(stolic));
      setDiastolic(Number.parseInt(diastolic));
    } else {
      setStolic(0);
      setDiastolic(0);
    }
  };

  useEffect(() => {
    setAlert("");
    setText("");
    setSeverity(undefined);
    if (stolic === 0 || diastolic === 0) return;

    if (stolic > 180 || diastolic > 120) {
      setText("Hypertensive Crisis");
      setAlert("ER");
      setSeverity("error");
      return;
    } else if (stolic >= 140 || diastolic >= 90) {
      setText("High");
      setAlert("Hypertension Stage 2");
      setSeverity("warning");
      return;
    } else if (stolic < 120 && diastolic < 80) {
      setText("Normal");
      setSeverity("success");
      return;
    } else if (stolic < 129 && diastolic < 80) {
      setText("Elevated");
      setSeverity("info");
      return;
    } else {
      setText("High");
      setAlert("Hypertension Stage 1");
      setSeverity("warning");
      return;
    }
  }, [stolic, diastolic]);

  return (
    <>
      <div className="flex flex-row w-full">
        <div className={cn("w-full", !preview && "w-[110px]")}>
          {register && <input type="hidden" {...register(field.id)} />}
          {/* <TextField
            sx={[
              !preview && {
                margin: "2px !important",
              },

              disabled && {
                "& input": {
                  cursor: "grab",
                  padding: "2px",
                  userSelect: "none",
                },
                "& label": {
                  userSelect: "none",
                  cursor: "grab",
                  color: "black",
                },
              },
            ]}
            type={type}
            //inputProps={{ type: { type }, sx: { py: 0.5 } }}
            disabled={disabled}
            size="small"
            //name={field.id}
            label={field.shortLabel && toolbox ? field.shortLabel : field.label}
            variant={preview ? "outlined" : "filled"}
            value={bloodValue}
            onChange={handleChange}
            required={field.validation.required}
          /> */}
        </div>
        {preview && (
          <div className="flex-1 text-center ml-1">
            {severity && (
              <></>
              // <Alert
              //   severity={severity}
              //   sx={{
              //     p: 0,
              //     height: "100%",
              //     display: "flex",
              //     alignItems: "center",
              //     "& .MuiAlert-message": { p: 0, width: "100%" },
              //     "& .MuiAlert-icon": { m: 0 },
              //   }}
              // >
              //   <Typography component={"div"} variant={"body2"}>
              //     {text}
              //   </Typography>
              //   <Typography component={"div"} variant={"caption"}>
              //     {alert}
              //   </Typography>
              // </Alert>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default BloodPressure;
