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
import { useState, useEffect } from "react";
import { StyledBadge } from "../../assets/styles/Badge.jsx";
import AddIcon from "@mui/icons-material/Add.js";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { getServices } from "../../services/api.js";

const ServiceList = () => {
    const [serviceList, setServiceList] = useState([]);
    const [selectedDetail, setSelectedDetail] = useState({
        id: undefined,
        name: "",
        description: "",
        period: 0,
    });
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await getServices();
                setServiceList(response);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        fetchServices();
    }, []);


    const handleEditClick = (id) => {
        setOpenEdit(true);
        const service = serviceList.find(service => service.id === id);
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

    const handleEditSave = async () => {
        try {
            await updateService(selectedDetail.id, selectedDetail);
            const updatedServiceList = serviceList.map(service => {
                if (service.id === selectedDetail.id) {
                    return {
                        ...service,
                        name: selectedDetail.name,
                        description: selectedDetail.description,
                        period: selectedDetail.period,
                    };
                }
                return service;
            });
            setServiceList(updatedServiceList);
            setOpenEdit(false);
            setSelectedDetail({
                id: undefined,
                name: "",
                description: "",
                period: 0,
            });
        } catch (error) {
            console.error("Error updating service:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedDetail(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDelete = async (id) => {
        try {
            await deleteService(id);
            const updatedServiceList = serviceList.filter(service => service.id !== id);
            setServiceList(updatedServiceList);
        } catch (error) {
            console.error("Error deleting service:", error);
        }
    };

    const handlePriceClick = (id) => {
        navigate(`/services/${id}`); // Navigate to the service price list page
    };

    const handleAddClick = () => {
        setOpenAdd(true);
        setSelectedDetail({
            id: serviceList.length + 1, // Assuming id is incremental
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

    const handleAddSave = async () => {
        try {
            const response = await addService(selectedDetail);
            setServiceList([...serviceList, response]);
            setOpenAdd(false);
            setSelectedDetail({
                id: undefined,
                name: "",
                description: "",
                period: 0,
            });
        } catch (error) {
            console.error("Error adding service:", error);
        }
    };

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
                    <Button
                        onClick={handleAddClick}
                        variant={"outlined"}
                        endIcon={<AddIcon />}
                    >
                        Add
                    </Button>
                </Box>
            </Box>
            <TableContainer component={Paper} sx={{ mt: 0 }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'primary.main'}}>
                            <TableCell align="left" sx={{ color: 'white' }}>Id</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Service Name</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Description</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Period</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {serviceList.map((service) => (
                            <TableRow key={service.id}>
                                <TableCell align="left">{service.id}</TableCell>
                                <TableCell align="left">{service.name}</TableCell>
                                <TableCell align="left">{service.description}</TableCell>
                                <TableCell align="center">{service.period}</TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" onClick={() => handleEditClick(service.id)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleDelete(service.id)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                    <IconButton color="success" onClick={() => handlePriceClick(service.id)}>
                                        <AttachMoneyIcon />
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
                        value={selectedDetail.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        value={selectedDetail.description}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="period"
                        name="period"
                        label="Period"
                        type="number"
                        fullWidth
                        value={selectedDetail.period}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose} variant="text">
                        Cancel
                    </Button>
                    <Button onClick={handleAddSave} variant="contained">
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
                        value={selectedDetail.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        value={selectedDetail.description}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="period"
                        name="period"
                        label="Period"
                        type="number"
                        fullWidth
                        value={selectedDetail.period}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} variant="text">
                        Cancel
                    </Button>
                    <Button onClick={handleEditSave} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ServiceList;
