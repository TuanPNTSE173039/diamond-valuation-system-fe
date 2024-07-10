import FilterAltIcon from "@mui/icons-material/FilterAlt";
import IconButton from "@mui/material/IconButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import * as React from "react";
import { useState } from "react";

export default function UIDateRangePicker() {
  const [fromDate, setFromDate] = useState(
    dayjs(new Date().toDateString()).subtract(7, "day"),
  );
  const [toDate, setToDate] = useState(dayjs(new Date().toDateString()));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePicker
          sx={{ width: "100px" }}
          label="From Date"
          value={fromDate}
          onChange={(newValue) => setFromDate(newValue)}
          // defaultValue={dayjs(new Date().toDateString()).subtract(7, "day")}
        />
        <DatePicker
          label="To Date"
          sx={{ width: "100px" }}
          value={toDate}
          onChange={(newValue) => setToDate(newValue)}
          // defaultValue={dayjs(new Date().toDateString())}
        />
        <IconButton>
          <FilterAltIcon />
        </IconButton>
      </DemoContainer>
    </LocalizationProvider>
  );
}
