import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getCustomers } from "../../services/Customer/api.js";
import { getCustomerByID } from "../../services/Customer/utils.js";
import { getStaffs } from "../../services/Staff/api.js";
import { getStaffById } from "../../services/Staff/utils.jsx";
import { getValuationRequest } from "../../services/ValuationRequest/api.js";
import AssignmentConsultant from "../Assignment/Consultant.jsx";
import CustomBreadCrumb from "../UI/BreadCrumb.jsx";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";
import UIHeader from "../UI/UIHeader.jsx";
import ValuationRequestDetailList from "../ValuationRequestDetail/List.jsx";
import ValuationRequestGeneral from "./General.jsx";
import RecordList from "./Record/RecordList.jsx";

const ValuationRequestItem = () => {
  const { requestId } = useParams();
  const {
    data: valuationRequest,
    isLoading: isValuationRequestLoading,
    error,
  } = useQuery({
    queryKey: ["valuationRequest", requestId],
    queryFn: () => getValuationRequest(requestId),
  });

  const {
    data: staffs,
    isLoading: isStaffLoading,
    error: staffError,
  } = useQuery({
    queryKey: ["staffs"],
    queryFn: getStaffs,
  });
  const {
    data: customers,
    isLoading: isCustomerLoading,
    error: customerError,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  if (isValuationRequestLoading || isStaffLoading || isCustomerLoading) {
    return <UICircularIndeterminate />;
  }

  const customer = getCustomerByID(customers, valuationRequest?.customerID);
  const staff = getStaffById(staffs, valuationRequest?.staffID);
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

  console.log(generalInfo);
  return (
    <>
      <CustomBreadCrumb level={requestId} />
      <UIHeader title={"Valuation Request"} />
      <ValuationRequestGeneral valuationData={generalInfo} />
      <RecordList />
      <ValuationRequestDetailList />
      <AssignmentConsultant />
    </>
  );
};

export default ValuationRequestItem;
