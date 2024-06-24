import AssignmentIcon from "@mui/icons-material/Assignment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BookIcon from "@mui/icons-material/Book";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DiamondIcon from "@mui/icons-material/Diamond";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import * as React from "react";
import Role from "./Role.js";

const drawers = [
  {
    id: 1,
    name: "Dashboard",
    icon: <DashboardIcon />,
    link: "/",
    roles: [Role.ADMIN, Role.MANAGER],
  },
  {
    id: 2,
    name: "Valuation Requests",
    icon: <AssignmentIcon />,
    link: "/requests",
    roles: [Role.MANAGER, Role.CONSULTANT],
  },
  {
    id: 3,
    name: "Diamond Valuations",
    icon: <DiamondIcon />,
    link: "/valuations",
    roles: [Role.MANAGER, Role.VALUATION],
  },
  {
    id: 4,
    name: "Diamond Prices",
    link: "/prices",
    icon: <AttachMoneyIcon />,
    roles: [Role.MANAGER],
  },
  {
    id: 5,
    name: "Services Mgt",
    link: "/services",
    icon: <CurrencyYenIcon />,
    roles: [Role.MANAGER],
  },
  {
    id: 6,
    name: "Supplier Mgt",
    link: "/suppliers",
    icon: <CurrencyYenIcon />,
    roles: [Role.MANAGER],
  },
  {
    id: 7,
    name: "Staffs Mgt",
    icon: <PeopleAltIcon />,
    link: "/staffs",
    roles: [Role.ADMIN],
  },
  {
    id: 8,
    name: "Customers Mgt",
    icon: <PersonIcon />,
    link: "/customers",
    roles: [Role.ADMIN],
  },
  {
    id: 9,
    name: "Blog Mgt",
    icon: <BookIcon />,
    link: "/blogs",
    roles: [Role.ADMIN],
  },
];

export const checkRole = (role) => {
  return drawers.filter((item) => item.roles.includes(role));
};
