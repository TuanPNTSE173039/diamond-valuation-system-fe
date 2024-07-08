import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  FormControl,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useState } from "react";
import { diamondAttribute } from "../../utilities/Status.jsx";
import { ADD_MODE, DiamondHeadCells } from "../../utilities/table.js";
import UITable from "../UI/Table.jsx";
import { useDiamondMarket } from "../../services/diamondMarket.js";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";
import { useSuppliers } from "../../services/suppliers.js";
import {createDiamond, deleteDiamond} from "../../services/api.js";
import {toast} from "react-toastify";

const { cut, clarity, color, shape, symmetry, polish, fluorescence } = diamondAttribute;

const DiamondPriceList = () => {
  const [statusIndex, setStatusIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedDiamonds, setSelectedDiamonds] = useState([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(ADD_MODE);
  const [formData, setFormData] = useState({
    diamondImage: "",
    creationDate: "",
    diamondOrigin: "NATURAL",
    caratWeight: "",
    color: "",
    clarity: "",
    cut: "",
    polish: "",
    symmetry: "",
    shape: "",
    fluorescence: "",
    cutScore: "",
    price: "",
    supplierId: ""
  });
  const { data: diamondPriceList = {}, isFetching, refetch } = useDiamondMarket(page, rowsPerPage);
  const { data: supplier } = useSuppliers(0, 1000);

  if (isFetching) {
    return <UICircularIndeterminate />;
  }

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleAddDiamondPrice = async () => {
    try {
      await createDiamond(formData);
      toast.success("Diamond price added successfully!");
      handleCloseDialog();
      await refetch()
      // Optionally, refresh the data or update the state to reflect the new addition
    } catch (error) {
      toast.error("Failed to add diamond price. Please try again.");
    }
  };
  const handleEditDiamondPrice = () => {
    console.log("Edit Diamond Price");
  };

  const handleDeleteDiamond = async (id) => {
    try {
      await deleteDiamond(id);
      toast.success("Delete diamond market successfully")
      await refetch()
    } catch (error) {
      toast.success("Delete diamond market successfully")

    }
  };

  const getSupplierName = (id) => {
    const supplierObj = supplier.find((sup) => sup.id === id);
    return supplierObj ? supplierObj.name : "Unknown Supplier";
  };

  const diamondRows = (diamondPriceList.content || []).map((row) => ({
    number: row.id,
    diamondImage: row.diamondImage,
    creationDate: new Date(row.creationDate).toLocaleDateString(),
    diamondOrigin: row.diamondOrigin,
    caratWeight: row.caratWeight,
    color: row.color,
    clarity: row.clarity,
    cut: row.cut,
    polish: row.polish,
    symmetry: row.symmetry,
    shape: row.shape,
    fluorescence: row.fluorescence,
    cutScore: row.cutScore,
    price: row.price,
    supplier: getSupplierName(row.supplierId),
    action: (
        <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteDiamond(row.id)}
        >
          Delete
        </Button>
    ),
  }));

  return (
      <>
        <UITable
            readOnly
            heading="Diamond Market"
            headCells={[...DiamondHeadCells]}
            rows={diamondRows}
            selected={selectedDiamonds}
            setSelected={setSelectedDiamonds}
            page={page}
            setPage={setPage}
            count={diamondPriceList?.totalElement}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
        >
          <Button
              onClick={handleOpenDialog}
              variant="contained"
              size="large"
              endIcon={<AddIcon />}
          >
            Add
          </Button>
        </UITable>
        <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="xs">
          <DialogTitle>
            {mode === ADD_MODE ? "Add new Diamond Price" : "Update Diamond Price"}
          </DialogTitle>
          <DialogContent sx={{ padding: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}>
              <TextField
                  label="Diamond Image"
                  id="diamond-image"
                  name="diamondImage"
                  value={formData.diamondImage}
                  onChange={handleInputChange}
                  fullWidth
              />
              <TextField
                  label="Creation Date"
                  id="creation-date"
                  name="creationDate"
                  type="datetime-local"
                  value={formData.creationDate}
                  onChange={handleInputChange}
                  fullWidth
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}>
              <FormControl sx={{ width: "50%" }}>
                <FormLabel id="diamond-origin">Diamond Origin</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="diamond-origin"
                    name="diamondOrigin"
                    value={formData.diamondOrigin}
                    onChange={handleInputChange}
                >
                  <FormControlLabel
                      value="NATURAL"
                      control={<Radio />}
                      label="Natural"
                  />
                  <FormControlLabel
                      value="LAB_GROWN"
                      control={<Radio />}
                      label="Lab"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                  label="Cut Score"
                  id="cut-score"
                  type="number"
                  name="cutScore"
                  value={formData.cutScore}
                  onChange={handleInputChange}
                  fullWidth
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}>
              <TextField
                  label="Carat Weight"
                  id="carat-weight"
                  type="number"
                  name="caratWeight"
                  value={formData.caratWeight}
                  onChange={handleInputChange}
                  sx={{ width: "50%" }}
                  InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">ct.</InputAdornment>
                    ),
                  }}
              />
              <TextField
                  id="color-grade"
                  select
                  label="Color Grade"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  sx={{ width: "50%" }}
              >
                {color.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}>
              <TextField
                  id="clarity-grade"
                  select
                  label="Clarity Grade"
                  name="clarity"
                  value={formData.clarity}
                  onChange={handleInputChange}
                  sx={{ width: "50%" }}
              >
                {clarity.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                ))}
              </TextField>
              <TextField
                  id="cut-grade"
                  select
                  label="Cut Grade"
                  name="cut"
                  value={formData.cut}
                  onChange={handleInputChange}
                  sx={{ width: "50%" }}
              >
                {cut.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}>
              <TextField
                  id="shape"
                  select
                  label="Shape"
                  name="shape"
                  value={formData.shape}
                  onChange={handleInputChange}
                  sx={{ width: "50%" }}
              >
                {shape.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                ))}
              </TextField>
              <TextField
                  id="symmetry"
                  select
                  label="Symmetry"
                  name="symmetry"
                  value={formData.symmetry}
                  onChange={handleInputChange}
                  sx={{ width: "50%" }}
              >
                {symmetry.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}>
              <TextField
                  id="polish"
                  select
                  label="Polish"
                  name="polish"
                  value={formData.polish}
                  onChange={handleInputChange}
                  sx={{ width: "50%" }}
              >
                {polish.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                ))}
              </TextField>
              <TextField
                  id="fluorescence"
                  select
                  label="Fluorescence"
                  name="fluorescence"
                  value={formData.fluorescence}
                  onChange={handleInputChange}
                  sx={{ width: "50%" }}
              >
                {fluorescence.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}>
              <TextField
                  id="supplier"
                  select
                  label="Supplier"
                  name="supplierId"
                  value={formData.supplierId}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ width: "50%" }}
              >
                {supplier.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                ))}
              </TextField>
              <TextField
                  label="Price"
                  id="price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  sx={{ width: "50%" }}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button
                variant="contained"
                onClick={mode === ADD_MODE ? handleAddDiamondPrice : handleEditDiamondPrice}
            >
              {mode === ADD_MODE ? "Create" : "Save changes"}
            </Button>
          </DialogActions>
        </Dialog>
      </>
  );
};

export default DiamondPriceList;

