import { CardMedia } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Logo from "./../assets/images/logo.png";
import NotFoundImage from "./../assets/images/notfoundimage.png";

const NotFound = () => {
  return (
    <Stack
      direction={"row"}
      width={600}
      margin={"0 auto"}
      mt={20}
      justifyContent={"space-between"}
      alignContent={"center"}
    >
      <Box>
        <Box
          sx={{
            height: 45,
            width: 45,
            bgcolor: "white",
            borderRadius: "50%",
            position: "relative",
          }}
        >
          <CardMedia
            component={"img"}
            src={Logo}
            alt="logo"
            style={{
              display: "block",
              width: "auto",
              height: "60%",
              objectFit: "contain",
              position: "absolute",
              top: "53%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </Box>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ ml: 2, fontWeight: 800 }}
        >
          H&T Diamond
        </Typography>
      </Box>
      <CardMedia
        src={NotFoundImage}
        component={"img"}
        sx={{ width: "300px", height: "auto" }}
      />
    </Stack>
  );
};

export default NotFound;
