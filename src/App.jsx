import * as React from "react";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DiamondIcon from "@mui/icons-material/Diamond";
import { alpha, InputBase, Tab, Tabs } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CustomTabPanel from "./components/CustomeTabPanel.jsx";
import EnhancedTable from "./components/table/EnhancedTable.jsx";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: "#333",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// ----SEARCH
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

// ----CustomTabPanel
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function App() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("");
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (text) => {
    setSelectedItem(text);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

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
          <Typography variant="h6" noWrap component="div">
            {selectedItem || "Dashboard"}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <>
                <Typography variant="h6" noWrap component="div" sx={{ mr: 7 }}>
                  Diamond
                </Typography>
                <ChevronLeftIcon />
              </>
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Dashboard", "Valuation Requests", "Diamond"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  color: text === selectedItem ? "blue" : "primary",
                }}
                onClick={() => handleListItemClick(text)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: text === selectedItem ? "blue" : "primary",
                  }}
                >
                  {index === 0 && <DashboardIcon />}
                  {index === 1 && <AssignmentIcon />}
                  {index === 2 && <DiamondIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            Item One
            <EnhancedTable />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
              ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
              elementum integer enim neque volutpat ac tincidunt. Ornare
              suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
              volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
              Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
              ornare massa eget egestas purus viverra accumsan in. In hendrerit
              gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
              aliquam sem et tortor. Habitant morbi tristique senectus et.
              Adipiscing elit duis tristique sollicitudin nibh sit. Ornare
              aenean euismod elementum nisi quis eleifend. Commodo viverra
              maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
              aliquam ultrices sagittis orci a.
            </Typography>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
              ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
              elementum integer enim neque volutpat ac tincidunt. Ornare
              suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
              volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
              Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
              ornare massa eget egestas purus viverra accumsan in. In hendrerit
              gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
              aliquam sem et tortor. Habitant morbi tristique senectus et.
              Adipiscing elit duis tristique sollicitudin nibh sit. Ornare
              aenean euismod elementum nisi quis eleifend. Commodo viverra
              maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
              aliquam ultrices sagittis orci a. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Accusamus beatae blanditiis delectus
              ea, earum eligendi enim error eum fuga ipsum iste labore magnam
              maiores officia officiis quasi, quod suscipit. Blanditiis
              consectetur ducimus ea eaque earum expedita facere labore
              laboriosam laborum mollitia non obcaecati odio perspiciatis quam
              qui quibusdam quod recusandae sapiente soluta unde ut, veritatis
              voluptates. Eaque earum nobis similique ullam? Consectetur et iure
              labore nam sapiente? Amet assumenda aut autem commodi cum delectus
              deserunt earum est exercitationem fugiat laboriosam libero nostrum
              pariatur perferendis, quae quaerat quo sequi sint suscipit tempore
              ut vero voluptas voluptates? Adipisci alias asperiores delectus
              dolores doloribus ipsum maiores, natus nobis pariatur praesentium
              quod ratione repellat! Ipsam provident qui repellat saepe!
              Cupiditate ducimus error ex facere fugit ipsum nulla quaerat rerum
              sint vero? Aut, consectetur cum cumque dignissimos distinctio
              exercitationem, fuga harum laboriosam possimus, quibusdam quos rem
              repellendus ullam! A, adipisci deleniti dicta doloribus ea ipsam
              itaque labore magnam molestias nemo nulla obcaecati officiis
              perferendis quae rem repellat soluta sunt unde voluptatem
              voluptatibus! A ad aliquam facilis hic ut. Ab at blanditiis
              consequatur fugit optio quis saepe. Ab accusantium architecto
              asperiores aut blanditiis corporis distinctio ea eos expedita
              facilis impedit ipsam, labore nemo nobis odit perferendis quo
              saepe, sapiente sed tempora? Ab ad aliquam aspernatur autem
              consequatur consequuntur dicta exercitationem magnam maxime minima
              mollitia nihil nisi odio omnis sapiente totam ullam ut velit,
              veniam vitae. Aperiam dolorum est hic in itaque iusto odit
              repudiandae tempora tempore veniam. A ab accusantium amet aperiam
              autem blanditiis delectus doloribus esse eveniet illum incidunt
              iure laborum molestiae necessitatibus neque nesciunt quae
              similique sit totam veniam veritatis voluptatem, voluptatibus.
              Aspernatur assumenda beatae ducimus eaque esse fuga maxime
              nostrum, quibusdam tenetur vitae! Commodi consectetur cumque
              cupiditate ducimus laboriosam officia pariatur placeat quibusdam.
              A asperiores dolorem iusto laboriosam nostrum odit pariatur, ut
              voluptatem. Aliquam aliquid consectetur cum, cumque dicta
              laudantium provident repudiandae. Dignissimos doloribus eius iure
              mollitia necessitatibus nesciunt qui quo, sint? Ab aliquam
              assumenda aut commodi debitis dicta et expedita, in iusto magni
              modi molestiae odit repellendus sequi sunt ut vitae. Autem
              consequuntur dolore eveniet libero? A asperiores at aut culpa
              deleniti dolorum, eos esse facere fugiat harum, in ipsa nobis
              officia officiis porro provident quod repudiandae similique sint
              sit vero voluptates voluptatum! Laboriosam minus reiciendis rerum
              veniam. Accusamus dolore est explicabo fugit ipsum magnam minus
              necessitatibus nemo nisi quisquam. Aperiam architecto autem cumque
              delectus dolore dolorem esse ex incidunt ipsa maxime mollitia,
              nisi nulla quisquam totam veniam veritatis vero voluptatem!
              Exercitationem id ipsum nemo odio quas quibusdam quidem sapiente
              sint soluta vero? Animi aspernatur autem deserunt, distinctio
              dolore doloribus ea, eveniet exercitationem fugit hic id labore
              maiores minus nam necessitatibus nihil porro saepe similique,
              totam vel. At earum eius eum exercitationem laudantium molestias
              mollitia nam odit, qui rerum. Aperiam consequuntur explicabo
              laudantium molestiae qui tempore, temporibus unde. Accusamus
              consequatur deserunt hic incidunt mollitia neque, optio.
              Asperiores consequatur ea eaque et fugiat inventore nam officia
              reprehenderit tempora unde. Amet consectetur earum fugiat in
              necessitatibus perspiciatis, qui quibusdam repellendus rerum
              totam. Incidunt, quos!
            </Typography>
          </CustomTabPanel>
        </Box>
      </Box>
    </Box>
  );
}
