import React, { useState } from "react";
import "react-daterange-picker/dist/css/react-calendar.css"; // For some basic styling. (OPTIONAL)
import Select from "react-select";
import Calendar  from "./Calendercomponent";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
// @ts-ignore
const moment = extendMoment(originalMoment);

interface IDateRangeComponentProps {
  valueChanged: (value: any) => void;
  itemCode: any;
  initialValue: any;
}
const DateRangeComponent = ({ valueChanged, itemCode, initialValue }: IDateRangeComponentProps) => {

  const [date, Setdate] = useState({
    startDate: initialValue.startDate,
    endDate: initialValue.endDate,
    key:  initialValue.key,
  });

  const customStyles = {
    menu: (provided: any, state: any) => ({
      ...provided,
      width: state.selectProps.width,
      height: state.selectProps.height,
      borderBottom: "1px dotted pink",
      color: state.selectProps.menuColor,
      padding: 20,

    }),
    input: (provided: any, state: any) => ({
      ...provided,
      padding: ".77em",
      textAlign: "center",
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      return { ...provided, opacity, transition };
    },
  };

  const selectLable = (date: any) => {
    const startDate =
      moment(date.startDate).format("MMM").toUpperCase() +
      " " +
      moment(date.startDate).format("DD");
    const endDate =
      moment(date.endDate).format("MMM").toUpperCase() +
      " " +
      moment(date.endDate).format("DD");
    return startDate + " - " + endDate;
  };
  const setValue = (startdate: string, enddate: string, key: any) => {
    Setdate({ startDate: startdate, endDate: enddate, key: key });
  };

  const CustomCalender = (props: any) => {
    return <Calendar props={props} setValue={setValue} date={date} />;
  };
  return (
    <Select
      options={[{ label: "", value: "" }]}
      value={{
        label: selectLable(date),
        value: date.startDate,
      }}
      components={{ Option: CustomCalender }}
      onMenuClose={() => {
        let value = date;
        valueChanged(value);
      }}
      styles={customStyles}
      maxMenuHeight="500"
      closeMenuOnSelect={false}
    />
  );
};
export default DateRangeComponent;
