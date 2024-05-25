import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ValuationNoteItem({ children, ...props }) {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: "600" }}>
        Description
      </Typography>
      <Box boxShadow={1} sx={{ p: 1 }}>
        {children}
      </Box>
    </Box>
  );
}
