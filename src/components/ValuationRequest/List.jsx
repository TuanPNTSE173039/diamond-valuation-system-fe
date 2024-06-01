import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { format } from "date-fns";
import * as React from "react";
import { useState } from "react";
import { headCells } from "../../dataset/ValuationRequest.js";
import { getCustomerByID } from "../../services/Customer/utils.js";
import { valuationRequestStatus } from "../../utilities/AppConfig.js";
import UIDateRangePicker from "../UI/DateRangePicker.jsx";
import UITable from "../UI/Table.jsx";
import UITabPanel from "../UI/TabPanel.jsx";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const ValuationRequestList = ({ valuationRequests, customers }) => {
  const [statusIndex, setStatusIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setStatusIndex(newValue);
  };

  function handleAddValuationRequest() {
    console.log("Add Valuation Request");
  }

  const requestRows = valuationRequests?.content.map((row) => {
    const customer = getCustomerByID(customers, row.customerID);

    const firstName = customer.firstName;
    const lastName = customer.lastName;
    return {
      number: row.id,
      status: row.status,
      customerFirstName: firstName,
      customerLastName: lastName,
      creationDate: format(new Date(row.creationDate), "yyyy/MM/dd - HH:mm:ss"),
      diamondAmount: row.diamondAmount,
      service: row.service.name,
    };
  });

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
            {valuationRequestStatus
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
        <UIDateRangePicker />
      </Box>

      <UITabPanel index={0} value={statusIndex}>
        <UITable
          heading="All Requests"
          headCells={headCells}
          rows={requestRows}
        >
          <Button
            onClick={handleAddValuationRequest}
            variant="contained"
            size="large"
            endIcon={<AddIcon />}
          >
            Add
          </Button>
        </UITable>
      </UITabPanel>

      {valuationRequestStatus
        .filter((status, index) => index !== 0)
        .map((status, index) => (
          <UITabPanel key={index} index={index + 1} value={statusIndex}>
            <UITable
              heading={
                statusIndex === index + 1 ? `${status.name} Requests` : ""
              }
              headCells={headCells}
              rows={
                statusIndex === index + 1
                  ? requestRows.filter((row) => row.status === status.name)
                  : []
              }
            />
          </UITabPanel>
        ))}
    </Box>
  );
};

export default ValuationRequestList;
