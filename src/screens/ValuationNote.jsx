import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import LabelIcon from "@mui/icons-material/Label";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
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
import * as React from "react";
import BasicDatePicker from "../components/UI/BasicDatePicker.jsx";
import UIHeader from "../components/UI/UIHeader.jsx";
import ValuationNoteItem from "../components/valuation-note/ValuationNoteItem.jsx";
import ValuationNoteUserInfo from "../components/valuation-note/ValuationNoteUserInfo.jsx";

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
export default function ValuationNote() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <UIHeader title={"Valuation Note"} />
        <Button variant="contained" color="primary">
          Sealing Record
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
        }}
      >
        <Box sx={{ width: "50%" }}>
          <ValuationNoteItem title="Description">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
              }}
            >
              <Box sx={{ width: "50%" }}>
                <ValuationNoteUserInfo icon={<PersonIcon />} title="Customer">
                  Tuan Pham
                </ValuationNoteUserInfo>
                <ValuationNoteUserInfo icon={<LocalPhoneIcon />} title="Phone">
                  0367304351
                </ValuationNoteUserInfo>
                <ValuationNoteUserInfo icon={<EmailIcon />} title="Email">
                  tuanpntse173039@fpt.edu.vn
                </ValuationNoteUserInfo>
                <ValuationNoteUserInfo icon={<LabelIcon />} title="Status">
                  Processing
                </ValuationNoteUserInfo>
                <ValuationNoteUserInfo
                  icon={<LocalAtmIcon />}
                  title="Fair Price Estimate"
                >
                  &7.000
                </ValuationNoteUserInfo>

                <ValuationNoteUserInfo
                  icon={<LocalAtmIcon />}
                  title="Estimate Range"
                >
                  4.500 - 7.000
                </ValuationNoteUserInfo>
                <ValuationNoteUserInfo
                  icon={<CalendarMonthIcon />}
                  title="Effect Date"
                >
                  10/10/2022
                </ValuationNoteUserInfo>
              </Box>
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
                <Typography sx={{ fontSize: "1.5rem", mt: 5.5 }}>
                  Tuan
                </Typography>
                <Typography sx={{ fontSize: "0.8rem", px: 3 }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Asperiores dignissimos dolor, doloremque et explicabo harum
                  itaque molestias natus neque perspiciatis quam qui quod
                </Typography>
              </Box>
            </Box>
          </ValuationNoteItem>
          <ValuationNoteItem title="GIA Report Detail">
            <BasicDatePicker />
            <Box
              sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}
            >
              <TextField
                label="GIA Report Number"
                id="outlined-start-adornment"
                sx={{ width: "50%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">GIA</InputAdornment>
                  ),
                }}
              />
              <FormControl sx={{ width: "50%" }}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Diamond Origin
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="Natural"
                    control={<Radio />}
                    label="Natural"
                  />
                  <FormControlLabel
                    value="LabGrown"
                    control={<Radio />}
                    label="Lab Grown"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </ValuationNoteItem>
          <ValuationNoteItem title="Grading Result">
            <Box
              sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}
            >
              <TextField
                label="Carat Weight"
                id="carat-weight"
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
                defaultValue="EUR"
                sx={{ width: "50%" }}
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
                defaultValue="EUR"
                sx={{ width: "50%" }}
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
                defaultValue="EUR"
                sx={{ width: "50%" }}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </ValuationNoteItem>
          <ValuationNoteItem title="Additional Grading Information">
            <Box
              sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2.5 }}
            >
              <TextField
                id="shape"
                select
                label="Shape"
                defaultValue="EUR"
                sx={{ width: "50%" }}
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
                sx={{ width: "50%" }}
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
                sx={{ width: "50%" }}
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
                sx={{ width: "50%" }}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </ValuationNoteItem>
        </Box>
        <Box sx={{ width: "50%" }}>
          <Box sx={{ position: "relative" }}>
            <ValuationNoteItem title="Diamond Image">
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
            </ValuationNoteItem>
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
            <ValuationNoteItem title="Proportions">
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
            </ValuationNoteItem>
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
            <ValuationNoteItem title="Clarity Characteristics">
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
            </ValuationNoteItem>
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
    </>
  );
}
