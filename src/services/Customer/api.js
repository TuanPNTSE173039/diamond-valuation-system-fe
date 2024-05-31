import { http } from "../config.js";

export const getCustomers = async () => {
  const response = await http.get("customers");
  return response.data;
};

export const getCustomer = async (customerID) => {
  const response = await http.get(`customers/${customerID}`);
  return response.data;
};
