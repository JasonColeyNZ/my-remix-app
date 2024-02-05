import { cn } from "~/utils/shadcn.utils.ts";

interface FormSectionHeaderProps {
  title: string;
  children?: any;
  paddingTop?: string;
  textClass?: string;
  hrHidden?: boolean;
}

const FormSectionHeader = ({
  title,
  children,
  paddingTop = "",
  textClass,
  hrHidden = false,
}: FormSectionHeaderProps) => {
  return (
    <>
      <div className="flex flex-col w-full">
        <div className={cn("flex flex-row w-full", !hrHidden && "pt-[3px]")}>
          <div
            className={cn(
              paddingTop && `pt-[${paddingTop}]`,
              "text-sm font-medium select-none text-gray-500",
              textClass,
            )}
          >
            {title}
          </div>
          <div className="ml-auto mt-[-3px] flex flex-1">{children}</div>
        </div>
        <div className="w-full">{!hrHidden && <hr />}</div>
      </div>
    </>
  );
};
export default FormSectionHeader;
