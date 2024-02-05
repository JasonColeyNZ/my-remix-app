import { useEffect, useState } from "react";

import TimeColumn from "./TimeColumn.tsx";

type TimeitProps = {
  onChange?: (value: string) => any;
  defaultValue?: string;
  minuteExclude?: Array<number>;
  hourExclude?: Array<number>;
  notShowExclude?: boolean;
};

const Timeit = ({
  onChange,
  defaultValue,
  minuteExclude,
  hourExclude,
  notShowExclude,
}: TimeitProps) => {
  const [hour, setHour] = useState(
    defaultValue ? defaultValue.split(":")[0] : "0",
  );
  const [minute, setMinute] = useState(
    defaultValue ? defaultValue.split(":")[1] : "0",
  );

  useEffect(() => {
    onChange && onChange(`${hour}:${minute}`);
  }, [hour, minute, onChange]);

  return (
    <div className="flex gap-1">
      <TimeColumn
        notShowExclude={notShowExclude}
        start={0}
        end={23}
        value={hour}
        setValue={setHour}
        exclude={hourExclude}
      />
      <TimeColumn
        notShowExclude={notShowExclude}
        start={0}
        end={55}
        interval={5}
        value={minute}
        setValue={setMinute}
        exclude={minuteExclude}
      />
    </div>
  );
};

export default Timeit;
