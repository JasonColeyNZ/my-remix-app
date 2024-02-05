import { useEffect, useState } from "react";
import { cn } from "~/utils/shadcn.utils.ts";

type TimeColumnType = {
  start: number;
  end: number;
  setValue: (value: string) => void;
  value: string;
  exclude?: Array<number>;
  notShowExclude?: boolean;
  interval?: number;
};

const TimeColumn = ({
  start,
  end,
  setValue,
  value,
  exclude = [],
  notShowExclude,
  interval = 1,
}: TimeColumnType) => {
  const [selectorMove, setSelectorMove] = useState<number>(+value ? +value : 0);

  const timeArray: (string | number)[] = [];
  for (let time = start; time <= end; time++) {
    if (notShowExclude) !exclude?.includes(time) && timeArray.push(time);
    else {
      if (time % interval === 0) timeArray.push(time);
    }
  }

  useEffect(() => {
    let prev = selectorMove;
    if (exclude?.includes(prev)) {
      while (exclude?.includes(prev)) {
        prev = prev + 1;
        setSelectorMove(prev);
      }
    }
  }, [exclude, selectorMove]);

  useEffect(() => {
    setValue(
      selectorMove.toString().length === 1
        ? `${selectorMove}`
        : selectorMove.toString(),
    );
  }, [selectorMove, setValue]);

  const controlBottom = () => {
    let prev = selectorMove;
    if (prev !== end) {
      if (exclude?.includes(prev + interval)) {
        while (exclude?.includes(prev + interval)) {
          if (prev + (interval + 1) > end) {
            return setSelectorMove(start);
          }
          prev = prev + interval;
          setSelectorMove(prev + interval);
        }
      } else {
        return setSelectorMove(prev + interval);
      }
    } else {
      return setSelectorMove(start);
    }
  };

  const controlTop = () => {
    let prev = selectorMove;
    if (prev !== start) {
      if (exclude?.includes(prev - interval)) {
        while (exclude?.includes(prev - interval)) {
          if (prev - (interval + 1) < start) {
            return setSelectorMove(end);
          }
          prev = prev - interval;
          setSelectorMove(prev - interval);
        }
      } else {
        return setSelectorMove(prev - interval);
      }
    } else {
      let endnumber = end;
      if (exclude?.includes(end)) {
        while (exclude?.includes(endnumber - interval)) {
          endnumber = endnumber - interval;
          setSelectorMove(endnumber - interval);
        }
      } else {
        return setSelectorMove(end);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="hover:opacity-50 cursor-pointer transition-opacity "
        onClick={controlTop}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-transparent stroke-primary "
          // sx={{
          //   color: "transparent",
          //   "& path": {
          //     stroke: (theme) => theme.palette.primary.main,
          //   },
          // }}
        >
          <path
            d="M19.9201 15.0499L13.4001 8.52989C12.6301 7.75989 11.3701 7.75989 10.6001 8.52989L4.08008 15.0499"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className=" relative flex flex-col items-center h-[128px] w-[64px] overflow-hidden user-select-none">
        <div className="w-full h-[40px] bg-primary absolute top-[39px] rounded-2xl"></div>
        {/* sx={{
            width: "100%",
            height: "40px",
            backgroundColor: (theme) => theme.palette.primary.main,
            position: "absolute",
            top: "39px",
            borderRadius: "8px",
          }}
        /> */}
        <div
          className="w-full flex flex-col items-center leading-[40px] text-[20px] transition-transform duration-500 pt-[40px]"
          style={{
            transform: `translateY(-${
              selectorMove && timeArray.indexOf(selectorMove) * 40
            }px)`,
          }}
        >
          {timeArray.map((time) => (
            <div
              className={cn(
                "z-index-1 text-primary opacity-50 transition-colors duration-500",
                time === selectorMove && "text-white opacity-100",
                exclude.includes(+time) && "opacity-20",
              )}
              // {
              //   zIndex: "1",
              //   color: (theme) => theme.palette.primary.main,
              //   opacity: "0.5",
              //   transition: "color 0.5s",
              // },
              // +time === selectorMove && {
              //   color: "#fff",
              //   opacity: "1",
              // },
              // exclude.includes(+time) && {
              //   opacity: "0.2 !important",
              // },
              key={time}
            >
              {time.toString().length === 1 ? `0${time}` : time}
            </div>
          ))}
        </div>
      </div>
      <div
        className="hover:opacity-50 cursor-pointer transition-opacity"
        // sx={{
        //   cursor: "pointer",
        //   transition: "opacity 0.5s",
        //   "&:hover": {
        //     opacity: 0.5,
        //   },
        // }}
        onClick={controlBottom}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-transparent stroke-primary"
          // sx={{
          //   color: "transparent",
          //   "& path": {
          //     stroke: (theme) => theme.palette.primary.main,
          //   },
          // }}
        >
          <path
            d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default TimeColumn;
