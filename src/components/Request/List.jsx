import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useBriefRequests } from "../../services/requests.js";
import { formattedDateTime } from "../../utilities/formatter.js";
import Role from "../../utilities/Role.js";
import { valuationRequestStatus } from "../../utilities/Status.jsx";
import { a11yProps, RequestHeadCells } from "../../utilities/table.js";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";
import UIDateRangePicker from "../UI/DateRangePicker.jsx";
import UISearch from "../UI/Search.jsx";
import UITable from "../UI/Table.jsx";
import UITabPanel from "../UI/TabPanel.jsx";

const RequestList = () => {
  // const { data: requests, isFetching: isRequestPending } = useRequests();
  // const { data: customers, isPending: isCustomerPending } = useCustomers();

  const queryClient = useQueryClient();

  const { user: currentUser } = useSelector((state) => state.auth);
  const userRole = currentUser?.account.role;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data: requests, isFetching: isRequestFetching } = useBriefRequests(
    page,
    rowsPerPage,
    userRole,
    currentUser?.id,
  );

  const [selectedRequests, setSelectedRequests] = useState([]);

  //Tab control
  const [statusIndex, setStatusIndex] = useState(0);
  const handleChange = (event, newValue) => {
    setStatusIndex(newValue);
  };

  //Showing
  const requestRows =
    userRole === Role.MANAGER
      ? requests?.content.map((row) => {
          return {
            number: row.id,
            status: row.status,
            customerFirstName: row.customerFirstName,
            customerLastName: row.customerLastName,
            creationDate: formattedDateTime(row.creationDate),
            diamondAmount: row.diamondAmount,
            service: row.serviceName,
          };
        })
      : requests?.content
          .filter((row) => row.status !== "PENDING")
          .map((row) => {
            return {
              number: row.id,
              status: row.status,
              customerFirstName: row.customerFirstName,
              customerLastName: row.customerLastName,
              creationDate: formattedDateTime(row.creationDate),
              diamondAmount: row.diamondAmount,
              service: row.serviceName,
            };
          });

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
        <UISearch />
        <Box sx={{ flexGrow: 1 }} />
        <UIDateRangePicker />
        {/* Use redux to search here*/}
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={statusIndex}
          onChange={handleChange}
          aria-label="valuation requests status"
        >
          <Tab label="All" {...a11yProps(0)} />
          {valuationRequestStatus
            .filter((status, index) => index !== 0)
            .filter((status) => status.roles.includes(userRole))
            .map((status, index) => (
              <Tab
                key={status.id}
                label={status.name}
                {...a11yProps(index + 1)}
              />
            ))}
        </Tabs>
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
        .filter((status) => status.roles.includes(userRole))
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
