import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./config/axiosInstance.js";

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await axiosInstance.get("customers");
      return response.data;
    },
  });
};

export const useCustomer = (id) => {
  return useQuery({
    queryKey: ["customer", { customerId: id }],
    queryFn: async () => {
      const response = await axiosInstance.get(`customers/${id}`);
      return response.data;
    },
    enabled: id !== undefined && id !== null,
  });
};

export const useValuationRequests = (customerId, pageSize = 5, page = 0) => {
  return useQuery({
    queryKey: ["valuationRequests", { customerId, pageSize, page }],
    queryFn: async () => {
      const response = await axiosInstance.get(`valuation-requests/customer/${customerId}`, {
        params: { pageSize, page }
      });
      return response.data;
    },
    enabled: customerId !== undefined && customerId !== null,
  });
};

