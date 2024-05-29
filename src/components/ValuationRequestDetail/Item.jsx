import AddIcon from "@mui/icons-material/Add";
import {
  Avatar,
  AvatarGroup,
  FormControl,
  FormLabel,
  ImageList,
  ImageListItem,
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
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import * as React from "react";
import { useState } from "react";
import { headCells, rows } from "../../dataset/DiamondValuation.js";
import DiamondValuationFieldGroup from "../DiamondValuation/FieldGroup.jsx";
import DiamondValuationUserInfor from "../DiamondValuation/UserInfor.jsx";
import UIDatePicker from "../UI/DatePicker.jsx";
import UITable from "../UI/Table.jsx";
import UIHeader from "../UI/UIHeader.jsx";

const imagesData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
];
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
const ValuationRequestDetailItem = ({ item }) => {
  const [diamondInfor, setDiamondInfor] = useState({
    giaCertDate: dayjs(new Date()),
    giaReportNumber: "",
    diamondOrigin: "Natural",
    caratWeight: undefined,
    colorGrade: "",
    clarityGrade: "",
    cutGrade: "",
    shape: "",
    symmetry: "",
    polish: "",
    fluorescence: "",
    proportions: "",
    clarityCharacteristics: "",
  });
  const [detailState, setDetailState] = useState({
    previous: "pending",
    current: "pending",
  });

  function handleAssessing() {
    setDetailState((prevState) => {
      return {
        ...prevState,
        previous: prevState.previous,
        current: "assessing",
      };
    });
  }

  function handleCancelAssessing() {
    setDetailState((prevState) => {
      if (prevState.previous === "pending") {
        return {
          ...prevState,
          current: "pending",
        };
      }
      return {
        ...prevState,
        previous: "assessing",
        current: "draft-assessing",
      };
    });
  }

  function handleSaveAssessing() {
    setDetailState((prevState) => {
      return {
        ...prevState,
        previous: "assessing",
        current: "draft-assessing",
      };
    });
  }

  function handleEditAssessment() {
    setDetailState((prevState) => {
      return {
        ...prevState,
        previous: prevState.previous,
        current: "assessing",
      };
    });
  }

  function handleConfirmAssessment() {
    setDetailState((prevState) => {
      return {
        ...prevState,
        previous: "",
        current: "assessed",
      };
    });
    console.log(diamondInfor);
  }

  function handleValuating() {
    setDetailState((prevState) => {
      return {
        ...prevState,
        previous: "assessed",
        current: "valuating",
      };
    });
  }

  function handleCancelValuating() {
    setDetailState((prevState) => {
      if (prevState.previous === "assessed") {
        return {
          ...prevState,
          current: "assessed",
        };
      }
      return {
        ...prevState,
        previous: "valuating",
        current: "draft-valuating",
      };
    });
  }

  function handleSaveValuation() {
    setDetailState((prevState) => {
      return {
        ...prevState,
        previous: "valuating",
        current: "draft-valuating",
      };
    });
  }

  function handleEditValuation() {
    setDetailState((prevState) => {
      return {
        ...prevState,
        previous: prevState.previous,
        current: "valuating",
      };
    });
  }

  function handleConfirmValuation() {
    setDetailState((prevState) => {
      return {
        ...prevState,
        previous: "",
        current: "valuated",
      };
    });
  }

  return (
    <>
      {/*HEADING*/}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <UIHeader title={"Valuation Request Detail"} />

        {detailState.current === "pending" && (
          <Button variant={"contained"} onClick={handleAssessing}>
            Assessing
          </Button>
        )}
        {detailState.current === "assessing" && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant={"outlined"} onClick={handleCancelAssessing}>
              Cancel
            </Button>
            <Button variant={"contained"} onClick={handleSaveAssessing}>
              Save
            </Button>
          </Box>
        )}
        {detailState.current === "draft-assessing" && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant={"outlined"} onClick={handleEditAssessment}>
              Edit
            </Button>
            <Button variant={"contained"} onClick={handleConfirmAssessment}>
              Confirm
            </Button>
          </Box>
        )}
        {detailState.current === "assessed" && (
          <Button variant={"contained"} onClick={handleValuating}>
            Valuate
          </Button>
        )}
        {detailState.current === "valuating" && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant={"outlined"} onClick={handleCancelValuating}>
              Cancel
            </Button>
            <Button variant={"contained"} onClick={handleSaveValuation}>
              Save
            </Button>
          </Box>
        )}
        {detailState.current === "draft-valuating" && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant={"outlined"} onClick={handleEditValuation}>
              Edit
            </Button>
            <Button variant={"contained"} onClick={handleConfirmValuation}>
              Confirm
            </Button>
          </Box>
        )}
      </Box>

      {/*CONTENT*/}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          mt: 2.5,
        }}
      >
        {/*Description*/}
        <DiamondValuationFieldGroup title="Description" sx={{ width: "50%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              minHeight: 328,
            }}
          >
            <DiamondValuationUserInfor />
            <Box
              sx={{ width: "50%", textAlign: "center", position: "relative" }}
            >
              <Typography sx={{ fontSize: "1rem" }}>Final price</Typography>
              <Typography sx={{ fontSize: "3rem" }}>27$</Typography>
              <AvatarGroup
                max={3}
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <Avatar alt="Remy Sharp" src="" />
                <Avatar alt="Travis Howard" src="" />
                <Avatar alt="Cindy Baker" src="" />
              </AvatarGroup>
              <Typography sx={{ fontSize: "1.5rem", mt: 5.5 }}>Tuan</Typography>
              <Typography sx={{ fontSize: "0.8rem", px: 3 }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Asperiores dignissimos dolor, doloremque et explicabo harum
                itaque molestias natus neque perspiciatis quam qui quod
              </Typography>
            </Box>
          </Box>
        </DiamondValuationFieldGroup>
        {/*Diamond Image*/}
        <Box sx={{ position: "relative", width: "50%" }}>
          <DiamondValuationFieldGroup title="Diamond Image">
            <ImageList
              sx={{ width: "100%", height: 328, rowGap: "10px" }}
              cols={3}
              rowHeight={164}
            >
              {imagesData.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                    style={{ height: "164px", objectFit: "cover" }}
                  />
                  <CustomCheckbox
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
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
      </Box>

      {detailState.current !== "pending" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            mt: 2,
          }}
        >
          <Box sx={{ width: "50%" }}>
            <DiamondValuationFieldGroup title="GIA Report Detail">
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
              <Box
                sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}
              >
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
            <DiamondValuationFieldGroup title="Grading Result">
              <Box
                sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}
              >
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
              <Box
                sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}
              >
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
            <DiamondValuationFieldGroup title="Additional Grading Information">
              <Box
                sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}
              >
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
              <Box
                sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}
              >
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
              <DiamondValuationFieldGroup title="Proportions">
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
              <DiamondValuationFieldGroup title="Clarity Characteristics">
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
      )}
      <Box>
        <UITable heading="Diamond Valuation" headCells={headCells} rows={rows}>
          <Button
            onClick={() => {
              console.log("Assign Valuation Staff Function");
            }}
            variant={"contained"}
            endIcon={<AddIcon />}
            sx={{ minWidth: 250 }}
          >
            Assign Valuation Staff
          </Button>
        </UITable>
      </Box>
    </>
  );
};

export default ValuationRequestDetailItem;
