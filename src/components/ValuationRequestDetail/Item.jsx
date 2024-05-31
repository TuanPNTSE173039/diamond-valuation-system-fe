import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, AvatarGroup, ImageList, ImageListItem } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import * as React from "react";
import { useState } from "react";
import DiamondValuationAssessment from "../DiamondValuation/Assessment.jsx";
import DiamondValuationAssignTable from "../DiamondValuation/AssignTable.jsx";
import DiamondValuationFieldGroup from "../DiamondValuation/FieldGroup.jsx";
import DiamondValuationUserInfor from "../DiamondValuation/UserInfor.jsx";
import UIHeader from "../UI/UIHeader.jsx";

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

  const [open, setOpen] = React.useState(false);
  const [selectedStaff, setSelectedStaff] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // Save your changes here
    // ...
    setOpen(false);
  };
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

      {detailState.current !== "pending" && (
        <DiamondValuationAssessment
          diamondInfor={diamondInfor}
          setDiamondInfor={setDiamondInfor}
          detailState={detailState}
        />
      )}
      {(detailState.current === "assessed" ||
        detailState.current === "valuating" ||
        detailState.current === "draft-valuating" ||
        detailState.current === "valuated") && (
        <DiamondValuationAssignTable detailState={detailState} />
      )}
    </>
  );
};

export default ValuationRequestDetailItem;
