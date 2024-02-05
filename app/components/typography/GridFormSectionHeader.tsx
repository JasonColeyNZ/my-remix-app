import FormSectionHeader from "./FormSectionHeader.tsx";

interface FormSectionHeaderProps {
  title: string;
}
const GridFormSectionHeader = ({ title }: FormSectionHeaderProps) => {
  return (
    <div className="w-full">
      <FormSectionHeader title={title} />
    </div>
  );
};
export default GridFormSectionHeader;
