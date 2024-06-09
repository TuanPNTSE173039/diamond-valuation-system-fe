import EmailIcon from "@mui/icons-material/Email";
import LabelIcon from "@mui/icons-material/Label";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import * as React from "react";
import { useParams } from "react-router-dom";
import { useCustomer } from "../../services/customers.js";
import { useDetail } from "../../services/details.js";
import { useRequest } from "../../services/requests.js";
import DiamondValuationInforItem from "./InforItem.jsx";

const DiamondValuationUserInfor = ({ ...props }) => {
  const { requestId, detailId } = useParams();
  const { data: detail } = useDetail(detailId);
  const { data: request } = useRequest(requestId);
  const { data: customer } = useCustomer(
    request ? request.customerID : undefined,
  );
  const infor = {
    phone: customer.phone.trim(),
    email: customer.email.trim(),
    size: detail.size,
    service: request.service.name,
    servicePrice: detail.servicePrice,
    status: detail.status,
    fairPriceEstimate:
      detail.diamondValuationNote?.fairPrice === undefined
        ? "N/A"
        : detail.diamondValuationNote?.fairPrice,
    estimateRange:
      detail.diamondValuationNote?.minPrice +
      " - " +
      detail.diamondValuationNote?.maxPrice,
  };
  return (
    <Box {...props}>
      <DiamondValuationInforItem icon={<PersonIcon />} title="Customer">
        <Avatar sx={{ width: 35, height: 35 }}>1</Avatar>
        {customer.firstName + " " + customer.lastName}
      </DiamondValuationInforItem>
      <DiamondValuationInforItem icon={<LocalPhoneIcon />} title="Phone">
        {customer.phone.trim()}
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
    </Box>
  );
};

export default DiamondValuationUserInfor;
