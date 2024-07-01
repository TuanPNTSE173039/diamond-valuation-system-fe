import { formattedMoney } from "./formatter.js";

export const getDetailInformation = (details) => {
  const result = [
    [
      { text: "Number", style: "thead" },
      { text: "Size", style: ["thead", "number"] },
      { text: "Service Price", style: ["thead", "number"] },
      { text: "First Payment", style: ["thead", "number"] },
    ],
  ];
  for (const detail of details) {
    const detailItem = [
      { text: `${detail.id}`, bold: true },
      {
        text: [
          `${detail.size}`,
          {
            text: " mm",
            italics: true,
          },
        ],
        style: "number",
      },
      {
        text: `${formattedMoney(detail.servicePrice)}`,
        bold: true,
        style: "number",
      },
      {
        text: `${formattedMoney(detail.servicePrice * 0.4)}`,
        bold: true,
        style: "number",
      },
    ];
    result.push(detailItem);
  }
  return result;
};

export const gerServiceInformation = (details) => {
  const result = [
    [
      { text: "Number", style: "thead" },
      { text: "Size", style: ["thead", "number"] },
      { text: "Service Price", style: ["thead", "number"] },
      { text: "First Payment", style: ["thead", "number"] },
      { text: "Second Payment", style: ["thead", "number"] },
    ],
  ];
  for (const detail of details) {
    const detailItem = [
      { text: `${detail.id}`, bold: true },
      {
        text: [
          `${detail.size}`,
          {
            text: " mm",
            italics: true,
          },
        ],
        style: "number",
      },
      {
        text: `${formattedMoney(detail.servicePrice)}`,
        bold: true,
        style: "number",
      },
      {
        text: `${formattedMoney(detail.servicePrice * 0.4)}`,
        bold: true,
        style: "number",
      },
      {
        text: `${formattedMoney(detail.servicePrice * 0.6)}`,
        bold: true,
        style: "number",
      },
    ];
    result.push(detailItem);
  }
  return result;
};
