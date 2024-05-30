import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LabelIcon from "@mui/icons-material/Label";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import * as React from "react";
import DiamondValuationInforItem from "./InforItem.jsx";

const DiamondValuationInfor = ({ ...props }) => {
  return (
    <Box {...props}>
      <DiamondValuationInforItem icon={<PersonIcon />} title="Service">
        Fast - 3h
      </DiamondValuationInforItem>
      <DiamondValuationInforItem icon={<CalendarMonthIcon />} title="Deadline">
        10/10/2022
      </DiamondValuationInforItem>
      <DiamondValuationInforItem icon={<LabelIcon />} title="Status">
        Processing
      </DiamondValuationInforItem>
    </Box>
  );
};

export default DiamondValuationInfor;
