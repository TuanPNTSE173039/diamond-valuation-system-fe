import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import UITable from "../UI/Table.jsx";
import UISearch from "../UI/Search.jsx";
import { CustomerHeadCells } from "../../utilities/table.js";

const sampleCustomers = [
    {
        id: 1,
        firstName: "Tuan",
        lastName: "Pham Nguyen",
        phone: "037561229",
        address: "Binh Chanh",
        avatar: null,
        identityDocument: "052203006824",
    },]
const CustomerList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedCustomers, setSelectedCustomers] = useState([]);
    const [customers] = useState(sampleCustomers);

    const handleRowClick = (row) => {
        console.log("Customer Row clicked:", row);
        // Implement additional logic, e.g., navigate to customer detail page or open a modal
    };

    const customerRows = customers.map((customer) => ({
        id: customer.id,
        customerName: `${customer.firstName} ${customer.lastName}`,
        phone: customer.phone,
        address: customer.address,
        identityDocument: customer.identityDocument,
    }));

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
            </Box>
            <UITable
                heading="All Customers"
                headCells={CustomerHeadCells}
                rows={customerRows}
                selected={selectedCustomers}
                setSelected={setSelectedCustomers}
                page={page}
                setPage={setPage}
                count={customers.length}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                onRowClick={handleRowClick}
            >
            </UITable>
        </Box>
    );
};

export default CustomerList;
