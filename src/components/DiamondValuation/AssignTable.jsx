import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { rows } from "../../dataset/DiamondValuation.js";
import DiamondValuationFieldGroup from "./FieldGroup.jsx";

const DiamondValuationAssignTable = ({ detailState }) => {
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
            {rows.map((row) => (
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
                    checked={false}
                    // onChange={handleChange}
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
          <Button variant={"contained"}>Approve</Button>
        )}
      </Box>
    </DiamondValuationFieldGroup>
  );
};

export default DiamondValuationAssignTable;
