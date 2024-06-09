import UICircularIndeterminate from "../../components/UI/CircularIndeterminate.jsx";
import DiamondValuationList from "../../components/Valuation/List.jsx";
import { useDetails } from "../../services/details.js";
import { useRequests } from "../../services/requests.js";
import { useStaffs } from "../../services/staffs.js";
import { useValuations } from "../../services/valuations.js";

const ScreenDiamondValuationList = () => {
  // const { data: valuations, isLoading: isValuationLoading } = useQuery({
  //   queryKey: ["diamondValuations"],
  //   queryFn: getAllDiamondValuation,
  // });
  const { isLoading: isValuationLoading } = useValuations();
  const { isLoading: isRequestLoading } = useRequests();
  const { isLoading: isDetailLoading } = useDetails();
  const { isLoading: isStaffLoading } = useStaffs();

  if (
    isRequestLoading ||
    isValuationLoading ||
    isDetailLoading ||
    isStaffLoading
  ) {
    return <UICircularIndeterminate />;
  }
  return <DiamondValuationList />;
};

export default ScreenDiamondValuationList;
