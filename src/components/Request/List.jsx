import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { useState } from "react";
import { useBriefRequests } from "../../services/requests.js";
import { formatDateTime } from "../../utilities/formatter.js";
import { valuationRequestStatus } from "../../utilities/Status.jsx";
import { a11yProps, RequestHeadCells } from "../../utilities/table.js";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";
import UIDateRangePicker from "../UI/DateRangePicker.jsx";
import UITable from "../UI/Table.jsx";
import UITabPanel from "../UI/TabPanel.jsx";

const RequestList = () => {
  // const { data: requests, isFetching: isRequestPending } = useRequests();
  // const { data: customers, isPending: isCustomerPending } = useCustomers();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: requests, isFetching: isRequestFetching } = useBriefRequests(
    page,
    rowsPerPage,
  );

  const [selectedRequests, setSelectedRequests] = useState([]);

  //Tab control
  const [statusIndex, setStatusIndex] = useState(0);
  const handleChange = (event, newValue) => {
    setStatusIndex(newValue);
  };

  //Showing
  const requestRows = requests?.content.map((row) => {
    return {
      number: row.id,
      status: row.status,
      customerFirstName: row.customerFirstName,
      customerLastName: row.customerLastName,
      creationDate: formatDateTime(row.creationDate),
      diamondAmount: row.diamondAmount,
      service: row.serviceName,
    };
  });
  console.log(requestRows);

  if (isRequestFetching) {
    return <UICircularIndeterminate />;
  }

  // New Request
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
          headCells={RequestHeadCells}
          rows={requestRows}
          selected={selectedRequests}
          setSelected={setSelectedRequests}
          page={page}
          setPage={setPage}
          count={requests?.totalElement}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
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
              headCells={RequestHeadCells}
              rows={
                statusIndex === index + 1
                  ? requestRows.filter((row) => row.status === status.name)
                  : []
              }
              selected={selectedRequests}
              setSelected={setSelectedRequests}
              page={page}
              setPage={setPage}
              count={requests?.totalElement}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
            />
          </UITabPanel>
        ))}
    </Box>
  );
};

export default RequestList;
