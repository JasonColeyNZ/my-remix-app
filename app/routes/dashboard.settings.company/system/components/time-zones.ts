import timezones from "timezones-list";

//var moment = require("moment-timezone");

export type TimeZoneType = {
  label: string;
  value: string;
};

export const getTimeZoneOptions = (showTimezoneOffset: boolean) => {
  //var timeZones = moment.tz.names();
  //var offsetTmz = [];
  return timezones.map((tz) => {
    // var tzOffset = moment.tz(tz).format("Z");
    return {
      label: showTimezoneOffset ? tz.label : tz.tzCode,
      value: tz.tzCode,
    } as TimeZoneType;
  });
};
