import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const ValuationRequestDialogCancel = ({ id, onClose }) => {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [reason, setReason] = useState("");

  const handleCancelDialogOpen = () => {
    setCancelDialogOpen(true);
  };

  const handleCancelDialogClose = () => {
    setCancelDialogOpen(false);
  };

  const handleCancelDialogSave = () => {
    // Save the reason here
    // Then close the dialog
    setCancelDialogOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleCancelDialogOpen}>
        Cancel this request
      </Button>
      <Dialog open={cancelDialogOpen} onClose={handleCancelDialogClose}>
        <DialogTitle>Cancel Request</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="reason"
            label="Reason"
            type="text"
            fullWidth
            value={reason}
            onChange={(event) => setReason(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDialogClose}>Cancel</Button>
          <Button onClick={handleCancelDialogSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ValuationRequestDialogCancel;
