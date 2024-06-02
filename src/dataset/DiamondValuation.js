function createDiamondValuation(
  id,
  valuationStaffName,
  date,
  price,
  comments,
  status,
) {
  return {
    id,
    valuationStaffName,
    date,
    price,
    comments,
    status,
  };
}

export const rows = [
  createDiamondValuation(
    1,
    "John Doe",
    "2021-09-01",
    1000,
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In nemo, perspiciatis? Asperiores commodi consequuntur iste? Est ipsum minus officiis voluptas!",
    "Pending",
  ),
  createDiamondValuation(
    2,
    "Jane Doe",
    "2021-09-02",
    "130",
    "N/A",
    "Processing",
  ),
  createDiamondValuation(
    3,
    "Tuan Pham",
    "2021-09-02",
    "1600",
    "N/A",
    "Processing",
  ),
];

export const headCells = [
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
