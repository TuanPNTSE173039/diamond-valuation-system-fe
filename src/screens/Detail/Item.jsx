import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useParams } from "react-router-dom";
import ValuationRequestDetailItem from "../../components/Detail/Item.jsx";
import UICircularIndeterminate from "../../components/UI/CircularIndeterminate.jsx";
import {
  getCustomers,
  getStaffs,
  getValuationRequest,
  getValuationRequestDetail,
} from "../../services/api.js";

import { getCustomerByID } from "../../utilities/Filtering.js";

const ScreenValuationRequestDetailItem = () => {
  const { detailId, requestId } = useParams();
  const {
    data: detail,
    isLoading: isDetailLoading,
    error: detailError,
  } = useQuery({
    queryKey: ["Detail", detailId],
    queryFn: () => getValuationRequestDetail(detailId),
  });

  const {
    data: valuationRequest,
    isLoading: isValuationRequestLoading,
    error,
  } = useQuery({
    queryKey: ["valuationRequest", requestId],
    queryFn: () => getValuationRequest(requestId),
  });

  const {
    data: customers,
    isLoading: isCustomerLoading,
    error: customerError,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  const {
    data: staffs,
    isLoading: isStaffLoading,
    error: staffError,
  } = useQuery({
    queryKey: ["staffs"],
    queryFn: getStaffs,
  });

  if (
    isDetailLoading ||
    isValuationRequestLoading ||
    isCustomerLoading ||
    isStaffLoading
  ) {
    return <UICircularIndeterminate />;
  }

  const customer = getCustomerByID(customers, valuationRequest?.customerID);

  return (
    <ValuationRequestDetailItem
      detail={detail}
      valuationRequests={valuationRequest}
      customer={customer}
      staffs={staffs}
    />
  );
};

export default ScreenValuationRequestDetailItem;
