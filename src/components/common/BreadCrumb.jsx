import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function CustomBreadCrumb({ level }) {
  const breadcrumbs = [
    <Link key="0" to={".."} relative="path">
      Requests
    </Link>,

    <Typography key="1" color="text.primary">
      {level}
    </Typography>,
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
