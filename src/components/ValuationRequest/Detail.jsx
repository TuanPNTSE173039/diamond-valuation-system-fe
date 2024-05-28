import { useParams } from "react-router-dom";
import AssignmentConsultant from "../Assignment/Consultant.jsx";
import CustomBreadCrumb from "../UI/BreadCrumb.jsx";
import UITable from "../UI/Table.jsx";
import UIHeader from "../UI/UIHeader.jsx";
import RecordList from "../valuation-request/RecordList.jsx";
import ValuationRequestGeneral from "./General.jsx";

const ValuationRequestDetail = () => {
  const param = useParams();
  return (
    <>
      <CustomBreadCrumb level={param.requestId} />
      <UIHeader title={"Valuation Request Detail"} />
      <ValuationRequestGeneral />
      <RecordList />
      <UITable heading="Diamonds" />
      <AssignmentConsultant />
    </>
  );
};

export default ValuationRequestDetail;
