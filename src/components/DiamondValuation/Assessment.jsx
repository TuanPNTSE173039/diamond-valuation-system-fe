import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  FormControl,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  styled,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import CrystalImage from "../../assets/images/crystal.png";
import FeatherImage from "../../assets/images/feather.png";
import NeedleImage from "../../assets/images/needle.png";
import PinpointImage from "../../assets/images/pinpoint.png";
import UIDatePicker from "../UI/DatePicker.jsx";
import DiamondValuationFieldGroup from "./FieldGroup.jsx";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];
const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  color: "#fff", // default color
  "&.Mui-checked": {
    color: "#fff", // checked color
  },
  "&.MuiCheckbox-colorSecondary.Mui-checked:hover": {
    backgroundColor: "transparent", // remove the hover effect
  },
}));
const DiamondValuationAssessment = ({
  diamondInfor,
  setDiamondInfor,
  detailState,
}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleClickOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 4,
        mt: 2,
      }}
    >
      <Box sx={{ width: "50%" }}>
        <DiamondValuationFieldGroup title="GIA Report Detail" sx={{ mt: 0.5 }}>
          <UIDatePicker
            label="GIA Certificate Date"
            value={diamondInfor.giaCertDate}
            disabled={detailState.current !== "assessing"}
            onChange={(newValue) =>
              setDiamondInfor((prevState) => ({
                ...prevState,
                giaCertDate: newValue,
              }))
            }
          />
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}>
            <TextField
              label="GIA Report Number"
              id="gia-report-number"
              type="number"
              sx={{ width: "50%" }}
              value={diamondInfor.giaReportNumber}
              disabled={detailState.current !== "assessing"}
              onChange={(e) => {
                setDiamondInfor((prevState) => ({
                  ...prevState,
                  giaReportNumber: e.target.value,
                }));
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">GIA</InputAdornment>
                ),
              }}
            />
            <FormControl sx={{ width: "50%" }}>
              <FormLabel id="diamond-origin">Diamond Origin</FormLabel>
              <RadioGroup
                row
                aria-labelledby="diamond-origin"
                name="diamond-origin"
                value={diamondInfor.diamondOrigin}
                onChange={(e) => {
                  setDiamondInfor((prevState) => ({
                    ...prevState,
                    diamondOrigin: e.target.value,
                  }));
                }}
              >
                <FormControlLabel
                  value="Natural"
                  control={<Radio />}
                  disabled={detailState.current !== "assessing"}
                  label="Natural"
                />
                <FormControlLabel
                  value="LabGrown"
                  control={<Radio />}
                  disabled={detailState.current !== "assessing"}
                  label="Lab Grown"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </DiamondValuationFieldGroup>
        <DiamondValuationFieldGroup title="Grading Result" sx={{ mt: 2.5 }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}>
            <TextField
              label="Carat Weight"
              id="carat-weight"
              type="number"
              sx={{ width: "50%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">ct.</InputAdornment>
                ),
              }}
              disabled={detailState.current !== "assessing"}
              value={diamondInfor.caratWeight}
              onChange={(e) => {
                setDiamondInfor((prevState) => ({
                  ...prevState,
                  caratWeight: e.target.value,
                }));
              }}
            />
            <TextField
              id="color-grade"
              select
              label="Color Grade"
              disabled={detailState.current !== "assessing"}
              sx={{ width: "50%" }}
              value={diamondInfor.colorGrade}
              onChange={(e) => {
                setDiamondInfor((prevState) => ({
                  ...prevState,
                  colorGrade: e.target.value,
                }));
              }}
            >
              {currencies.map((option) => (
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
              disabled={detailState.current !== "assessing"}
              sx={{ width: "50%" }}
              value={diamondInfor.clarityGrade}
              onChange={(e) => {
                setDiamondInfor((prevState) => ({
                  ...prevState,
                  clarityGrade: e.target.value,
                }));
              }}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="cut-grade"
              select
              label="Cut Grade"
              disabled={detailState.current !== "assessing"}
              sx={{ width: "50%" }}
              value={diamondInfor.cutGrade}
              onChange={(e) => {
                setDiamondInfor((prevState) => ({
                  ...prevState,
                  cutGrade: e.target.value,
                }));
              }}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DiamondValuationFieldGroup>
        <DiamondValuationFieldGroup
          title="Additional Grading Information"
          sx={{ mt: 2.5 }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}>
            <TextField
              id="shape"
              select
              label="Shape"
              defaultValue="EUR"
              sx={{ width: "50%" }}
              value={diamondInfor.shape}
              disabled={detailState.current !== "assessing"}
              onChange={(e) => {
                setDiamondInfor((prevState) => ({
                  ...prevState,
                  shape: e.target.value,
                }));
              }}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="symmetry"
              select
              label="Symmetry"
              defaultValue="EUR"
              disabled={detailState.current !== "assessing"}
              sx={{ width: "50%" }}
              value={diamondInfor.symmetry}
              onChange={(e) => {
                setDiamondInfor((prevState) => ({
                  ...prevState,
                  symmetry: e.target.value,
                }));
              }}
            >
              {currencies.map((option) => (
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
              defaultValue="EUR"
              disabled={detailState.current !== "assessing"}
              sx={{ width: "50%" }}
              value={diamondInfor.polish}
              onChange={(e) => {
                setDiamondInfor((prevState) => ({
                  ...prevState,
                  polish: e.target.value,
                }));
              }}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="fluorescence"
              select
              label="Fluorescence"
              defaultValue="EUR"
              disabled={detailState.current !== "assessing"}
              sx={{ width: "50%" }}
              value={diamondInfor.fluorescence}
              onChange={(e) => {
                setDiamondInfor((prevState) => ({
                  ...prevState,
                  fluorescence: e.target.value,
                }));
              }}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DiamondValuationFieldGroup>
      </Box>
      <Box sx={{ width: "50%" }}>
        <DiamondValuationFieldGroup title="Proportions" sx={{ mt: 0.5 }}>
          {diamondInfor.proportions && (
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ height: 240, width: "100%" }}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          )}
          {!diamondInfor.proportions && (
            <Box sx={{ position: "relative" }}>
              <img
                srcSet={`https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={"a"}
                loading="lazy"
                style={{
                  height: 240,
                  width: "100%",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleClickOpen(
                    "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format&dpr=2",
                  )
                }
              />
              <IconButton
                aria-label="delete"
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
                <DeleteIcon
                  sx={{ color: "red", "&:hover": { color: "white" } }}
                />
              </IconButton>
            </Box>
          )}
        </DiamondValuationFieldGroup>
        <DiamondValuationFieldGroup
          title="Clarity Characteristics"
          sx={{ mt: 2.5 }}
        >
          {diamondInfor.clarityCharacteristics && (
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ height: 220, width: "100%" }}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          )}
          {!diamondInfor.clarityCharacteristics && (
            <Box sx={{ position: "relative" }}>
              <img
                srcSet={`https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                // alt={item.title}
                loading="lazy"
                style={{
                  height: 250,
                  width: "100%",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleClickOpen(
                    "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format&dpr=2",
                  )
                }
              />
              <IconButton
                aria-label="delete"
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
                <DeleteIcon
                  sx={{ color: "red", "&:hover": { color: "white" } }}
                />
              </IconButton>
            </Box>
          )}
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "space-evenly", mt: 1 }}
          >
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                height: 30,
                p: "2px",
              }}
            >
              <img
                src={CrystalImage}
                alt="Crystal"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
              <Typography sx={{ color: "gray" }}>Crystal</Typography>
            </Stack>
            <Stack
              direction="row"
              sx={{ alignItems: "center", height: 30, p: "2px" }}
            >
              <img
                src={FeatherImage}
                alt="Feather"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
              <Typography sx={{ color: "gray", pl: 2 }}>Feather</Typography>
            </Stack>
            <Stack
              direction="row"
              sx={{ alignItems: "center", height: 30, p: "2px" }}
            >
              <img
                src={NeedleImage}
                alt="Needle"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
              <Typography sx={{ color: "gray", pl: 1 }}>Needle</Typography>
            </Stack>
            <Stack
              direction="row"
              sx={{ alignItems: "center", height: 30, p: "2px" }}
            >
              <img
                src={PinpointImage}
                alt="Pinpoint"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
              <Typography sx={{ color: "gray" }}>Pinpoint</Typography>
            </Stack>
          </Stack>
        </DiamondValuationFieldGroup>
      </Box>

      {/*Dialog for full image*/}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{ height: "80vh" }}>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ width: "auto", height: "100%", objectFit: "contain" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DiamondValuationAssessment;
