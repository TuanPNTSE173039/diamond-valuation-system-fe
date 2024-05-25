import Box from "@mui/material/Box";
import Header from "../components/common/Header.jsx";
import Button from "@mui/material/Button";
import ValuationNoteItem from "../components/valuation-note/ValuationNoteItem.jsx";
import * as React from "react";
import ValuationNoteUserInfo from "../components/valuation-note/ValuationNoteUserInfo.jsx";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LabelIcon from "@mui/icons-material/Label";
import PersonIcon from "@mui/icons-material/Person";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

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
        <Header title={"Valuation Note"} />
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
          <ValuationNoteItem>
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
              <Box sx={{ width: "50%" }}>TuanPNT17</Box>
            </Box>
          </ValuationNoteItem>
        </Box>
        <Box sx={{ width: "50%" }}>B</Box>
      </Box>
    </>
  );
}
