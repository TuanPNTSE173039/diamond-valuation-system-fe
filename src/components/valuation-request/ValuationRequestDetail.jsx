import CustomBreadCrumb from "../common/BreadCrumb.jsx";
import { useParams } from "react-router-dom";
import Header from "../common/Header.jsx";
import ValuationRequestUserInfo from "./ValuationRequestUserInfo.jsx";
import EnhancedTable from "../table/EnhancedTable.jsx";
import Box from "@mui/material/Box";
import RecordList from "./RecordList.jsx";

export default function ValuationRequestDetail() {
  const param = useParams();
  return (
    <Box>
      <CustomBreadCrumb level={param.requestId} />
      <Header title={"Valuation Request Detail"} />
      <ValuationRequestUserInfo />
      <RecordList />
      <EnhancedTable heading="Diamonds" />
    </Box>
  );
}
