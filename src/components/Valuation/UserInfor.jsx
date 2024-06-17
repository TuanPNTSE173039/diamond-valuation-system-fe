import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import EmailIcon from "@mui/icons-material/Email";
import LabelIcon from "@mui/icons-material/Label";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import StraightenIcon from "@mui/icons-material/Straighten";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import * as React from "react";
import { useParams } from "react-router-dom";
import { useCustomer } from "../../services/customers.js";
import { useDetail } from "../../services/details.js";
import { useRequest } from "../../services/requests.js";
import {
  formattedDiamondSize,
  formattedMoney,
} from "../../utilities/formatter.js";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";
import DiamondValuationInforItem from "./InforItem.jsx";

const DiamondValuationUserInfor = ({ ...props }) => {
  const { requestId, detailId } = useParams();
  const { data: detail, isLoading: isDetailLoading } = useDetail(detailId);
  const { data: request, isLoading: isRequestLoading } = useRequest(requestId);
  const { data: customer, isLoading: isCustomerLoading } = useCustomer(
    request?.customerID,
  );
  const infor = {
    phone: customer?.phone.trim(),
    email: customer?.email.trim(),
    size: detail?.size,
    service: request?.service.name,
    servicePrice: detail?.servicePrice,
    status: detail?.status,
    fairPriceEstimate: detail?.diamondValuationNote?.fairPrice || "N/A",
    minPrice: detail?.diamondValuationNote?.minPrice || "N/A",
    maxPrice: detail?.diamondValuationNote?.maxPrice || "N/A",
  };

  if (isDetailLoading || isRequestLoading || isCustomerLoading) {
    return <UICircularIndeterminate />;
  }
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
      <DiamondValuationInforItem icon={<StraightenIcon />} title="Size">
        {formattedDiamondSize(infor.size)}
      </DiamondValuationInforItem>
      <DiamondValuationInforItem icon={<ElectricBoltIcon />} title="Service">
        {infor.service}
      </DiamondValuationInforItem>
      <DiamondValuationInforItem
        icon={<CurrencyYenIcon />}
        title="Service Price"
      >
        {formattedMoney(infor.servicePrice)}
      </DiamondValuationInforItem>
      <DiamondValuationInforItem icon={<LabelIcon />} title="Status">
        {infor.status}
      </DiamondValuationInforItem>
      <DiamondValuationInforItem
        icon={<LocalAtmIcon />}
        title="Fair Price Estimate"
      >
        {formattedMoney(infor.fairPriceEstimate)}
      </DiamondValuationInforItem>

      <DiamondValuationInforItem icon={<LocalAtmIcon />} title="Estimate Range">
        {formattedMoney(infor.minPrice)} - {formattedMoney(infor.maxPrice)}
      </DiamondValuationInforItem>
    </Box>
  );
};

export default DiamondValuationUserInfor;
