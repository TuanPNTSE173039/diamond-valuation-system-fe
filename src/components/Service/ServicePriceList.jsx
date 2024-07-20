import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
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
import { useFormik } from "formik";
import * as React from "react";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  deleteServicePrice,
  postServicePrice,
  updateServicePrice,
} from "../../services/api";
import { useService } from "../../services/services";
import {
  formattedDiamondSize,
  formattedMoney,
} from "../../utilities/formatter.js";
import UIBreadCrumb from "../UI/BreadCrumb.jsx";
import UICircularIndeterminate from "../UI/CircularIndeterminate";

const ServicePriceList = () => {
  const { serviceId } = useParams();
  const { data: serviceData, isLoading, refetch } = useService(serviceId);

  const [localServicePriceList, setLocalServicePriceList] =
    React.useState(null);
  const [selectedDetail, setSelectedDetail] = React.useState(null);
  const [selectedDelete, setSelectedDelete] = useState(null);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const location = useLocation();
  const pathNames = location.pathname.split("/").filter((x) => x);

  React.useEffect(() => {
    if (serviceData) {
      const updatedServicePriceList = {
        id: serviceData.id,
        name: serviceData.name,
        description: serviceData.description,
        period: serviceData.period,
        servicePriceLists: serviceData.servicePriceLists,
      };
      // Sort servicePriceLists by minSize ascending
      updatedServicePriceList.servicePriceLists.sort(
        (a, b) => a.minSize - b.minSize,
      );
      setLocalServicePriceList(updatedServicePriceList);
    }
  }, [serviceData]);

  const handleEditClick = (id) => {
    setOpenEdit(true);
    const service = localServicePriceList.servicePriceLists.find(
      (service) => service.id === id,
    );
    setSelectedDetail(service);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setSelectedDetail(null);
  };

  const handleEditSave = async (values) => {
    const updatedService = {
      id: selectedDetail.id,
      minSize: values.min_size,
      maxSize: values.max_size,
      initPrice: values.init_price,
      unitPrice: values.unit_price,
      serviceId: serviceId,
    };

    try {
      await updateServicePrice(selectedDetail.id, updatedService);
      const updatedList = localServicePriceList.servicePriceLists.map(
        (service) =>
          service.id === selectedDetail.id ? updatedService : service,
      );
      setLocalServicePriceList({
        ...localServicePriceList,
        servicePriceLists: updatedList,
      });
      toast.success("Service price updated successfully");
      await refetch();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to update service price",
      );
    }

    handleEditClose();
  };

  const handleDelete = async (id) => {
    try {
      await deleteServicePrice(id);
      const updatedServiceList = localServicePriceList.servicePriceLists.filter(
        (service) => service.id !== id,
      );
      setLocalServicePriceList({
        ...localServicePriceList,
        servicePriceLists: updatedServiceList,
      });
      toast.success("Service price deleted successfully");
      await refetch();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete service price",
      );
    }
  };

  const handleAddClick = () => {
    setOpenAdd(true);
    setSelectedDetail(null);
  };

  const handleAddClose = () => {
    setOpenAdd(false);
    setSelectedDetail(null);
    formikAdd.resetForm();
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
      setLocalServicePriceList({
        ...localServicePriceList,
        servicePriceLists: [
          ...localServicePriceList.servicePriceLists,
          createdServicePrice,
        ],
      });
      toast.success("Service price added successfully");
      await refetch();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to add service price",
      );
    }

    handleAddClose();
  };

  const validationSchema = Yup.object().shape({
    min_size: Yup.number()
      .required("Min Size is required")
      .positive("Min Size must be a positive number")
      .min(1, "Min Size must be greater than 0"),
    max_size: Yup.number()
      .required("Max Size is required")
      .positive("Max Size must be a positive number")
      .moreThan(Yup.ref("min_size"), "Max Size must be greater than Min Size"),
    init_price: Yup.number()
      .required("Init Price is required")
      .positive("Init Price must be a positive number"),
    unit_price: Yup.number(),
  });

  const formikEdit = useFormik({
    initialValues: {
      min_size: selectedDetail ? selectedDetail.minSize : "",
      max_size: selectedDetail ? selectedDetail.maxSize : "",
      init_price: selectedDetail ? selectedDetail.initPrice : "",
      unit_price: selectedDetail ? selectedDetail.unitPrice : "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: handleEditSave,
  });

  const formikAdd = useFormik({
    initialValues: {
      min_size: "",
      max_size: "",
      init_price: "",
      unit_price: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleAddSave,
  });

  if (isLoading) {
    return <UICircularIndeterminate />;
  }

  return (
    <>
      <UIBreadCrumb pathNames={pathNames} />
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            mt: 2,
            py: 0.5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            Service Price List
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddClick}
          >
            Add
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ width: "100%", mt: 0 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.main" }}>
                <TableCell align="center" sx={{ color: "white" }}>
                  No.
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  Service Name
                </TableCell>
                <TableCell align="right" sx={{ color: "white" }}>
                  Min Size
                </TableCell>
                <TableCell align="right" sx={{ color: "white" }}>
                  Max Size
                </TableCell>
                <TableCell align="right" sx={{ color: "white" }}>
                  Init Price
                </TableCell>
                <TableCell align="right" sx={{ color: "white" }}>
                  Unit Price
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {localServicePriceList &&
                localServicePriceList.servicePriceLists.map(
                  (service, index) => (
                    <TableRow key={service.id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="left">
                        {localServicePriceList.name}
                      </TableCell>
                      <TableCell align="right">
                        {formattedDiamondSize(service.minSize)}
                      </TableCell>
                      <TableCell align="right">
                        {service.maxSize <= 15
                          ? formattedDiamondSize(service.maxSize)
                          : "> 15 mm"}
                      </TableCell>
                      <TableCell align="right">
                        {formattedMoney(service.initPrice)}
                      </TableCell>
                      <TableCell align="right">
                        {formattedMoney(service.unitPrice)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClick={() => handleEditClick(service.id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={() => {
                            setSelectedDelete(service.id);
                            setOpenDelete(true);
                          }}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ),
                )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add Dialog */}
        <Dialog open={openAdd} onClose={handleAddClose}>
          <form onSubmit={formikAdd.handleSubmit}>
            <DialogTitle>Add New Service Price</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                id="min_size"
                label="Min Size (mm)"
                type="number"
                inputProps={{ step: 0.01 }}
                fullWidth
                value={formikAdd.values.min_size}
                onChange={formikAdd.handleChange}
                onBlur={formikAdd.handleBlur}
                error={
                  formikAdd.touched.min_size &&
                  Boolean(formikAdd.errors.min_size)
                }
                helperText={
                  formikAdd.touched.min_size && formikAdd.errors.min_size
                }
              />
              <TextField
                margin="dense"
                id="max_size"
                label="Max Size (mm)"
                type="number"
                inputProps={{ step: 0.01 }}
                fullWidth
                value={formikAdd.values.max_size}
                onChange={formikAdd.handleChange}
                onBlur={formikAdd.handleBlur}
                error={
                  formikAdd.touched.max_size &&
                  Boolean(formikAdd.errors.max_size)
                }
                helperText={
                  formikAdd.touched.max_size && formikAdd.errors.max_size
                }
              />
              <TextField
                margin="dense"
                id="init_price"
                label="Init Price ($00.00)"
                type="number"
                inputProps={{ step: 0.1 }}
                fullWidth
                value={formikAdd.values.init_price}
                onChange={formikAdd.handleChange}
                onBlur={formikAdd.handleBlur}
                error={
                  formikAdd.touched.init_price &&
                  Boolean(formikAdd.errors.init_price)
                }
                helperText={
                  formikAdd.touched.init_price && formikAdd.errors.init_price
                }
              />
              <TextField
                margin="dense"
                id="unit_price"
                label="Unit Price ($00.00)"
                type="number"
                inputProps={{ step: 0.1 }}
                fullWidth
                value={formikAdd.values.unit_price}
                onChange={formikAdd.handleChange}
                onBlur={formikAdd.handleBlur}
                error={
                  formikAdd.touched.unit_price &&
                  Boolean(formikAdd.errors.unit_price)
                }
                helperText={
                  formikAdd.touched.unit_price && formikAdd.errors.unit_price
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddClose}>Close</Button>
              <Button type="submit" variant={"contained"}>
                Create
              </Button>
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
                label="Min Size (mm)"
                type="number"
                inputProps={{ step: 0.01 }}
                fullWidth
                value={formikEdit.values.min_size}
                onChange={formikEdit.handleChange}
                onBlur={formikEdit.handleBlur}
                error={
                  formikEdit.touched.min_size &&
                  Boolean(formikEdit.errors.min_size)
                }
                helperText={
                  formikEdit.touched.min_size && formikEdit.errors.min_size
                }
              />
              <TextField
                margin="dense"
                id="max_size"
                label="Max Size (mm)"
                type="number"
                inputProps={{ step: 0.01 }}
                fullWidth
                value={formikEdit.values.max_size}
                onChange={formikEdit.handleChange}
                onBlur={formikEdit.handleBlur}
                error={
                  formikEdit.touched.max_size &&
                  Boolean(formikEdit.errors.max_size)
                }
                helperText={
                  formikEdit.touched.max_size && formikEdit.errors.max_size
                }
              />
              <TextField
                margin="dense"
                id="init_price"
                label="Init Price ($00.00)"
                type="number"
                inputProps={{ step: 0.1 }}
                fullWidth
                value={formikEdit.values.init_price}
                onChange={formikEdit.handleChange}
                onBlur={formikEdit.handleBlur}
                error={
                  formikEdit.touched.init_price &&
                  Boolean(formikEdit.errors.init_price)
                }
                helperText={
                  formikEdit.touched.init_price && formikEdit.errors.init_price
                }
              />
              <TextField
                margin="dense"
                id="unit_price"
                label="Unit Price ($00.00)"
                type="number"
                inputProps={{ step: 0.1 }}
                fullWidth
                value={formikEdit.values.unit_price}
                onChange={formikEdit.handleChange}
                onBlur={formikEdit.handleBlur}
                error={
                  formikEdit.touched.unit_price &&
                  Boolean(formikEdit.errors.unit_price)
                }
                helperText={
                  formikEdit.touched.unit_price && formikEdit.errors.unit_price
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose}>Cancel</Button>
              <Button type="submit" variant={"contained"}>
                Save changes
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/*    Delete Confirm dialog*/}
        <Dialog
          open={openDelete}
          onClose={() => {
            setOpenDelete(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography id="alert-dialog-description">
              Are you sure you want to delete this service price?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenDelete(false);
              }}
              variant="text"
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                await handleDelete(selectedDelete);
                setOpenDelete(false);
              }}
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default ServicePriceList;
