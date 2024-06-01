import { Avatar } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as React from "react";

const UIAutocomplete = ({ value, onChange, data }) => {
  return (
    <Autocomplete
      id="staff-select"
      sx={{ width: 500, zIndex: "999" }}
      options={data}
      value={value}
      onChange={onChange}
      autoHighlight
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.code === value.code}
      renderOption={(props, option) => (
        <Box key={option.code} component="li" {...props}>
          <Avatar sx={{ width: 40, height: 40, mr: 2 }}>{option.code}</Avatar>
          {option.label} - {option.years} yrs
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            autoComplete: "label", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default UIAutocomplete;
