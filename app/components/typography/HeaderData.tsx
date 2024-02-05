interface HeaderDataProps {
  label: string;
  data: string;
}
const HeaderData = ({ label, data }: HeaderDataProps) => {
  return (
    <div className="px-0 flex-1 flex h-20 pr-1">
      <div
        className="text-md flex-1 self-center pr-[4px] whitespace-nowrap"
        // sx={{
        //   flex: "1 1 0",
        //   // position: "relative",
        //   // top: "8px",
        //   //pt: "6px",
        //   alignSelf: "center",
        //   pr: "4px",
        //   whiteSpace: "nowrap",
        //   // textAlign: "right",
        //   fontSize: "0.7em",
        // }}
      >
        {label}
      </div>
      <div
        className="text-md flex-1 relative self-center whitespace-nowrap text-gray-500"
        // sx={{
        //   flex: "1 1 0",
        //   position: "relative",
        //   fontSize: "0.7em",
        //   fontWeight: "bold",
        //   color: "#555",
        //   alignSelf: "center",
        //   // top: "-20px",
        //   whiteSpace: "nowrap",
        //   textAlign: "right",
        // }}
        // component={"div"}
      >
        {data}
      </div>
    </div>
  );
};
export default HeaderData;
