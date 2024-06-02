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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { updateDiamondValuation } from "../../services/DiamondValuation/api.js";
import UIRichTextEditor from "../UI/RichTexEditor.jsx";
import DiamondValuationAssessment from "./Assessment.jsx";
import DiamondValuationFieldGroup from "./FieldGroup.jsx";
import DiamondValuationInfor from "./ValuationInfor.jsx";

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
const DiamondValuationItem = ({ detail, valuation, request }) => {
  const queryClient = useQueryClient();
  const { mutate: saveMutate } = useMutation({
    mutationFn: (body) => {
      return updateDiamondValuation(valuation.id, body);
    },
    onSuccess: (body) => {
      queryClient.invalidateQueries(["valuationRequests"]);
      if (!body.status) toast.success("Save diamond valuation successfully");
      else {
        toast.success("Confirm diamond valuation successfully");
      }
    },
  });

  const valuationInfor = {
    service: request.service.name,
    deadline: request.returnDate,
    status: !valuation.status ? "Valuating" : "Valuated",
  };
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
  const [valuationPrice, setValuationPrice] = useState(
    valuation.valuationPrice === 0 ? "" : valuation.valuationPrice,
  );
  const editorRef = useRef();
  const comment = valuation.comment === null ? "" : valuation.comment;

  function handleCancelValuating() {
    setDetailState((prevState) => {
      if (prevState.previous === "ASSESSED") {
        return {
          ...prevState,
          current: "ASSESSED",
        };
      }
      return {
        ...prevState,
        previous: "VALUATING",
        current: "DRAFT_VALUATING",
      };
    });
    setValuationPrice(null);
    // editorRef.current.setContent("");
  }

  useEffect(() => {
    if (detailState.previous === "ASSESSED") {
      setDetailState((prevState) => {
        return {
          ...prevState,
          current: "ASSESSED",
        };
      });
    }
  }, []);

  function handleSaveValuation() {
    setDetailState((prevState) => {
      return {
        ...prevState,
        previous: "VALUATING",
        current: "DRAFT_VALUATING",
      };
    });
    const body = {
      ...valuation,
      comment: editorRef.current.getContent(),
      valuationPrice,
    };
    saveMutate(body);
  }

  function handleEditValuation() {
    setDetailState((prevState) => {
      return {
        ...prevState,
        previous: prevState.previous,
        current: "VALUATING",
      };
    });
  }

  function handleConfirmValuation() {
    setDetailState((prevState) => {
      return {
        ...prevState,
        previous: "",
        current: "VALUATED",
      };
    });
    const body = {
      ...valuation,
      status: true,
    };
    saveMutate(body);
  }

  function handleValuating() {
    setDetailState((prevState) => {
      return {
        ...prevState,
        current: "VALUATING",
      };
    });
  }
  return (
    <>
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Typography
            variant="h3"
            component="p"
            sx={{ fontSize: 24, fontWeight: 700, my: 1 }}
          >
            Diamond Valuation Detail
          </Typography>
        </Box>
        {detailState.current === "ASSESSED" && (
          <Button variant={"contained"} onClick={handleValuating}>
            Valuating
          </Button>
        )}
        {detailState.current === "VALUATING" && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant={"outlined"} onClick={handleCancelValuating}>
              Cancel
            </Button>
            <Button variant={"contained"} onClick={handleSaveValuation}>
              Save
            </Button>
          </Box>
        )}
        {detailState.current === "DRAFT_VALUATING" && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant={"outlined"} onClick={handleEditValuation}>
              Edit
            </Button>
            <Button variant={"contained"} onClick={handleConfirmValuation}>
              Confirm
            </Button>
          </Box>
        )}
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
              <DiamondValuationInfor
                sx={{ width: "50%" }}
                valuationInfor={valuationInfor}
              />

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
                    value={valuationPrice}
                    onChange={(e) => {
                      setValuationPrice(e.target.value);
                    }}
                    disabled={detailState.current !== "VALUATING"}
                  />
                </FormControl>
              </Box>
            </Stack>
            <UIRichTextEditor
              ref={editorRef}
              value={comment}
              isDisabled={detailState.current !== "VALUATING"}
            />
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

      <DiamondValuationAssessment
        diamondInfor={diamondInfor}
        setDiamondInfor={setDiamondInfor}
        detailState={detailState}
      />
    </>
  );
};

export default DiamondValuationItem;
