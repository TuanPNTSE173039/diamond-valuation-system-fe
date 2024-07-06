import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
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
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState, useEffect } from "react";
import { StyledBadge } from "../../assets/styles/Badge.jsx";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";
import { useDiamondsOfSupplier } from "../../services/suppliers.js";
import {useLocation, useParams} from "react-router-dom";
import { deleteDiamond } from "../../services/api.js";
import { toast } from "react-toastify";
import {formattedCaratWeight, formattedMoney} from "../../utilities/formatter.js";
import UIBreadCrumb from "../UI/BreadCrumb.jsx";

const DiamondList = () => {
  const { supplierId } = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, isLoading, refetch } = useDiamondsOfSupplier(page, rowsPerPage, supplierId);
  const diamondList = data?.diamonds || [];
  const totalCount = data?.totalCount || 0;
  const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = React.useState(null);

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
      await deleteDiamond(selectedDeleteId);
      toast.success("Diamond deleted successfully");
      await refetch();
    } catch (error) {
      toast.error("Failed to delete diamond");
    } finally {
      handleDeleteConfirmClose();
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    refetch({ page, rowsPerPage });
  }, [page, rowsPerPage, refetch]);

  if (isLoading) {
    return <UICircularIndeterminate />;
  }
  const location = useLocation();
  const pathNames = location.pathname.split("/").filter((x) => x);

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
            }}
        >
          <StyledBadge color="secondary">
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              DIAMONDS
            </Typography>
          </StyledBadge>
        </Box>
        <TableContainer component={Paper} sx={{ mt: 0 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.main" }}>
                <TableCell align="center" sx={{ color: "white" }}>
                  No.
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Image
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Origin
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Carat Weight
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Color
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Clarity
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Cut
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Polish
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Symmetry
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Shape
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Fluorescence
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Cut Score
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Price
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {diamondList.map((diamond, index) => (
                  <TableRow key={diamond.id}>
                    <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell align="center">{diamond.diamondImage}</TableCell>
                    <TableCell align="center">{diamond.diamondOrigin}</TableCell>
                    <TableCell align="center">{formattedCaratWeight(diamond.caratWeight)}</TableCell>
                    <TableCell align="center">{diamond.color}</TableCell>
                    <TableCell align="center">{diamond.clarity}</TableCell>
                    <TableCell align="center">{diamond.cut}</TableCell>
                    <TableCell align="center">{diamond.polish}</TableCell>
                    <TableCell align="center">{diamond.symmetry}</TableCell>
                    <TableCell align="center">{diamond.shape}</TableCell>
                    <TableCell align="center">{diamond.fluorescence}</TableCell>
                    <TableCell align="center">{diamond.cutScore}</TableCell>
                    <TableCell align="center">{formattedMoney(diamond.price)}</TableCell>
                    <TableCell align="center">
                      <IconButton color="secondary" onClick={() => handleDeleteClick(diamond.id)}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
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
              Are you sure you want to delete this diamond?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteConfirmClose} variant="text">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} variant="contained" color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
        </>
  );
};

export default DiamondList;
