import React, { useState } from "react";
import {
    Box,
    Typography,
    Avatar,
    Grid,
    Tab,
    Tabs,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import { useParams } from "react-router-dom";
import { useCustomer, useValuationRequests } from "../../services/customers";
import { a11yProps, RequestHeadCells } from "../../utilities/table";
import { valuationRequestStatus } from "../../utilities/Status";
import UITable from "../UI/Table";
import UITabPanel from "../UI/TabPanel";
import UISearch from "../UI/Search";
import UIDateRangePicker from "../UI/DateRangePicker";
import UICircularIndeterminate from "../UI/CircularIndeterminate";
import { formattedDateTime } from "../../utilities/formatter";
import { banCustomer } from "../../services/api.js";
import { toast } from "react-toastify";
import {useQueryClient} from "@tanstack/react-query";
import WorkIcon from "@mui/icons-material/Work.js";

const defaultAvatar = "https://via.placeholder.com/56"; // Set your default avatar URL here

const CustomerDetail = () => {
    const { customerId } = useParams();
    const queryClient = useQueryClient();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedRequests, setSelectedRequests] = useState([]);
    const [statusIndex, setStatusIndex] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [status, setStatus] = useState("idle");

    const { data: customer, isFetching: isRequestFetching } = useCustomer(customerId);
    const { data: valuationRequests, isFetching: isValuationFetching } = useValuationRequests(customerId, rowsPerPage, page);

    const handleChange = (event, newValue) => {
        setStatusIndex(newValue);
    };

    const handleDeleteClick = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleDeleteConfirm = async () => {
        setStatus("loading");
        try {
            await banCustomer(customerId);
            queryClient.invalidateQueries(['customer', customerId]);
            queryClient.invalidateQueries(['valuationRequests', customerId]);

            if (customer.account.is_active) {
                toast.success("Customer banned successfully!");
            } else {
                toast.success("Customer unbanned successfully!");
            }
            setStatus("success");
        } catch (error) {
            toast.error("Error banning customer");
            setStatus("error");
        } finally {
            setOpenDialog(false);
        }
    };

    const requestRows = valuationRequests ? valuationRequests.content.map((row) => ({
        number: row.id,
        status: row.status,
        customerFirstName: row.customerFirstName,
        customerLastName: row.customerLastName,
        creationDate: formattedDateTime(row.creationDate),
        diamondAmount: row.diamondAmount,
        service: row.serviceName,
    })) : [];

    if (isRequestFetching || isValuationFetching || status === "loading") {
        return <UICircularIndeterminate />;
    }

    if (!customer) {
        return <Typography variant="h6" color="error">Customer not found</Typography>;
    }

    return (
        <Box sx={{ width: "100%", padding: 4 }}>
            <Typography variant="h4" gutterBottom>Customer Detail</Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Avatar
                        sx={{ width: 56, height: 56 }}
                        src={customer.avatar || defaultAvatar}
                        alt={`${customer.firstName} ${customer.lastName}`}
                    />
                </Grid>
                <Grid item xs>
                    <Typography variant="h5">
                        {customer.firstName} {customer.lastName}
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ marginTop: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} container alignItems="center">
                        <PersonIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1"><strong>Customer:</strong> {customer.firstName} {customer.lastName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} container alignItems="center">
                        <CreditCardIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1"><strong>Identity Document:</strong> {customer.identityDocument}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} container alignItems="center">
                        <PhoneIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1"><strong>Phone:</strong> {customer.phone}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} container alignItems="center">
                        <EmailIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1"><strong>Email:</strong> {customer?.account.email}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} container alignItems="center">
                        <HomeIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1"><strong>Address:</strong> {customer.address}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} container alignItems="center">
                        <WorkIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1">
                            <strong>Status:</strong> {customer.account.is_active ? "Active" : "Banned"}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h6" gutterBottom>Valuation Requests</Typography>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                </Box>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={statusIndex} onChange={handleChange} aria-label="valuation requests status">
                        <Tab label="All" {...a11yProps(0)} />
                        {valuationRequestStatus.slice(1).map((status, index) => (
                            <Tab key={status.id} label={status.name} {...a11yProps(index + 1)} />
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
                        count={valuationRequests?.totalElement || 0}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                    >
                    </UITable>
                </UITabPanel>
                {valuationRequestStatus.slice(1).map((status, index) => (
                    <UITabPanel key={index} index={index + 1} value={statusIndex}>
                        <UITable
                            heading={`${status.name} Requests`}
                            headCells={RequestHeadCells}
                            rows={requestRows.filter(row => row.status === status.name)}
                            selected={selectedRequests}
                            setSelected={setSelectedRequests}
                            page={page}
                            setPage={setPage}
                            count={valuationRequests?.totalElements || 0}
                            rowsPerPage={rowsPerPage}
                            setRowsPerPage={setRowsPerPage}
                        />
                    </UITabPanel>
                ))}
            </Box>

            <Box sx={{ marginTop: 4 }}>
                <Button
                    variant="contained"
                    color={customer.account.is_active ? "secondary" : "primary"}
                    onClick={handleDeleteClick}
                >
                    {customer.account.is_active ? "Ban" : "Unban"}
                </Button>
            </Box>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Confirm Ban</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {customer.account.is_active ? "Are you sure you want to ban this customer?" : "Are you sure you want to unban this customer?"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="secondary">
                        {customer.account.is_active ? "Ban" : "Unban"}
                    </Button>
                </DialogActions>
            </Dialog>


        </Box>
    );
};

export default CustomerDetail;
