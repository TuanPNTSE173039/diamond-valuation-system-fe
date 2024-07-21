import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import UITable from "../UI/Table";
import UITabPanel from "../UI/TabPanel";
import UICircularIndeterminate from "../UI/CircularIndeterminate";
import { useCustomers } from "../../services/customers";
import { a11yProps, CustomerHeadCells } from "../../utilities/table";

const customerStatus = [
    { id: 0, label: "All", filter: () => true },
    { id: 1, label: "Active", filter: (customer) => customer.account.is_active },
    { id: 2, label: "Banned", filter: (customer) => !customer.account.is_active }
];

const CustomerList = () => {
    const [statusIndex, setStatusIndex] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [selectedCustomers, setSelectedCustomers] = useState([]);
    const { data: customers, isFetching: isRequestFetching } = useCustomers(rowsPerPage, page);

    const handleChange = (event, newValue) => {
        setStatusIndex(newValue);
        setPage(0); // Reset the page when changing tabs
    };

    const filteredCustomers = customers ? customers.content.filter(customerStatus[statusIndex].filter) : [];

    const customerRows = filteredCustomers.map((customer) => ({
        number: customer.id,
        id: customer.id,
        customerName: `${customer.firstName} ${customer.lastName}`,
        phone: customer.phone,
        address: customer.address,
        identityDocument: customer.identityDocument,
    }));


    if (isRequestFetching) {
        return <UICircularIndeterminate />;
    }

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={statusIndex}
                    onChange={handleChange}
                    aria-label="customer status"
                >
                    {customerStatus.map((status, index) => (
                        <Tab key={status.id} label={status.label} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </Box>
            {customerStatus.map((status, index) => (
                <UITabPanel key={index} index={index} value={statusIndex}>
                    <UITable
                        heading={status.label + " Customers"}
                        headCells={CustomerHeadCells}
                        rows={customerRows}
                        selected={selectedCustomers}
                        setSelected={setSelectedCustomers}
                        page={page}
                        setPage={setPage}
                        count={customers.totalElement}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                    />
                </UITabPanel>
            ))}
        </Box>
    );
};

export default CustomerList;
