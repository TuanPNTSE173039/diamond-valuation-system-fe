import React, { useState } from "react";
import {
    Box,
    Typography,
    Grid,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tabs,
    Tab,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import LinkIcon from "@mui/icons-material/Link";
import { useParams, useNavigate } from "react-router-dom";
import { useStaff, useStaffValuation } from "../../services/staffs";
import UICircularIndeterminate from "../UI/CircularIndeterminate";
import UITable from "../UI/Table";
import Role from "../../utilities/Role.js";
import { a11yProps, RequestHeadCells, ValuationHeadCells } from "../../utilities/table.js";
import { formattedCaratWeight, formattedDateTime, formattedMoney } from "../../utilities/formatter.js";
import { diamondValuationStatus } from "../../utilities/Status.jsx";
import UITabPanel from "../UI/TabPanel.jsx";
import { deleteStaff, updateValuationRequest } from "../../services/api"; // Import deleteStaff and updateValuationRequest functions
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Import react-query hooks
import { toast } from "react-toastify"; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

const defaultAvatar = "https://via.placeholder.com/56"; // Set your default avatar URL here

const StaffDetail = () => {
    const { staffId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient(); // Initialize queryClient
    const { data: staff, isLoading: isLoadingStaff } = useStaff(staffId);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [statusIndex, setStatusIndex] = useState(0);
    const [openDialog, setOpenDialog] = useState(false); // State for the dialog

    const {
        data: valuationRequests,
        isLoading: isLoadingRequest,
    } = useStaffValuation(staff?.id, staff?.account.role);

    const { mutate: updateReceiptLink } = useMutation({
        mutationFn: (body) => updateValuationRequest(staffId, body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["staff", { staffId }],
            });
            toast.success("Update successfully");
        },
        onError: () => {
            toast.error("Update failed");
        },
    });

    const { mutate: deleteStaffMutation } = useMutation({
        mutationFn: (id) => deleteStaff(id),
        onSuccess: () => {
            queryClient.invalidateQueries("staffs");
            toast.success("Staff deleted successfully");
            navigate("/staffs");
        },
        onError: () => {
            toast.error("Error deleting staff");
        },
    });

    if (isLoadingStaff || isLoadingRequest) {
        return <UICircularIndeterminate />;
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDeleteClick = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleDeleteConfirm = () => {
        deleteStaffMutation(staffId);
        setOpenDialog(false);
    };

    const valuationRows = valuationRequests
        ? valuationRequests.content.map((row) => {
            if (staff?.account.role === Role.CONSULTANT) {
                return {
                    number: row.id,
                    status: row.status,
                    customerFirstName: row.customerFirstName,
                    customerLastName: row.customerLastName,
                    creationDate: formattedDateTime(row.creationDate),
                    diamondAmount: row.diamondAmount,
                    service: row.serviceName,
                };
            } else {
                return {
                    number: row.id,
                    valuationStaffName: row.staffName,
                    deadline: formattedDateTime(row.deadline),
                    service: row.serviceName,
                    certificateId: row.certificateId,
                    diamondOrigin: row.diamondOrigin,
                    caratWeight: formattedCaratWeight(row?.caratWeight),
                    valuationPrice: formattedMoney(row.valuationPrice),
                    status: row.status ? "Valuated" : "Valuating",
                };
            }
        })
        : [];

    return (
        <Box sx={{ width: "100%", padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Staff Detail
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <img
                        src={ staff.avatar || defaultAvatar}
                        alt={`${staff.firstName} ${staff.lastName}`}
                        style={{ width: 56, height: 56, borderRadius: "50%" }}
                    />
                </Grid>
                <Grid item xs>
                    <Typography variant="h5">
                        {staff.firstName} {staff.lastName}
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ marginTop: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} container alignItems="center">
                        <PersonIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1">
                            <strong>Staff:</strong> {staff.firstName} {staff.lastName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} container alignItems="center">
                        <WorkIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1">
                            <strong>Role:</strong> {staff.account.role}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} container alignItems="center">
                        <PhoneIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1">
                            <strong>Phone:</strong> {staff.phone}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} container alignItems="center">
                        <SchoolIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1">
                            <strong>Experience:</strong> {staff.experience} year(s)
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} container alignItems="center">
                        <LinkIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1">
                            <strong>Certificate Link:</strong>{" "}
                            <a href={staff.certificateLink}>{staff.certificateLink}</a>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} container alignItems="center">
                        <WorkIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1">
                            <strong>Status:</strong> {staff.account.is_active ? "Active" : "Inactive"}
                        </Typography>
                    </Grid>

                </Grid>
            </Box>
            <Box sx={{ marginTop: 4 }}>
                {staff.account.role === Role.VALUATION ? (
                    <>
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
                                        onChange={(event, newValue) => setStatusIndex(newValue)}
                                        aria-label="valuation requests status"
                                    >
                                        <Tab label="All" {...a11yProps(0)} />
                                        {diamondValuationStatus.filter((status, index) => index !== 0).map((status, index) => (
                                            <Tab key={index} label={status.name} {...a11yProps(index + 1)} />
                                        ))}
                                    </Tabs>
                                </Box>
                            </Box>

                            <UITabPanel index={0} value={statusIndex}>
                                <UITable
                                    readOnly
                                    heading="All Valuations"
                                    headCells={ValuationHeadCells}
                                    rows={valuationRows}
                                    page={page}
                                    setPage={setPage}
                                    count={valuationRequests?.totalElement}
                                    rowsPerPage={rowsPerPage}
                                    setRowsPerPage={setRowsPerPage}
                                />
                            </UITabPanel>

                            {diamondValuationStatus.filter((status, index) => index !== 0).map((status, index) => (
                                <UITabPanel key={index} index={index + 1} value={statusIndex}>
                                    <UITable
                                        readOnly
                                        heading={statusIndex === index + 1 ? `${status.name} Valuations` : ""}
                                        headCells={ValuationHeadCells}
                                        rows={statusIndex === index + 1 ? valuationRows.filter((row) => row.status.toUpperCase() === status.name) : []}
                                        page={page}
                                        setPage={setPage}
                                        count={valuationRequests?.totalElement}
                                        rowsPerPage={rowsPerPage}
                                        setRowsPerPage={setRowsPerPage}
                                    />
                                </UITabPanel>
                            ))}
                        </Box>
                    </>
                ) : staff.account.role === Role.CONSULTANT ? (
                    <>
                        <Typography variant="h6" gutterBottom>
                            All Requests
                        </Typography>
                        {isLoadingRequest ? (
                            <UICircularIndeterminate />
                        ) : (
                            <UITable
                                readOnly
                                heading="All Requests"
                                headCells={RequestHeadCells}
                                rows={valuationRows}
                                page={page}
                                setPage={setPage}
                                count={valuationRequests?.totalElement}
                                rowsPerPage={rowsPerPage}
                                setRowsPerPage={setRowsPerPage}
                            />
                        )}
                    </>
                ) : null}
                {staff.account.is_active ?
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteClick}
                >
                    Delete Staff
                </Button>
                    : ""
                }
                <Dialog
                    open={openDialog}
                    onClose={handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete Staff"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this staff?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose}>Cancel</Button>
                        <Button onClick={handleDeleteConfirm} autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default StaffDetail;
