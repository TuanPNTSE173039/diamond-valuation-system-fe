import { useQuery } from "@tanstack/react-query";
import DiamondValuationList from "../../components/DiamondValuation/List.jsx";
import UICircularIndeterminate from "../../components/UI/CircularIndeterminate.jsx";
import { getValuationRequests } from "../../services/ValuationRequest/api.js";
import { getValuationRequestById } from "../../services/ValuationRequest/utils.js";
import { getValuationRequestDetails } from "../../services/ValuationRequestDetail/api.js";

const ScreenDiamondValuationList = () => {
  const {
    data: diamondsData,
    isLoading: isDiamondLoading,
    error: diamondError,
  } = useQuery({
    queryKey: ["diamondValuationList"],
    queryFn: getValuationRequestDetails,
  });

  if (isDiamondLoading) {
    return <UICircularIndeterminate />;
  }

  const {
    data: valuationRequests,
    isLoading: isRequestLoading,
    error: requestError,
  } = useQuery({
    queryKey: ["valuationRequests"],
    queryFn: getValuationRequests,
  });

  if (isRequestLoading) {
    return <UICircularIndeterminate />;
  }

  const diamondValuations = diamondsData?.content.map((item, index) => {
    const valuationRequest = getValuationRequestById(
      valuationRequests,
      item.valuationRequestID,
    );
    return {
      number: item.id,
      returnedDate: item.returnedDate,
      service: valuationRequest.service.name,
      size: item.size,
      servicePrice: item.servicePrice,
      GIACertificate: item.diamondValuationNote.certificateId || "N/A",
      diamondOrigin: item.diamondValuationNote.diamondOrigin || "N/A",
      caratWeight: item.diamondValuationNote.caratWeight || "N/A",
      valuationPrice: item.valuationPrice,
      status: item.status,
    };
  });
  console.log(diamondValuations);

  return <DiamondValuationList diamondValuations={diamondValuations} />;
};

export default ScreenDiamondValuationList;
