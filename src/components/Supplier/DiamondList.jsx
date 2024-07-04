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
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState, useEffect } from "react";
import { StyledBadge } from "../../assets/styles/Badge.jsx";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";
import { useDiamondsOfSupplier } from "../../services/suppliers.js";
import { useParams } from "react-router-dom";
import {deleteDiamond} from "../../services/api.js";
import {toast} from "react-toastify";

const DiamondList = () => {
  const { supplierId } = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, isLoading, error, refetch } = useDiamondsOfSupplier(page, rowsPerPage, supplierId);
  const diamondList = data?.diamonds || [];
  const totalCount = data?.totalCount || 0;

  const [selectedDetail, setSelectedDetail] = useState({
    id: undefined,
    diamondImage: "",
    diamondOrigin: "",
    caratWeight: 0,
    color: "",
    clarity: "",
    cut: "",
    polish: "",
    symmetry: "",
    shape: "",
    fluorescence: "",
    cutScore: 0,
    price: 0,
    supplierId: 1,
  });

  // const [openEdit, setOpenEdit] = useState(false);
  //
  // const handleEditClick = (id) => {
  //   setOpenEdit(true);
  //   const diamond = diamondList.find((diamond) => diamond.id === id);
  //   setSelectedDetail({ ...diamond });
  // };
  //
  // const handleEditClose = () => {
  //   setOpenEdit(false);
  //   setSelectedDetail({
  //     id: undefined,
  //     diamondImage: "",
  //     diamondOrigin: "",
  //     caratWeight: 0,
  //     color: "",
  //     clarity: "",
  //     cut: "",
  //     polish: "",
  //     symmetry: "",
  //     shape: "",
  //     fluorescence: "",
  //     cutScore: 0,
  //     price: 0,
  //     supplierId: 1,
  //   });
  // };

  // const handleEditSave = () => {
  //   const updatedDiamondList = diamondList.map((diamond) => {
  //     if (diamond.id === selectedDetail.id) {
  //       return { ...selectedDetail };
  //     }
  //     return diamond;
  //   });
  //   // Since diamondList is managed by useQuery, update it appropriately.
  //   setOpenEdit(false);
  //   handleEditClose();
  // };
  //
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setSelectedDetail((prevState) => ({
  //     ...prevState,
  //     [name]: name === "caratWeight" || name === "cutScore" || name === "price" ? parseFloat(value) : value,
  //   }));
  // };

  const handleDelete = async (id) => {
    try {
      await deleteDiamond(id);
      refetch({ page, rowsPerPage });
      toast.success(`Successfully deleted diamond`);
    } catch (error) {
      toast.error(`Failed to delete diamond`);
      // Handle error, such as showing a message to the user
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

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
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
                <TableCell align="left" sx={{ color: "white" }}>
                  Id
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
              {diamondList.map((diamond) => (
                  <TableRow key={diamond.id}>
                    <TableCell align="left">{diamond.id}</TableCell>
                    <TableCell align="center">{diamond.diamondImage}</TableCell>
                    <TableCell align="center">{diamond.diamondOrigin}</TableCell>
                    <TableCell align="center">{diamond.caratWeight}</TableCell>
                    <TableCell align="center">{diamond.color}</TableCell>
                    <TableCell align="center">{diamond.clarity}</TableCell>
                    <TableCell align="center">{diamond.cut}</TableCell>
                    <TableCell align="center">{diamond.polish}</TableCell>
                    <TableCell align="center">{diamond.symmetry}</TableCell>
                    <TableCell align="center">{diamond.shape}</TableCell>
                    <TableCell align="center">{diamond.fluorescence}</TableCell>
                    <TableCell align="center">{diamond.cutScore}</TableCell>
                    <TableCell align="center">{diamond.price}</TableCell>
                    <TableCell align="center">
                      <IconButton color="secondary" onClick={() => handleDelete(diamond.id)}>
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
        {/*/!* Edit Dialog *!/*/}
        {/*<Dialog open={openEdit} onClose={handleEditClose}>*/}
        {/*  <DialogTitle>Edit Diamond</DialogTitle>*/}
        {/*  <DialogContent>*/}
        {/*    <TextField*/}
        {/*        autoFocus*/}
        {/*        margin="dense"*/}
        {/*        id="diamondImage"*/}
        {/*        name="diamondImage"*/}
        {/*        label="Diamond Image"*/}
        {/*        type="text"*/}
        {/*        fullWidth*/}
        {/*        value={selectedDetail.diamondImage}*/}
        {/*        onChange={handleInputChange}*/}
        {/*    />*/}
        {/*    <TextField*/}
        {/*        margin="dense"*/}
        {/*        id="diamondOrigin"*/}
        {/*        name="diamondOrigin"*/}
        {/*        label="Diamond Origin"*/}
        {/*        type="text"*/}
        {/*        fullWidth*/}
        {/*        value={selectedDetail.diamondOrigin}*/}
        {/*        onChange={handleInputChange}*/}
        {/*    />*/}
        {/*    <TextField*/}
        {/*        margin="dense"*/}
        {/*        id="caratWeight"*/}
        {/*        name="caratWeight"*/}
        {/*        label="Carat Weight"*/}
        {/*        type="number"*/}
        {/*        inputProps={{ step: 0.01 }}*/}
        {/*        fullWidth*/}
        {/*        value={selectedDetail.caratWeight}*/}
        {/*        onChange={handleInputChange}*/}
        {/*    />*/}
        {/*    <TextField*/}
        {/*        margin="dense"*/}
        {/*        id="color"*/}
        {/*        name="color"*/}
        {/*        label="Color"*/}
        {/*        type="text"*/}
        {/*        fullWidth*/}
        {/*        value={selectedDetail.color}*/}
        {/*        onChange={handleInputChange}*/}
        {/*    />*/}
        {/*    <TextField*/}
        {/*        margin="dense"*/}
        {/*        id="clarity"*/}
        {/*        name="clarity"*/}
        {/*        label="Clarity"*/}
        {/*        type="text"*/}
        {/*        fullWidth*/}
        {/*        value={selectedDetail.clarity}*/}
        {/*        onChange={handleInputChange}*/}
        {/*    />*/}
        {/*    <TextField*/}
        {/*        margin="dense"*/}
        {/*        id="cut"*/}
        {/*        name="cut"*/}
        {/*        label="Cut"*/}
        {/*        type="text"*/}
        {/*        fullWidth*/}
        {/*        value={selectedDetail.cut}*/}
        {/*        onChange={handleInputChange}*/}
        {/*    />*/}
        {/*    <TextField*/}
        {/*        margin="dense"*/}
        {/*        id="polish"*/}
        {/*        name="polish"*/}
        {/*        label="Polish"*/}
        {/*        type="text"*/}
        {/*        fullWidth*/}
        {/*        value={selectedDetail.polish}*/}
        {/*        onChange={handleInputChange}*/}
        {/*    />*/}
        {/*    <TextField*/}
        {/*        margin="dense"*/}
        {/*        id="symmetry"*/}
        {/*        name="symmetry"*/}
        {/*        label="Symmetry"*/}
        {/*        type="text"*/}
        {/*        fullWidth*/}
        {/*        value={selectedDetail.symmetry}*/}
        {/*        onChange={handleInputChange}*/}
        {/*    />*/}
        {/*    <TextField*/}
        {/*        margin="dense"*/}
        {/*        id="shape"*/}
        {/*        name="shape"*/}
        {/*        label="Shape"*/}
        {/*        type="text"*/}
        {/*        fullWidth*/}
        {/*        value={selectedDetail.shape}*/}
        {/*        onChange={handleInputChange}*/}
        {/*    />*/}
        {/*    <TextField*/}
        {/*        margin="dense"*/}
        {/*        id="fluorescence"*/}
        {/*        name="fluorescence"*/}
        {/*        label="Fluorescence"*/}
        {/*        type="text"*/}
        {/*        fullWidth*/}
        {/*        value={selectedDetail.fluorescence}*/}
        {/*        onChange={handleInputChange}*/}
        {/*    />*/}
        {/*    <TextField*/}
        {/*        margin="dense"*/}
        {/*        id="cutScore"*/}
        {/*        name="cutScore"*/}
        {/*        label="Cut Score"*/}
        {/*        type="number"*/}
        {/*        inputProps={{ step: 0.1 }}*/}
        {/*        fullWidth*/}
        {/*        value={selectedDetail.cutScore}*/}
        {/*        onChange={handleInputChange}*/}
        {/*    />*/}
        {/*    <TextField*/}
        {/*        margin="dense"*/}
        {/*        id="price"*/}
        {/*        name="price"*/}
        {/*        label="Price"*/}
        {/*        type="number"*/}
        {/*        inputProps={{ step: 0.01 }}*/}
        {/*        fullWidth*/}
        {/*        value={selectedDetail.price}*/}
        {/*        onChange={handleInputChange}*/}
        {/*    />*/}
        {/*  </DialogContent>*/}
        {/*  <DialogActions>*/}
        {/*    <Button onClick={handleEditClose} variant="text">*/}
        {/*      Cancel*/}
        {/*    </Button>*/}
        {/*    <Button onClick={handleEditSave} variant="contained">*/}
        {/*      Save*/}
        {/*    </Button>*/}
        {/*  </DialogActions>*/}
        {/*</Dialog>*/}
      </Box>
  );
};

export default DiamondList;
