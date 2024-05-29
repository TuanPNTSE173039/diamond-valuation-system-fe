import AddIcon from "@mui/icons-material/Add";
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
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import UIDatePicker from "../UI/DatePicker.jsx";
import DiamondValuationFieldGroup from "./FieldGroup.jsx";

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
        <Box sx={{ position: "relative" }}>
          <DiamondValuationFieldGroup title="Proportions" sx={{ mt: 0.5 }}>
            <img
              srcSet={`https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={"a"}
              loading="lazy"
              style={{ height: 250, width: "100%", objectFit: "cover" }}
            />
            <CustomCheckbox
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            />
          </DiamondValuationFieldGroup>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              console.log("Hello");
            }}
            size="small"
            sx={{ position: "absolute", right: 0, top: 0, fontSize: 12 }}
            endIcon={<AddIcon />}
          >
            Add
          </Button>
        </Box>
        <Box sx={{ position: "relative" }}>
          <DiamondValuationFieldGroup
            title="Clarity Characteristics"
            sx={{ mt: 2.5 }}
          >
            <img
              srcSet={`https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              // alt={item.title}
              loading="lazy"
              style={{ height: 250, width: "100%", objectFit: "cover" }}
            />
            <CustomCheckbox
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            />
          </DiamondValuationFieldGroup>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              console.log("Hello");
            }}
            size="small"
            sx={{ position: "absolute", right: 0, top: 0, fontSize: 12 }}
            endIcon={<AddIcon />}
          >
            Add
          </Button>
          <Box>
            <Box></Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DiamondValuationAssessment;
