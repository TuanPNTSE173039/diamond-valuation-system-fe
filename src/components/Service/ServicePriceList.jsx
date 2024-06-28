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
import { useState } from "react";
import {StyledBadge} from "../../assets/styles/Badge.jsx";
import AddIcon from "@mui/icons-material/Add.js";
import * as React from "react";


const ServicePriceList = () => {

    const [servicePriceList, setServicePriceList] = useState([
        {
            id: 1,
            initPrice:20.00,
            unitPrice:0.00,
            minSize:4.01,
            maxSize:4.49,
            serviceId:1
        },
        {
            id: 2,
            initPrice:25.00,
            unitPrice:0.00,
            minSize:4.50,
            maxSize:4.99,
            serviceId:1
        },
        {
            id: 3,
            initPrice:30.00,
            unitPrice:0.00,
            minSize:5.00,
            maxSize:5.49,
            serviceId:1
        },
        {
            id: 4,
            initPrice:36.00,
            unitPrice:0.00,
            minSize:4.01,
            maxSize:4.49,
            serviceId:2
        },
        {
            id: 5,
            initPrice:40.00,
            unitPrice:0.00,
            minSize: 4.50,
            maxSize: 4.99,
            serviceId: 2
        },
        {
            id: 6,
            initPrice: 45.00,
            unitPrice: 0.00,
            minSize: 5.00,
            maxSize: 5.49,
            serviceId: 2
        },
        {
            id: 7,
            initPrice: 50.00,
            unitPrice: 0.00,
            minSize: 4.01,
            maxSize: 4.49,
            serviceId: 3
        },
        {
            id: 8,
            initPrice: 55.00,
            unitPrice: 0.00,
            minSize: 4.50,
            maxSize: 4.99,
            serviceId: 3
        },
        {
            id: 9,
            initPrice: 60.00,
            unitPrice: 0.00,
            minSize: 5.00,
            maxSize: 5.49,
            serviceId: 3
        },
        {
            id: 10,
            initPrice: 70.00,
            unitPrice: 0.00,
            minSize: 4.01,
            maxSize: 4.49,
            serviceId: 4
        },
        {
            id: 11,
            initPrice: 75.00,
            unitPrice: 0.00,
            minSize: 4.50,
            maxSize: 4.99,
            serviceId: 4
        },
        {
            id: 12,
            initPrice: 80.00,
            unitPrice: 0.00,
            minSize: 5.00,
            maxSize: 5.49,
            serviceId: 4
        }
    ]);

    const [selectedServiceId, setSelectedServiceId] = useState(2); // Set the default serviceId to 1 or any other

    const [selectedDetail, setSelectedDetail] = useState({
        id: undefined,
        min_size: 0.0,
        max_size: 0.0,
        init_price: 0.0,
        unit_price: 0.0
    });

    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);

    const handleEditClick = (id) => {
        setOpenEdit(true);
        const service = servicePriceList.find((service) => service.id === id);
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

    const handleEditSave = () => {
        const updatedServiceList = servicePriceList.map((service) => {
            if (service.id === selectedDetail.id) {
                return {
                    ...service,
                    minSize: selectedDetail.min_size,
                    maxSize: selectedDetail.max_size,
                    initPrice: selectedDetail.init_price,
                    unitPrice: selectedDetail.unit_price,
                };
            }
            return service;
        });
        setServicePriceList(updatedServiceList);
        setOpenEdit(false);
        setSelectedDetail({
            id: undefined,
            min_size: 0.0,
            max_size: 0.0,
            init_price: 0.0,
            unit_price: 0.0,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedDetail((prevState) => ({
            ...prevState,
            [name]: parseFloat(value),
        }));
    };

    const handleDelete = (id) => {
        const updatedServiceList = servicePriceList.filter((service) => service.id !== id);
        setServicePriceList(updatedServiceList);
    };

    const handleAddClick = () => {
        setOpenAdd(true);
        setSelectedDetail({
            id: servicePriceList.length + 1, // Assuming id is incremental
            min_size: 0.0,
            max_size: 0.0,
            init_price: 0.0,
            unit_price: 0.0,
            serviceId: selectedServiceId // Assign selectedServiceId to the new service
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

    const handleAddSave = () => {
        const newService = {
            id: selectedDetail.id,
            minSize: selectedDetail.min_size,
            maxSize: selectedDetail.max_size,
            initPrice: selectedDetail.init_price,
            unitPrice: selectedDetail.unit_price,
            serviceId: selectedServiceId // Make sure serviceId is included
        };
        setServicePriceList([...servicePriceList, newService]);
        setOpenAdd(false);
        setSelectedDetail({
            id: undefined,
            min_size: 0.0,
            max_size: 0.0,
            init_price: 0.0,
            unit_price: 0.0,
        });
    };

    // Filter the price list based on the selected serviceId
    const filteredServicePriceList = servicePriceList.filter(service => service.serviceId === selectedServiceId);

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
                        SERVICE PRICES
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
                        <TableRow sx={{ backgroundColor: "primary.main" }}>
                            <TableCell align="left" sx={{ color: "white" }}>
                                Id
                            </TableCell>
                            <TableCell align="center" sx={{ color: "white" }}>
                                Min Size - Max Size
                            </TableCell>
                            <TableCell align="center" sx={{ color: "white" }}>
                                Init Price
                            </TableCell>
                            <TableCell align="center" sx={{ color: "white" }}>
                                Unit Price
                            </TableCell>
                            <TableCell align="center" sx={{ color: "white" }}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredServicePriceList.map((service) => (
                            <TableRow key={service.id}>
                                <TableCell align="left">{service.id}</TableCell>
                                <TableCell align="center">
                                    {service.minSize} - {service.maxSize}
                                </TableCell>
                                <TableCell align="center">
                                    {service.initPrice}
                                </TableCell>
                                <TableCell align="center">
                                    {service.unitPrice}
                                </TableCell>
                                <TableCell align="center">
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
                    id="min_size"
                    name="min_size"
                    label="Min Size"
                    type="number"
                    inputProps={{ step: 0.01 }}
                    fullWidth
                    value={selectedDetail.min_size}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    id="max_size"
                    name="max_size"
                    label="Max Size"
                    type="number"
                    inputProps={{ step: 0.01 }}
                    fullWidth
                    value={selectedDetail.max_size}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    id="init_price"
                    name="init_price"
                    label="Init Price"
                    type="number"
                    inputProps={{ step: 0.01 }}
                    fullWidth
                    value={selectedDetail.init_price}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    id="unit_price"
                    name="unit_price"
                    label="Unit Price"
                    type="number"
                    inputProps={{ step: 0.01 }}
                    fullWidth
                    value={selectedDetail.unit_price}
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
                    id="min_size"
                    name="min_size"
                    label="Min Size"
                    type="number"
                    inputProps={{ step: 0.01 }}
                    fullWidth
                    value={selectedDetail.min_size}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    id="max_size"
                    name="max_size"
                    label="Max Size"
                    type="number"
                    inputProps={{ step: 0.01 }}
                    fullWidth
                    value={selectedDetail.max_size}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    id="init_price"
                    name="init_price"
                    label="Init Price"
                    type="number"
                    inputProps={{ step: 0.01 }}
                    fullWidth
                    value={selectedDetail.init_price}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    id="unit_price"
                    name="unit_price"
                    label="Unit Price"
                    type="number"
                    inputProps={{ step: 0.01 }}
                    fullWidth
                    value={selectedDetail.unit_price}
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

export default ServicePriceList;
