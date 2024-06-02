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
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import * as React from "react";
import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom";
import { updateDiamondNote } from "../../services/DiamondValuation/api.js";
import { getStaffById } from "../../services/Staff/utils.jsx";
import { updateDetail } from "../../services/ValuationRequestDetail/api.js";
import { formattedMoney } from "../../utilities/AppConfig.js";
import { storage } from "../../utilities/firebaseConfig.js";
import { loadImageByPath } from "../../utilities/ImageLoader.js";
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

export const metadata = {
  contentType: "image/jpeg",
};
const ValuationRequestDetailItem = ({
  detail,
  valuationRequests,
  customer,
  staffs,
}) => {
  const queryClient = useQueryClient();
  const { mutate: mutateDetail } = useMutation({
    mutationFn: (body) => {
      return updateDetail(detail.id, body);
    },
    onSuccess: (body) => {
      queryClient.invalidateQueries(["valuationRequests"]);
    },
  });
  const { detailId } = useParams();
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
  const [image, setImage] = useState(null); // state lưu ảnh sau khi chọn
  const [proportionImage, setProportionImage] = useState(null);
  const [clarityCharacteristicImage, setClarityCharacteristicImage] =
    useState(null);
  const [progress, setProgress] = useState(0); // state hiển thị phần trăm tải ảnh lên store
  const [uploadedImages, setUploadedImages] = useState([]); // state hiển thị danh sách ảnh đã tải lên store
  const resultStaff =
    detail.valuationPrice === 0
      ? null
      : !detail.mode
        ? {
            staff: getStaffById(staffs, detail.diamondValuationAssign.staffId),
            comment: detail.diamondValuationAssign.comment,
          }
        : detail.diamondValuationAssigns.map((item) => ({
            staff: getStaffById(staffs, item.staffId),
            comment: item.comment,
          }));

  function handleSelectImage(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  const imageLinks = `diamonds/${detailId}/images`;
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
    if (detail.diamondValuationNote?.proportions !== null) {
      loadImageByPath(
        detail.diamondValuationNote?.proportions,
        setProportionImage,
      );
    }
    if (detail.diamondValuationNote?.clarityCharacteristic !== null) {
      loadImageByPath(
        detail.diamondValuationNote?.clarityCharacteristic,
        setClarityCharacteristicImage,
      );
    }
  }, []);

  const handleUploadDiamondImage = () => {
    const storageRef = ref(storage, `${imageLinks}/${image.name}`);

    const uploadTask = uploadBytesResumable(storageRef, image, metadata);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploadedImages([downloadURL, ...uploadedImages]);
          const imageLink = `${imageLinks}` / `${image.name}`;
          setImage(null);
          setProgress(0);
        });
      },
    );
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
            <DiamondValuationUserInfor
              infor={infor}
              sx={{ width: detail.valuationPrice === 0.0 ? "100%" : "50%" }}
            />
            {detail.valuationPrice !== 0.0 && (
              <Box
                sx={{
                  width: detail.valuationPrice === 0.0 ? undefined : "50%",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <Typography sx={{ fontSize: "1rem" }}>Final price</Typography>
                <Typography sx={{ fontSize: "3rem" }}>
                  {formattedMoney(detail.valuationPrice)}
                </Typography>
                <AvatarGroup
                  max={3}
                  sx={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  {!detail.mode ? (
                    <Avatar alt={resultStaff.staff.id} src="" />
                  ) : (
                    resultStaff.map((item) => {
                      return (
                        <Avatar
                          key={item.staff.id}
                          alt={item.staff.id}
                          src=""
                        />
                      );
                    })
                  )}
                </AvatarGroup>
                <Box>
                  {!detail.mode ? (
                    <Typography>
                      `${resultStaff.comment.replace(/<[^>]*>/g, "")}`
                    </Typography>
                  ) : (
                    <Carousel sx={{ mt: 5, height: "100%" }}>
                      {resultStaff.map((item) => (
                        // <Box>
                        //   <Typography sx={{ fontSize: "1.5rem", mt: 5.5 }}>
                        //     {item.staff.firstName}
                        //   </Typography>
                        //   <Typography sx={{ fontSize: "0.8rem", px: 3 }}>
                        //     {item.comment}
                        //   </Typography>
                        // </Box>
                        <Box sx={{ mt: 2 }}>
                          <h2 className="text-xl mb-1/2 font-bold">
                            {item.staff.firstName + " " + item.staff.lastName}
                          </h2>
                          <p>{item.comment.replace(/<[^>]*>/g, "")}</p>
                          {/*<Button className="CheckButton">Check it out!</Button>*/}
                        </Box>
                      ))}
                    </Carousel>
                  )}
                </Box>
              </Box>
            )}
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
              {!image && (
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
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleSelectImage}
                    />
                  </Button>
                </ImageListItem>
              )}
              {image && (
                <ImageListItem sx={{ position: "relative" }}>
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
                  <Box sx={{ w: 164, h: 164 }}>
                    <img
                      src={`${URL.createObjectURL(image)}`}
                      alt="New upload image"
                      loading="lazy"
                      style={{ height: "164px", objectFit: "cover" }}
                    />
                  </Box>
                </ImageListItem>
              )}
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
            {image && (
              <Button
                onClick={handleUploadDiamondImage}
                variant={"outlined"}
                sx={{ position: "absolute", top: 0, right: 0 }}
                size={"small"}
              >
                Upload
              </Button>
            )}
          </DiamondValuationFieldGroup>
        </Box>
      </Box>

      {detailState.current !== "PENDING" && (
        <DiamondValuationAssessment
          diamondInfor={diamondInfor}
          setDiamondInfor={setDiamondInfor}
          detailState={detailState}
          proportionImage={proportionImage}
          clarityCharacteristic={clarityCharacteristicImage}
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
