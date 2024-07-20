import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import EventIcon from "@mui/icons-material/Event";
import {
  CardMedia,
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
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
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
}) => {
  const [formError, setFormError] = useState({
    cutScore: false,
    caratWeight: false,
  });
  const { detailId } = useParams();
  const assessState = useSelector((state) => state.assessing);
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
  const handleUploadProportion = (file) => {
    const storageRef = ref(
      storage,
      `diamonds/${detailId}/proportion/${file.name}`,
    );
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
        toast.error(error);
      },
      async () => {
        const imageLink = await getDownloadURL(storageRef);
        setDiamondInfor((prevState) => ({
          ...prevState,
          proportions: imageLink,
        }));
        toast.success("Upload proportions successfully");
      },
    );
  };
  function handleUploadClarityCharacteristic(file) {
    const storageRef = ref(
      storage,
      `diamonds/${detailId}/clarity/${file.name}`,
    );
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
        toast.error(error);
      },
      async () => {
        const imageLink = await getDownloadURL(storageRef);
        setDiamondInfor((prevState) => ({
          ...prevState,
          clarityCharacteristicLink: imageLink,
        }));

        toast.success("Upload clarity successfully");
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
                  checked={diamondInfor.diamondOrigin === "NATURAL"}
                  control={<Radio />}
                  disabled={assessState.current !== "DOING"}
                  label="Natural"
                />
                <FormControlLabel
                  value="LAB_GROWN"
                  checked={diamondInfor.diamondOrigin === "LAB_GROWN"}
                  control={<Radio />}
                  disabled={assessState.current !== "DOING"}
                  label="Lab Grown"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              label="Cut Score"
              id="cutScore"
              name={"cutScore"}
              type="number"
              sx={{ width: "50%" }}
              disabled={assessState.current !== "DOING"}
              value={diamondInfor.cutScore || ""}
              onChange={(e) => {
                const value = e.target.value;
                const isValid =
                  value === "" || (value > 0 && value <= 10 && !isNaN(value));
                setFormError((prevState) => ({
                  ...prevState,
                  cutScore: !isValid,
                }));
                setDiamondInfor((prevState) => ({
                  ...prevState,
                  cutScore: value,
                }));
              }}
              error={formError.cutScore}
              helperText={
                formError.cutScore &&
                "Cut score must be greater than 0 and less than or equal to 10"
              }
            />
          </Box>
        </DiamondValuationFieldGroup>

        <DiamondValuationFieldGroup title="Grading Result" sx={{ mt: 2.5 }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}>
            <TextField
              label="Carat Weight"
              id="caratWeight"
              name="caratWeight"
              type="number"
              sx={{ width: "50%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">ct.</InputAdornment>
                ),
              }}
              disabled={assessState.current !== "DOING"}
              value={diamondInfor.caratWeight || ""}
              onChange={(e) => {
                const value = e.target.value;
                const isValid =
                  value === "" || (value > 0 && value <= 50 && !isNaN(value));
                setFormError((prevState) => ({
                  ...prevState,
                  caratWeight: !isValid,
                }));
                setDiamondInfor((prevState) => ({
                  ...prevState,
                  caratWeight: e.target.value,
                }));
              }}
              error={formError.caratWeight}
              helperText={
                formError.caratWeight &&
                "Cut score must be greater than 0 and less than or equal to 50"
              }
            />
            <TextField
              id="coloGrade"
              name={"colorGrade"}
              select
              label="Color Grade"
              disabled={assessState.current !== "DOING"}
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
              id="clarityGrade"
              name={"clarityGrade"}
              select
              label="Clarity Grade"
              disabled={assessState.current !== "DOING"}
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
              id="cutGrade"
              name={"cutGrade"}
              select
              label="Cut Grade"
              disabled={assessState.current !== "DOING"}
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
              name={"shape"}
              select
              label="Shape"
              sx={{ width: "50%" }}
              disabled={assessState.current !== "DOING"}
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
              name={"symmetry"}
              select
              label="Symmetry"
              disabled={assessState.current !== "DOING"}
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
              name={"polish"}
              select
              label="Polish"
              disabled={assessState.current !== "DOING"}
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
              name={"fluorescence"}
              select
              label="Fluorescence"
              disabled={assessState.current !== "DOING"}
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
          {/*{!proportionImage && proportionFile && (*/}
          {/*  <Button*/}
          {/*    variant={"outlined"}*/}
          {/*    sx={{ position: "absolute", top: 0, right: 0 }}*/}
          {/*    size={"small"}*/}
          {/*    onClick={handleUploadProportion}*/}
          {/*  >*/}
          {/*    Upload*/}
          {/*  </Button>*/}
          {/*)}*/}
          {!diamondInfor.proportions && (
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
                disabled={assessState.current !== "DOING"}
                type="file"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    handleUploadProportion(e.target.files[0]);
                  }
                }}
              />
            </Button>
          )}
          {diamondInfor.proportions && (
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component={"img"}
                src={diamondInfor.proportions}
                alt={"Proportion"}
                sx={{
                  height: 240,
                  width: "100%",
                  objectFit: "contain",
                  cursor: "pointer",
                }}
                onClick={() => handleClickOpen(diamondInfor.proportions)}
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
                  disabled={assessState.current !== "DOING"}
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      handleUploadProportion(e.target.files[0]);
                    }
                  }}
                />
              </IconButton>
            </Box>
          )}
        </DiamondValuationFieldGroup>

        <DiamondValuationFieldGroup
          title="Clarity Characteristics"
          sx={{ mt: 2.5, position: "relative" }}
        >
          {!diamondInfor.clarityCharacteristicLink && (
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
                disabled={assessState.current !== "DOING"}
                onChange={(e) =>
                  handleUploadClarityCharacteristic(e.target.files[0])
                }
              />
            </Button>
          )}
          {diamondInfor.clarityCharacteristicLink && (
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component={"img"}
                src={diamondInfor.clarityCharacteristicLink}
                alt={"Clarity Characteristic"}
                style={{
                  height: 240,
                  width: "100%",
                  objectFit: "contain",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleClickOpen(diamondInfor.clarityCharacteristicLink)
                }
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
                  disabled={assessState.current !== "DOING"}
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      handleUploadClarityCharacteristic(e.target.files[0]);
                    }
                  }}
                />
              </IconButton>
            </Box>
          )}

          <ToggleButtonGroup
            value={clarities}
            onChange={handleClarities}
            disabled={assessState.current !== "DOING"}
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
                      sx={{
                        "&.Mui-selected": {
                          backgroundColor: "status.assessing",
                        },
                      }}
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
                        <Typography sx={{ color: "main.white" }}>
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
