import AddIcon from "@mui/icons-material/Add";
import {
  FormControl,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useState } from "react";
import { diamondAttribute } from "../../utilities/Status.jsx";
import { DiamondHeadCells } from "../../utilities/table.js";
import UITable from "../UI/Table.jsx";

const EDIT_MODE = 1;
const ADD_MODE = 0;
const { cut, clarity, color, shape, symmetry, polish, fluorescence } =
  diamondAttribute;

const DiamondPriceList = () => {
  const supplier = [
    {
      id: 1,
      name: "ABC",
      image: "/abc.png",
    },
    {
      id: 2,
      name: "DEF",
      image: "/def.png",
    },
    {
      id: 3,
      name: "GHI",
      image: "/ghi.png",
    },
  ];
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(ADD_MODE);
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleAddDiamondPrice = () => {
    console.log("Add Diamond Price");
  };

  const handleEditDiamondPrice = () => {
    console.log("Edit Diamond Price");
  };
  return (
    <>
      <UITable
        heading="All Requests"
        headCells={DiamondHeadCells}
        // rows={requestRows}
        // selected={selectedRequests}
        // setSelected={setSelectedRequests}
        // page={page}
        // setPage={setPage}
        // count={requests?.totalElement}
        // rowsPerPage={rowsPerPage}
        // setRowsPerPage={setRowsPerPage}
      >
        <Button
          onClick={handleOpenDialog}
          variant="contained"
          size="large"
          endIcon={<AddIcon />}
        >
          Add
        </Button>
      </UITable>
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="xs">
        <DialogTitle>
          {mode === ADD_MODE ? "Add new Diamond Price" : "Update Diamond Price"}
        </DialogTitle>
        <DialogContent sx={{ padding: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}>
            <FormControl sx={{ width: "50%" }}>
              <FormLabel id="diamond-origin">Diamond Origin</FormLabel>
              <RadioGroup
                row
                aria-labelledby="diamond-origin"
                name="diamond-origin"
              >
                <FormControlLabel
                  value="NATURAL"
                  control={<Radio />}
                  label="Natural"
                />
                <FormControlLabel
                  value="LAB_GROWN"
                  control={<Radio />}
                  label="Lab"
                />
              </RadioGroup>
            </FormControl>
            <TextField label="Cut Score" id="cut-score" type="number" />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}>
            <TextField
              label="Carat Weight"
              id="carat-weight"
              type="number"
              sx={{ width: "50%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">ct.</InputAdornment>
                ),
              }}
            />
            <TextField
              id="color-grade"
              select
              label="Color Grade"
              sx={{ width: "50%" }}
            >
              {color.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}>
            <TextField
              id="clarity-grade"
              select
              label="Clarity Grade"
              sx={{ width: "50%" }}
            >
              {clarity.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="cut-grade"
              select
              label="Cut Grade"
              sx={{ width: "50%" }}
            >
              {cut.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}>
            <TextField id="shape" select label="Shape" sx={{ width: "50%" }}>
              {shape.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="symmetry"
              select
              label="Symmetry"
              sx={{ width: "50%" }}
            >
              {symmetry.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}>
            <TextField id="polish" select label="Polish" sx={{ width: "50%" }}>
              {polish.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="fluorescence"
              select
              label="Fluorescence"
              sx={{ width: "50%" }}
            >
              {fluorescence.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box width="100%" mt={3}>
            <TextField id="supplier" select label="Supplier" fullWidth>
              {supplier.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={
              mode === ADD_MODE ? handleAddDiamondPrice : handleEditDiamondPrice
            }
          >
            {mode === ADD_MODE ? "Create" : "Save changes"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DiamondPriceList;
