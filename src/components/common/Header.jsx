import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Header({ title }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Typography
          variant="h3"
          component="p"
          sx={{ fontSize: 24, fontWeight: 700, my: 1 }}
        >
          {title}
        </Typography>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          // sx={{
          //   fontSize: 18,
          //   fontWeight: 600,
          //   textTransform: "none",
          //   border: 1,
          //   px: 3,
          // }}
          variant="contained"
          endIcon={<ExpandMoreIcon />}
        >
          Action
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Action 1</MenuItem>
          <MenuItem onClick={handleClose}>Action 2</MenuItem>
          <MenuItem onClick={handleClose}>Action 3</MenuItem>
        </Menu>
      </Box>
    </>
  );
}
