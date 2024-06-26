import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import UIBasicHeader from "../UI/BasicHeader.jsx";
import UISearch from "../UI/Search.jsx";
import UITabPanel from "../UI/TabPanel.jsx";
import BlogCard from "./BlogCard.jsx";

const BlogList = () => {
  // Filter Menu
  const [anchorFilterEl, setAnchorFilterEl] = useState(null);
  const open = Boolean(anchorFilterEl);
  const handleClick = (event) => {
    setAnchorFilterEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorFilterEl(null);
  };

  // Tabs
  const [tabValue, setTabValue] = useState(0);
  const handleChangeTabValue = (event, newValue) => {
    setTabValue(newValue);
  };

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
        <Button variant="contained">New post</Button>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <UISearch />
        <Box>
          <Button
            id="filter"
            aria-controls={open ? "filter-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            variant="outlined"
          >
            Filter
          </Button>
          <Menu
            id="filter-menu"
            anchorEl={anchorFilterEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "filter-button",
            }}
            elevation={3}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Box>
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
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <BlogCard />
            </Grid>
            <Grid item xs={4}>
              <BlogCard />
            </Grid>
            <Grid item xs={4}>
              <BlogCard />
            </Grid>
            <Grid item xs={4}>
              <BlogCard />
            </Grid>
            <Grid item xs={4}>
              <BlogCard />
            </Grid>
          </Grid>
        </UITabPanel>
        <UITabPanel index={1} value={tabValue}>
          Published
        </UITabPanel>
        <UITabPanel index={2} value={tabValue}>
          Draft
        </UITabPanel>
      </Box>
    </>
  );
};

export default BlogList;
