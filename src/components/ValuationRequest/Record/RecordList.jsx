import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RecordItem from "./RecordItem.jsx";

export default function RecordList() {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" sx={{ fontWeight: "600" }}>
        Records
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <RecordItem title="Receipt" creationDate="10/10/2023" />
        <RecordItem title="Returned" creationDate="10/10/2023" />
        <RecordItem title="Invoice" creationDate="10/10/2023" />
      </Box>
    </Box>
  );
}
