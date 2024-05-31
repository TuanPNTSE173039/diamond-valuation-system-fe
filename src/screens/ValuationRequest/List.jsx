import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import UICircularIndeterminate from "../../components/UI/CircularIndeterminate.jsx";
import ValuationRequestList from "../../components/ValuationRequest/List.jsx";
import { getCustomers } from "../../services/Customer/api.js";
import { getValuationRequests } from "../../services/ValuationRequest/api.js";

const ScreenValuationRequestList = () => {
  const {
    data: valuationRequests,
    isLoading: isRequestLoading,
    error: valuationRequestError,
  } = useQuery({
    queryKey: ["valuationRequests"],
    queryFn: getValuationRequests,
  });

  const {
    data: customers,
    isLoading: isCustomerLoading,
    error: customersError,
  } = useQuery({
    queryKey: ["Customer"],
    queryFn: getCustomers,
  });

  if (isRequestLoading || isCustomerLoading) {
    return <UICircularIndeterminate />;
  }
  return (
    <>
      <ValuationRequestList
        valuationRequests={valuationRequests}
        customers={customers}
      />
    </>
  );
};

export default ScreenValuationRequestList;
