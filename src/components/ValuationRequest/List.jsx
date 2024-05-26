import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { useState } from "react";
import { valuationRequestStatus } from "../../utilities/Status.js";
import UIDateRangePicker from "../UI/DateRangePicker.jsx";
import EnhancedTable from "../UI/EnhancedTable.jsx";
import UITabPanel from "../UI/TabPanel.jsx";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ValuationRequestList = () => {
  const [statusIndex, setStatusIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setStatusIndex(newValue);
  };

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
            {valuationRequestStatus.map((status) => (
              <Tab
                key={status.id}
                label={status.name}
                {...a11yProps(status.id)}
              />
            ))}
          </Tabs>
        </Box>
        <UIDateRangePicker />
      </Box>

      {valuationRequestStatus.map((status) => (
        <UITabPanel index={status.id} value={statusIndex}>
          <EnhancedTable />
        </UITabPanel>
      ))}
    </Box>
  );
};

export default ValuationRequestList;
