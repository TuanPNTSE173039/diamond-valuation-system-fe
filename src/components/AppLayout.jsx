import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UIAppBar from "./UI/AppBar.jsx";
import UIDrawer, { DrawerHeader } from "./UI/Drawer.jsx";

export default function AppLayout() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <UIAppBar handleDrawerOpen={handleDrawerOpen} open={open} />

      <UIDrawer
        theme={theme}
        handleDrawerClose={handleDrawerClose}
        open={open}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container>
          <DrawerHeader />
          <ToastContainer />
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
