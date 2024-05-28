import * as React from "react";
import { headCells, rows } from "../../dataset/ValuationRequestDetail.js";
import UITable from "../UI/Table.jsx";

const ValuationRequestDetailList = () => {
  return (
    <>
      <UITable heading="Details" headCells={headCells} rows={rows} />
    </>
  );
};

export default ValuationRequestDetailList;
