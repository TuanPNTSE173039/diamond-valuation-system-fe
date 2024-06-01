import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, AvatarGroup, ImageList, ImageListItem } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import * as React from "react";
import { useState } from "react";
import { updateDiamondNote } from "../../services/DiamondValuation/api.js";
import { updateAssessStatus } from "../../services/ValuationRequestDetail/api.js";
import DiamondValuationAssessment from "../DiamondValuation/Assessment.jsx";
import DiamondValuationAssignTable from "../DiamondValuation/AssignTable.jsx";
import DiamondValuationFieldGroup from "../DiamondValuation/FieldGroup.jsx";
import DiamondValuationUserInfor from "../DiamondValuation/UserInfor.jsx";
import UIDetailHeader from "../UI/UIDetailHeader.jsx";

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

const ValuationRequestDetailItem = ({
  detail,
  valuationRequests,
  customer,
  staffs,
}) => {
  const queryClient = useQueryClient();
  const { mutate: mutateDetail } = useMutation({
    mutationFn: (body) => {
      return updateAssessStatus(detail.id, body);
    },
    onSuccess: (body) => {
      queryClient.invalidateQueries(["valuationRequests"]);
    },
  });

  const { mutate: mutateAssessment } = useMutation({
    mutationFn: (body) => {
      return updateDiamondNote(detail.diamondValuationNote.id, body);
    },
    onSuccess: (body) => {
      queryClient.invalidateQueries(["valuationRequests"]);
    },
  });
  const serverDiamondInfor = detail?.diamondValuationNote;
  const [diamondInfor, setDiamondInfor] = useState({
    giaCertDate: dayjs(new Date()),
    certificateId: serverDiamondInfor?.certificateId,
    diamondOrigin: serverDiamondInfor?.diamondOrigin,
    caratWeight: serverDiamondInfor?.caratWeight,
    color: serverDiamondInfor?.color,
    clarity: serverDiamondInfor?.clarity,
    cut: serverDiamondInfor?.cut,
    shape: serverDiamondInfor?.shape,
    symmetry: serverDiamondInfor?.symmetry,
    polish: serverDiamondInfor?.polish,
    fluorescence: serverDiamondInfor?.fluorescence,
    proportions: serverDiamondInfor?.proportions,
    clarityCharacteristics: serverDiamondInfor?.clarityCharacteristic,
  });
  const getPreviousStatus = (currentStatus) => {
    switch (currentStatus) {
      case "PENDING":
        return "PENDING";
      case "ASSESSING":
        return "PENDING";
      case "ASSESSED":
        return "ASSESSING";
      case "VALUATING":
        return "ASSESSED";
      case "VALUATED":
        return "VALUATING";
      case "APPROVED":
        return "APPROVED";
    }
  };
  const [detailState, setDetailState] = useState({
    previous: getPreviousStatus(detail.status),
    current: detail.status,
  });

  const infor = {
    customerName: customer.firstName + " " + customer.lastName,
    phone: customer.phone.trim(),
    email: customer.email.trim(),
    size: detail.size,
    service: valuationRequests.service.name,
    servicePrice: detail.servicePrice,
    status: detail.status,
    fairPriceEstimate:
      serverDiamondInfor?.fairPrice === null
        ? "N/A"
        : serverDiamondInfor?.fairPrice,
    estimateRange:
      serverDiamondInfor?.minPrice + " - " + serverDiamondInfor?.maxPrice,
  };

  function handleAssessing() {
    setDetailState((prevState) => {
      return {
        ...prevState,
        previous: prevState.previous,
        current: "ASSESSING",
      };
    });
  }

  function handleCancelAssessing() {
    setDetailState((prevState) => {
      if (prevState.previous === "PENDING") {
        return {
          ...prevState,
          current: "PENDING",
        };
      }
      return {
        ...prevState,
        previous: "ASSESSING",
        current: "DRAFT_ASSESSING",
      };
    });
  }

  function handleSaveAssessing() {
    setDetailState((prevState) => {
      return {
        ...prevState,
        previous: "ASSESSING",
        current: "DRAFT_ASSESSING",
      };
    });
    const detailBody = {
      ...detail,
      status: "ASSESSING",
    };
    mutateDetail(detailBody);
    const assessmentBody = {
      ...diamondInfor,
    };
    mutateAssessment(assessmentBody);
  }

  function handleEditAssessment() {
    setDetailState((prevState) => {
      return {
        ...prevState,
        previous: prevState.previous,
        current: "ASSESSING",
      };
    });
  }

  function handleConfirmAssessment() {
    setDetailState((prevState) => {
      return {
        ...prevState,
        previous: "",
        current: "ASSESSED",
      };
    });
    const detailBody = {
      ...detail,
      status: "ASSESSED",
    };
    mutateDetail(detailBody);
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
        <UIDetailHeader title={"Valuation Request Detail"} detail={detail} />

        {detailState.current === "PENDING" && (
          <Button variant={"contained"} onClick={handleAssessing}>
            Assessing
          </Button>
        )}
        {detailState.current === "ASSESSING" && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant={"outlined"} onClick={handleCancelAssessing}>
              Cancel
            </Button>
            <Button variant={"contained"} onClick={handleSaveAssessing}>
              Save
            </Button>
          </Box>
        )}
        {detailState.current === "DRAFT_ASSESSING" && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant={"outlined"} onClick={handleEditAssessment}>
              Edit
            </Button>
            <Button variant={"contained"} onClick={handleConfirmAssessment}>
              Confirm
            </Button>
          </Box>
        )}
        {detailState.current === "ASSESSED" && (
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
            <DiamondValuationUserInfor infor={infor} />
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

      {detailState.current !== "PENDING" && (
        <DiamondValuationAssessment
          diamondInfor={diamondInfor}
          setDiamondInfor={setDiamondInfor}
          detailState={detailState}
        />
      )}
      {(detailState.current === "ASSESSED" ||
        detailState.current === "VALUATING" ||
        detailState.current === "DRAFT_VALUATING" ||
        detailState.current === "VALUATED") && (
        <>
          <DiamondValuationAssignTable
            detailState={detailState}
            staffs={staffs}
            detail={detail}
          />
        </>
      )}
    </>
  );
};

export default ValuationRequestDetailItem;
