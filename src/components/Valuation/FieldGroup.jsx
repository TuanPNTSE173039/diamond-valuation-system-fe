import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function DiamondValuationFieldGroup({
  title,
  children,
  ...props
}) {
  return (
    <Box {...props}>
      <Typography variant="h6" sx={{ fontWeight: "600", color: "#333", pb: 1 }}>
        {title}
      </Typography>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
        {children}
      </Paper>
    </Box>
  );
}
