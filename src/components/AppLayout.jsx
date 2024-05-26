import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
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
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
