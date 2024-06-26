import Typography from "@mui/material/Typography";

const UIBasicHeader = ({ title }) => {
  return (
    <Typography
      variant="h3"
      component="p"
      sx={{ fontSize: 24, fontWeight: 700, my: 1 }}
    >
      {title}
    </Typography>
  );
};

export default UIBasicHeader;
