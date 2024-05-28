import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import * as React from "react";

export default function UIDatePicker({ label, value, onChange, disabled }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={label}
          sx={{ width: "100%" }}
          value={value}
          onChange={(newValue) => onChange(newValue)}
          format="DD-MM-YYYY"
          disabled={disabled}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
