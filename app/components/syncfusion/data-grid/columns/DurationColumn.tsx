import { appointmentDuration } from "~/utils/strings";

const DurationColumn = ({
  start,
  end,
}: {
  start: string | Date;
  end: string | Date;
}) => {
  return <div>{appointmentDuration(start, end)}</div>;
};

export default DurationColumn;
