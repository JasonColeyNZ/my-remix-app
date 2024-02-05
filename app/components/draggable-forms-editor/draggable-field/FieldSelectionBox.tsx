import { cn } from "~/utils/shadcn.utils.ts";

import { FieldParentType } from "../types.ts";

interface FieldSelectionBoxProps {
  parent?: FieldParentType;
}

const FieldSelectionBox = ({ parent }: FieldSelectionBoxProps) => {
  return (
    <div
      className={cn(
        "relative flex-auto",
        parent === FieldParentType.ROW && "my-1",
        parent === FieldParentType.TOOLBOX && "mt-[4px] mb-[4px]",
        "mr-0 bg-[#beffc288] rounded-[5px] border-[1px] border-solid border-[#beffc2]",
      )}
      // sx={{
      //   position: "relative",
      //   flex: "1 1 auto",
      //   marginTop: parent === FieldParentType.ROW ? "4px" : "",
      //   marginBottom: parent === FieldParentType.ROW ? "4px" : "",
      //   marginRight: 0,
      //   backgroundColor: "#beffc288",
      //   borderRadius: "5px",
      //   border: "1px solid #beffc2",
      // }}
    ></div>
  );
};
export default FieldSelectionBox;
