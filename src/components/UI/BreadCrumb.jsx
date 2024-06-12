import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
// import Link from "@mui/material/Link";
import { Link as RouterLink, useParams } from "react-router-dom";

function LinkRouter(props) {
  return <Link {...props} component={RouterLink} />;
}

export default function UIBreadCrumb({ pathNames }) {
  const { requestId, detailId, valuationId } = useParams();

  const breadcrumbNameMap = {
    "/requests": "Requests",
    [`/requests/${requestId}`]: requestId,
    [`/requests/${requestId}/${detailId}`]: detailId,
    "/valuations": "Valuations",
    [`/valuations/${valuationId}`]: valuationId,
  };

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {pathNames.map((value, index) => {
          const last = index === pathNames.length - 1;
          const to = `/${pathNames.slice(0, index + 1).join("/")}`;

          return last ? (
            <Typography color="text.primary" key={to}>
              {breadcrumbNameMap[to]}
            </Typography>
          ) : (
            <LinkRouter underline="hover" color="inherit" to={to} key={to}>
              {breadcrumbNameMap[to]}
            </LinkRouter>
          );
        })}
      </Breadcrumbs>
    </Stack>
  );
}
