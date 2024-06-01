import { format } from "date-fns";

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

export function formatDateTime(date) {
  return format(new Date(date), "yyyy/MM/dd - HH:mm:ss");
}
export const formattedMoney = (money) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(money);
