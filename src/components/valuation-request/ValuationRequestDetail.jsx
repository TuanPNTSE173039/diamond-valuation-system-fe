import { useParams } from "react-router-dom";
import CustomBreadCrumb from "../UI/BreadCrumb.jsx";
import Header from "../UI/Header.jsx";
import UITable from "../UI/Table.jsx";
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
      <UITable heading="Diamonds" />
    </>
  );
}
