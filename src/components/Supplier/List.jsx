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
import { StyledBadge } from "../../assets/styles/Badge.jsx";
import AddIcon from "@mui/icons-material/Add.js";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import DiamondIcon from "@mui/icons-material/Diamond";

const SupplierList = () => {
    const [supplierList, setSupplierList] = useState([
        {
            id: 1,
            link: "https://www.stonealgo.com/",
            name: "StoneAlgo",
        },
        {
            id: 2,
            link: "https://www.adiamor.com/",
            name: "Adiamor",
        },
    ]);

    const [selectedDetail, setSelectedDetail] = useState({
        id: undefined,
        name: "",
        link: "",
    });

    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const navigate = useNavigate();

    const handleEditClick = (id) => {
        setOpenEdit(true);
        const supplier = supplierList.find(supplier => supplier.id === id);
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

    const handleEditSave = () => {
        const updatedSupplierList = supplierList.map(supplier => {
            if (supplier.id === selectedDetail.id) {
                return {
                    ...supplier,
                    name: selectedDetail.name,
                    link: selectedDetail.link,
                };
            }
            return supplier;
        });
        setSupplierList(updatedSupplierList);
        setOpenEdit(false);
        setSelectedDetail({
            id: undefined,
            name: "",
            link: "",
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
        const updatedSupplierList = supplierList.filter(supplier => supplier.id !== id);
        setSupplierList(updatedSupplierList);
    };

    const handleAddClick = () => {
        setOpenAdd(true);
        setSelectedDetail({
            id: supplierList.length + 1,
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

    const handleAddSave = () => {
        setSupplierList([...supplierList, selectedDetail]);
        setOpenAdd(false);
        setSelectedDetail({
            id: undefined,
            name: "",
            link: "",
        });
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
                        SUPPLIERS
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
                            <TableCell align="center" sx={{ color: 'white' }}>Supplier Name</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Link</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {supplierList.map((supplier) => (
                            <TableRow key={supplier.id}>
                                <TableCell align="left">{supplier.id}</TableCell>
                                <TableCell align="center">{supplier.name}</TableCell>
                                <TableCell align="center">
                                    <a href={supplier.link} target="_blank" rel="noopener noreferrer">
                                        {supplier.link}
                                    </a>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" onClick={() => handleEditClick(supplier.id)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleDelete(supplier.id)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                    <IconButton color="primary" onClick={() => navigate(`/suppliers/${supplier.id}`)}>
                                        <DiamondIcon />
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
                        value={selectedDetail.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="link"
                        name="link"
                        label="Link"
                        type="url"
                        fullWidth
                        value={selectedDetail.link}
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
                        value={selectedDetail.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="link"
                        name="link"
                        label="Link"
                        type="url"
                        fullWidth
                        value={selectedDetail.link}
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

export default SupplierList;
