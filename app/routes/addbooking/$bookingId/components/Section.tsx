import { Separator } from "~/components/ui/separator";

const Section = ({
  children,
  header,
}: {
  children: React.ReactNode;
  header?: string;
}) => {
  return (
    <div
      id="client-page-layout"
      className="flex-col bg-card rounded-md shadow-card border-0 overflow-clip w-full flex"
    >
      <div className="text-xs font-medium text-foreground text-center p-1">
        {header}
      </div>
      <Separator />
      <div className="p-2">{children}</div>
    </div>
  );
};

export default Section;
