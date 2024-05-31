import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import EmailIcon from "@mui/icons-material/Email";
import LabelIcon from "@mui/icons-material/Label";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";

import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { http } from "../../services/config.js";
import { assignConsultantStaff } from "../../services/ValuationRequest/api.js";
import UIAutocomplete from "../UI/Autocomplete.jsx";
import ValuationRequestUserInfor from "./UserInfor.jsx";

const ValuationRequestGeneral = ({
  valuationRequest,
  valuationData,
  staffs,
}) => {
  const queryClient = useQueryClient();
  const consultantList = staffs.content
    .filter((item) => item.account.role === "CONSULTANT_STAFF")
    .map((item) => {
      return {
        code: item.id,
        label: item.firstName + " " + item.lastName,
        years: item.experience,
      };
    });

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (body) => {
      return assignConsultantStaff(valuationRequest.id, body);
    },
    onSuccess: (_) => {
      queryClient.invalidateQueries(["valuationRequest", valuationRequest.id]);
      queryClient.invalidateQueries(["valuationRequests"]);
      toast.success("Consultant staff is assigned");
    },
  });
  const [open, setOpen] = useState(false);
  const [consultant, setConsultant] = useState(consultantList[0]);
  const { data, error, status } = useQuery({
    queryKey: ["valuationRequest", valuationRequest.id],
    queryFn: () => http.get("/valuation-requests/" + valuationRequest.id),
  });
  console.log(data);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setConsultant(null);
    setOpen(false);
  };

  const handleSave = () => {
    const updatedValuationRequest = {
      ...valuationRequest,
      staffID: consultant.code,
      status: "PROCESSING",
    };
    mutate(updatedValuationRequest);
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 1, color: "primary" }}>
      <Grid container>
        <Grid item xs={4}>
          <ValuationRequestUserInfor icon={<PersonIcon />} title="Customer">
            {valuationData.customerName}
          </ValuationRequestUserInfor>
          <ValuationRequestUserInfor icon={<AssignmentIndIcon />} title="CCCD">
            {valuationData.cccd}
          </ValuationRequestUserInfor>
          <ValuationRequestUserInfor icon={<LocalPhoneIcon />} title="Phone">
            {valuationData.phone}
          </ValuationRequestUserInfor>
          <ValuationRequestUserInfor icon={<EmailIcon />} title="Email">
            {valuationData.email}
          </ValuationRequestUserInfor>
          <ValuationRequestUserInfor icon={<LocationOnIcon />} title="Adress">
            {valuationData.address}
          </ValuationRequestUserInfor>
        </Grid>
        <Grid item xs={4}>
          <ValuationRequestUserInfor
            icon={<AssignmentIndIcon />}
            title="Assignee"
          >
            {isPending ? (
              "...assigning"
            ) : valuationData.staff ? (
              valuationData.staff.firstName + " " + valuationData.staff.lastName
            ) : (
              <Link onClick={handleClickOpen} sx={{ cursor: "pointer" }}>
                Assign Consultant
              </Link>
            )}
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
            {valuationData.service}
          </ValuationRequestUserInfor>
          <ValuationRequestUserInfor icon={<LabelIcon />} title="Status">
            {valuationData.status}
          </ValuationRequestUserInfor>
          <ValuationRequestUserInfor
            icon={<CalendarMonthIcon />}
            title="Creation"
          >
            {valuationData.creationDate}
          </ValuationRequestUserInfor>
          <ValuationRequestUserInfor
            icon={<CalendarMonthIcon />}
            title="Returned"
          >
            {valuationData.returnedDate}
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
            <Box sx={{ fontSize: "4rem" }}>{valuationData.totalFee}$</Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ValuationRequestGeneral;
