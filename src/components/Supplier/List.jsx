import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { VisuallyHiddenInput } from "../../assets/styles/Input.jsx";
import { ADD_MODE, SupplierHeadCells } from "../../utilities/table.js";
import UITable from "../UI/Table.jsx";

const SupplierList = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(ADD_MODE);
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleAddSupplier = () => {
    console.log("Add Supplier");
  };

  const handleEditSupplier = () => {
    console.log("Edit Supplier");
  };
  return (
    <>
      <UITable
        heading="All Suppliers"
        headCells={SupplierHeadCells}
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
          variant="contained"
          size="large"
          endIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Add
        </Button>
      </UITable>
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="xs">
        <DialogTitle>
          {mode === ADD_MODE ? "Add new supplier" : "Update supplier"}
        </DialogTitle>
        <DialogContent sx={{ padding: 3 }}>
          <TextField
            id="name"
            label="Supplier Name"
            fullWidth
            sx={{ width: "100%", mt: 2 }}
          />
          <Box mt={2}>
            <Typography fontSize={16} fontWeight={500} mb={0.7}>
              Logo
            </Typography>
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ height: 264, width: "100%", borderRadius: 2 }}
            >
              Upload supplier logo
              <VisuallyHiddenInput
                type="file"
                // onChange={handleSelectDiamondImage}
              />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={mode === ADD_MODE ? handleAddSupplier : handleEditSupplier}
          >
            {mode === ADD_MODE ? "Create" : "Save changes"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SupplierList;
