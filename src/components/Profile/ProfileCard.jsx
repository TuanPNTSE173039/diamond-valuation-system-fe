import React, {useRef, useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {DialogTitle, Grid} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import CustomInput from "./CustomerInput.jsx";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer, toast} from "react-toastify";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {setMessage} from "../../redux/messageSlide.js";
import {updateStaff, updateStaffPassword} from "../../services/api.js";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

const styles = {
    details: {
        padding: "1rem",
        borderTop: "1px solid #e1e1e1",
    },
    value: {
        padding: "1rem 2rem",
        borderTop: "1px solid #e1e1e1",
        color: "#899499",
    },
    errorText: {
        color: "red",
        fontSize: "0.75rem", // Smaller font size
        fontStyle: "italic", // Italic font style
    },
};

export default function ProfileCard(props) {
    const dispatch = useDispatch();
    // const { message } = useSelector((state) => state.message);
    const [user, setUser] = useState({
        firstName: props.firstName,
        lastName: props.lastName,
        phone: props.phone,
        email: props.email,
        experience: props.experience,
        username: props.username,
        staffID: props.staffID,
        authID: props.authID,
    });

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required!").min(2, "The first name must be between 2 and 30 characters.").max(30, "The first name must be between 2 and 30 characters."),
        lastName: Yup.string().required("Last name is required!").min(2, "The first name must be between 2 and 30 characters.").max(30, "The first name must be between 2 and 30 characters."),
        username: Yup.string().required("Username is required!").min(6, "The username must be between 6 and 24 characters.").max(24, "The username must be between 6 and 24 characters."),
        email: Yup.string().email("Invalid email experience!").required("Email is required!"),
        password: Yup.string().required("Password is required!").min(6, "The password must be between 6 and 24 characters.").max(24, "The password must be between 6 and 24 characters."),
        phone: Yup.string().required("Phone is required!"),
        experience: Yup.number().required("Experience is required!").min(0, "Experience must be at least 0"),
        certificateLink: Yup.string().url("Invalid URL"),
        oldPassword: Yup.string()
            .test(
                "len",
                "The password must be between 6 and 20 characters.",
                (val) =>
                    val && val.toString().length >= 6 && val.toString().length <= 20,
            )
            .test(
                "contains-number",
                "The password must contain at least 1 number.",
                (val) => {
                    return /\d/.test(val);
                },
            )
            .required("Old password is required!"),
        newPassword: Yup.string()
            .test(
                "len",
                "The password must be between 6 and 20 characters.",
                (val) =>
                    val && val.toString().length >= 6 && val.toString().length <= 20,
            )
            .test(
                "contains-number",
                "The password must contain at least 1 number.",
                (val) => {
                    return /\d/.test(val);
                },
            )
            .required("New password is required!"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm password is required!')
    });

    const [originalUser] = useState(user);

    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
    });

    const fullName = `${user.firstName} ${user.lastName}`;

    const changeField = (event) => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
        formik.setFieldValue(name, value);
        formik.setFieldTouched(name, true);
    };

    const changePasswordField = (event) => {
        setPasswords({...passwords, [event.target.name]: event.target.value});
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // BUTTON STATES
    const [edit, update] = useState({
        required: true,
        disabled: true,
        isEdit: true,
    });
    const [avatarImage, setAvatarImage] = useState(null);
    const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
    const fileInputRef = useRef(null);
    const [avatarChanged, setAvatarChanged] = useState(false);

    const openFileDialog = () => {
        console.log("Attempting to open file dialog"); // Debugging log
        if (!isFileDialogOpen && fileInputRef.current) {
            console.log("File dialog is not open, opening now"); // Debugging log
            setIsFileDialogOpen(true); // Mark dialog as open
            fileInputRef.current.click(); // Trigger file dialog
        } else {
            console.log("File dialog is already open, not opening again"); // Debugging log
        }
    };
    const getChangedFields = () => {
        const changedFields = {};
        for (const key in user) {
            if (user[key] !== originalUser[key]) {
                changedFields[key] = user[key];
            }
        }
        return changedFields;
    };
    const handleUpdate = async () => {
        const changedFields = getChangedFields();
        if (Object.keys(changedFields).length > 0) {
            try {
                await updateStaff(user.staffID, user);
                toast.success("Staff information updated successfully!");
            } catch (error) {
                toast.error("Failed to update staff information.");
                console.error("Failed to update staff information", error);
            }
        }
    };

    const handlePasswordUpdate = async () => {
        try {
            const response = await updateStaffPassword(user.authID, passwords);
            if (response && response.data && response.data.message) {
                const message = response.data.message;
                dispatch(setMessage(message));
                toast.error(message);
            } else {
                toast.success("Password updated successfully!");
                handleClose();
                setPasswords({oldPassword: "", newPassword: ""});
                formik.resetForm({
                    values: {...formik.values, oldPassword: "", newPassword: ""},
                });
            }
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error.message ||
                "Failed to update password.";
            dispatch(setMessage(message));

            if (error?.response?.data?.message === "Incorrect old password") {
                toast.error("Incorrect old password");
            } else {
                toast.error(message);
                console.error("Failed to update password", error);
            }
        }
    };

    // EDIT -> UPDATE
    const changeButton = async (event) => {
        event.preventDefault();
        if (!edit.disabled) {
            await handleUpdate();
        }
        edit.disabled = !edit.disabled;
        edit.isEdit = !edit.isEdit;
        update({...edit});
    };

    const handleSelectAvatarImage = (e) => {
        if (e.target.files[0]) {
            setAvatarImage(e.target.files[0]);
            setAvatarChanged(true);
        }
        setIsFileDialogOpen(false); // Close file dialog after selection
    };

    const formik = useFormik({
        initialValues: {
            firstName: props.firstName || "",
            lastName: props.lastName || "",
            phone: props.phone || "",
            email: props.email || "",
            experience: props.experience || "",
            certificateLink: props.certificateLink || "",
            oldPassword: "",
            newPassword: "",
        },
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema,
        onSubmit: handleUpdate,
    });

    const handlePasswordChange = (event) => {
        formik.handleChange(event); // Đảm bảo formik cập nhật giá trị
        setPasswords({...passwords, [event.target.name]: event.target.value});
    };

    return (
        <Card variant="outlined" sx={{height: "730px", width: "100%"}}>
            <ToastContainer containerId="profile"/>
            {/* MAIN CONTENT CONTAINER */}
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                {/* CARD HEADER START */}
                <Grid item sx={{p: "1.5rem 0rem", textAlign: "center"}}>
                    {/* PROFILE PHOTO */}
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    >
                        <Avatar
                            sx={{ width: 100, height: 100, mb: 1.5 }}
                            src={
                                avatarImage ? URL.createObjectURL(avatarImage) : props.avatar
                            }
                        />
                        {!edit.isEdit && ( // Conditionally render only when not in edit mode
                            <>
                                <label htmlFor="icon-button-file">
                                    <IconButton
                                        color="primary"
                                        aria-label="upload picture"
                                        component="span"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            openFileDialog();
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </label>
                            </>
                        )}
                        <input
                            ref={fileInputRef}
                            accept="image/*"
                            style={{ display: "none" }}
                            id="icon-button-file"
                            type="file"
                            onChange={handleSelectAvatarImage}
                        />
                    </Badge>
                    <Typography variant="h6">{fullName}</Typography>
                    <Typography>{user.username}</Typography>
                </Grid>

                <Grid item style={styles.details} sx={{width: "100%"}}></Grid>
            </Grid>
            <CardContent
                sx={{
                    p: 3,
                    maxHeight: {md: "40vh"},
                    textAlign: {xs: "center", md: "start"},
                }}
            >
                <FormControl fullWidth>
                    <Grid
                        container
                        direction={{xs: "column", md: "row"}}
                        columnSpacing={5}
                        rowSpacing={3}
                    >
                        <Grid item xs={6}>
                            <CustomInput
                                id="firstName"
                                name="firstName"
                                value={user.firstName}
                                onChange={changeField}
                                onBlur={formik.handleBlur}
                                title="First Name"
                                dis={edit.disabled}
                                req={edit.required}
                                error={formik.touched.firstName && !!formik.errors.firstName}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <CustomInput
                                id="lastName"
                                name="lastName"
                                value={user.lastName}
                                onChange={changeField}
                                onBlur={formik.handleBlur}
                                title="Last Name"
                                dis={edit.disabled}
                                req={edit.required}
                                error={formik.touched.lastName && !!formik.errors.lastName}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <CustomInput
                                id="phone"
                                name="phone"
                                value={user.phone}
                                onChange={changeField}
                                onBlur={formik.handleBlur}
                                title="Phone Number"
                                dis={edit.disabled}
                                req={edit.required}
                                error={formik.touched.phone && !!formik.errors.phone}
                                helperText={formik.touched.phone && formik.errors.phone}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <CustomInput
                                type="experience"
                                id="experience"
                                name="experience"
                                value={user.experience}
                                onChange={changeField}
                                onBlur={formik.handleBlur}
                                title="Experience"
                                dis={edit.disabled}
                                req={edit.required}
                                error={formik.touched.experience && !!formik.errors.experience}
                                helperText={formik.touched.experience && formik.errors.experience}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <CustomInput
                                type="certificateLink"
                                id="certificateLink"
                                name="certificateLink"
                                value={user.certificateLink}
                                onChange={changeField}
                                onBlur={formik.handleBlur}
                                title="Certificate Link"
                                dis={edit.disabled}
                                req={edit.required}
                                error={
                                    formik.touched.certificateLink &&
                                    !!formik.errors.certificateLink
                                }
                                helperText={
                                    formik.touched.certificateLink &&
                                    formik.errors.certificateLink
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomInput
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={changeField}
                                onBlur={formik.handleBlur}
                                title="Email"
                                dis={edit.disabled}
                                req={edit.required}
                                error={formik.touched.email && !!formik.errors.email}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Button color="primary" onClick={handleClickOpen}>
                                Change Password
                            </Button>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Change Password</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoComplete="old-password"
                                        margin="dense"
                                        id="oldPassword"
                                        name="oldPassword"
                                        label="Old Password"
                                        type="password"
                                        fullWidth
                                        onChange={handlePasswordChange}
                                        value={formik.values.oldPassword}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.oldPassword &&
                                            Boolean(formik.errors.oldPassword)
                                        }
                                        helperText={
                                            formik.touched.oldPassword && formik.errors.oldPassword
                                        }
                                    />
                                    <TextField
                                        autoComplete="new-password"
                                        margin="dense"
                                        id="newPassword"
                                        name="newPassword"
                                        label="New Password"
                                        type="password"
                                        fullWidth
                                        onChange={handlePasswordChange}
                                        value={formik.values.newPassword}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.newPassword &&
                                            Boolean(formik.errors.newPassword)
                                        }
                                        helperText={
                                            formik.touched.newPassword && formik.errors.newPassword
                                        }
                                    />
                                    <TextField
                                        autoComplete="confirm-password"
                                        margin="dense"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type="password"
                                        fullWidth
                                        onChange={handlePasswordChange}
                                        value={formik.values.confirmPassword}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    />

                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={handlePasswordUpdate}>Update</Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        justifyContent={{xs: "center", md: "flex-end"}}
                        item
                        xs={6}
                    >
                        <Button
                            sx={{p: "1rem 2rem", my: 2, height: "3rem"}}
                            component="button"
                            size="large"
                            variant="contained"
                            color="secondary"
                            type="submit"
                            onClick={changeButton}
                        >
                            {edit.isEdit === false ? "UPDATE" : "EDIT"}
                        </Button>
                    </Grid>
                </FormControl>
            </CardContent>
        </Card>
    );
}
