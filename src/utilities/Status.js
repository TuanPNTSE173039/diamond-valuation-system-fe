export const diamondAttribute = {
  origin: [
    {
      label: "Natural",
      value: "NATURAL",
    },
    {
      label: "Lab grown",
      value: "LAB_GROWN",
    },
    null,
  ],
  color: [
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ].map((color) => ({
    label: color,
    value: color,
  })),
  clarity: [
    "VS2",
    "VS1",
    "FL",
    "VVS1",
    "VVS2",
    "I1",
    "I2",
    "SI1",
    "I3",
    "IF",
    "SI2",
  ].map((clarity) => ({
    label: clarity,
    value: clarity,
  })),
  cut: ["FAIR", "GOOD", "EXCELLENT", "VERY_GOOD"].map((cut) => ({
    label: cut,
    value: cut,
  })),
  shape: [
    "PRINCESS",
    "HEART",
    "CUSHION",
    "EMERALD",
    "MARQUISE",
    "PEAR",
    "ROUND",
    "OVAL",
    "RADIANT",
    "ASSCHER",
  ].map((shape) => ({
    label: shape,
    value: shape,
  })),
  symmetry: ["FAIR", "GOOD", "EXCELLENT", "VERY_GOOD"].map((symmetry) => ({
    label: symmetry,
    value: symmetry,
  })),
  polish: ["FAIR", "GOOD", "EXCELLENT", "VERY_GOOD"].map((polish) => ({
    label: polish,
    value: polish,
  })),
  fluorescence: ["MEDIUM", "NONE", "VERY_STRONG", "FAINT", "STRONG"].map(
    (fluorescence) => ({
      label: fluorescence,
      value: fluorescence,
    }),
  ),
};
export const valuationRequestStatus = [
  {
    id: 0,
    name: "ALL",
  },
  {
    id: 1,
    name: "PENDING",
  },
  {
    id: 2,
    name: "PROCESSING",
  },
  {
    id: 3,
    name: "RECEIVED",
  },
  {
    id: 4,
    name: "COMPLETED",
  },
  {
    id: 5,
    name: "SEALED",
  },
  {
    id: 6,
    name: "CANCELLED",
  },
];
export const diamondValuationStatus = [
  {
    id: 0,
    name: "All",
  },
  {
    id: 1,
    name: "PENDING",
  },
  {
    id: 2,
    name: "ASSESSING",
  },
  {
    id: 3,
    name: "ASSESSED",
  },
  {
    id: 4,
    name: "VALUATING",
  },
  {
    id: 5,
    name: "VALUATED",
  },
  {
    id: 6,
    name: "APPROVED",
  },
];
