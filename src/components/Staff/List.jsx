import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { useState } from "react";
import { a11yProps, StaffHeadCells } from "../../utilities/table.js";
import UISearch from "../UI/Search.jsx";
import UITable from "../UI/Table.jsx";
import UITabPanel from "../UI/TabPanel.jsx";
import RegisterStaff from "./Form.jsx";

// Sample data
const initialStaff = [
    {
        id: "1",
        staffName: "John",
        staffPhone: "1234567890",
        yearExperience: 5,
        totalProjects: 10,
        currentProjects: 2,
        status: "VALUATION STAFF",
    },
    {
        id: "2",
        staffName: "Jane",
        staffPhone: "0987654321",
        yearExperience: 3,
        totalProjects: 5,
        currentProjects: 1,
        status: "CONSULTANT STAFF",
    },
];

const staffStatus = [
    { id: 0, name: "VALUATION STAFF", roles: ["MANAGER"] },
    { id: 1, name: "CONSULTANT STAFF", roles: ["MANAGER"] },
];

const StaffList = () => {
    const userRole = "MANAGER"; // Example role, replace with actual user role

    const [staff] = useState(initialStaff);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedStaff, setSelectedStaff] = useState([]);
    const [statusIndex, setStatusIndex] = useState(0);

    const [open, setOpen] = useState(false);

    const handleChange = (event, newValue) => {
        setStatusIndex(newValue);
    };

    const handleAddStaff = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const filteredStaff =
        statusIndex === 0
            ? staff
            : staff.filter((s) => s.status === staffStatus[statusIndex].name);

    const staffRows = filteredStaff.map((row) => ({
        id: row.id,
        staffName: row.staffName,
        staffPhone: row.staffPhone,
        yearExperience: row.yearExperience,
        totalProjects: row.totalProjects,
        currentProjects: row.currentProjects,
        status: row.status,
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
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={statusIndex}
                    onChange={handleChange}
                    aria-label="staff status"
                >
                    {staffStatus
                        .filter((status) => status.roles.includes(userRole))
                        .map((status, index) => (
                            <Tab
                                key={status.id}
                                label={status.name}
                                {...a11yProps(index)}
                            />
                        ))}
                </Tabs>
            </Box>

            {staffStatus
                .filter((status) => status.roles.includes(userRole))
                .map((status, index) => (
                    <UITabPanel key={index} index={index} value={statusIndex}>
                        <UITable
                            heading={status.name}
                            headCells={StaffHeadCells}
                            rows={statusIndex === index ? staffRows : []}
                            selected={selectedStaff}
                            setSelected={setSelectedStaff}
                            page={page}
                            setPage={setPage}
                            count={filteredStaff.length}
                            rowsPerPage={rowsPerPage}
                            setRowsPerPage={setRowsPerPage}
                        >
                            <Button
                                onClick={handleAddStaff}
                                variant="contained"
                                size="large"
                                endIcon={<AddIcon />}
                            >
                                Add
                            </Button>
                        </UITable>
                    </UITabPanel>
                ))}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Register Staff</DialogTitle>
                <DialogContent>
                    <RegisterStaff />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default StaffList;
