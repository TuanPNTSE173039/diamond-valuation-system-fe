import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import ReactQuill from "react-quill";

const UIReactQuill = ({ title, ...props }) => {
  return (
    <Box sx={{ position: "relative" }} {...props}>
      <Typography
        sx={{
          fontSize: 18,
          position: "absolute",
          top: 9,
          right: 42,
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>
      <ReactQuill theme="snow" style={{ height: 170, display: "block" }} />
    </Box>
  );
};

export default UIReactQuill;
