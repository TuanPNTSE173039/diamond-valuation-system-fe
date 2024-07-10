export const EDIT_MODE = 1;
export const ADD_MODE = 0;
export function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const ValuationHeadCells = [
  {
    id: "number",
    numeric: false,
    disablePadding: false,
    label: "Id",
  },
  {
    id: "valuationStaffName",
    numeric: false,
    disablePadding: true,
    label: "Staff Name",
  },
  {
    id: "deadline",
    numeric: false,
    disablePadding: false,
    label: "Deadline",
  },
  {
    id: "service",
    numeric: false,
    disablePadding: true,
    label: "Service",
  },
  {
    id: "certificateId",
    numeric: true,
    disablePadding: false,
    label: "Report Number",
  },
  {
    id: "diamondOrigin",
    numeric: false,
    disablePadding: true,
    label: "Origin",
  },
  {
    id: "caratWeight",
    numeric: true,
    disablePadding: false,
    label: "Carat",
  },
  {
    id: "valuationPrice",
    numeric: true,
    disablePadding: true,
    label: "Price",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];
export const RequestHeadCells = [
  {
    id: "number",
    numeric: false,
    disablePadding: false,
    label: "Number",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "customerFirstName",
    numeric: false,
    disablePadding: false,
    label: "First Name",
  },
  {
    id: "customerLastName",
    numeric: false,
    disablePadding: false,
    label: "Last Name",
  },
  {
    id: "creationDate",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "diamondAmount",
    numeric: true,
    disablePadding: false,
    label: "Diamond Amount",
  },
  {
    id: "service",
    numeric: false,
    disablePadding: false,
    label: "Service",
  },
];

export const DiamondHeadCells = [
  {
    id: "number",
    numeric: false,
    disablePadding: false,
    label: "No.",
  },
  {
    id: "diamondOrigin",
    numeric: false,
    disablePadding: false,
    label: "Origin",
  },
  {
    id: "caratWeight",
    numeric: false,
    disablePadding: false,
    label: "Carat",
  },
  {
    id: "clarity",
    numeric: false,
    disablePadding: false,
    label: "Clarity",
  },
  {
    id: "color",
    numeric: false,
    disablePadding: false,
    label: "Color",
  },
  {
    id: "cut",
    numeric: false,
    disablePadding: false,
    label: "Cut",
  },
  {
    id: "cutScore",
    numeric: false,
    disablePadding: false,
    label: "Score",
  },
  {
    id: "shape",
    numeric: false,
    disablePadding: false,
    label: "Shape",
  },
  {
    id: "polish",
    numeric: false,
    disablePadding: false,
    label: "Polish",
  },
  {
    id: "symmetry",
    numeric: false,
    disablePadding: false,
    label: "Symmetry",
  },
  {
    id: "fluorescence",
    numeric: false,
    disablePadding: false,
    label: "Fluorescence",
  },
  {
    id: "creationDate",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "supplier",
    numeric: false,
    disablePadding: false,
    label: "Supplier",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];
export const SupplierHeadCells = [
  {
    id: "number",
    numeric: false,
    disablePadding: false,
    label: "No.",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "logo",
    numeric: false,
    disablePadding: false,
    label: "Logo",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];
export const DetailHeadCells = [
  {
    id: "number",
    numeric: false,
    disablePadding: false,
    label: "Number",
  },

  {
    id: "returnedDate",
    numeric: false,
    disablePadding: false,
    label: "Returned Date",
  },
  {
    id: "service",
    numeric: false,
    disablePadding: true,
    label: "Service",
  },
  {
    id: "size",
    numeric: true,
    disablePadding: false,
    label: "Size",
  },

  {
    id: "servicePrice",
    numeric: true,
    disablePadding: true,
    label: "Service Price",
  },
  {
    id: "certificateId",
    numeric: false,
    disablePadding: false,
    label: "GIA",
  },
  {
    id: "diamondOrigin",
    numeric: false,
    disablePadding: true,
    label: "Origin",
  },
  {
    id: "caratWeight",
    numeric: false,
    disablePadding: false,
    label: "Carat",
  },
  {
    id: "valuationPrice",
    numeric: true,
    disablePadding: true,
    label: "Valuation Price",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];

export const StaffHeadCells = [
  {
    id: "number",
    numeric: false,
    disablePadding: false,
    label: "ID",
  },
  {
    id: "staffName",
    numeric: false,
    disablePadding: false,
    label: "Staff Name",
  },
  {
    id: "staffPhone",
    numeric: false,
    disablePadding: false,
    label: "Phone",
  },
  {
    id: "yearExperience",
    numeric: true,
    disablePadding: false,
    label: "Experience",
  },
  {
    id: "totalProjects",
    numeric: true,
    disablePadding: false,
    label: "Total Valuations",
  },
  {
    id: "currentProjects",
    numeric: true,
    disablePadding: false,
    label: "Current Valuations",
  },
];

export const CustomerHeadCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "ID",
  },
  {
    id: "customerName",
    numeric: false,
    disablePadding: false,
    label: "Customer Name",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "Phone",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "identityDocument",
    numeric: false,
    disablePadding: false,
    label: "Identity Document",
  },
];
