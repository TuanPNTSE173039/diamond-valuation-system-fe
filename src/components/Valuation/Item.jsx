import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  ImageList,
  ImageListItem,
  InputAdornment,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useFormik } from "formik";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { setCurrent, setPrevious } from "../../redux/valuateSlice.js";
import { updateDiamondValuation } from "../../services/api.js";
import { storage } from "../../services/config/firebase.js";
import { useDetail } from "../../services/details.js";
import { useRequest } from "../../services/requests.js";
import { useValuation } from "../../services/valuations.js";
import { formattedDate } from "../../utilities/formatter.js";
import { loadImageByPath } from "../../utilities/imageLoader.js";
import UIBreadCrumb from "../UI/BreadCrumb.jsx";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";
import UIRichTextEditor from "../UI/RichTextEditor.jsx";
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
  const valuateState = useSelector((state) => state.valuate);
  const dispatch = useDispatch();

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

      if (!body.data.status)
        toast.success("Save diamond valuation successfully");
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
    if (detail?.diamondValuationNote?.proportions) {
      loadImageByPath(
        detail?.diamondValuationNote?.proportions,
        setProportionImage,
      );
    }
    if (detail?.diamondValuationNote?.clarityCharacteristicLink) {
      loadImageByPath(
        detail?.diamondValuationNote?.clarityCharacteristicLink,
        setClarityCharacteristicImage,
      );
    }
  }, [detail]);

  //General Infor
  const valuationInfor = {
    service: request?.service?.name,
    deadline: request?.returnDate,
    status: !valuation?.status ? "VALUATING" : "VALUATED",
  };
  const serverDiamondInfor = detail?.diamondValuationNote;
  const [diamondInfor, setDiamondInfor] = useState({});
  const editorRef = useRef();
  const commentDetail =
    valuation?.commentDetail === null ? "" : valuation?.commentDetail;
  const [clarities, setClarities] = useState([]);

  //State button mgt
  const [detailState, setDetailState] = useState({
    previous: null,
    current: null,
  });

  function convertValuationStatus(status) {
    if (status === "VALUATED") {
      return status;
    }
    if (
      status === "VALUATING" &&
      (!valuation?.comment ||
        !valuation?.commentDetail ||
        !valuation?.valuationPrice)
    ) {
      return "PENDING";
    }
    return "DOING";
  }

  useEffect(() => {
    // setDetailState((prevState) => {
    //   return {
    //     ...prevState,
    //     previous: getPreviousStatus(valuation?.status),
    //     current: valuation?.status ? "VALUATED" : "ASSESSED",
    //   };
    // });
    if (valuation) {
      const current = !valuation.status
        ? !valuation.comment &&
          !valuation.commentDetail &&
          !valuation.valuationPrice
          ? "PENDING"
          : "VALUATING"
        : "VALUATED";
      dispatch(setCurrent(current));
      dispatch(setPrevious(current));
    }
  }, [valuation]);

  function handleCancelValuating() {
    if (valuateState.previous === "PENDING") {
      dispatch(setCurrent("PENDING"));
    } else {
      dispatch(setCurrent("VALUATING"));
    }
    // setValuationPrice(null);
    // editorRef.current.setContent("");
    // formik.resetForm();
  }

  function handleSaveValuation(formValue) {
    const { valuationPrice: valuationPrice, briefComment } = formValue;
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
      comment: briefComment,
      valuationPrice: valuationPrice,
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

  const initialValues = {
    valuationPrice: 0,
    briefComment: "",
  };

  const validationSchema = Yup.object().shape({
    valuationPrice: Yup.number()
      .min(0, "Valuation Price is greater than 0")
      .required("Valuation price is required"),
    briefComment: Yup.string()
      .min(10, "Brief comment is greater than 10 characters")
      .required("Brief comment is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSaveValuation,
  });
  useEffect(() => {
    if (detail) {
      setDiamondInfor((prev) => {
        return {
          ...prev,
          certificateDate: formattedDate(serverDiamondInfor?.certificateDate),
          certificateId: serverDiamondInfor?.certificateId,
          diamondOrigin: serverDiamondInfor?.diamondOrigin,
          cutScore: serverDiamondInfor?.cutScore,
          caratWeight: serverDiamondInfor?.caratWeight,
          color: serverDiamondInfor?.color,
          clarity: serverDiamondInfor?.clarity,
          cut: serverDiamondInfor?.cut,
          shape: serverDiamondInfor?.shape,
          symmetry: serverDiamondInfor?.symmetry,
          polish: serverDiamondInfor?.polish,
          fluorescence: serverDiamondInfor?.fluorescence,
          proportions: serverDiamondInfor?.proportions,
          clarityCharacteristicLink:
            serverDiamondInfor?.clarityCharacteristicLink,
          clarityCharacteristic: serverDiamondInfor?.clarityCharacteristic,
          fairPrice: serverDiamondInfor?.fairPrice,
          minPrice: serverDiamondInfor?.minPrice,
          maxPrice: serverDiamondInfor?.maxPrice,
        };
      });
      setClarities(serverDiamondInfor?.clarityCharacteristic);
    }
    if (valuation) {
      formik.setValues({
        valuationPrice: valuation?.valuationPrice,
        briefComment: valuation?.comment,
      });
    }
  }, [valuation, detail]);

  if (isRequestLoading || isValuationLoading || isDetailLoading) {
    return <UICircularIndeterminate />;
  }
  const location = useLocation();
  const pathNames = location.pathname.split("/").filter((x) => x);
  return (
    <>
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Box>
          <UIBreadCrumb pathNames={pathNames} />
          <Typography
            variant="h3"
            component="p"
            sx={{ fontSize: 24, fontWeight: 700, my: 1 }}
          >
            Diamond Valuation Detail
          </Typography>
        </Box>
        {valuateState.current === "PENDING" && (
          <Button
            variant={"contained"}
            onClick={() => {
              dispatch(setCurrent("DOING"));
            }}
          >
            Valuate
          </Button>
        )}
        {valuateState.current === "DOING" && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant={"outlined"} onClick={handleCancelValuating}>
              Cancel
            </Button>
            <Button
              variant={"contained"}
              onClick={async () => {
                await formik.submitForm().resolve(() => {
                  dispatch(setCurrent("VALUATING"));
                });
              }}
              type="submit"
            >
              Save
            </Button>
          </Box>
        )}
        {valuateState.current === "VALUATING" && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant={"outlined"}
              onClick={() => {
                dispatch(setCurrent("DOING"));
              }}
            >
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
        <DiamondValuationFieldGroup title="Description" className="w-1/2">
          <Box className="h-[329px]" component="form">
            <Stack
              direction="row"
              spacing={4}
              className="items-start justify-between"
            >
              <DiamondValuationInfor
                className="w-3/5"
                valuationInfor={valuationInfor}
                diamondInfor={diamondInfor}
              />

              <Box className="w-2/5">
                <label
                  htmlFor="valuation-price"
                  className="text-center text-xl font-semibold text-primary"
                >
                  Valuation Price
                </label>
                <TextField
                  id="valuation-price"
                  type="number"
                  name="valuationPrice"
                  fullWidth
                  sx={{ mt: 1 }}
                  value={formik.values.valuationPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.valuationPrice &&
                    Boolean(formik.errors.valuationPrice)
                  }
                  helperText={
                    formik.touched.valuationPrice &&
                    formik.errors.valuationPrice
                  }
                  disabled={valuateState.current !== "DOING"}
                  InputProps={{
                    sx: { py: 1, px: 2, fontSize: 24 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography
                          sx={{ fontSize: 28, color: "primary.main" }}
                        >
                          $
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Stack>
            <TextField
              label={"Brief Comments"}
              multiline
              rows={4}
              fullWidth
              id="brief-comment"
              name="briefComment"
              value={formik.values.briefComment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.briefComment &&
                Boolean(formik.errors.briefComment)
              }
              helperText={
                formik.touched.briefComment && formik.errors.briefComment
              }
              disabled={valuateState.current !== "DOING"}
              sx={{ mt: 0.5 }}
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
          isDisabled={valuateState.current !== "DOING"}
        />
      </DiamondValuationFieldGroup>

      <DiamondValuationAssessment
        diamondInfor={diamondInfor}
        setDiamondInfor={setDiamondInfor}
        detailState={detailState}
        proportionImage={proportionImage}
        clarityCharacteristicImage={clarityCharacteristicImage}
        clarities={clarities}
      />
    </>
  );
};

export default DiamondValuationItem;
