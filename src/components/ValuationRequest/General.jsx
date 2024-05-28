import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import EmailIcon from "@mui/icons-material/Email";
import LabelIcon from "@mui/icons-material/Label";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";

import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import UIAutocomplete from "../UI/Autocomplete.jsx";
import ValuationRequestUserInfor from "./UserInfor.jsx";

const ValuationRequestGeneral = ({ valuationRequest }) => {
  const [open, setOpen] = useState(false);
  const [consultant, setConsultant] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // Save the selected consultant here
    // Then close the dialog
    setOpen(false);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 1, color: "primary" }}>
        <Grid container>
          <Grid item xs={4}>
            <ValuationRequestUserInfor icon={<PersonIcon />} title="Customer">
              Tuan Pham
            </ValuationRequestUserInfor>
            <ValuationRequestUserInfor
              icon={<AssignmentIndIcon />}
              title="CCCD"
            >
              049203006602
            </ValuationRequestUserInfor>
            <ValuationRequestUserInfor icon={<LocalPhoneIcon />} title="Phone">
              0367304351
            </ValuationRequestUserInfor>
            <ValuationRequestUserInfor icon={<EmailIcon />} title="Email">
              tuanpntse173039@fpt.edu.vn
            </ValuationRequestUserInfor>
            <ValuationRequestUserInfor icon={<LocationOnIcon />} title="Adress">
              District 9, Ho Chi Minh
            </ValuationRequestUserInfor>
          </Grid>
          <Grid item xs={4}>
            <ValuationRequestUserInfor
              icon={<AssignmentIndIcon />}
              title="Assignee"
            >
              {consultant ? (
                consultant.label
              ) : (
                <Link onClick={handleClickOpen}>Assign Consultant</Link>
              )}
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Assign Consultant</DialogTitle>
                <DialogContent>
                  <UIAutocomplete onChange={setConsultant} />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} variant="text">
                    Cancel
                  </Button>
                  <Button onClick={handleSave} variant="contained">
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            </ValuationRequestUserInfor>
            <ValuationRequestUserInfor
              icon={<ElectricBoltIcon />}
              title="Service"
            >
              Fast
            </ValuationRequestUserInfor>
            <ValuationRequestUserInfor icon={<LabelIcon />} title="Status">
              Processing
            </ValuationRequestUserInfor>
            <ValuationRequestUserInfor
              icon={<CalendarMonthIcon />}
              title="Creation"
            >
              20/10/2023 - 20:20:20
            </ValuationRequestUserInfor>
            <ValuationRequestUserInfor
              icon={<CalendarMonthIcon />}
              title="Returned"
            >
              22/11/2023 - 10:20:20
            </ValuationRequestUserInfor>
          </Grid>
          <Grid item xs={4} sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-100%, -50%)",
                textAlign: "center",
              }}
            >
              <Typography sx={{ fontSize: "1.2rem", color: "gray" }}>
                Total Fee
              </Typography>
              <Box sx={{ fontSize: "4rem" }}>27$</Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ValuationRequestGeneral;
