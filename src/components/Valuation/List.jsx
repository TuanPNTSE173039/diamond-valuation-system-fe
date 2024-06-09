import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { useState } from "react";
import { useDetails } from "../../services/details.js";
import { useRequests } from "../../services/requests.js";
import { useStaffs } from "../../services/staffs.js";
import { useValuations } from "../../services/valuations.js";
import { getValuationRequestById } from "../../utilities/filtering.js";
import { formatDateTime, formattedMoney } from "../../utilities/formatter.js";

import { diamondValuationStatus } from "../../utilities/Status.jsx";
import { ValuationHeadCells } from "../../utilities/table.js";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";
import UITable from "../UI/Table.jsx";
import UITabPanel from "../UI/TabPanel.jsx";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const DiamondValuationList = () => {
  const [statusIndex, setStatusIndex] = useState(0);
  const [selectedValuations, setSelectedValuations] = useState([]);
  const {isLoading: isValuationLoading, data: valuations} = useValuations();
  const {isLoading: isRequestLoading, data: requests} = useRequests();
  const {isLoading: isDetailLoading, data: details} = useDetails();
  const {isLoading: isStaffLoading, data: staffs} = useStaffs();

  if (isRequestLoading || isValuationLoading || isStaffLoading || isDetailLoading) {
    return <UICircularIndeterminate />;
  }
  const rows = valuations.content.map((valuation) => {
    const valuationRequestDetail = details.content.find(
      (detail) => detail.id === valuation.valuationRequestDetailId,
    );
    const valuationRequest = getValuationRequestById(
      requests,
      valuationRequestDetail.valuationRequestID,
    );

    const staff = staffs.content.find(
      (staff) => staff.id === valuation.staffId,
    );

    const returnedDate = valuationRequest?.returnDate;

    return {
      number: valuation.id,
      valuationStaffName: staff.firstName + " " + staff.lastName,
      returnDate: returnedDate ? formatDateTime(returnedDate) : "",
      service: valuationRequest?.service.name,
      certificateId:
        valuationRequestDetail?.diamondValuationNote?.certificateId,
      diamondOrigin:
        valuationRequestDetail?.diamondValuationNote?.diamondOrigin,
      caratWeight: valuationRequestDetail?.diamondValuationNote?.caratWeight,
      valuationPrice: formattedMoney(valuation.valuationPrice),
      status: valuation.status ? "Valuated" : "Valuating",
    };
  });
  const handleChange = (event, newValue) => {
    setStatusIndex(newValue);
  };

  function handleAddValuationRequest() {
    console.log("Add Valuation Request");
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={statusIndex}
            onChange={handleChange}
            aria-label="valuation requests status"
          >
            <Tab label="All" {...a11yProps(0)} />
            {diamondValuationStatus
              .filter((status, index) => index !== 0)
              .map((status, index) => (
                <Tab
                  key={index}
                  label={status.name}
                  {...a11yProps(index + 1)}
                />
              ))}
          </Tabs>
        </Box>
      </Box>

      <UITabPanel index={0} value={statusIndex}>
        <UITable
          heading="All Valuations"
          headCells={ValuationHeadCells}
          rows={rows}
          selected={selectedValuations}
          setSelected={setSelectedValuations}
        />
      </UITabPanel>

      {diamondValuationStatus
        .filter((status, index) => index !== 0)
        .map((status, index) => (
          <UITabPanel key={index} index={index + 1} value={statusIndex}>
            <UITable
              selected={selectedValuations}
              setSelected={setSelectedValuations}
              heading={
                statusIndex === index + 1 ? `${status.name} Valuations` : ""
              }
              headCells={ValuationHeadCells}
              rows={
                statusIndex === index + 1
                  ? rows.filter((row) => row.status === status.name)
                  : []
              }
            />
          </UITabPanel>
        ))}
    </Box>
  );
};

export default DiamondValuationList;
