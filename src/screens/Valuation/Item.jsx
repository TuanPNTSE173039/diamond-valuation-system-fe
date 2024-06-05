import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import UICircularIndeterminate from "../../components/UI/CircularIndeterminate.jsx";
import DiamondValuationItem from "../../components/Valuation/Item.jsx";
import {
  getDiamondValuationById,
  getValuationRequestDetails,
  getValuationRequests,
} from "../../services/api.js";

const ScreenDiamondValuationItem = () => {
  const { valuationId } = useParams();
  const { data: valuation, isLoading: isValuationLoading } = useQuery({
    queryKey: ["diamondValuation", valuationId],
    queryFn: () => getDiamondValuationById(valuationId),
  });

  const { data: details, isLoading: isDetailLoading } = useQuery({
    queryKey: ["valuationRequestDetails"],
    queryFn: getValuationRequestDetails,
  });

  const { data: requests, isLoading: isRequestLoading } = useQuery({
    queryKey: ["valuationRequests"],
    queryFn: getValuationRequests,
  });

  if (isRequestLoading || isValuationLoading || isDetailLoading) {
    return <UICircularIndeterminate />;
  }

  const detailId = valuation?.valuationRequestDetailId;
  const detail = details.content?.find((d) => d.id === detailId);
  const requestId = detail?.valuationRequestID;
  const request = requests.content?.find((r) => r.id === requestId);

  return (
    <DiamondValuationItem
      valuation={valuation}
      detail={detail}
      request={request}
    />
  );
};

export default ScreenDiamondValuationItem;
