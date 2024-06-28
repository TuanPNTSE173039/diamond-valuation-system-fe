import React from "react";
import { Box, Typography, Avatar, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import RequestList from "../Request/List.jsx";

const sampleCustomer = {
    id: 1,
    firstName: "James",
    lastName: "Green",
    phone: "036-434-1107",
    address: "District 9, Ho Chi Minh City",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    identityDocument: "049203006602",
    email: "tuanptse173039@fpt.edu.vn",
};

const CustomerDetail = () => {
    const customer = sampleCustomer;

    return (
        <Box sx={{ width: "100%", padding: 4 }}>
            <Typography variant="h4" gutterBottom>Customer Detail</Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Avatar
                        sx={{ width: 56, height: 56 }}
                        src={customer.avatar}
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
                        <Typography variant="body1"><strong>Customer:</strong> {customer.firstName} {customer.lastName}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} container alignItems="center">
                        <CreditCardIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1"><strong>Identity Document:</strong> {customer.identityDocument}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} container alignItems="center">
                        <PhoneIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1"><strong>Phone:</strong> {customer.phone}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} container alignItems="center">
                        <EmailIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1"><strong>Email:</strong> {customer.email}</Typography>
                    </Grid>
                    <Grid item xs={12} container alignItems="center">
                        <HomeIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1"><strong>Address:</strong> {customer.address}</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h6" gutterBottom>Valuation Requests</Typography>
                <RequestList />
            </Box>
        </Box>
    );
};

export default CustomerDetail;
