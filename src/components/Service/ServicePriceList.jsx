import * as React from "react";
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
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useServiceList } from "../../services/services";
import UICircularIndeterminate from "../UI/CircularIndeterminate";
import {deleteServicePrice, postServicePrice, updateServicePrice} from "../../services/api";
import { toast } from "react-toastify";
import * as Yup from "yup";

const ServicePriceList = () => {
    const { serviceId } = useParams();
    const { data: servicePriceList, isLoading, refetch } = useServiceList(serviceId);
    const [localServicePriceList, setLocalServicePriceList] = React.useState([]);
    const [selectedDetail, setSelectedDetail] = React.useState({
        id: undefined,
        min_size: 0.0,
        max_size: 0.0,
        init_price: 0.0,
        unit_price: 0.0,
    });
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openAdd, setOpenAdd] = React.useState(false);

    React.useEffect(() => {
        if (servicePriceList) {
            setLocalServicePriceList(servicePriceList);
        }
    }, [servicePriceList]);

    const handleEditClick = (id) => {
        setOpenEdit(true);
        const service = localServicePriceList.find((service) => service.id === id);
        setSelectedDetail({
            id: service.id,
            min_size: service.minSize,
            max_size: service.maxSize,
            init_price: service.initPrice,
            unit_price: service.unitPrice,
        });
    };

    const handleEditClose = () => {
        setOpenEdit(false);
        setSelectedDetail({
            id: undefined,
            min_size: 0.0,
            max_size: 0.0,
            init_price: 0.0,
            unit_price: 0.0,
        });
    };

    const handleEditSave = async (values) => {
        const updatedService = {
            id: selectedDetail.id,
            minSize: values.min_size,
            maxSize: values.max_size,
            initPrice: values.init_price,
            unitPrice: values.unit_price,
        };

        try {
            await updateServicePrice(selectedDetail.id, updatedService);
            const updatedList = localServicePriceList.map((service) =>
                service.id === selectedDetail.id ? updatedService : service
            );
            setLocalServicePriceList(updatedList);
            toast.success("Service price updated successfully");
            await refetch();
        } catch (error) {
            toast.error("Failed to update service price");
        }

        handleEditClose();
    };

    const handleDelete = async (id) => {
        try {
            await deleteServicePrice(id);
            const updatedServiceList = localServicePriceList.filter((service) => service.id !== id);
            setLocalServicePriceList(updatedServiceList);
            toast.success("Service price deleted successfully");
            await refetch();
        } catch (error) {
            toast.error("Failed to delete service price");
        }
    };

    const handleAddClick = () => {
        setOpenAdd(true);
        setSelectedDetail({
            id: undefined,
            min_size: 0.0,
            max_size: 0.0,
            init_price: 0.0,
            unit_price: 0.0,
        });
    };

    const handleAddClose = () => {
        setOpenAdd(false);
        setSelectedDetail({
            id: undefined,
            min_size: 0.0,
            max_size: 0.0,
            init_price: 0.0,
            unit_price: 0.0,
        });
    };

    const handleAddSave = async (values) => {
        const newService = {
            minSize: values.min_size,
            maxSize: values.max_size,
            initPrice: values.init_price,
            unitPrice: values.unit_price,
            serviceId: serviceId,
        };

        try {
            const response = await postServicePrice(newService);
            const createdServicePrice = response.data;
            setLocalServicePriceList([...localServicePriceList, createdServicePrice]);
            toast.success("Service price added successfully");
            await refetch();
        } catch (error) {
            toast.error("Failed to add service price");
        }

        handleAddClose();
    };

    const validationSchema = Yup.object().shape({
        min_size: Yup.number().required("Min Size is required").positive("Min Size must be a positive number"),
        max_size: Yup.number().required("Max Size is required").positive("Max Size must be a positive number").
        moreThan(Yup.ref('min_size'), "Max Size must be greater than Min Size"),
        init_price: Yup.number().required("Init Price is required").positive("Init Price must be a positive number"),
        unit_price: Yup.number().required("Unit Price is required"),
    });

    const formikEdit = useFormik({
        initialValues: {
            min_size: selectedDetail.min_size,
            max_size: selectedDetail.max_size,
            init_price: selectedDetail.init_price,
            unit_price: selectedDetail.unit_price,
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: handleEditSave,
    });

    const formikAdd = useFormik({
        initialValues: {
            min_size: 0.0,
            max_size: 0.0,
            init_price: 0.0,
            unit_price: 0.0,
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
                <Typography variant="h6" sx={{ fontWeight: "600" }}>Service Price List</Typography>
                <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddClick}>
                    Add
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ width: "100%", mt: 0 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "primary.main" }}>
                            <TableCell align="center" sx={{ color: "white" }}>ID</TableCell>
                            <TableCell align="center" sx={{ color: "white" }}>Min Size</TableCell>
                            <TableCell align="center" sx={{ color: "white" }}>Max Size</TableCell>
                            <TableCell align="center" sx={{ color: "white" }}>Init Price</TableCell>
                            <TableCell align="center" sx={{ color: "white" }}>Unit Price</TableCell>
                            <TableCell align="center" sx={{ color: "white" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {localServicePriceList.map((service) => (
                            <TableRow key={service.id}>
                                <TableCell align="center">{service.id}</TableCell>
                                <TableCell align="center">{service.minSize}</TableCell>
                                <TableCell align="center">{service.maxSize}</TableCell>
                                <TableCell align="center">{service.initPrice}</TableCell>
                                <TableCell align="center">{service.unitPrice}</TableCell>
                                <TableCell align="center">
                                    <IconButton aria-label="edit" onClick={() => handleEditClick(service.id)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => handleDelete(service.id)}>
                                        <DeleteForeverIcon color="secondary" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add Dialog */}
            <Dialog open={openAdd} onClose={handleAddClose}>
                <form onSubmit={formikAdd.handleSubmit}>
                    <DialogTitle>Add Service Price</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="min_size"
                            label="Min Size"
                            type="number"
                            inputProps={{ step: 0.01 }}
                            fullWidth
                            value={formikAdd.values.min_size}
                            onChange={formikAdd.handleChange}
                            error={formikAdd.touched.min_size && Boolean(formikAdd.errors.min_size)}
                            helperText={formikAdd.touched.min_size && formikAdd.errors.min_size}
                        />
                        <TextField
                            margin="dense"
                            id="max_size"
                            label="Max Size"
                            type="number"
                            inputProps={{ step: 0.01 }}
                            fullWidth
                            value={formikAdd.values.max_size}
                            onChange={formikAdd.handleChange}
                            error={formikAdd.touched.max_size && Boolean(formikAdd.errors.max_size)}
                            helperText={formikAdd.touched.max_size && formikAdd.errors.max_size}
                        />
                        <TextField
                            margin="dense"
                            id="init_price"
                            label="Init Price"
                            type="number"
                            inputProps={{ step: 0.1 }}
                            fullWidth
                            value={formikAdd.values.init_price}
                            onChange={formikAdd.handleChange}
                            error={formikAdd.touched.init_price && Boolean(formikAdd.errors.init_price)}
                            helperText={formikAdd.touched.init_price && formikAdd.errors.init_price}
                        />
                        <TextField
                            margin="dense"
                            id="unit_price"
                            label="Unit Price"
                            type="number"
                            inputProps={{ step: 0.1 }}
                            fullWidth
                            value={formikAdd.values.unit_price}
                            onChange={formikAdd.handleChange}
                            error={formikAdd.touched.unit_price && Boolean(formikAdd.errors.unit_price)}
                            helperText={formikAdd.touched.unit_price && formikAdd.errors.unit_price}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAddClose}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={openEdit} onClose={handleEditClose}>
                <form onSubmit={formikEdit.handleSubmit}>
                    <DialogTitle>Edit Service Price</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="min_size"
                            label="Min Size"
                            type="number"
                            inputProps={{ step: 0.01 }}
                            fullWidth
                            value={formikEdit.values.min_size}
                            onChange={formikEdit.handleChange}
                            error={formikEdit.touched.min_size && Boolean(formikEdit.errors.min_size)}
                            helperText={formikEdit.touched.min_size && formikEdit.errors.min_size}
                        />
                        <TextField
                            margin="dense"
                            id="max_size"
                            label="Max Size"
                            type="number"
                            inputProps={{ step: 0.01 }}
                            fullWidth
                            value={formikEdit.values.max_size}
                            onChange={formikEdit.handleChange}
                            error={formikEdit.touched.max_size && Boolean(formikEdit.errors.max_size)}
                            helperText={formikEdit.touched.max_size && formikEdit.errors.max_size}
                        />
                        <TextField
                            margin="dense"
                            id="init_price"
                            label="Init Price"
                            type="number"
                            inputProps={{ step: 0.1 }}
                            fullWidth
                            value={formikEdit.values.init_price}
                            onChange={formikEdit.handleChange}
                            error={formikEdit.touched.init_price && Boolean(formikEdit.errors.init_price)}
                            helperText={formikEdit.touched.init_price && formikEdit.errors.init_price}
                        />
                        <TextField
                            margin="dense"
                            id="unit_price"
                            label="Unit Price"
                            type="number"
                            inputProps={{ step: 0.1 }}
                            fullWidth
                            value={formikEdit.values.unit_price}
                            onChange={formikEdit.handleChange}
                            error={formikEdit.touched.unit_price && Boolean(formikEdit.errors.unit_price)}
                            helperText={formikEdit.touched.unit_price && formikEdit.errors.unit_price}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditClose}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default ServicePriceList;
