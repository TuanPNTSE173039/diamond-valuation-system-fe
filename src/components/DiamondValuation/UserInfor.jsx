import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import LabelIcon from "@mui/icons-material/Label";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import * as React from "react";
import DiamondValuationInforItem from "./InforItem.jsx";

const DiamondValuationUserInfor = () => {
  return (
    <Box sx={{ width: "50%" }}>
      <DiamondValuationInforItem icon={<PersonIcon />} title="Customer">
        Tuan Pham
      </DiamondValuationInforItem>
      <DiamondValuationInforItem icon={<LocalPhoneIcon />} title="Phone">
        0367304351
      </DiamondValuationInforItem>
      <DiamondValuationInforItem icon={<EmailIcon />} title="Email">
        tuanpntse173039@fpt.edu.vn
      </DiamondValuationInforItem>
      <DiamondValuationInforItem icon={<LabelIcon />} title="Status">
        Processing
      </DiamondValuationInforItem>
      <DiamondValuationInforItem
        icon={<LocalAtmIcon />}
        title="Fair Price Estimate"
      >
        &7.000
      </DiamondValuationInforItem>

      <DiamondValuationInforItem icon={<LocalAtmIcon />} title="Estimate Range">
        4.500 - 7.000
      </DiamondValuationInforItem>
      <DiamondValuationInforItem
        icon={<CalendarMonthIcon />}
        title="Effect Date"
      >
        10/10/2022
      </DiamondValuationInforItem>
    </Box>
  );
};

export default DiamondValuationUserInfor;
