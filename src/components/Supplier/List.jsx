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
import { useSuppliers } from "../../services/suppliers";
import { postSupplier, updateSupplier, deleteSupplier } from "../../services/api";
import * as Yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import DiamondIcon from "@mui/icons-material/Diamond";

const SupplierList = () => {
    const { data: supplierList, isLoading, refetch } = useSuppliers();
    const [localSupplierList, setLocalSupplierList] = React.useState([]);
    const [selectedDetail, setSelectedDetail] = React.useState({
        id: undefined,
        name: "",
        link: "",
    });
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openAdd, setOpenAdd] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (supplierList) {
            setLocalSupplierList(supplierList);
        }
    }, [supplierList]);

    const handleEditClick = (id) => {
        setOpenEdit(true);
        const supplier = localSupplierList.find((supplier) => supplier.id === id);
        setSelectedDetail({
            id: supplier.id,
            name: supplier.name,
            link: supplier.link,
        });
    };

    const handleEditClose = () => {
        setOpenEdit(false);
        setSelectedDetail({
            id: undefined,
            name: "",
            link: "",
        });
    };

    const handleEditSave = async (values) => {
        const updatedSupplier = {
            id: selectedDetail.id,
            name: values.name,
            link: values.link,
        };

        try {
            await updateSupplier(selectedDetail.id, updatedSupplier);
            const updatedList = localSupplierList.map((supplier) =>
                supplier.id === selectedDetail.id ? updatedSupplier : supplier
            );
            setLocalSupplierList(updatedList);
            toast.success("Supplier updated successfully");
            await refetch();
        } catch (error) {
            toast.error("Failed to update supplier");
        }

        handleEditClose();
    };

    const handleDelete = async (id) => {
        try {
            await deleteSupplier(id);
            const updatedSupplierList = localSupplierList.filter((supplier) => supplier.id !== id);
            setLocalSupplierList(updatedSupplierList);
            toast.success("Supplier deleted successfully");
            await refetch();
        } catch (error) {
            toast.error("Failed to delete supplier");
        }
    };

    const handleAddClick = () => {
        setOpenAdd(true);
        setSelectedDetail({
            id: undefined,
            name: "",
            link: "",
        });
    };

    const handleAddClose = () => {
        setOpenAdd(false);
        setSelectedDetail({
            id: undefined,
            name: "",
            link: "",
        });
    };

    const handleAddSave = async (values) => {
        const newSupplier = {
            name: values.name,
            link: values.link,
        };

        try {
            const response = await postSupplier(newSupplier);
            const createdSupplier = response.data;
            setLocalSupplierList([...localSupplierList, createdSupplier]);
            toast.success("Supplier added successfully");
            await refetch();
        } catch (error) {
            toast.error("Failed to add supplier");
        }

        handleAddClose();
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Supplier name is required"),
        link: Yup.string().url("Invalid URL format").required("Link is required"),
    });

    const formikEdit = useFormik({
        initialValues: {
            name: selectedDetail.name,
            link: selectedDetail.link,
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: handleEditSave,
    });

    const formikAdd = useFormik({
        initialValues: {
            name: "",
            link: "",
        },
        validationSchema: validationSchema,
        onSubmit: handleAddSave,
    });
    const handlePriceClick = (id) => {
        navigate(`/suppliers/${id}/diamond-market`);
    };

    if (isLoading) {
        return <Typography>Loading...</Typography>;
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
                <Typography variant="h6" sx={{ fontWeight: "600" }}>
                    SUPPLIERS
                </Typography>
                <Button onClick={handleAddClick} variant="outlined" endIcon={<AddIcon />}>
                    Add
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ mt: 0 }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "primary.main" }}>
                            <TableCell align="left" sx={{ color: "white" }}>
                                Id
                            </TableCell>
                            <TableCell align="center" sx={{ color: "white" }}>
                                Supplier Name
                            </TableCell>
                            <TableCell align="center" sx={{ color: "white" }}>
                                Link
                            </TableCell>
                            <TableCell align="center" sx={{ color: "white" }}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {localSupplierList.map((supplier) => (
                            <TableRow key={supplier.id}>
                                <TableCell align="left">{supplier.id}</TableCell>
                                <TableCell align="center">{supplier.name}</TableCell>
                                <TableCell align="center">
                                    <a href={supplier.link} target="_blank" rel="noopener noreferrer">
                                        {supplier.link}
                                    </a>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="primary"
                                        onClick={() => handlePriceClick(supplier.id)}
                                    >
                                        <DiamondIcon />
                                    </IconButton>
                                    <IconButton color="primary" onClick={() => handleEditClick(supplier.id)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleDelete(supplier.id)}>
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
                <DialogTitle>Add Supplier</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Supplier Name"
                        type="text"
                        fullWidth
                        value={formikAdd.values.name}
                        onChange={formikAdd.handleChange}
                        error={formikAdd.touched.name && Boolean(formikAdd.errors.name)}
                        helperText={formikAdd.touched.name && formikAdd.errors.name}
                    />
                    <TextField
                        margin="dense"
                        id="link"
                        name="link"
                        label="Link"
                        type="text"
                        fullWidth
                        value={formikAdd.values.link}
                        onChange={formikAdd.handleChange}
                        error={formikAdd.touched.link && Boolean(formikAdd.errors.link)}
                        helperText={formikAdd.touched.link && formikAdd.errors.link}
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
                <DialogTitle>Edit Supplier</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Supplier Name"
                        type="text"
                        fullWidth
                        value={formikEdit.values.name}
                        onChange={formikEdit.handleChange}
                        error={formikEdit.touched.name && Boolean(formikEdit.errors.name)}
                        helperText={formikEdit.touched.name && formikEdit.errors.name}
                    />
                    <TextField
                        margin="dense"
                        id="link"
                        name="link"
                        label="Link"
                        type="text"
                        fullWidth
                        value={formikEdit.values.link}
                        onChange={formikEdit.handleChange}
                        error={formikEdit.touched.link && Boolean(formikEdit.errors.link)}
                        helperText={formikEdit.touched.link && formikEdit.errors.link}
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

export default SupplierList;
