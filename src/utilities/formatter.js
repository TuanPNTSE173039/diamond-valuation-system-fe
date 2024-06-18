import { format } from "date-fns";

export function formatDateTime(date) {
  return format(new Date(date), "yyyy/MM/dd - HH:mm:ss");
}

export const formattedMoney = (money) => {
  if (money === "N/A" || money === 0) {
    return "N/A";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(money);
};

export const formattedDiamondSize = (size) => {
  if (size === "N/A" || size === undefined || size === null) {
    return "N/A";
  }

  return `${size} mm`;
};

export const formattedCaratWeight = (weight) => {
  if (!weight) {
    return "N/A";
  }
  return `${weight} .ct`;
};
