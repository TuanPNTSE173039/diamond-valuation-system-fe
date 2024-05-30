import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  FormControl,
  ImageList,
  ImageListItem,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import UIReactQuill from "../UI/ReactQuill.jsx";
import UIHeader from "../UI/UIHeader.jsx";
import DiamondValuationFieldGroup from "./FieldGroup.jsx";
import DiamondValuationInfor from "./ValuationInfor.jsx";
import "react-quill/dist/quill.snow.css";

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
const DiamondValuationItem = () => {
  return (
    <>
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <UIHeader title={"Diamond Valuation Detail"} />
        <Button variant={"contained"}>Valuate</Button>
      </Stack>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          mt: 2.5,
        }}
      >
        <DiamondValuationFieldGroup title="Description" sx={{ width: "50%" }}>
          <Box sx={{ height: 329 }}>
            <Stack
              direction="row"
              spacing={4}
              sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
            >
              <DiamondValuationInfor sx={{ width: "50%" }} />
              <Box sx={{ width: "50%" }}>
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <label
                    htmlFor="valuation-price"
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      fontWeight: 600,
                      color: "primary.main",
                    }}
                  >
                    Valuation Price
                  </label>
                  <OutlinedInput
                    id="valuation-price"
                    startAdornment={
                      <InputAdornment position="start">
                        <Typography
                          sx={{ fontSize: 28, color: "primary.main" }}
                        >
                          $
                        </Typography>
                      </InputAdornment>
                    }
                    inputProps={{
                      "aria-label": "valuation-price",
                    }}
                    sx={{ fontSize: 28 }}
                    type="number"
                  />
                </FormControl>
              </Box>
            </Stack>
            <UIReactQuill title="Comments" />
          </Box>
        </DiamondValuationFieldGroup>

        <Box sx={{ position: "relative", width: "50%" }}>
          <DiamondValuationFieldGroup title="Diamond Images">
            <ImageList
              sx={{ width: "100%", height: 328, rowGap: "10px" }}
              cols={3}
              rowHeight={164}
            >
              <ImageListItem>
                <Button
                  component="label"
                  role={undefined}
                  variant="outlined"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  sx={{ height: 164 }}
                >
                  Upload file
                  <VisuallyHiddenInput type="file" />
                </Button>
              </ImageListItem>
              {imagesData.map((item, index) => (
                <ImageListItem key={index} sx={{ position: "relative" }}>
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
                  <img
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                    style={{ height: "164px", objectFit: "cover" }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </DiamondValuationFieldGroup>
        </Box>
      </Box>

      {/*<DiamondValuationAssessment />*/}
    </>
  );
};

export default DiamondValuationItem;
