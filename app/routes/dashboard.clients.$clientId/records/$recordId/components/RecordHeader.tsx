import { useNavigate } from "@remix-run/react";
import Button from "~/components/button/Button";
import HeaderData from "~/components/typography/HeaderData";
import { durationString } from "~/utils/strings.tsx";

interface RecordHeaderProps {
  record: any;
}

const RecordHeader = ({ record }: RecordHeaderProps) => {
  const navigate = useNavigate();

  if (!record)
    return (
      <>
        <div className="flex flex-row ml-auto px-2">
          <Button
            labelDefault={"Back"}
            // variant="contained"
            sx={{ py: "2px" }}
            url={null}
            // onClick={() => {
            //   navigate(`/dashboard/client/${record.clientId}/records`);
            // }}
          />
        </div>
      </>
    );

  return (
    <>
      <div className="flex flex-row flex-1 ml-auto px-2">
        <div className="flex-1">
          <HeaderData label={"Title"} data={record.title} />
          <HeaderData label={"Description"} data={record.description} />
        </div>
        <div className="flex-1">
          <HeaderData
            label={"Team Member"}
            data={`${record.user && record.user.firstName} ${
              record.user && record.user.lastName
            }`}
          />
          <HeaderData
            label={"Date"}
            data={
              record.datetime && new Date(record.datetime).toLocaleDateString()
            }
          />
        </div>
        <div className="flex-1">
          <HeaderData label={"Total Cost"} data={record.totalCost} />
          <HeaderData
            label={"Total Duration"}
            data={durationString(record.totalDuration)}
          />
        </div>
        <Button
          labelDefault={"Back"}
          // variant="contained"
          sx={{ py: "2px" }}
          url={null}
          onClick={() => {
            console.log("record: ", record);
            navigate(`/dashboard/client/${record.clientId}/records`);
          }}
        />
      </div>
    </>
  );
};
export default RecordHeader;
