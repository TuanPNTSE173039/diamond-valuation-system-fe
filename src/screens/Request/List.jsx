import * as React from "react";
import ValuationRequestList from "../../components/Request/List.jsx";
import UICircularIndeterminate from "../../components/UI/CircularIndeterminate.jsx";
import { useCustomers } from "../../services/customers.js";
import { useRequests } from "../../services/requests.js";
import { useStaffs } from "../../services/staffs.js";

const ScreenRequestList = () => {
  const { isPending: isRequestsPending } = useRequests();
  const { isPending: isCustomerPending } = useCustomers();
  const { isPending: isStaffsPending } = useStaffs();
  if (isRequestsPending || isCustomerPending || isStaffsPending) {
    return <UICircularIndeterminate />;
  }
  return (
    <>
      <ValuationRequestList />
    </>
  );
};

export default ScreenRequestList;
