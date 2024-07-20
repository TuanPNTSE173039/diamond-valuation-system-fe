import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { registerStaff } from "../../services/api.js";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useQueryClient } from "@tanstack/react-query";

const roles = [
    { value: "CONSULTANT_STAFF", label: "Consultant Staff" },
    { value: "VALUATION_STAFF", label: "Valuation Staff" },
    // Add other roles as needed
];

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required!").min(2, "The first name must be between 2 and 30 characters.").max(30, "The first name must be between 2 and 30 characters."),
    lastName: Yup.string().required("Last name is required!").min(2, "The first name must be between 2 and 30 characters.").max(30, "The first name must be between 2 and 30 characters."),
    username: Yup.string().required("Username is required!").min(6, "The username must be between 6 and 24 characters.").max(24, "The username must be between 6 and 24 characters."),
    email: Yup.string().email("Invalid email address!").required("Email is required!"),
    password: Yup.string().required("Password is required!").min(6, "The password must be between 6 and 24 characters.").max(24, "The password must be between 6 and 24 characters."),
    phone: Yup.string().required("Phone is required!"),
    experience: Yup.number().required("Experience is required!").min(0, "Experience must be at least 0"),
    certificateLink: Yup.string().url("Invalid URL"),
    role: Yup.string().required("Role is required!"),
});

const RegisterStaff = () => {

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await registerStaff(values);
            toast.success("Staff registered successfully!");

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                if (errorMessage.includes("Phone")) {
                    toast.error("Phone number already exists!");
                } else if (errorMessage.includes("Email")) {
                    toast.error("Email already exists!");
                } else {
                    toast.error(errorMessage);
                }
            } else {
                toast.error("Staff registration failed. Try again.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>

                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        username: "",
                        email: "",
                        password: "",
                        phone: "",
                        experience: "",
                        certificateLink: "",
                        role: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, isSubmitting, handleChange, handleBlur, values }) => (
                        <Box component={Form} noValidate sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        name="firstName"
                                        autoComplete="fname"
                                        autoFocus
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.firstName}
                                        error={touched.firstName && Boolean(errors.firstName)}
                                        helperText={touched.firstName && errors.firstName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lastName}
                                        error={touched.lastName && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.username}
                                        error={touched.username && Boolean(errors.username)}
                                        helperText={touched.username && errors.username}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        error={touched.password && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Phone"
                                        name="phone"
                                        autoComplete="phone"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.phone}
                                        error={touched.phone && Boolean(errors.phone)}
                                        helperText={touched.phone && errors.phone}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="experience"
                                        label="Experience (years)"
                                        name="experience"
                                        type="number"
                                        autoComplete="experience"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.experience}
                                        error={touched.experience && Boolean(errors.experience)}
                                        helperText={touched.experience && errors.experience}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="certificateLink"
                                        label="Certificate Link"
                                        name="certificateLink"
                                        type="text"
                                        autoComplete="certificateLink"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.certificateLink}
                                        error={touched.certificateLink && Boolean(errors.certificateLink)}
                                        helperText={touched.certificateLink && errors.certificateLink}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth error={touched.role && Boolean(errors.role)}>
                                        <InputLabel id="role-label">Role</InputLabel>
                                        <Select
                                            labelId="role-label"
                                            id="role"
                                            name="role"
                                            value={values.role}
                                            label="Role"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            {roles.map((role) => (
                                                <MenuItem key={role.value} value={role.value}>
                                                    {role.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {touched.role && <Typography variant="body2" color="error">{errors.role}</Typography>}
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={isSubmitting}
                            >
                                Sign Up
                            </Button>
                            <ToastContainer />
                        </Box>
                    )}
                </Formik>
        </>
    );
};

export default RegisterStaff;
