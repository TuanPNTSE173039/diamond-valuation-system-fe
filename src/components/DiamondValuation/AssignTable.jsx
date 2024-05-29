import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { rows } from "../../dataset/DiamondValuation.js";
import DiamondValuationFieldGroup from "./FieldGroup.jsx";

const DiamondValuationAssignTable = ({ detailState }) => {
  const [valuationMode, setValuationMode] = useState("One");
  const [switches, setSwitches] = useState(
    rows.map((row, index) => index === 0),
  ); // Enable the first switch by default

  const handleValuationModeChange = (event) => {
    setValuationMode(event.target.checked ? "Average" : "One");
    setSwitches(switches.map((val, i) => i === 0)); // Enable the first switch when valuation mode changes
  };

  const handleSwitchChange = (index) => {
    if (valuationMode === "One") {
      setSwitches(switches.map((val, i) => i === index)); // Enable only the selected switch
    } else {
      setSwitches(switches.map((val, i) => (i === index ? !val : val)));
    }
  };
  return (
    <DiamondValuationFieldGroup
      title="Diamond Valuation Assignment"
      sx={{
        position: "relative",
        mt: 4,
      }}
    >
      <TableContainer component={Box}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 17, fontWeight: 700 }} align="center">
                ID
              </TableCell>
              <TableCell align="left" sx={{ fontSize: 17, fontWeight: 700 }}>
                Staff Name
              </TableCell>
              <TableCell align="left" sx={{ fontSize: 17, fontWeight: 700 }}>
                Date
              </TableCell>
              <TableCell align="right" sx={{ fontSize: 17, fontWeight: 700 }}>
                Price
              </TableCell>
              <TableCell
                align="left"
                width="50%"
                sx={{ fontSize: 17, fontWeight: 700 }}
              >
                Comments
              </TableCell>
              <TableCell align="left" sx={{ fontSize: 17, fontWeight: 700 }}>
                Status
              </TableCell>
              <TableCell align="center" sx={{ fontSize: 17, fontWeight: 700 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.valuationStaffName}</TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="left">{row.comments}</TableCell>
                <TableCell align="left">{row.status}</TableCell>
                <TableCell align="center">
                  <Switch
                    checked={switches[index]}
                    onChange={() => handleSwitchChange(index)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ position: "absolute", top: 0, right: 0 }}>
        {detailState.current === "assessed" && (
          <Button
            // onClick={handleClickOpen}
            variant={"contained"}
            endIcon={<AddIcon />}
            sx={{ minWidth: 250 }}
          >
            Assign Valuation Staff
          </Button>
        )}

        {detailState.current === "valuated" && (
          <Stack direction="row" spacing={3}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography sx={{ mr: 3, fontWeight: 600, color: "#3f51b5" }}>
                Choose Valuation Mode:{" "}
              </Typography>
              <Typography>One</Typography>
              <Switch
                checked={valuationMode === "Average"}
                onChange={handleValuationModeChange}
                inputProps={{ "aria-label": "controlled" }}
              />
              <Typography>Average</Typography>
            </Stack>
            <Button variant={"contained"}>Approve</Button>
          </Stack>
        )}
      </Box>
    </DiamondValuationFieldGroup>
  );
};

export default DiamondValuationAssignTable;
