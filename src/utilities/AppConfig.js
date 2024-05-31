import { format } from "date-fns";

export const valuationRequestStatus = [
  {
    id: 0,
    name: "All",
  },
  {
    id: 1,
    name: "Pending",
  },
  {
    id: 2,
    name: "Processing",
  },
  {
    id: 3,
    name: "Received",
  },
  {
    id: 4,
    name: "Completed",
  },
  {
    id: 5,
    name: "Sealed",
  },
  {
    id: 6,
    name: "Cancelled",
  },
];

export const diamondValuationStatus = [
  {
    id: 0,
    name: "All",
  },
  {
    id: 1,
    name: "Pending",
  },
  {
    id: 2,
    name: "Assessing",
  },
  {
    id: 3,
    name: "Assessed",
  },
  {
    id: 4,
    name: "Valuating",
  },
  {
    id: 5,
    name: "Valuated",
  },
  {
    id: 6,
    name: "Approved",
  },
];

export function formatDateTime(date) {
  return format(new Date(date), "yyyy/MM/dd - HH:mm:ss");
}
export const formattedMoney = (money) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(money);
