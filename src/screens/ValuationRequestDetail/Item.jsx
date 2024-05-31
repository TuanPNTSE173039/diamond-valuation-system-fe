import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useParams } from "react-router-dom";
import UICircularIndeterminate from "../../components/UI/CircularIndeterminate.jsx";
import ValuationRequestDetailItem from "../../components/ValuationRequestDetail/Item.jsx";
import { getCustomers } from "../../services/Customer/api.js";
import { getCustomerByID } from "../../services/Customer/utils.js";
import { getValuationRequest } from "../../services/ValuationRequest/api.js";
import { getValuationRequestDetail } from "../../services/ValuationRequestDetail/api.js";

const ScreenValuationRequestDetailItem = () => {
  const { detailId, requestId } = useParams();
  const {
    data: detail,
    isLoading: isDetailLoading,
    error: detailError,
  } = useQuery({
    queryKey: ["ValuationRequestDetail", detailId],
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

  const customer = getCustomerByID(customers, valuationRequest?.customerID);

  if (isDetailLoading) {
    return <UICircularIndeterminate />;
  }
  console.log(detail);
  console.log(valuationRequest);
  console.log(customer);

  // const generalInfor = {
  //   customerName: customer.firstName + " " + customer.lastName,
  //   phone: customer.phone.trim(),
  //   email: customer.email.trim(),
  //   status: detail.status,
  //   fairPriceEstimate: detail.diamondValuationNote,
  // };

  return <ValuationRequestDetailItem />;
};

export default ScreenValuationRequestDetailItem;
