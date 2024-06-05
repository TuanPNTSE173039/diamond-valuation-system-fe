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
    disablePadding: false,
    label: "Staff",
  },
  {
    id: "returnDate",
    numeric: false,
    disablePadding: true,
    label: "Deadline",
  },
  {
    id: "service",
    numeric: true,
    disablePadding: false,
    label: "Service",
  },
  {
    id: "certificateId",
    numeric: false,
    disablePadding: true,
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
    disablePadding: true,
    label: "Carat",
  },
  {
    id: "valuationPrice",
    numeric: false,
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
