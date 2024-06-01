import React from "react";
import { formatDateTime, formattedMoney } from "../../utilities/AppConfig.js";
import CustomBreadCrumb from "../UI/BreadCrumb.jsx";
import UIRequestHeader from "../UI/UIRequestHeader.jsx";
import ValuationRequestDetailList from "../ValuationRequestDetail/List.jsx";
import ValuationRequestGeneral from "./General.jsx";
import RecordList from "./Record/RecordList.jsx";

const ValuationRequestItem = ({
  valuationRequest,
  customer,
  staff,
  staffs,
}) => {
  const generalInfo = {
    customerName: customer.firstName + " " + customer.lastName,
    cccd: customer.identityDocument.trim(),
    phone: customer.phone.trim(),
    email: customer.email.trim(),
    address: customer.address.trim(),
    staff: staff,
    service: valuationRequest.service.name,
    status: valuationRequest.status,
    creationDate: valuationRequest.creationDate,
    returnedDate: valuationRequest.returnDate,
    totalFee: valuationRequest.totalServicePrice,
  };

  const valuationRequestDetails = valuationRequest.valuationRequestDetails.map(
    (item) => {
      return {
        number: item.id,
        returnedDate: valuationRequest.returnDate
          ? formatDateTime(valuationRequest.returnDate)
          : "N/A",
        service: valuationRequest.service.name,
        size: (item.size === 0 && "N/A") || item.size,
        servicePrice:
          item.servicePrice === 0 ? "N/A" : formattedMoney(item.servicePrice),
        certificateId: item.diamondValuationNote?.certificateId || "N/A",
        diamondOrigin: item.diamondValuationNote?.diamondOrigin || "N/A",
        caratWeight: item.diamondValuationNote?.caratWeight || "N/A",
        valuationPrice:
          item.valuationPrice === "0.0" || item.valuationPrice === null
            ? "N/A"
            : formattedMoney(item.valuationPrice),
        status: item.status,
      };
    },
  );
  console.log(valuationRequestDetails);

  return (
    <>
      <CustomBreadCrumb level={valuationRequest.id} />
      <UIRequestHeader title={"Valuation Request"} />

      <ValuationRequestGeneral
        valuationRequest={valuationRequest}
        valuationData={generalInfo}
        staffs={staffs}
      />
      <RecordList />
      <ValuationRequestDetailList details={valuationRequestDetails} />
    </>
  );
};

export default ValuationRequestItem;
