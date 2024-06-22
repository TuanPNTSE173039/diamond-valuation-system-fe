import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecordItem from "./Item.jsx";

export default function RecordList() {
  const navigate = useNavigate();
  const [mode, setMode] = useState({
    receipt: false,
    return: false,
    commitment: false,
    sealing: false,
  });

  const handleReceipt = () => {
    setMode((prev) => ({ ...prev, receipt: true }));
    navigate("receipt");
  };

  const handleReturn = () => {
    setMode((prev) => ({ ...prev, return: true }));
    navigate("return");
  };

  const handleCommitment = () => {
    setMode((prev) => ({ ...prev, commitment: true }));
    navigate("commitment");
  };

  const handleSealing = () => {
    setMode((prev) => ({ ...prev, sealing: true }));
    navigate("sealing");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" sx={{ fontWeight: "600" }}>
        Records
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <RecordItem
          title="Receipt"
          mode={mode.receipt}
          handleMode={handleReceipt}
        />
        <RecordItem
          title="Return"
          mode={mode.return}
          handleMode={handleReturn}
        />
        <RecordItem
          title="Commitment"
          mode={mode.commitment}
          handleMode={handleCommitment}
        />
        <RecordItem
          title="Sealing"
          mode={mode.sealing}
          handleMode={handleSealing}
        />
      </Box>
    </Box>
  );
}
