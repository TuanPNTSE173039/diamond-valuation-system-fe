import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useRequest } from "../../services/requests.js";
import DetailList from "../Detail/List.jsx";
import RecordList from "../Record/RecordList.jsx";
import UIBreadCrumb from "../UI/BreadCrumb.jsx";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";
import UIRequestHeader from "../UI/UIRequestHeader.jsx";
import RequestGeneral from "./General.jsx";

const RequestItem = () => {
  const { requestId } = useParams();
  const { data: request, isLoading } = useRequest(requestId);
  if (isLoading) {
    return <UICircularIndeterminate />;
  }
  const location = useLocation();
  const pathNames = location.pathname.split("/").filter((x) => x);
  return (
    <>
      <UIBreadCrumb pathNames={pathNames} />
      <UIRequestHeader title={"Valuation Request"} />

      <RequestGeneral />
      <RecordList valuationRequest={request} />
      <DetailList />
    </>
  );
};

export default RequestItem;
