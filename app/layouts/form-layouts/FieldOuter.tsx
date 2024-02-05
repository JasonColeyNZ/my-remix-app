interface FieldOuterProps {
  children: any;
}

const FieldOuter = ({ children }: FieldOuterProps) => {
  return <div className="p-1 flex flex-1">{children}</div>;
};
export default FieldOuter;
