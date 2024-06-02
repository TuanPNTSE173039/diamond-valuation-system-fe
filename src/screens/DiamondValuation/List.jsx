import { useQuery } from "@tanstack/react-query";
import DiamondValuationList from "../../components/DiamondValuation/List.jsx";
import UICircularIndeterminate from "../../components/UI/CircularIndeterminate.jsx";
import { getAllDiamondValuation } from "../../services/DiamondValuation/api.js";
import { getStaffs } from "../../services/Staff/api.js";
import { getValuationRequests } from "../../services/ValuationRequest/api.js";
import { getValuationRequestById } from "../../services/ValuationRequest/utils.js";
import { getValuationRequestDetails } from "../../services/ValuationRequestDetail/api.js";
import { formatDateTime, formattedMoney } from "../../utilities/AppConfig.js";

const ScreenDiamondValuationList = () => {
  const { data: valuations, isLoading: isValuationLoading } = useQuery({
    queryKey: ["diamondValuations"],
    queryFn: getAllDiamondValuation,
  });
  const { data: valuationRequests, isLoading: isRequestLoading } = useQuery({
    queryKey: ["valuationRequests"],
    queryFn: getValuationRequests,
  });
  const { data: valuationRequestDetails, isLoading: isRequestDetailLoading } =
    useQuery({
      queryKey: ["valuationRequestDetails"],
      queryFn: getValuationRequestDetails,
    });
  const { data: staffs, isLoading: isStaffLoading } = useQuery({
    queryKey: ["staffs"],
    queryFn: getStaffs,
  });
  if (
    isRequestLoading ||
    isValuationLoading ||
    isRequestDetailLoading ||
    isStaffLoading
  ) {
    return <UICircularIndeterminate />;
  }
  const diamondValuations = valuations.content.map((valuation) => {
    const valuationRequestDetail = valuationRequestDetails.content.find(
      (detail) => detail.id === valuation.valuationRequestDetailId,
    );
    const valuationRequest = getValuationRequestById(
      valuationRequests,
      valuationRequestDetail.valuationRequestID,
    );

    const staff = staffs.content.find(
      (staff) => staff.id === valuation.staffId,
    );

    const returnedDate = valuationRequest?.returnDate;

    return {
      number: valuation.id,
      valuationStaffName: staff.firstName + " " + staff.lastName,
      returnDate: returnedDate ? formatDateTime(returnedDate) : "",
      service: valuationRequest?.service.name,
      certificateId:
        valuationRequestDetail?.diamondValuationNote?.certificateId,
      diamondOrigin:
        valuationRequestDetail?.diamondValuationNote?.diamondOrigin,
      caratWeight: valuationRequestDetail?.diamondValuationNote?.caratWeight,
      valuationPrice: formattedMoney(valuation.valuationPrice),
      status: valuation.status ? "Valuated" : "Valuating",
    };
  });

  return <DiamondValuationList diamondValuations={diamondValuations} />;
};

export default ScreenDiamondValuationList;
