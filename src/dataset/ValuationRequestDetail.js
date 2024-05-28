function createValuationRequestDetail(
  id,
  creationDate,
  size,
  service,
  servicePrice,
  GIACertificate,
  diamondOrigin,
  caratWeight,
  valuationPrice,
  status,
) {
  return {
    id,
    creationDate,
    size,
    service,
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
    "1.5",
    "Fast - 3h",
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
    "1.5",
    "Normal - 7d",
    100,
    "123456789",
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
    disablePadding: true,
    label: "Id",
  },

  {
    id: "creationDate",
    numeric: false,
    disablePadding: true,
    label: "Date",
  },
  {
    id: "size",
    numeric: true,
    disablePadding: false,
    label: "Size",
  },
  {
    id: "service",
    numeric: false,
    disablePadding: false,
    label: "Service",
  },
  {
    id: "servicePrice",
    numeric: true,
    disablePadding: false,
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
    id: "valuationPrice",
    numeric: true,
    disablePadding: false,
    label: "Valuation Price",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];
