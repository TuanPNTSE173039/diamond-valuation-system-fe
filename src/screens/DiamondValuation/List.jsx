import { useQuery } from "@tanstack/react-query";
import DiamondValuationList from "../../components/DiamondValuation/List.jsx";
import UICircularIndeterminate from "../../components/UI/CircularIndeterminate.jsx";
import { getValuationRequests } from "../../services/ValuationRequest/api.js";
import { getValuationRequestById } from "../../services/ValuationRequest/utils.js";
import { getValuationRequestDetails } from "../../services/ValuationRequestDetail/api.js";
import { formatDateTime, formattedMoney } from "../../utilities/AppConfig.js";

const ScreenDiamondValuationList = () => {
  const {
    data: diamondsData,
    isLoading: isDiamondLoading,
    error: diamondError,
  } = useQuery({
    queryKey: ["diamondValuationList"],
    queryFn: getValuationRequestDetails,
  });

  const {
    data: valuationRequests,
    isLoading: isRequestLoading,
    error: requestError,
  } = useQuery({
    queryKey: ["valuationRequests"],
    queryFn: getValuationRequests,
  });

  if (isRequestLoading || isDiamondLoading) {
    return <UICircularIndeterminate />;
  }

  const diamondValuations = diamondsData?.content.map((item, index) => {
    const valuationRequest = getValuationRequestById(
      valuationRequests,
      item.valuationRequestID,
    );
    return {
      number: item.id,
      returnedDate: item.returnedDate
        ? "N/A"
        : formatDateTime(valuationRequest.returnDate),
      service: valuationRequest.service.name,
      size: item.size,
      servicePrice:
        item.servicePrice === "0.0" || item.servicePrice === null
          ? "N/A"
          : formattedMoney(item.servicePrice),
      GIACertificate: item.diamondValuationNote?.certificateId || "N/A",
      diamondOrigin: item.diamondValuationNote?.diamondOrigin || "N/A",
      caratWeight: item.diamondValuationNote?.caratWeight || "N/A",
      valuationPrice:
        item.valuationPrice === "0.0" || item.valuationPrice === null
          ? "N/A"
          : formattedMoney(item.valuationPrice),
      status: item.status,
    };
  });
  return <DiamondValuationList diamondValuations={diamondValuations} />;
};

export default ScreenDiamondValuationList;
