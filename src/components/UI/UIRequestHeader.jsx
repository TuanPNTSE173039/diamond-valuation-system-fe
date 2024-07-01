import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";

export default function UIRequestHeader({ title }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [reason, setReason] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCancelValuationRequest = () => {
    setCancelDialogOpen(true);
  };

  const handleCancelDialogClose = () => {
    setCancelDialogOpen(false);
  };

  const handleCancelDialogSave = () => {
    setCancelDialogOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Typography
          variant="h3"
          component="p"
          sx={{ fontSize: 24, fontWeight: 700, my: 1 }}
        >
          {title}
        </Typography>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          variant="contained"
          endIcon={<ExpandMoreIcon />}
        >
          Action
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleCancelValuationRequest}>
            Cancel this request
          </MenuItem>
          <MenuItem onClick={handleClose}>Update Infor</MenuItem>
        </Menu>
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
      </Box>
    </>
  );
}
