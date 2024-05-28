import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ValuationNoteItem({ title, children, ...props }) {
  return (
    <Box {...props}>
      <Typography variant="h6" sx={{ fontWeight: "600", color: "#333" }}>
        {title}
      </Typography>
      <Box boxShadow={4} sx={{ p: 1 }}>
        {children}
      </Box>
    </Box>
  );
}
