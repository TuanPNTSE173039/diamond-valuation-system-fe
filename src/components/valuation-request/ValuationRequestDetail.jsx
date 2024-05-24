import CustomBreadCrumb from "../common/BreadCrumb.jsx";
import { useParams } from "react-router-dom";
import Header from "../common/Header.jsx";
import ValuationRequestUserInfo from "./ValuationRequestUserInfo.jsx";

export default function ValuationRequestDetail() {
  const param = useParams();
  return (
    <>
      <CustomBreadCrumb level={param.id} />
      <Header title={"Valuation Request Detail"} />
      <ValuationRequestUserInfo />
    </>
  );
}
