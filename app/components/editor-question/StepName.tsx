import { useContext, useEffect, useRef } from "react";
import { cn } from "~/utils/shadcn.utils";

import { AppContext } from "~/store/appContext";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";
import { QuestionStateTypes } from "~/store/questionReducer";
import type { StepProps } from "./EditorQuestion";

const StepName = ({ visible, setNextEnabled }: StepProps) => {
  const { state, dispatch } = useContext(AppContext);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (visible) {
      setNextEnabled &&
        setNextEnabled(state.questionState.fieldDefinition.label.length > 0);
      ref.current?.focus();
    }
  }, [
    setNextEnabled,
    state.questionState.fieldDefinition.label.length,
    visible,
  ]);

  return (
    <div className={cn(visible ? "flex flex-col" : "hidden", "gap-2")}>
      <div className="flex flex-col">
        <Label htmlFor="name" className="px-1 whitespace-nowrap">
          Question
        </Label>
        <Input
          ref={ref}
          id="name"
          className="w-full bg-white"
          value={state.questionState.fieldDefinition.label}
          autoFocus={true}
          onChange={(e) => {
            // console.log("e.target.value", e.target.value);
            dispatch({
              type: QuestionStateTypes.fieldLabel,
              payload: { fieldLabel: e.target.value },
            });
          }}
        />
      </div>
      <div className="mt-2 flex flex-col">
        <Label htmlFor="description" className="px-1 whitespace-nowrap">
          Question Description
        </Label>
        <Textarea
          id="description"
          value={state.questionState.fieldDefinition.description}
          onChange={(e) => {
            dispatch({
              type: QuestionStateTypes.fieldDescription,
              payload: { fieldDescription: e.target.value },
            });
          }}
        />
      </div>
    </div>
  );
};

export default StepName;
