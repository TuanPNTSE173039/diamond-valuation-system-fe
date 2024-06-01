import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ReceiptRecord from "./ReceiptRecord.jsx";
import ResultRecord from "./ResultRecord.jsx";
import RecordReturned from "./Retured.jsx";
import RecordSealed from "./Sealed.jsx";

export default function RecordList({ valuationRequest }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" sx={{ fontWeight: "600" }}>
        Records
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <ReceiptRecord valuationRequest={valuationRequest} />
        <ResultRecord />
        <RecordSealed />
        <RecordReturned />
      </Box>
    </Box>
  );
}
