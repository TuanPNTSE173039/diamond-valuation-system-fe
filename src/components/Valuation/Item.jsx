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
import { getDownloadURL, listAll, ref } from "firebase/storage";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateDiamondValuation } from "../../services/api.js";
import { storage } from "../../services/config/firebase.js";
import { useDetail } from "../../services/details.js";
import { useRequest } from "../../services/requests.js";
import { useValuation } from "../../services/valuations.js";
import { loadImageByPath } from "../../utilities/imageLoader.js";
import { getPreviousStatus } from "../../utilities/Status.jsx";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";
import UIRichTextEditor from "../UI/RichTexEditor.jsx";
import DiamondValuationAssessment from "./Assessment.jsx";
import DiamondValuationFieldGroup from "./FieldGroup.jsx";
import DiamondValuationInfor from "./ValuationInfor.jsx";

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
  const { valuationId } = useParams();
  const { isLoading: isValuationLoading, data: valuation } =
    useValuation(valuationId);
  const { isLoading: isDetailLoading, data: detail } = useDetail(
    valuation?.valuationRequestDetailId,
  );
  const { isLoading: isRequestLoading, data: request } = useRequest(
    detail?.valuationRequestID,
  );

  //Update Diamond Valuation
  const queryClient = useQueryClient();
  const { mutate: saveMutate } = useMutation({
    mutationFn: (body) => {
      return updateDiamondValuation(valuation.id, body);
    },
    onSuccess: (body) => {
      queryClient.invalidateQueries({
        queryKey: ["valuations"],
      });
      queryClient.invalidateQueries({
        queryKey: ["valuation", { valuationId: valuationId }],
      });

      if (!body.data.status) toast.success("Save diamond valuation successfully");
      else {
        toast.success("Confirm diamond valuation successfully");
      }
    },
  });


  //Loading Image from firebase
  const [proportionImage, setProportionImage] = useState(null);
  const [clarityCharacteristicImage, setClarityCharacteristicImage] =
    useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const imageLinks = `diamonds/${detail?.id}/images`;
  const getListAllImages = () => {
    const listRef = ref(storage, imageLinks);

    listAll(listRef)
      .then(async (res) => {
        res.prefixes.forEach((folderRef) => {
          console.log("folderRef", folderRef);
        });
        const images = await Promise.all(
          res.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return url;
          }),
        );
        setUploadedImages(images);
      })
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
  };
  useEffect(() => {
    getListAllImages();
    if (detail?.diamondValuationNote?.proportions !== null) {
      loadImageByPath(
        detail?.diamondValuationNote?.proportions,
        setProportionImage,
      );
    }
    if (detail?.diamondValuationNote?.clarityCharacteristicLink !== null) {
      loadImageByPath(
        detail?.diamondValuationNote?.clarityCharacteristicLink,
        setClarityCharacteristicImage,
      );
    }
  }, []);

  //General Infor
  const valuationInfor = {
    service: request?.service?.name,
    deadline: request?.returnDate,
    status: !valuation?.status ? "Valuating" : "Valuated",
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
    clarityCharacteristicLink: serverDiamondInfor?.clarityCharacteristicLink,
    clarityCharacteristic: serverDiamondInfor?.clarityCharacteristic,
    fairPrice: serverDiamondInfor?.fairPrice,
    rangePrice:
      serverDiamondInfor?.minPrice + " - " + serverDiamondInfor?.maxPrice,
  });

  //Clarity Characteristic List
  const [clarities, setClarities] = useState(
    diamondInfor.clarityCharacteristic === null
      ? []
      : () => diamondInfor.clarityCharacteristic,
  );
  const handleClarities = (event, newClarity) => {
    setClarities(newClarity);
  };

  //Valuation Infor
  const [valuationPrice, setValuationPrice] = useState(
    valuation.valuationPrice === 0 ? "" : valuation.valuationPrice,
  );
  const [comment, setComment] = useState(
    valuation.comment === null ? "" : valuation.comment,
  );
  const editorRef = useRef();
  const commentDetail =
    valuation.commentDetail === null ? "" : valuation.commentDetail;

  //State button mgt
  const [detailState, setDetailState] = useState({
    previous: getPreviousStatus(detail?.status),
    current: detail?.status,
  });

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
      commentDetail: editorRef.current.getContent(),
      comment: comment,
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

  if (isRequestLoading || isValuationLoading || isDetailLoading) {
    return <UICircularIndeterminate />;
  }
  console.log(detailState);
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
                diamondInfor={diamondInfor}
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
            <Box>
              <label
                htmlFor={"brief-comment"}
                style={{
                  marginTop: 2,
                  fontSize: 20,
                  fontWeight: 600,
                  color: "primary.main",
                }}
              >
                Brief Comment
              </label>
              <textarea
                id={"brief-comment"}
                style={{
                  width: "100%",
                  height: "110px",
                  resize: "none",
                  outline: "1px solid #333",
                  borderRadius: 4,
                  padding: "8px 16px",
                }}
                onChange={(e) => setComment(e.target.value)}
                disabled={detailState.current !== "VALUATING"}
                value={comment}
              />
            </Box>
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
              {uploadedImages
                .map((item) => ({ img: item, title: "Diamond Image" }))
                .map((item, index) => (
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

      <DiamondValuationFieldGroup
        title="Valuation Detail Comment"
        sx={{ mt: 2 }}
      >
        <UIRichTextEditor
          ref={editorRef}
          value={commentDetail}
          isDisabled={detailState.current !== "VALUATING"}
        />
      </DiamondValuationFieldGroup>

      <DiamondValuationAssessment
        diamondInfor={diamondInfor}
        setDiamondInfor={setDiamondInfor}
        detailState={detailState}
        proportionImage={proportionImage}
        clarityCharacteristicImage={clarityCharacteristicImage}
        clarities={clarities}
        handleClarities={handleClarities}
      />
    </>
  );
};

export default DiamondValuationItem;
