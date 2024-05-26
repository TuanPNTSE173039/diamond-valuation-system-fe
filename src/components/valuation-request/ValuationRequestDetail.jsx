import { useParams } from "react-router-dom";
import CustomBreadCrumb from "../UI/BreadCrumb.jsx";
import EnhancedTable from "../UI/EnhancedTable.jsx";
import Header from "../UI/Header.jsx";
import RecordList from "./RecordList.jsx";
import ValuationRequestUserInfo from "./ValuationRequestUserInfo.jsx";

export default function ValuationRequestDetail() {
  const param = useParams();
  return (
    <>
      <CustomBreadCrumb level={param.requestId} />
      <Header title={"Valuation Request Detail"} />
      <ValuationRequestUserInfo />
      <RecordList />
      <EnhancedTable heading="Diamonds" />
    </>
  );
}
