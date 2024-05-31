import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";
import { headCells } from "../../dataset/ValuationRequestDetail.js";
import UITable from "../UI/Table.jsx";

const ValuationRequestDetailList = ({ details }) => {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState({
    isDiamond: true,
  });

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // Save the new detail here
    // Then close the dialog
    setOpen(false);
  };

  return (
    <>
      <UITable heading="Details" headCells={headCells} rows={details}>
        <Button
          onClick={handleAddClick}
          variant={"contained"}
          endIcon={<AddIcon />}
        >
          Add
        </Button>
      </UITable>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Valuation Request Detail</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant={"text"}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant={"contained"}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ValuationRequestDetailList;
