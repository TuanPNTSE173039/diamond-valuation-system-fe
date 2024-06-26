import AddIcon from "@mui/icons-material/Add";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import EmailIcon from "@mui/icons-material/Email";
import LabelIcon from "@mui/icons-material/Label";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateValuationRequest } from "../../services/api.js";
import { useCustomer } from "../../services/customers.js";
import { useRequest } from "../../services/requests.js";
import { useStaff, useStaffs } from "../../services/staffs.js";
import { formattedMoney } from "../../utilities/formatter.js";
import UIAutocomplete from "../UI/Autocomplete.jsx";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";
import ValuationRequestUserInfor from "./UserInfor.jsx";

const RequestGeneral = () => {
  //Get data
  const { requestId } = useParams();
  const { data: request, isLoading: isRequestLoading } = useRequest(requestId);
  const { data: customer, isLoading: isCustomerLoading } = useCustomer(
    request?.customerID,
  );
  const { data: staff, isLoading: isStaffLoading } = useStaff(request?.staffID);
  const { data: staffs, isLoading: isStaffsLoading } = useStaffs();
  const consultantList = staffs?.content
    .filter((item) => item.account.role === "CONSULTANT_STAFF")
    .map((item) => {
      return {
        code: item.id,
        label: item.firstName + " " + item.lastName,
        years: item.experience,
        curProjects: item.currentTotalProject,
        totalProjects: item.countProject,
      };
    })
    .sort((a, b) => a.curProjects - b.curProjects);

  //Mutate data
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (body) => {
      return updateValuationRequest(requestId, body);
    },
    onSuccess: (body) => {
      queryClient.invalidateQueries({
        queryKey: ["request", { requestId: requestId }],
      });
      toast.success("Consultant staff is assigned");
    },
  });

  const [open, setOpen] = useState(false);
  const [consultant, setConsultant] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setConsultant(null);
    setOpen(false);
  };

  const handleSave = () => {
    const updatedValuationRequest = {
      ...request,
      staffID: consultant.code,
      status: "PROCESSING",
    };
    mutate(updatedValuationRequest);
    setOpen(false);
  };
  const generalInfo = {
    creationDate: request?.creationDate,
    returnedDate: request?.returnDate,
    totalFee: request?.totalServicePrice,
  };

  if (
    isRequestLoading ||
    isStaffsLoading ||
    isCustomerLoading ||
    isStaffLoading
  ) {
    return <UICircularIndeterminate />;
  }

  return (
    <Box sx={{ flexGrow: 1, mt: 1, color: "primary" }}>
      <Grid container>
        <Grid item xs={4}>
          <ValuationRequestUserInfor icon={<PersonIcon />} title="Customer">
            <Avatar sx={{ width: 35, height: 35 }}>1</Avatar>
            {customer?.firstName + " " + customer?.lastName}
          </ValuationRequestUserInfor>
          <ValuationRequestUserInfor icon={<AssignmentIndIcon />} title="CCCD">
            {customer?.identityDocument?.trim()}
          </ValuationRequestUserInfor>
          <ValuationRequestUserInfor icon={<LocalPhoneIcon />} title="Phone">
            {customer?.phone?.trim()}
          </ValuationRequestUserInfor>
          <ValuationRequestUserInfor icon={<EmailIcon />} title="Email">
            {customer?.email?.trim()}
          </ValuationRequestUserInfor>
          <ValuationRequestUserInfor icon={<LocationOnIcon />} title="Adress">
            {customer?.address?.trim()}
          </ValuationRequestUserInfor>
        </Grid>
        <Grid item xs={4}>
          <ValuationRequestUserInfor
            icon={<AssignmentIndIcon />}
            title="Assignee"
          >
            {staff && (
              <>
                <Avatar sx={{ width: 35, height: 35 }}>{staff?.id}</Avatar>
                <Typography>
                  {staff?.firstName + " " + staff?.lastName}
                </Typography>
              </>
            )}
            {!staff && !isPending && (
              <Button
                size={"small"}
                variant={"outlined"}
                onClick={handleClickOpen}
                sx={{ cursor: "pointer" }}
                startIcon={<AddIcon />}
              >
                Assign Consultant
              </Button>
            )}
            {isPending && "...assigning"}

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Assign Consultant</DialogTitle>
              <DialogContent>
                <UIAutocomplete
                  onChange={(event, newValue) => setConsultant(newValue)}
                  value={consultant}
                  data={consultantList}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} variant="text">
                  Cancel
                </Button>
                <Button onClick={handleSave} variant="contained">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </ValuationRequestUserInfor>
          <ValuationRequestUserInfor
            icon={<ElectricBoltIcon />}
            title="Service"
          >
            {request?.service.name}
          </ValuationRequestUserInfor>
          <ValuationRequestUserInfor icon={<LabelIcon />} title="Status">
            {request?.status}
          </ValuationRequestUserInfor>
          <ValuationRequestUserInfor
            icon={<CalendarMonthIcon />}
            title="Creation"
          >
            {format(new Date(request?.creationDate), "yyyy/MM/dd - HH:mm:ss")}
          </ValuationRequestUserInfor>
          <ValuationRequestUserInfor
            icon={<CalendarMonthIcon />}
            title="Returned"
          >
            {generalInfo.returnedDate === null
              ? "N/A"
              : format(new Date(request?.returnDate), "yyyy/MM/dd - HH:mm:ss")}
          </ValuationRequestUserInfor>
        </Grid>
        <Grid item xs={4} sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <Typography sx={{ fontSize: "1.2rem", color: "gray" }}>
              Total Fee
            </Typography>
            <Box sx={{ fontSize: "4rem" }}>
              {formattedMoney(request?.totalServicePrice)}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RequestGeneral;
