interface SectionPageProps {
  id?: string;
  hideUI?: boolean;
  breadcrumbOnly?: boolean;
  children: React.ReactNode;
}

const SectionPage = ({
  id,
  hideUI,
  breadcrumbOnly = false,
  children,
}: SectionPageProps) => {
  return (
    <div
      id={id}
      className={`flex flex-row w-full flex-auto overflow-y-auto ${
        breadcrumbOnly ? "pt-0" : "notWide:pt-[9em]"
      }`}

      // sx={[
      //   {
      //     width: "100%",
      //     display: "flex",
      //     flex: "1 1 0%",
      //     flexDirection: "column",
      //     pt: "9em",
      //     height: "100%",
      //     backgroundColor: "#F4F5FA",
      //   },
      //   breadcrumbOnly && {
      //     pt: "4em",
      //   },
      // ]}
    >
      <div
        id={`${id}_content`}
        className={
          "flex flex-col w-full flex-1 p-0 lg:notWide:p-4 lg:notWide:pt-2"
        }

        // !hideUI && {
        //   paddingTop: 1,
        //   paddingBottom: 1,
        //   paddingLeft: { sm: 3, lg: 4 },
        //   paddingRight: { sm: 3, lg: 4 },
        // },
      >
        {children}
      </div>
    </div>
  );
};
export default SectionPage;
