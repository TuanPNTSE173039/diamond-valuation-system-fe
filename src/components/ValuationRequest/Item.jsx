import { useParams } from "react-router-dom";
import AssignmentConsultant from "../Assignment/Consultant.jsx";
import CustomBreadCrumb from "../UI/BreadCrumb.jsx";
import UIHeader from "../UI/UIHeader.jsx";
import ValuationRequestDetailList from "../ValuationRequestDetail/List.jsx";
import ValuationRequestGeneral from "./General.jsx";
import RecordList from "./Record/RecordList.jsx";

const ValuationRequestItem = () => {
  const param = useParams();
  return (
    <>
      <CustomBreadCrumb level={param.requestId} />
      <UIHeader title={"Valuation Request"} />
      <ValuationRequestGeneral />
      <RecordList />
      <ValuationRequestDetailList />
      <AssignmentConsultant />
    </>
  );
};

export default ValuationRequestItem;
