import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LabelIcon from "@mui/icons-material/Label";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import * as React from "react";

import { formatDateTime } from "../../utilities/formatter.js";
import DiamondValuationInforItem from "./InforItem.jsx";

const DiamondValuationInfor = ({ valuationInfor, ...props }) => {
  return (
    <Box {...props}>
      <DiamondValuationInforItem icon={<PersonIcon />} title="Service">
        {valuationInfor.service}
      </DiamondValuationInforItem>
      <DiamondValuationInforItem icon={<CalendarMonthIcon />} title="Deadline">
        {formatDateTime(valuationInfor.deadline)}
      </DiamondValuationInforItem>
      <DiamondValuationInforItem icon={<LabelIcon />} title="Status">
        {valuationInfor.status}
      </DiamondValuationInforItem>
    </Box>
  );
};

export default DiamondValuationInfor;
