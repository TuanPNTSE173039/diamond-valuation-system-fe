import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import UICircularIndeterminate from "../../components/UI/CircularIndeterminate.jsx";
import ValuationRequestItem from "../../components/ValuationRequest/Item.jsx";
import { getCustomers } from "../../services/Customer/api.js";
import { getCustomerByID } from "../../services/Customer/utils.js";
import { getStaffs } from "../../services/Staff/api.js";
import { getStaffById } from "../../services/Staff/utils.jsx";
import { getValuationRequest } from "../../services/ValuationRequest/api.js";

const ScreenValuationRequestItem = () => {
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
  return (
    <ValuationRequestItem
      valuationRequest={valuationRequest}
      customer={customer}
      staff={staff}
      staffs={staffs}
    />
  );
};

export default ScreenValuationRequestItem;
