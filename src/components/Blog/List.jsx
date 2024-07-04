import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import UIBasicHeader from "../UI/BasicHeader.jsx";
import UISearch from "../UI/Search.jsx";
import UITabPanel from "../UI/TabPanel.jsx";
import BlogGrid from "./BlogGrid.jsx";
import {useNavigate} from "react-router-dom";

const BlogList = () => {
  const [anchorFilterEl, setAnchorFilterEl] = useState(null);
  const open = Boolean(anchorFilterEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorFilterEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorFilterEl(null);
  };

  const [tabValue, setTabValue] = useState(0);
  const handleChangeTabValue = (event, newValue) => {
    setTabValue(newValue);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleAddBlog = () => {
    navigate(`/blogs/new`);
  }

  return (
      <>
        <Box>BreadCrumb</Box>
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            marginBottom={2}
        >
          <UIBasicHeader title={"Blog List"} />
          <Button variant="contained" onClick={handleAddBlog}>New post</Button>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <UISearch />
        </Stack>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
            <Tabs
                value={tabValue}
                onChange={handleChangeTabValue}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
            >
              <Tab label={"All"} />
              <Tab label="Published" />
              <Tab label="Draft" />
            </Tabs>
          </Box>
          <UITabPanel index={0} value={tabValue}>
            <BlogGrid page={page} rowsPerPage={rowsPerPage} />
          </UITabPanel>
          <UITabPanel index={1} value={tabValue}>
            <BlogGrid page={page} rowsPerPage={rowsPerPage} status="PUBLISHED" />
          </UITabPanel>
          <UITabPanel index={2} value={tabValue}>
            <BlogGrid page={page} rowsPerPage={rowsPerPage} status="DRAFT" />
          </UITabPanel>
        </Box>
      </>
  );
};

export default BlogList;
