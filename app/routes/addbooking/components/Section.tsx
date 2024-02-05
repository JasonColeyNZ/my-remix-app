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
      className="flex-col bg-card rounded-md shadow-card border-0 overflow-clip w-full flex p-2"
    >
      <div className="text-xs font-medium text-foreground text-center">
        {header}
      </div>
      {children}
    </div>
  );
};

export default Section;
