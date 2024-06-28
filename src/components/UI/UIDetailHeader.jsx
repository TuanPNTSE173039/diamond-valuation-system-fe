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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { checkDiamond } from "../../services/api.js";

export default function UIDetailHeader({ title, detail }) {
  const { detailId, requestId } = useParams();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (body) => {
      return checkDiamond(detail.id, body);
    },
    onSuccess: (body) => {
      queryClient.invalidateQueries({
        queryKey: ["detail", { detailId: detailId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["request", { requestId: requestId }],
      });
      toast.success("Request has been canceled");
    },
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [reason, setReason] = useState("");
  const handleCancelDetail = () => {
    setCancelDialogOpen(true);
  };
  const handleCancelDialogClose = () => {
    setCancelDialogOpen(false);
  };
  const handleCancelDialogSave = () => {
    const body = {
      ...detail,
      status: "CANCEL",
      cancelReason: reason,
      diamond: false,
    };
    mutate(body);
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
          <MenuItem onClick={handleCancelDetail}>
            Cancel request detail
          </MenuItem>
          <MenuItem>
            <Link to={`/records/result/${detailId}`}>View Record Result</Link>
          </MenuItem>
        </Menu>
        <Dialog
          open={cancelDialogOpen}
          onClose={handleCancelDialogClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Cancel Request</DialogTitle>
          <DialogContent>
            <TextField
              margin="normal"
              multiline
              rows={3}
              fullWidth
              id="cancelReason"
              type="text"
              name="cancelReason"
              label="Your Reason"
              InputProps={{ sx: { borderRadius: 2 } }}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              inputProps={{
                min: 50,
              }}
              error={reason.length < 50}
              helperText={
                reason.length < 50
                  ? "Reason must be greater than 50 characters"
                  : null
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDialogClose}>Cancel</Button>
            <Button onClick={handleCancelDialogSave} variant={"contained"}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
