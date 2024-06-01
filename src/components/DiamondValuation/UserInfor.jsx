import EmailIcon from "@mui/icons-material/Email";
import LabelIcon from "@mui/icons-material/Label";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import * as React from "react";
import DiamondValuationInforItem from "./InforItem.jsx";

const DiamondValuationUserInfor = ({ infor }) => {
  return (
    <Box sx={{ width: "50%" }}>
      <DiamondValuationInforItem icon={<PersonIcon />} title="Customer">
        {infor.customerName}
      </DiamondValuationInforItem>
      <DiamondValuationInforItem icon={<LocalPhoneIcon />} title="Phone">
        {infor.phone}
      </DiamondValuationInforItem>
      <DiamondValuationInforItem icon={<EmailIcon />} title="Email">
        {infor.email}
      </DiamondValuationInforItem>
      <DiamondValuationInforItem icon={<EmailIcon />} title="Size">
        {infor.size}
      </DiamondValuationInforItem>
      <DiamondValuationInforItem icon={<EmailIcon />} title="Service">
        {infor.service}
      </DiamondValuationInforItem>
      <DiamondValuationInforItem icon={<EmailIcon />} title="Service Price">
        {infor.servicePrice}
      </DiamondValuationInforItem>
      <DiamondValuationInforItem icon={<LabelIcon />} title="Status">
        {infor.status}
      </DiamondValuationInforItem>
      <DiamondValuationInforItem
        icon={<LocalAtmIcon />}
        title="Fair Price Estimate"
      >
        {infor.fairPriceEstimate}
      </DiamondValuationInforItem>

      <DiamondValuationInforItem icon={<LocalAtmIcon />} title="Estimate Range">
        {infor.estimateRange}
      </DiamondValuationInforItem>
      {/*<DiamondValuationInforItem*/}
      {/*  icon={<CalendarMonthIcon />}*/}
      {/*  title="Effect Date"*/}
      {/*>*/}
      {/*  10/10/2022*/}
      {/*</DiamondValuationInforItem>*/}
    </Box>
  );
};

export default DiamondValuationUserInfor;
