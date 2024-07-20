import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEndDate, setStartDate } from "../../redux/filterSlice.js";

export default function UIDateRangePicker() {
  const common = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [error, setError] = useState(false); // New state for managing error visibility

  const handleStartDateChange = (newValue) => {
    if (newValue && dayjs(newValue).isAfter(dayjs(common.endDate))) {
      setError(true);
    } else {
      setError(false);
      dispatch(setStartDate(newValue));
    }
  };

  const handleEndDateChange = (newValue) => {
    if (newValue && dayjs(common.startDate).isAfter(dayjs(newValue))) {
      setError(true);
    } else {
      setError(false);
      dispatch(setEndDate(newValue));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <DemoContainer components={["DatePicker", "DatePicker"]}>
          <DatePicker
            sx={{ width: "100px" }}
            label="From Date"
            value={common.startDate}
            onChange={handleStartDateChange}
          />
          <DatePicker
            label="To Date"
            sx={{ width: "100px" }}
            value={common.endDate}
            onChange={handleEndDateChange}
          />
        </DemoContainer>

        {error && (
          <Typography color="error">
            Start date must be before end date.
          </Typography>
        )}
      </Box>
    </LocalizationProvider>
  );
}
