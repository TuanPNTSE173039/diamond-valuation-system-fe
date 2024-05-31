import AssignmentIcon from "@mui/icons-material/Assignment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DiamondIcon from "@mui/icons-material/Diamond";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import * as React from "react";

const fakeListItem = [
  {
    id: 1,
    name: "Dashboard",
    icon: <DashboardIcon />,
    link: "/",
    roles: [1],
  },
  {
    id: 2,
    name: "Valuation Requests",
    icon: <AssignmentIcon />,
    link: "/requests",
    roles: [1, 2],
  },
  {
    id: 3,
    name: "Diamond Valuations",
    icon: <DiamondIcon />,
    link: "/valuations",
    roles: [1, 2, 3],
  },
  {
    id: 4,
    name: "Prices",
    link: "/prices",
    icon: <AttachMoneyIcon />,
    roles: [1],
  },
  {
    id: 5,
    name: "Staffs Mgt",
    icon: <PeopleAltIcon />,
    link: "/staffs",
    roles: [1],
  },
  {
    id: 6,
    name: "Customers Mgt",
    icon: <PersonIcon />,
    link: "/Customer",
    roles: [1],
  },
];

const role = [
  {
    id: 1,
    name: "MANAGER",
  },
  {
    id: 2,
    name: "CONSULTANT",
  },
  {
    id: 3,
    name: "VALUATION",
  },
  {
    id: 4,
    name: "ADMIN",
  },
];

export const checkRole = (roleId) => {
  return fakeListItem.filter((item) => item.roles.includes(roleId));
};
