import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import * as React from "react";

export default function UIDatePicker({
  label,
  value,
  onChange,
  disabled,
  ...others
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} {...others}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={label}
          value={value}
          onChange={(newValue) => onChange(newValue)}
          format="DD-MM-YYYY"
          disabled={disabled}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
