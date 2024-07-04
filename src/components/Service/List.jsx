import * as React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddIcon from "@mui/icons-material/Add";
import UICircularIndeterminate from "../UI/CircularIndeterminate";
import { StyledBadge } from "../../assets/styles/Badge";
import { useServices } from "../../services/services";
import { updateService, postService, deleteService } from "../../services/api"; // Import hàm xóa service từ API
import * as Yup from "yup";

const ServiceList = () => {
    const { data: serviceList, isLoading, refetch } = useServices();
    const [localServiceList, setLocalServiceList] = React.useState([]);
    const [selectedDetail, setSelectedDetail] = React.useState({
        id: undefined,
        name: "",
        description: "",
        period: 0,
    });
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openAdd, setOpenAdd] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (serviceList) {
            setLocalServiceList(serviceList);
        }
    }, [serviceList]);

    const handleEditClick = (id) => {
        setOpenEdit(true);
        const service = localServiceList.find((service) => service.id === id);
        setSelectedDetail({
            id: service.id,
            name: service.name,
            description: service.description,
            period: service.period,
        });
    };

    const handleEditClose = () => {
        setOpenEdit(false);
        setSelectedDetail({
            id: undefined,
            name: "",
            description: "",
            period: 0,
        });
    };

    const handleEditSave = async (values) => {
        const updatedService = {
            id: selectedDetail.id,
            name: values.name,
            description: values.description,
            period: values.period,
        };

        try {
            await updateService(selectedDetail.id, updatedService);
            const updatedList = localServiceList.map((service) =>
                service.id === selectedDetail.id ? updatedService : service
            );
            setLocalServiceList(updatedList);
            toast.success("Service updated successfully");
            await refetch();
        } catch (error) {
            toast.error("Failed to update service");
        }

        handleEditClose();
    };

    const handleDelete = async (id) => {
        try {
            await deleteService(id);
            const updatedServiceList = localServiceList.filter((service) => service.id !== id);
            setLocalServiceList(updatedServiceList);
            toast.success("Service deleted successfully");
            await refetch();
        } catch (error) {
            toast.error("Failed to delete service");
        }
    };

    const handlePriceClick = (id) => {
        navigate(`/services/${id}/service-price-lists`);
    };

    const handleAddClick = () => {
        setOpenAdd(true);
        setSelectedDetail({
            id: undefined,
            name: "",
            description: "",
            period: 0,
        });
    };

    const handleAddClose = () => {
        setOpenAdd(false);
        setSelectedDetail({
            id: undefined,
            name: "",
            description: "",
            period: 0,
        });
    };

    const handleAddSave = async (values) => {
        const newService = {
            name: values.name,
            description: values.description,
            period: values.period,
        };
        try {
            const response = await postService(newService);
            const createdService = response.data;
            setLocalServiceList([...localServiceList, createdService]);
            toast.success("Service added successfully");
            await refetch();
        } catch (error) {
            toast.error("Failed to add service");
        }

        handleAddClose();
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Service name is required"),
        description: Yup.string().required("Description is required"),
        period: Yup.number().required("Period is required").positive("Period must be a positive number"),
    });

    const formikEdit = useFormik({
        initialValues: {
            name: selectedDetail.name,
            description: selectedDetail.description,
            period: selectedDetail.period,
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: handleEditSave,
    });

    const formikAdd = useFormik({
        initialValues: {
            name: "",
            description: "",
            period: 0,
        },
        validationSchema: validationSchema,
        onSubmit: handleAddSave,
    });

    if (isLoading) {
        return <UICircularIndeterminate />;
    }

    return (
        <Box sx={{ width: "100%" }}>
            <Box
                sx={{
                    mt: 2,
                    py: 0.5,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <StyledBadge color="secondary">
                    <Typography variant="h6" sx={{ fontWeight: "600" }}>
                        SERVICES
                    </Typography>
                </StyledBadge>
                <Box>
                    <Button onClick={handleAddClick} variant="outlined" endIcon={<AddIcon />}>
                        Add
                    </Button>
                </Box>
            </Box>
            <TableContainer component={Paper} sx={{ mt: 0 }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "primary.main" }}>
                            <TableCell align="left" sx={{ color: "white" }}>
                                Id
                            </TableCell>
                            <TableCell align="center" sx={{ color: "white" }}>
                                Service Name
                            </TableCell>
                            <TableCell align="center" sx={{ color: "white" }}>
                                Description
                            </TableCell>
                            <TableCell align="center" sx={{ color: "white" }}>
                                Period
                            </TableCell>
                            <TableCell align="center" sx={{ color: "white" }}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {localServiceList.map((service) => (
                            <TableRow key={service.id}>
                                <TableCell align="left">{service.id}</TableCell>
                                <TableCell align="left">{service.name}</TableCell>
                                <TableCell align="left">{service.description}</TableCell>
                                <TableCell align="center">{service.period}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="success"
                                        onClick={() => handlePriceClick(service.id)}
                                    >
                                        <AttachMoneyIcon />
                                    </IconButton>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleEditClick(service.id)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="secondary"
                                        onClick={() => handleDelete(service.id)}
                                    >
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add Dialog */}
            <Dialog open={openAdd} onClose={handleAddClose}>
                <DialogTitle>Add Service</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Service Name"
                        type="text"
                        fullWidth
                        value={formikAdd.values.name}
                        onChange={formikAdd.handleChange}
                        error={formikAdd.touched.name && Boolean(formikAdd.errors.name)}
                        helperText={formikAdd.touched.name && formikAdd.errors.name}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        value={formikAdd.values.description}
                        onChange={formikAdd.handleChange}
                        error={formikAdd.touched.description && Boolean(formikAdd.errors.description)}
                        helperText={formikAdd.touched.description && formikAdd.errors.description}
                    />
                    <TextField
                        margin="dense"
                        id="period"
                        name="period"
                        label="Period"
                        type="number"
                        fullWidth
                        value={formikAdd.values.period}
                        onChange={formikAdd.handleChange}
                        error={formikAdd.touched.period && Boolean(formikAdd.errors.period)}
                        helperText={formikAdd.touched.period && formikAdd.errors.period}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose} variant="text">
                        Cancel
                    </Button>
                    <Button onClick={formikAdd.handleSubmit} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={openEdit} onClose={handleEditClose}>
                <DialogTitle>Edit Service</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Service Name"
                        type="text"
                        fullWidth
                        value={formikEdit.values.name}
                        onChange={formikEdit.handleChange}
                        error={formikEdit.touched.name && Boolean(formikEdit.errors.name)}
                        helperText={formikEdit.touched.name && formikEdit.errors.name}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        value={formikEdit.values.description}
                        onChange={formikEdit.handleChange}
                        error={formikEdit.touched.description && Boolean(formikEdit.errors.description)}
                        helperText={formikEdit.touched.description && formikEdit.errors.description}
                    />
                    <TextField
                        margin="dense"
                        id="period"
                        name="period"
                        label="Period"
                        type="number"
                        fullWidth
                        value={formikEdit.values.period}
                        onChange={formikEdit.handleChange}
                        error={formikEdit.touched.period && Boolean(formikEdit.errors.period)}
                        helperText={formikEdit.touched.period && formikEdit.errors.period}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} variant="text">
                        Cancel
                    </Button>
                    <Button onClick={formikEdit.handleSubmit} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ServiceList;
