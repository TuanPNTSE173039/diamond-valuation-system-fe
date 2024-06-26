import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useValuations } from "../../services/valuations.js";
import {
  formattedCaratWeight,
  formattedDateTime,
  formattedMoney,
} from "../../utilities/formatter.js";

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
  const { user: currentUser } = useSelector((state) => state.auth);
  const userRole = currentUser?.account.role;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [statusIndex, setStatusIndex] = useState(0);
  const [selectedValuations, setSelectedValuations] = useState([]);
  const { isLoading: isValuationLoading, data: valuations } = useValuations(
    page,
    rowsPerPage,
    userRole,
    currentUser?.id,
  );

  if (isValuationLoading) {
    return <UICircularIndeterminate />;
  }
  const rows = valuations.content.map((valuation) => {
    return {
      number: valuation.id,
      valuationStaffName: valuation.staffName,
      deadline: formattedDateTime(valuation.deadline),
      service: valuation.serviceName,
      certificateId: valuation.certificateId,
      diamondOrigin: valuation.diamondOrigin,
      caratWeight: formattedCaratWeight(valuation?.caratWeight),
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
          page={page}
          setPage={setPage}
          count={valuations.totalElement}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
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
              page={page}
              setPage={setPage}
              count={valuations.totalElement}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
            />
          </UITabPanel>
        ))}
    </Box>
  );
};

export default DiamondValuationList;
