function createValuationRequestDetail(
  id,
  returnedDate,
  service,
  size,
  servicePrice,
  GIACertificate,
  diamondOrigin,
  caratWeight,
  valuationPrice,
  status,
) {
  return {
    id,
    returnedDate,
    service,
    size,
    servicePrice,
    GIACertificate,
    diamondOrigin,
    caratWeight,
    valuationPrice,
    status,
  };
}

export const rows = [
  createValuationRequestDetail(
    1,
    "2021-10-01",
    "Fast - 3h",
    "1.5",
    100,
    "N/A",
    "N/A",
    "N/A",
    "N/A",
    "Pending",
  ),
  createValuationRequestDetail(
    2,
    "2021-10-01",
    "Normal - 7d",
    "1.5",
    100,
    "1234567891011",
    "N/A",
    "N/A",
    "N/A",
    "Approved",
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
    id: "GIACertificate",
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
