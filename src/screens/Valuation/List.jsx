import { useQuery } from "@tanstack/react-query";
import UICircularIndeterminate from "../../components/UI/CircularIndeterminate.jsx";
import DiamondValuationList from "../../components/Valuation/List.jsx";
import {
  getAllDiamondValuation,
  getStaffs,
  getValuationRequestDetails,
  getValuationRequests,
} from "../../services/api.js";

import { getValuationRequestById } from "../../utilities/Filtering.js";
import { formatDateTime, formattedMoney } from "../../utilities/Formatter.js";

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
