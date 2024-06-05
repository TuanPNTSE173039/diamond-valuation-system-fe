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

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ref, uploadBytesResumable } from "firebase/storage";
import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CrystalImage from "../../assets/images/crystal.png";
import FeatherImage from "../../assets/images/feather.png";
import NeedleImage from "../../assets/images/needle.png";
import PinpointImage from "../../assets/images/pinpoint.png";
import { DiamondStatus } from "../../utilities/DiamondStatus.js";
import { storage } from "../../utilities/firebaseConfig.js";
import UIDatePicker from "../UI/DatePicker.jsx";
import { metadata } from "../ValuationRequestDetail/Item.jsx";
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

const { origin, cut, clarity, color, shape, symmetry, polish, fluorescence } =
  DiamondStatus;

const DiamondValuationAssessment = ({
  diamondInfor,
  setDiamondInfor,
  detailState,
  proportionImage,
  clarityCharacteristic,
}) => {
  const { detailId } = useParams();
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [proportionFile, setProportionFile] = useState(null);
  const [clarityCharacteristicFile, setClarityCharacteristicFile] =
    useState(null);

  const handleClickOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleProportionChange(e) {
    if (e.target.files[0]) {
      setProportionFile(e.target.files[0]);
      // setDiamondInfor((prevState) => ({
      //   ...prevState,
      //   proportions: `diamond/${detailId}/proportion/${e.target.files[0].name}`,
      // }));
    }
  }

  function handleClarityCharacteristicChange(e) {
    if (e.target.files[0]) {
      setClarityCharacteristicFile(e.target.files[0]);
      // setDiamondInfor((prevState) => ({
      //   ...prevState,
      //   clarityCharacteristics: `diamond/${detailId}/clarity/${e.target.files[0].name}`,
      // }));
    }
  }

  const handleUploadProportion = () => {
    const storageRef = ref(
      storage,
      `diamonds/${detailId}/proportion/${proportionFile.name}`,
    );

    const uploadTask = uploadBytesResumable(
      storageRef,
      proportionFile,
      metadata,
    );

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
      () => {
        const imageLink = `diamonds/${detailId}/proportion/${proportionFile.name}`;
        setDiamondInfor((prevState) => ({
          ...prevState,
          proportions: imageLink,
        }));

        toast.success("Upload image successfully");
      },
    );
  };

  function handleUploadClarityCharacteristic() {
    const storageRef = ref(
      storage,
      `diamonds/${detailId}/clarity/${clarityCharacteristicFile.name}`,
    );

    const uploadTask = uploadBytesResumable(
      storageRef,
      clarityCharacteristicFile,
      metadata,
    );

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
      () => {
        const imageLink = `diamonds/${detailId}/clarity/${clarityCharacteristicFile.name}`;
        setDiamondInfor((prevState) => ({
          ...prevState,
          clarityCharacteristic: imageLink,
        }));

        toast.success("Upload image successfully");
      },
    );
  }

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
            disabled={detailState.current !== "ASSESSING"}
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
              value={diamondInfor.certificateId}
              disabled={detailState.current !== "ASSESSING"}
              onChange={(e) => {
                setDiamondInfor((prevState) => ({
                  ...prevState,
                  certificateId: e.target.value,
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
                  value="NATURAL"
                  control={<Radio />}
                  disabled={detailState.current !== "ASSESSING"}
                  label="Natural"
                />
                <FormControlLabel
                  value="LAB_GROWN"
                  control={<Radio />}
                  disabled={detailState.current !== "ASSESSING"}
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
              disabled={detailState.current !== "ASSESSING"}
              value={diamondInfor.caratWeight || ""}
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
              disabled={detailState.current !== "ASSESSING"}
              sx={{ width: "50%" }}
              value={diamondInfor.color || ""}
              onChange={(e) => {
                setDiamondInfor((prevState) => ({
                  ...prevState,
                  color: e.target.value,
                }));
              }}
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
              disabled={detailState.current !== "ASSESSING"}
              sx={{ width: "50%" }}
              value={diamondInfor.clarity || ""}
              onChange={(e) => {
                setDiamondInfor((prevState) => ({
                  ...prevState,
                  clarity: e.target.value,
                }));
              }}
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
              disabled={detailState.current !== "ASSESSING"}
              sx={{ width: "50%" }}
              value={diamondInfor.cut || ""}
              onChange={(e) => {
                setDiamondInfor((prevState) => ({
                  ...prevState,
                  cut: e.target.value,
                }));
              }}
            >
              {cut.map((option) => (
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
              sx={{ width: "50%" }}
              value={diamondInfor.shape || ""}
              disabled={detailState.current !== "ASSESSING"}
              onChange={(e) => {
                setDiamondInfor((prevState) => ({
                  ...prevState,
                  shape: e.target.value,
                }));
              }}
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
              disabled={detailState.current !== "ASSESSING"}
              sx={{ width: "50%" }}
              value={diamondInfor.symmetry || ""}
              onChange={(e) => {
                setDiamondInfor((prevState) => ({
                  ...prevState,
                  symmetry: e.target.value,
                }));
              }}
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
              disabled={detailState.current !== "ASSESSING"}
              sx={{ width: "50%" }}
              value={diamondInfor.polish || ""}
              onChange={(e) => {
                setDiamondInfor((prevState) => ({
                  ...prevState,
                  polish: e.target.value,
                }));
              }}
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
              disabled={detailState.current !== "ASSESSING"}
              sx={{ width: "50%" }}
              value={diamondInfor.fluorescence || ""}
              onChange={(e) => {
                setDiamondInfor((prevState) => ({
                  ...prevState,
                  fluorescence: e.target.value,
                }));
              }}
            >
              {fluorescence.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DiamondValuationFieldGroup>
      </Box>
      <Box sx={{ width: "50%" }}>
        <DiamondValuationFieldGroup
          title="Proportions"
          sx={{ mt: 0.5, position: "relative" }}
        >
          {!proportionImage && proportionFile && (
            <Button
              variant={"outlined"}
              sx={{ position: "absolute", top: 0, right: 0 }}
              size={"small"}
              onClick={handleUploadProportion}
            >
              Upload
            </Button>
          )}
          {!proportionImage && !proportionFile && (
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ height: 240, width: "100%" }}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                onChange={handleProportionChange}
              />
            </Button>
          )}
          {!proportionImage && proportionFile && (
            <Box sx={{ position: "relative" }}>
              <img
                src={URL.createObjectURL(proportionFile)}
                alt={"Proportion"}
                loading="lazy"
                style={{
                  height: 240,
                  width: "100%",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
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
          {proportionImage && (
            <Box sx={{ position: "relative" }}>
              <img
                src={proportionImage}
                alt={"a"}
                loading="lazy"
                style={{
                  height: 240,
                  width: "100%",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => handleClickOpen(proportionImage)}
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
          sx={{ mt: 2.5, position: "relative" }}
        >
          {!clarityCharacteristic && clarityCharacteristicFile && (
            <Button
              variant={"outlined"}
              sx={{ position: "absolute", top: 0, right: 0 }}
              size={"small"}
              onClick={handleUploadClarityCharacteristic}
            >
              Upload
            </Button>
          )}
          {!clarityCharacteristic && !clarityCharacteristicFile && (
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ height: 240, width: "100%" }}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                onChange={handleClarityCharacteristicChange}
              />
            </Button>
          )}
          {!clarityCharacteristic && clarityCharacteristicFile && (
            <Box sx={{ position: "relative" }}>
              <img
                src={URL.createObjectURL(clarityCharacteristicFile)}
                alt={"Clarity Characteristic"}
                loading="lazy"
                style={{
                  height: 240,
                  width: "100%",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
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
          {clarityCharacteristic && (
            <Box sx={{ position: "relative" }}>
              <img
                src={clarityCharacteristic}
                alt={"Clarity Characteristic"}
                loading="lazy"
                style={{
                  height: 240,
                  width: "100%",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => handleClickOpen(clarityCharacteristic)}
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
