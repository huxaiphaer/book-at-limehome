import React, { useState } from "react";
import DropdownMenu, { DropdownItem } from "@atlaskit/dropdown-menu";

const Twpicker = ({ TWHandle }: {TWHandle: (value: string) => void}) => {
  const [Range, setRange] = useState({
    name: "Date range Template",
    value: null,
  });

  const DropdownChangeHandle = (name: string, value: any) => {
    setRange({ name: name, value: value });
    TWHandle(value);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <DropdownMenu
        trigger={Range.name}
        triggerType="button"
        isMenuFixed={true}
        appearance="tall"
        shouldFitContainer={true}
      >
        <DropdownItem
          onClick={() => {
            DropdownChangeHandle("Today", "TD");
          }}
        >
          Today
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            DropdownChangeHandle("Yesterday", "YD");
          }}
        >
          Yesterday
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            DropdownChangeHandle("This Week", "TW");
          }}
        >
          This Week
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            DropdownChangeHandle("Last Week", "LW");
          }}
        >
          Last Week
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            DropdownChangeHandle("Last 2 Week", "2W");
          }}
        >
          Last 2 Week
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            DropdownChangeHandle("Last 30 Days", "L30D");
          }}
        >
          Last 30 Days
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            DropdownChangeHandle("This Month", "TM");
          }}
        >
          This Month
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            DropdownChangeHandle("Last Month", "LM");
          }}
        >
          Last Month
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            DropdownChangeHandle("Last 3 Months", "3M");
          }}
        >
          Last 3 Months
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            DropdownChangeHandle("Last 6 Months", "6M");
          }}
        >
          Last 6 Months
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            DropdownChangeHandle("Last 12 Months", "12M");
          }}
        >
          Last 12 Months
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            DropdownChangeHandle("This Year", "TY");
          }}
        >
          This Year
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            DropdownChangeHandle("Last Year", "LY");
          }}
        >
          Last Year
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            DropdownChangeHandle("Custom", "Custom");
          }}
        >
          Custom
        </DropdownItem>
      </DropdownMenu>
    </div>
  );
};

export default Twpicker;
