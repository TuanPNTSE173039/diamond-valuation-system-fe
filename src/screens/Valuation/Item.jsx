import { useParams } from "react-router-dom";
import UICircularIndeterminate from "../../components/UI/CircularIndeterminate.jsx";
import DiamondValuationItem from "../../components/Valuation/Item.jsx";
import { useDetails } from "../../services/details.js";
import { useValuation } from "../../services/valuations.js";

const ScreenDiamondValuationItem = () => {
  const { valuationId } = useParams();

  const { isLoading: isValuationLoading } = useValuation(valuationId);
  const { isLoading: isDetailsLoading } = useDetails();
  if (isValuationLoading || isDetailsLoading) {
    return <UICircularIndeterminate />;
  }

  return <DiamondValuationItem />;
};

export default ScreenDiamondValuationItem;
