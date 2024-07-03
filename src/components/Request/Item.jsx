import React from "react";
import { useLocation } from "react-router-dom";
import DetailList from "../Detail/List.jsx";
import RecordList from "../Record/List.jsx";
import UIBreadCrumb from "../UI/BreadCrumb.jsx";
import UIRequestHeader from "../UI/UIRequestHeader.jsx";
import RequestGeneral from "./General.jsx";

const RequestItem = () => {
  const location = useLocation();
  const pathNames = location.pathname.split("/").filter((x) => x);
  return (
    <>
      <UIBreadCrumb pathNames={pathNames} />
      <UIRequestHeader title={"Valuation Request"} />
      <RequestGeneral />
      <RecordList />
      <DetailList />
    </>
  );
};

export default RequestItem;
