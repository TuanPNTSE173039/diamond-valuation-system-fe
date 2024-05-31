import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { useState } from "react";
import { headCells } from "../../dataset/ValuationRequestDetail.js";
import { diamondValuationStatus } from "../../utilities/Status.js";
import UITable from "../UI/Table.jsx";
import UITabPanel from "../UI/TabPanel.jsx";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const DiamondValuationList = ({ diamondValuations: rows }) => {
  const [statusIndex, setStatusIndex] = useState(0);

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
                  key={status.id}
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
          headCells={headCells}
          rows={rows}
          readOnly
        />
      </UITabPanel>

      {diamondValuationStatus
        .filter((status, index) => index !== 0)
        .map((status, index) => (
          <UITabPanel index={index + 1} value={statusIndex}>
            <UITable
              heading={
                statusIndex === index + 1 ? `${status.name} Valuations` : ""
              }
              headCells={headCells}
              rows={
                statusIndex === index + 1
                  ? rows.filter((row) => row.status === status.name)
                  : []
              }
              readOnly
            />
          </UITabPanel>
        ))}
    </Box>
  );
};

export default DiamondValuationList;
