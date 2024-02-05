interface FormRowProps {
  children: any;
}

const FormRow = ({ children }: FormRowProps) => {
  return <div className="flex flex-row flex-wrap">{children}</div>;
};
export default FormRow;
