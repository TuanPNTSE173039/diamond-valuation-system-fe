import React from "react";
import { Box, Typography, Avatar, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import LinkIcon from "@mui/icons-material/Link";
import RequestList from "../Request/List.jsx";

// Sample staff data for demonstration
const sampleStaff = {
    id: 8,
    firstName: "Doan",
    lastName: "Minh Nguyen",
    phone: "0364342189",
    experience: 1,
    certificateLink: "bbb",
    role: "CONSULTANT_STAFF",
};

const StaffDetail = () => {
    const staff = sampleStaff;

    return (
        <Box sx={{ width: "100%", padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Staff Detail
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Avatar
                        sx={{ width: 56, height: 56 }}
                        src={`https://randomuser.me/api/portraits/men/${staff.id}.jpg`}
                        alt={`${staff.firstName} ${staff.lastName}`}
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
                            <strong>Role:</strong> {staff.role}
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
                    <Grid item xs={12} container alignItems="center">
                        <LinkIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1">
                            <strong>Certificate Link:</strong> <a href={staff.certificateLink}>{staff.certificateLink}</a>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Valuation Requests
                </Typography>
                <RequestList />
            </Box>
        </Box>
    );
};

export default StaffDetail;
