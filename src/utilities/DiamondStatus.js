let colorArr = [];
for (let i = "D".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
  colorArr.push(String.fromCharCode(i));
}
export const DiamondStatus = {
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
  color: colorArr.map((color) => ({
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
