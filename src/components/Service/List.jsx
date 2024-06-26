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
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const ServiceList = () => {
    const [serviceList, setServiceList] = useState([
        {
            id: 1,
            description: "– Time to send for inspection depends on the time of sending.\n– Unlimited quantity. Service price list according to regulations.",
            period: 72,
            service_name: "Normal pricing"
        },
        {
            id: 2,
            description: "-Inspection time is 48 working hours from the time the product is received.\n– Quantity sent depends on time. Service price list according to regulations.",
            period: 48,
            service_name: "Quick valuation in 48 hours"
        },
        {
            id: 3,
            description: "-Inspection time is 24 working hours from the time the product is received.\n– Quantity sent depends on time. Service price list according to regulations.",
            period: 24,
            service_name: "Quick valuation in 24 hours"
        },
        {
            id: 4,
            description: "-Inspection time is 3 working hours from the time the product is received.\n– Quantity sent depends on time. Service price list according to regulations.",
            period: 3,
            service_name: "Quick valuation in 3 hours"
        }
    ]);

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

    const [selectedDetail, setSelectedDetail] = useState({
        id: undefined,
        service_name: "",
        description: "",
        period: 0,
    });

    const [openEdit, setOpenEdit] = useState(false);

    const handleEditClick = (id) => {
        setOpenEdit(true);
        const service = serviceList.find(service => service.id === id);
        setSelectedDetail({
            id: service.id,
            service_name: service.service_name,
            description: service.description,
            period: service.period,
        });
    };

    const handleEditClose = () => {
        setOpenEdit(false);
        setSelectedDetail({
            id: undefined,
            service_name: "",
            description: "",
            period: 0,
        });
    };

    const handleEditSave = () => {
        const updatedServiceList = serviceList.map(service => {
            if (service.id === selectedDetail.id) {
                return {
                    ...service,
                    service_name: selectedDetail.service_name,
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
            service_name: "",
            description: "",
            period: 0,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedDetail(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDelete = (id) => {
        // Implement delete logic here
        console.log("Deleting service with id:", id);
        // For demonstration, just log the id to delete
    };
    const [openPriceDialog, setOpenPriceDialog] = useState(false);
    const [priceDetails, setPriceDetails] = useState([]);

// Function to handle opening the price details popup
    const handlePriceClick = (serviceId) => {
        const prices = servicePriceList.filter(price => price.serviceId === serviceId);
        setPriceDetails(prices);
        setOpenPriceDialog(true);
    };

    const handlePriceClose = () => {
        setOpenPriceDialog(false);
        setPriceDetails([]);
    };

    return (
        <Box sx={{ width: "100%" }}>
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
                                <TableCell align="left">{service.service_name}</TableCell>
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

            {/* Edit Dialog */}
            <Dialog open={openEdit} onClose={handleEditClose}>
                <DialogTitle>Edit Service</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="service_name"
                        name="service_name"
                        label="Service Name"
                        type="text"
                        fullWidth
                        value={selectedDetail.service_name}
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

            {/* Price Details Dialog */}
            <Dialog open={openPriceDialog} onClose={handlePriceClose}>
                <DialogTitle>Service Prices</DialogTitle>
                <DialogContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Min Size - Max Size</TableCell>
                                    <TableCell>Init Price</TableCell>
                                    <TableCell>Unit Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {priceDetails.map((price) => (
                                    <TableRow key={price.id}>
                                        <TableCell>{price.id}</TableCell>
                                        <TableCell>{price.minSize} - {price.maxSize}</TableCell>
                                        <TableCell>${price.initPrice.toFixed(2)}</TableCell>
                                        <TableCell>${price.unitPrice.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePriceClose} variant="text">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ServiceList;
