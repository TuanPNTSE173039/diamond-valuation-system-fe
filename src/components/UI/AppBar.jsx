import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import NotificationMenu from "../Notification/Menu.jsx";
import Logo from "./../../assets/images/logo.png";
import UIAccountMenu from "./AccountMenu.jsx";
import UISearch from "./Search.jsx";

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const UIAppBar = ({ handleDrawerOpen, open }) => {
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            height: 45,
            width: 45,
            bgcolor: "white",
            borderRadius: "50%",
            position: "relative",
          }}
        >
          <img
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
        <Box sx={{ flexGrow: 1 }} />
        {/* Use redux to search here*/}
        <UISearch />

        <Box sx={{ flexGrow: 1 }} />
        {/* Missing userAccount, Notification*/}
        <NotificationMenu />
        <UIAccountMenu />
      </Toolbar>
    </AppBar>
  );
};

export default UIAppBar;
