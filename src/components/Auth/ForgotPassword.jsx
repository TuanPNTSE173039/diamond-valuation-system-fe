import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../redux/messageSlide";
import { forgotPassword } from "../../services/api.js";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function ForgotPasswordDialog({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);

  const handleVerify = async () => {
    setLoading(true);
    try {
      await forgotPassword(email);
      setLoading(false);
      dispatch(setMessage("Please check your email to verify."));
    } catch (error) {
      setLoading(false);
      console.error("Forgot password failed:", error.message);
      dispatch(setMessage("Failed to send verification email."));
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Please enter email</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            width: "400px",
          }}
        />
        <Grid item>
          {message && (
            <Typography color="blue" fontStyle="italic" fontSize="13px">
              {message}
            </Typography>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleVerify} color="primary" disabled={loading}>
          {loading ? "Sending..." : "Verify"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
