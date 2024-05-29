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
    "N/A",
    "N/A",
    "Processing",
  ),
];

export const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "Id",
  },

  {
    id: "valuationStaffName",
    numeric: false,
    disablePadding: false,
    label: "Valuation Staff",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: true,
    label: "Date",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },

  {
    id: "comments",
    numeric: false,
    disablePadding: true,
    label: "Comments",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];
