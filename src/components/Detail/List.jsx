import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { InputAdornment } from "@mui/material";
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
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as React from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { StyledBadge } from "../../assets/styles/Badge.jsx";
import { StyledTableCell, StyledTableRow } from "../../assets/styles/Table.jsx";
import { checkDiamond } from "../../services/api.js";
import { useRequest } from "../../services/requests.js";
import {
  formattedDateTime,
  formattedDiamondSize,
  formattedMoney,
} from "../../utilities/formatter.js";
import { convertStatus } from "../../utilities/Status.jsx";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";

const DetailList = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { data: request, isLoading: isRequestLoading } = useRequest(requestId);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (body) => {
      return checkDiamond(body.id, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["request", { requestId: requestId }],
      });
      toast.success("Add size successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Add size failed");
      console.log(error);
    },
  });

  const details = request?.valuationRequestDetails?.map((item) => {
    return {
      number: item.id,
      returnedDate: request.returnDate
        ? formattedDateTime(request.returnDate)
        : "N/A",
      service: request.service.name,
      size: !item.size ? "N/A" : item.size,
      servicePrice: formattedMoney(item.servicePrice),
      certificateId: item.diamondValuationNote?.certificateId || "N/A",
      diamondOrigin: item.diamondValuationNote?.diamondOrigin || "N/A",
      caratWeight: item.diamondValuationNote?.caratWeight || "N/A",
      valuationPrice:
        item.valuationPrice === "0.0" || item.valuationPrice === null
          ? "N/A"
          : formattedMoney(item.valuationPrice),
      status: item.status,
    };
  });
  const handleEditSave = () => {
    const { id, diamondSize } = formik.values;
    const detail = request?.valuationRequestDetails.find((d) => d.id === id);
    const body = {
      ...detail,
      size: diamondSize,
    };
    mutate(body);
    setOpenEdit(false);
    formik.resetForm();
  };

  const validationSchema = Yup.object({
    diamondSize: Yup.number()
      .required("Diamond size is required")
      .min(0, "Diamond size must be greater than 0"),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      diamondSize: "",
    },
    validationSchema,
    onSubmit: handleEditSave,
  });
  const [openEdit, setOpenEdit] = useState(false);
  const handleEditClick = (id) => {
    setOpenEdit(true);
    formik.setFieldValue("id", id);
    const detail = request?.valuationRequestDetails.find((d) => d.id === id);
    formik.setFieldValue("diamondSize", detail.size || "");
  };
  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const [openAdd, setOpenAdd] = useState(false);
  const handleAddClick = () => {
    setOpenAdd(true);
  };
  const handleAddClose = () => {
    setOpenAdd(false);
  };
  const handleAddSave = () => {
    // Save the new detail here
    // Then close the dialog
    setOpenAdd(false);
  };

  function handleGetResult() {
    navigate("results", { replace: true });
  }

  if (isRequestLoading) {
    return <UICircularIndeterminate />;
  }

  return (
    <>
      <Box
        sx={{
          mt: 2,
          py: 0.5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <StyledBadge color="secondary" badgeContent={details?.length}>
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            DETAILS
          </Typography>
        </StyledBadge>
        <Box>
          <Button
            variant={"contained"}
            sx={{ mr: 1 }}
            onClick={handleGetResult}
          >
            Get Results
          </Button>
          {/*<Button*/}
          {/*  onClick={handleAddClick}*/}
          {/*  variant={"outlined"}*/}
          {/*  endIcon={<AddIcon />}*/}
          {/*>*/}
          {/*  Add*/}
          {/*</Button>*/}
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 0 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Number</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Service</StyledTableCell>
              <StyledTableCell align="right">Size</StyledTableCell>
              <StyledTableCell align="right">Service Price</StyledTableCell>
              <StyledTableCell align="right">Certificate</StyledTableCell>
              <StyledTableCell align="left">Origin</StyledTableCell>
              <StyledTableCell align="right">Carat</StyledTableCell>
              <StyledTableCell align="right">Valuation Price</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>

              {(request?.status === "PENDING" ||
                request?.status === "PROCESSING") && (
                <StyledTableCell align="center">Action</StyledTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {details?.map((row) => (
              <StyledTableRow key={row.number}>
                <StyledTableCell component="th" scope="row">
                  <Link to={`/requests/${requestId}/${row.number}`}>
                    <Typography sx={{ color: "primary.main", fontWeight: 600 }}>
                      {row.number}
                    </Typography>
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.returnedDate}
                </StyledTableCell>
                <StyledTableCell align="left">{row.service}</StyledTableCell>
                <StyledTableCell align="right">
                  {formattedDiamondSize(row.size)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.servicePrice}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.certificateId}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.diamondOrigin}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.caratWeight}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.valuationPrice}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {convertStatus(row.status)}
                </StyledTableCell>
                {(request?.status === "PENDING" ||
                  request?.status === "PROCESSING") && (
                  <StyledTableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(row.number)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary">
                      <DeleteForeverIcon />
                    </IconButton>
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openEdit} onClose={handleEditClose}>
        <DialogTitle>Update Diamond Size</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="diamondSize"
            label="Diamond Size"
            name="diamondSize"
            type="number"
            fullWidth
            value={formik.values.diamondSize}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.diamondSize && Boolean(formik.errors.diamondSize)
            }
            helperText={formik.touched.diamondSize && formik.errors.diamondSize}
            InputProps={{
              endAdornment: <InputAdornment position="end">mm</InputAdornment>,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} variant={"text"}>
            Cancel
          </Button>
          <Button onClick={() => formik.submitForm()} variant={"contained"}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAdd} onClose={handleAddClose}>
        <DialogTitle>Add New Valuation Request Detail</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose} variant={"text"}>
            Cancel
          </Button>
          <Button onClick={handleAddSave} variant={"contained"}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DetailList;
