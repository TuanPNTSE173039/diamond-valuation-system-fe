import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import ValuationRequestUserInfoItem from "./ValuationRequestUserInfoItem.jsx";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LabelIcon from "@mui/icons-material/Label";
import Typography from "@mui/material/Typography";

export default function ValuationRequestUserInfo() {
  return (
    <Box sx={{ flexGrow: 1, mt: 1, color: "primary" }}>
      <Grid container>
        <Grid item xs={4}>
          <ValuationRequestUserInfoItem icon={<PersonIcon />} title="Customer">
            Tuan Pham
          </ValuationRequestUserInfoItem>
          <ValuationRequestUserInfoItem
            icon={<AssignmentIndIcon />}
            title="CCCD"
          >
            049203006602
          </ValuationRequestUserInfoItem>
          <ValuationRequestUserInfoItem icon={<LocalPhoneIcon />} title="Phone">
            0367304351
          </ValuationRequestUserInfoItem>
          <ValuationRequestUserInfoItem icon={<EmailIcon />} title="Email">
            tuanpntse173039@fpt.edu.vn
          </ValuationRequestUserInfoItem>
          <ValuationRequestUserInfoItem
            icon={<LocationOnIcon />}
            title="Adress"
          >
            District 9, Ho Chi Minh
          </ValuationRequestUserInfoItem>
        </Grid>
        <Grid item xs={4}>
          <ValuationRequestUserInfoItem
            icon={<AssignmentIndIcon />}
            title="Assignee"
          >
            Dat Nguyen
          </ValuationRequestUserInfoItem>
          <ValuationRequestUserInfoItem
            icon={<ElectricBoltIcon />}
            title="Service"
          >
            Fast
          </ValuationRequestUserInfoItem>
          <ValuationRequestUserInfoItem icon={<LabelIcon />} title="Status">
            Processing
          </ValuationRequestUserInfoItem>
          <ValuationRequestUserInfoItem
            icon={<CalendarMonthIcon />}
            title="Creation"
          >
            20/10/2023 - 20:20:20
          </ValuationRequestUserInfoItem>
          <ValuationRequestUserInfoItem
            icon={<CalendarMonthIcon />}
            title="Returned"
          >
            22/11/2023 - 10:20:20
          </ValuationRequestUserInfoItem>
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
  );
}
