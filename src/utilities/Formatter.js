import { format } from "date-fns";

export function formatDateTime(date) {
  return format(new Date(date), "yyyy/MM/dd - HH:mm:ss");
}

export const formattedMoney = (money) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(money);