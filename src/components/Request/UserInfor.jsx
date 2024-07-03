import Box from "@mui/material/Box";

export default function ValuationRequestUserInfor({ icon, title, children }) {
  return (
    <Box
      sx={{
        my: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Box sx={{ mb: 0.5, width: "8%" }}>{icon}</Box>
      <Box sx={{ width: "17%" }}>{title}</Box>
      <Box
        sx={{
          width: "75%",
          pl: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
