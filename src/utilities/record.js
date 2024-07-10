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

export const getDiamondRows = (request) => {
  let result = [
    [
      { text: "No.", style: "tableHeader" },
      { text: "Certificate", style: "tableHeader" },
      { text: "Carat", style: "tableHeader" },
      { text: "Color", style: "tableHeader" },
      { text: "Clarity", style: "tableHeader" },
      { text: "Cut", style: "tableHeader" },
      { text: "Origin", style: "tableHeader" },
      { text: "Note", style: "tableHeader" },
    ],
  ];
  for (let i = 0; i < request.valuationRequestDetails.length; i++) {
    const detail = request.valuationRequestDetails[i].diamondValuationNote;
    const item = [
      i,
      detail?.certificateId || "-",
      detail?.caratWeight || "-",
      detail?.color || "-",
      detail?.clarity || "-",
      detail?.cut || "-",
      detail?.diamondOrigin || "-",
      request.valuationRequestDetails[i].diamond ? "-" : "Fake diamond",
    ];
    result.push(item);
  }
  return result;
};
