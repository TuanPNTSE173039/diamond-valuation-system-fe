import { Avatar } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
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
        <Box
          key={option.code}
          component="li"
          {...props}
          sx={{ display: "flex", flexDirection: "row", width: "100%", gap: 3 }}
        >
          <Avatar sx={{ width: 40, height: 40, mr: 2 }}>{option.code}</Avatar>
          <Tooltip title="Full Name">
            <Typography sx={{ flex: 1 }}>{option.label}</Typography>
          </Tooltip>
          <Tooltip title="Years Experience">
            <Typography sx={{ width: "10%" }}>{option.years} yrs</Typography>
          </Tooltip>
          <Tooltip title="Current Appointments">
            <Typography sx={{ width: "10%" }}>{option.curProjects}</Typography>
          </Tooltip>
          <Tooltip title="Total Appointments">
            <Typography sx={{ width: "10%" }}>
              {option.totalProjects}
            </Typography>
          </Tooltip>
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
