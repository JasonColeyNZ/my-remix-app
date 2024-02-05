interface FormLabelProps {
  text?: string;
}

const FormLabel = ({ text }: FormLabelProps) => {
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full max-h-[60px] overflow-hidden ">
          <div className="flex-1 pl-1.5 pt-0.5 pb-[1px] text-xs font-normal select-none text-gray-900">
            {text !== "undefined" ? text : ""}
          </div>
        </div>
      </div>
    </>
  );
};
export default FormLabel;
