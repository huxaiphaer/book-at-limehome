import React, { Fragment, useState, useEffect, useCallback } from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import Twpicker from "./TWpicker";

// @ts-ignore
const moment = extendMoment(originalMoment);

interface ICalenderProps {
  props: any;
  setValue: (start: string, end: string, value: any) => void,
  date: any
}
const Calender = ({ props, setValue, date}: ICalenderProps) => {
  const today = moment();
  const switchCaseHandle =  useCallback((value: string) => {
    let daterange = moment.range(today.clone(), today.clone());
    switch (value) {
      case "TD": {
        daterange = moment.range(today.clone(), today.clone());
        break;
      }
      case "YD": {
        daterange = moment.range(
          today.clone().subtract(1, "days"),
          today.clone()
        );
        break;
      }
      case "TW": {
        daterange = moment.range(
          today.clone().startOf("week"),
          today.clone().endOf("week")
        );
        break;
      }
      case "LW": {
        daterange = moment.range(
          today.clone().subtract(7, "days").startOf("week"),
          today.clone().subtract(7, "days").endOf("week")
        );
        break;
      }
      case "2W": {
        daterange = moment.range(
          today.clone().subtract(14, "days").startOf("week"),
          today.clone().subtract(7, "days").endOf("week")
        );
        break;
      }
      case "L30D": {
        daterange = moment.range(
          today.clone().subtract(31, "days"),
          today.clone()
        );
        break;
      }
      case "TM": {
        daterange = moment.range(
          today.clone().startOf("month"),
          today.clone().endOf("month")
        );
        break;
      }
      case "LM": {
        daterange = moment.range(
          today.clone().subtract(31, "days").startOf("month"),
          today.clone().subtract(31, "days").endOf("month")
        );
        break;
      }
      case "3M": {
        daterange = moment.range(
          today.clone().subtract(90, "days").startOf("month"),
          today.clone()
        );
        break;
      }
      case "6M": {
        daterange = moment.range(
          today.clone().subtract(180, "days").startOf("month"),
          today.clone()
        );
        break;
      }
      case "12M": {
        daterange = moment.range(
          today.clone().subtract(364, "days").startOf("month"),
          today.clone()
        );
        break;
      }
      case "TY": {
        daterange = moment.range(today.clone().startOf("year"), today.clone());
        break;
      }
      case "LY": {
        daterange = moment.range(
          today.clone().subtract(364, "days").startOf("year"),
          today.clone()
        );
        break;
      }
      default: {
        daterange = moment.range(today.clone(), today.clone());
        break;
      }
    }
    return daterange;
  },[today]);

  useEffect(() => {
    if (date.key !== "") {
      switchCaseHandle(date.key);
    }
  }, [date, switchCaseHandle]);

  const [Daterange, setDaterange] = useState(
    moment.range(date.startDate, date.endDate)
  );

  const onSelect = (value: any) => {
    setDaterange(value);
    setValue(value.start.format("YYYY-MM-DD"), value.end.format("YYYY-MM-DD"), "");
  };

  const renderSelectionValue = () => {
    return (
      <div>
        {Daterange.start.format("YYYY-MM-DD")}
        {" - "}
        {Daterange.end.format("YYYY-MM-DD")}
      </div>
    );
  };

  const TWHandle = (value: string) => {
    let daterange = switchCaseHandle(value);
    setDaterange(daterange);
    setValue(
      daterange.start.format("YYYY-MM-DD"),
      daterange.end.format("YYYY-MM-DD"),
      value
    );
  };

  return (
    <Fragment>
      <div className={'flex flex-col justify-center'}>
        <div className={'text-center'}>
          <h5>{renderSelectionValue()}</h5>
        </div>
        <DateRangePicker
          value={Daterange}
          onSelect={onSelect}
          singleDateRange={true}
          numberOfCalendars={2}
          minimumDate={new Date()}
        />
      </div>
       <Twpicker TWHandle={TWHandle} />
    </Fragment>
  );
};

export default Calender;
