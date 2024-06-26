import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import EventIcon from "@mui/icons-material/Event";
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
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { ref, uploadBytesResumable } from "firebase/storage";
import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { VisuallyHiddenInput } from "../../assets/styles/Input.jsx";
import { storage } from "../../services/config/firebase.js";
import {
  clarityCharacteristicList,
  diamondAttribute,
} from "../../utilities/Status.jsx";
import { metadata } from "../Detail/Item.jsx";
import DiamondValuationFieldGroup from "./FieldGroup.jsx";

const { cut, clarity, color, shape, symmetry, polish, fluorescence } =
  diamondAttribute;

const DiamondValuationAssessment = ({
  diamondInfor,
  setDiamondInfor,
  clarities,
  handleClarities,
  detailState,
  proportionImage,
  clarityCharacteristicImage,
}) => {
  const { detailId } = useParams();

  //Open image in detail
  const [imageOpen, setImageOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const handleClickOpen = (image) => {
    setSelectedImage(image);
    setImageOpen(true);
  };
  const handleClose = () => {
    setImageOpen(false);
  };

  //Proportion & ClarityCharacteristic
  const [proportionFile, setProportionFile] = useState(null);
  const [clarityCharacteristicFile, setClarityCharacteristicFile] =
    useState(null);
  function handleProportionChange(e) {
    if (e.target.files[0]) {
      setProportionFile(e.target.files[0]);
    }
  }
  function handleClarityCharacteristicChange(e) {
    if (e.target.files[0]) {
      setClarityCharacteristicFile(e.target.files[0]);
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
      () => {
        const imageLink = `diamonds/${detailId}/clarity/${clarityCharacteristicFile.name}`;
        setDiamondInfor((prevState) => ({
          ...prevState,
          clarityCharacteristicLink: imageLink,
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
        <DiamondValuationFieldGroup title="Report Detail" sx={{ mt: 0.5 }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}>
            <TextField
              label="Report Number"
              id="report-number"
              type="number"
              disabled
              sx={{ width: "50%" }}
              value={diamondInfor.certificateId}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">No.</InputAdornment>
                ),
              }}
            />
            <TextField
              label="Certificate Date"
              id="certificate-date"
              type="text"
              sx={{ width: "50%" }}
              value={diamondInfor.certificateDate}
              disabled
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EventIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}>
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
                sx={{ gap: 2.5 }}
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
            <TextField
              label="Cut Score"
              id="cut-score"
              type="number"
              sx={{ width: "50%" }}
              disabled={detailState.current !== "ASSESSING"}
              value={diamondInfor.cutScore || ""}
              onChange={(e) => {
                setDiamondInfor((prevState) => ({
                  ...prevState,
                  cutScore: e.target.value,
                }));
              }}
              inputProps={{
                min: 0,
                max: 10,
              }}
              error={diamondInfor.cutScore < 0 || diamondInfor.cutScore > 10}
              helperText={
                diamondInfor.cutScore < 0 || diamondInfor.cutScore > 10
                  ? "Cut Score must be a number between 0 and 10"
                  : null
              }
            />
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
          {!clarityCharacteristicImage && clarityCharacteristicFile && (
            <Button
              variant={"outlined"}
              sx={{ position: "absolute", top: 0, right: 0 }}
              size={"small"}
              onClick={handleUploadClarityCharacteristic}
            >
              Upload
            </Button>
          )}
          {!clarityCharacteristicImage && !clarityCharacteristicFile && (
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
          {!clarityCharacteristicImage && clarityCharacteristicFile && (
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
          {clarityCharacteristicImage && (
            <Box sx={{ position: "relative" }}>
              <img
                src={clarityCharacteristicImage}
                alt={"Clarity Characteristic"}
                loading="lazy"
                style={{
                  height: 240,
                  width: "100%",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => handleClickOpen(clarityCharacteristicImage)}
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

          <ToggleButtonGroup
            value={clarities}
            onChange={handleClarities}
            aria-label="clarity-characteristic"
            sx={{ mt: 1 }}
          >
            <Grid container spacing={0.5} justifyContent="center">
              {clarityCharacteristicList.map((clarity, index) => {
                return (
                  <Grid key={clarity.code} item>
                    <ToggleButton
                      value={clarity.code}
                      aria-label={clarity.label}
                    >
                      <Stack
                        direction="row"
                        sx={{
                          alignItems: "center",
                          height: 30,
                          gap: 0.5,
                        }}
                      >
                        <img
                          src={clarity.image}
                          alt={clarity.label}
                          style={{
                            width: "auto",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                        <Typography sx={{ color: "gray" }}>
                          {clarity.label}
                        </Typography>
                      </Stack>
                    </ToggleButton>
                  </Grid>
                );
              })}
            </Grid>
          </ToggleButtonGroup>
        </DiamondValuationFieldGroup>
      </Box>

      {/*Dialog for full image*/}
      <Dialog open={imageOpen} onClose={handleClose}>
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
