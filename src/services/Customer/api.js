import { axiosInstance } from "../config.js";

export const getCustomers = async () => {
  const response = await axiosInstance.get("customers");
  return response.data;
};

export const getCustomer = async (customerID) => {
  const response = await axiosInstance.get(`customers/${customerID}`);
  return response.data;
};
