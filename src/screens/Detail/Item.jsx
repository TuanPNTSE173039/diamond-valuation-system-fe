import * as React from "react";
import { useParams } from "react-router-dom";
import DetailItem from "../../components/Detail/Item.jsx";
import UICircularIndeterminate from "../../components/UI/CircularIndeterminate.jsx";
import { useCustomer } from "../../services/customers.js";
import { useDetail } from "../../services/details.js";
import { useRequest } from "../../services/requests.js";

const ScreenDetailItem = () => {
  const { detailId, requestId } = useParams();
  const { isLoading: isDetailLoading } = useDetail(detailId);
  const { data: request, isLoading: isRequestLoading } = useRequest(requestId);
  const { isLoading: isCustomerLoading } = useCustomer(
    request ? request.customerID : undefined,
  );
  if (isDetailLoading || isRequestLoading || isCustomerLoading) {
    return <UICircularIndeterminate />;
  }

  return <DetailItem />;
};

export default ScreenDetailItem;
