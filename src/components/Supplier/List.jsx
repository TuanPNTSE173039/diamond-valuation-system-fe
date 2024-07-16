import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DiamondIcon from "@mui/icons-material/Diamond";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import EditIcon from "@mui/icons-material/Edit";
import { CardMedia } from "@mui/material";
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
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useFormik } from "formik";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { VisuallyHiddenInput } from "../../assets/styles/Input.jsx";
import {
  deleteSupplier,
  postSupplier,
  updateSupplier,
} from "../../services/api";
import { storage } from "../../services/config/firebase.js";
import { useSuppliers } from "../../services/suppliers";
import { metadata } from "../Detail/Item.jsx";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";

const SupplierList = () => {
  const { data: supplierList, isLoading, refetch } = useSuppliers();
  const [localSupplierList, setLocalSupplierList] = React.useState([]);
  const [selectedDetail, setSelectedDetail] = React.useState({
    id: undefined,
    name: "",
    link: "",
    image: "",
  });
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = React.useState(null);
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
      image: supplier.image,
    });
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setSelectedDetail({
      id: undefined,
      name: "",
      link: "",
      image: "",
    });
  };

  const handleEditSave = async (values) => {
    const updatedSupplier = {
      id: selectedDetail.id,
      name: values.name,
      link: values.link,
      image: values.image,
    };
    try {
      await updateSupplier(selectedDetail.id, updatedSupplier);
      const updatedList = localSupplierList.map((supplier) =>
        supplier.id === selectedDetail.id ? updatedSupplier : supplier,
      );
      setLocalSupplierList(updatedList);
      toast.success("Supplier updated successfully");
      await refetch();
    } catch (error) {
      toast.error("Failed to update supplier");
    }
    formikEdit.resetForm();
    handleEditClose();
  };

  const handleDeleteClick = (id) => {
    setSelectedDeleteId(id);
    setOpenDeleteConfirm(true);
  };

  const handleDeleteConfirmClose = () => {
    setOpenDeleteConfirm(false);
    setSelectedDeleteId(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteSupplier(selectedDeleteId);
      const updatedSupplierList = localSupplierList.filter(
        (supplier) => supplier.id !== selectedDeleteId,
      );
      setLocalSupplierList(updatedSupplierList);
      toast.success("Supplier deleted successfully");
      await refetch();
    } catch (error) {
      toast.error("Failed to delete supplier");
    } finally {
      handleDeleteConfirmClose();
    }
  };

  const handleAddClick = () => {
    setOpenAdd(true);
    setSelectedDetail({
      id: undefined,
      name: "",
      link: "",
      image: "",
    });
  };

  const handleAddClose = () => {
    setOpenAdd(false);
    setSelectedDetail({
      id: undefined,
      name: "",
      link: "",
      image: "",
    });
    formikAdd.resetForm();
  };

  const handleAddSave = async (values) => {
    const newSupplier = {
      name: values.name,
      link: values.link,
      image: values.image,
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
    formikAdd.resetForm();
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
      image: selectedDetail.image,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: handleEditSave,
  });

  const formikAdd = useFormik({
    initialValues: {
      name: "",
      link: "",
      image: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleAddSave,
  });
  const handlePriceClick = (id) => {
    navigate(`/suppliers/${id}`);
  };

  if (isLoading) {
    return <UICircularIndeterminate />;
  }
  function handleUploadSupplierLogo(file, isEdit) {
    const storageRef = ref(storage, `suppliers/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      async () => {
        const imageLink = await getDownloadURL(storageRef);
        if (isEdit) await formikEdit.setFieldValue("image", imageLink);
        else await formikAdd.setFieldValue("image", imageLink);
      },
    );
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
        <Button
          onClick={handleAddClick}
          variant="outlined"
          endIcon={<AddIcon />}
        >
          Add
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 0 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell align="center" sx={{ color: "white" }}>
                No.
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Supplier Image
              </TableCell>
              <TableCell align="left" sx={{ color: "white" }}>
                Supplier Name
              </TableCell>
              <TableCell align="left" sx={{ color: "white" }}>
                Link
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {localSupplierList.map((supplier, index) => (
              <TableRow key={supplier.id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center" sx={{ width: "20%" }}>
                  {supplier.image && (
                    <CardMedia
                      component="img"
                      src={supplier.image}
                      sx={{ width: "100%", height: "auto" }}
                    />
                  )}
                </TableCell>
                <TableCell align="left">{supplier.name}</TableCell>
                <TableCell align="left">
                  <a
                    href={supplier.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(supplier.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteClick(supplier.id)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
                <TableCell style={{ display: "none" }}>{supplier.id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Dialog */}
      <Dialog open={openAdd} onClose={handleAddClose}>
        <DialogTitle>Add Supplier</DialogTitle>
        <DialogContent>
          {!formikAdd.values.image && (
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ height: 200, width: "100%" }}
            >
              Upload Logo
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    handleUploadSupplierLogo(e.target.files[0], false);
                  }
                }}
              />
            </Button>
          )}
          {formikAdd.values.image && (
            <Box sx={{ position: "relative", mb: 2 }}>
              <CardMedia
                component="img"
                src={formikAdd.values.image}
                sx={{ width: "100%", height: 200, objectFit: "contain" }}
              />
              <IconButton
                aria-label="update"
                size="large"
                component="label"
                tabIndex={-1}
                role={undefined}
                sx={{
                  position: "absolute",
                  bottom: 7,
                  right: 7,
                  bgcolor: "white",
                  "&:hover": {
                    bgcolor: "red",
                  },
                  p: 0.5,
                }}
              >
                <DriveFileRenameOutlineIcon
                  sx={{ color: "red", "&:hover": { color: "white" } }}
                />
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      handleUploadSupplierLogo(e.target.files[0], false);
                    }
                  }}
                />
              </IconButton>
            </Box>
          )}

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
          {!formikEdit.values.image && (
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ height: 200, width: "100%", mb: 2 }}
            >
              Upload Logo
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    handleUploadSupplierLogo(e.target.files[0], true);
                  }
                }}
              />
            </Button>
          )}
          {formikEdit.values.image && (
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                src={formikEdit.values.image}
                sx={{ width: "100%", height: 200 }}
              />
              <IconButton
                aria-label="update"
                component="label"
                role={undefined}
                tabIndex={-1}
                size="large"
                sx={{
                  position: "absolute",
                  bottom: 7,
                  right: 7,
                  bgcolor: "white",
                  "&:hover": {
                    bgcolor: "red",
                  },
                  p: 0.5,
                }}
              >
                <DriveFileRenameOutlineIcon
                  sx={{ color: "red", "&:hover": { color: "white" } }}
                />
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      handleUploadSupplierLogo(e.target.files[0], true);
                    }
                  }}
                />
              </IconButton>
            </Box>
          )}

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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteConfirm}
        onClose={handleDeleteConfirmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <Typography id="alert-dialog-description">
            Are you sure you want to delete this supplier?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmClose} variant="text">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SupplierList;
