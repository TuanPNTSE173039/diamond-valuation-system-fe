import React from "react";
import { useParams } from "react-router-dom";
import ValuationRequestItem from "../../components/Request/Item.jsx";
import UICircularIndeterminate from "../../components/UI/CircularIndeterminate.jsx";
import { useCustomer } from "../../services/customers.js";
import { useRequest } from "../../services/requests.js";
import { useStaffs } from "../../services/staffs.js";

const ScreenRequestItem = () => {
  const { requestId } = useParams();
  const { isPending: isStaffsPending } = useStaffs();
  const { data: request, isPending: isRequestPending } = useRequest(requestId);
  const { isPending: isCustomerPending } = useCustomer(request?.customerID);
  if (isRequestPending || isCustomerPending || isStaffsPending) {
    return <UICircularIndeterminate />;
  }

  return <ValuationRequestItem />;
};

export default ScreenRequestItem;
