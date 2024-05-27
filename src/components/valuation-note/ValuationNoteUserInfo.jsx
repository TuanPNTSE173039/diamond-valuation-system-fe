import Box from "@mui/material/Box";

export default function ValuationNoteUserInfo({ icon, title, children }) {
  return (
    <Box
      sx={{
        my: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontSize: "14px",
      }}
    >
      <Box sx={{ mb: 0.5, width: "8%" }}>{icon}</Box>
      <Box sx={{ pl: 1 }}>{title}</Box>
      <Box sx={{ textAlign: "right", flexGrow: 1 }}>{children}</Box>
    </Box>
  );
}