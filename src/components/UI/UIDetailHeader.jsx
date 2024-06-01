import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { checkDiamond } from "../../services/ValuationRequestDetail/api.js";

export default function UIDetailHeader({ title, detail }) {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (body) => {
      return checkDiamond(detail.id, body);
    },
    onSuccess: (body) => {
      queryClient.invalidateQueries(["valuationRequests"]);
      if (body.status === "CANCELLED") {
        toast.error("This detail is not diamond");
      } else {
        toast.success("Diamond is checked");
      }
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
    setCancelDialogOpen(false);
  };

  const [checkDiamondDialogOpen, setCheckDiamondDialogOpen] = useState(false);
  const [isDiamond, setIsDiamond] = useState(null);
  const [diamondSize, setDiamondSize] = useState("");

  const handleCheckDiamondDialogOpen = () => {
    setCheckDiamondDialogOpen(true);
  };

  const handleCheckDiamondDialogClose = () => {
    setCheckDiamondDialogOpen(false);
  };

  const handleCheckDiamondDialogSave = () => {
    const body = {
      ...detail,
      diamond: isDiamond === "yes",
      size: diamondSize && isDiamond === "yes" ? parseFloat(diamondSize) : 0,
      status: isDiamond === "no" ? "CANCELLED" : "PENDING",
    };
    mutate(body);
    setCheckDiamondDialogOpen(false);
  };

  const handleIsDiamondChange = (event) => {
    setIsDiamond(event.target.value);
  };

  const handleDiamondSizeChange = (event) => {
    setDiamondSize(event.target.value);
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
          <MenuItem onClick={handleCheckDiamondDialogOpen}>
            Check Diamond
          </MenuItem>
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
        <Dialog
          open={checkDiamondDialogOpen}
          onClose={handleCheckDiamondDialogClose}
        >
          <DialogTitle>Check Diamond</DialogTitle>
          <DialogContent>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="isDiamond"
                value={isDiamond}
                onChange={handleIsDiamondChange}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            {isDiamond === "yes" && (
              <TextField
                autoFocus
                margin="dense"
                id="diamondSize"
                label="Diamond Size"
                type="text"
                fullWidth
                value={diamondSize}
                onChange={handleDiamondSizeChange}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCheckDiamondDialogClose}>Cancel</Button>
            <Button onClick={handleCheckDiamondDialogSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
