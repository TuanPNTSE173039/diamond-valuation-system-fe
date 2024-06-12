import React from "react";
import { useParams } from "react-router-dom";
import { useRequest } from "../../services/requests.js";
import DetailList from "../Detail/List.jsx";
import RecordList from "../Record/RecordList.jsx";
import CustomBreadCrumb from "../UI/BreadCrumb.jsx";
import UIRequestHeader from "../UI/UIRequestHeader.jsx";
import RequestGeneral from "./General.jsx";

const RequestItem = () => {
  const { requestId } = useParams();
  const { data: request } = useRequest(requestId);
  console.log(request);
  return (
    <>
      <CustomBreadCrumb level={request.id} />
      <UIRequestHeader title={"Valuation Request"} />

      <RequestGeneral />
      <RecordList valuationRequest={request} />
      <DetailList />
    </>
  );
};

export default RequestItem;
