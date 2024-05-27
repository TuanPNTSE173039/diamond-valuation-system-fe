import { useParams } from "react-router-dom";
import CustomBreadCrumb from "../UI/BreadCrumb.jsx";
import UITable from "../UI/Table.jsx";
import UIHeader from "../UI/UIHeader.jsx";
import RecordList from "../valuation-request/RecordList.jsx";
import ValuationRequestUserInfo from "../valuation-request/ValuationRequestUserInfo.jsx";

const ValuationRequestDetail = () => {
  const param = useParams();
  return (
    <>
      <CustomBreadCrumb level={param.requestId} />
      <UIHeader title={"Valuation Request Detail"} />
      <ValuationRequestUserInfo />
      <RecordList />
      <UITable heading="Diamonds" />
    </>
  );
};

export default ValuationRequestDetail;
