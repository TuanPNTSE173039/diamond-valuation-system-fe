import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RecordReceipt from "./Receipt.jsx";
import RecordResult from "./Result.jsx";
import RecordReturned from "./Retured.jsx";
import RecordSealed from "./Sealed.jsx";

export default function RecordList({ valuationRequest }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" sx={{ fontWeight: "600" }}>
        Records
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <RecordReceipt valuationRequest={valuationRequest} />
        <RecordResult />
        <RecordSealed />
        <RecordReturned />
      </Box>
    </Box>
  );
}
