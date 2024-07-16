import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LabelIcon from "@mui/icons-material/Label";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import { green, red } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import * as React from "react";

import {
  formattedDateTime,
  formattedMoney,
} from "../../utilities/formatter.js";
import { convertStatus } from "../../utilities/Status.jsx";
import DiamondValuationInforItem from "./InforItem.jsx";

const DiamondValuationInfor = ({ valuationInfor, diamondInfor, ...props }) => {
  return (
    <Box {...props}>
      <DiamondValuationInforItem icon={<PersonIcon />} title="Service">
        {valuationInfor.service}
      </DiamondValuationInforItem>
      <DiamondValuationInforItem icon={<CalendarMonthIcon />} title="Deadline">
        {valuationInfor.deadline && formattedDateTime(valuationInfor.deadline)}
      </DiamondValuationInforItem>
      <DiamondValuationInforItem icon={<LabelIcon />} title="Status">
        {convertStatus(valuationInfor.status)}
      </DiamondValuationInforItem>
      <DiamondValuationInforItem
        icon={<LocalAtmIcon />}
        title="Fair Price Estimate"
      >
        <Typography color={red[800]} fontWeight={700}>
          {formattedMoney(diamondInfor.fairPrice)}
        </Typography>
      </DiamondValuationInforItem>
      <DiamondValuationInforItem icon={<LocalAtmIcon />} title="Price Range">
        <Typography color={green[800]} fontWeight={700}>
          {formattedMoney(diamondInfor.minPrice)} -{" "}
          {formattedMoney(diamondInfor.maxPrice)}
        </Typography>
      </DiamondValuationInforItem>
    </Box>
  );
};

export default DiamondValuationInfor;
