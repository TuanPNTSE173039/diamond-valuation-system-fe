import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "./config/axiosInstance.js";

export const useCustomers = (pageSize = 10, pageNo = 0) => {
  return useQuery({
    queryKey: ["customers", pageSize, pageNo],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `customers?pageSize=${pageSize}&pageNo=${pageNo}`,
      );
      return response.data;
    },
  });
};

export const useCustomer = (id) => {
  const navigate = useNavigate();
  return useQuery({
    queryKey: ["customer", { customerId: id }],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`customers/${id}`);
        return response.data;
      } catch (error) {
        navigate("/not-found");
      }
    },
    enabled: id !== undefined && id !== null,
  });
};

export const useValuationRequests = (customerId, pageSize = 5, page = 0) => {
  const navigate = useNavigate();
  return useQuery({
    queryKey: ["valuationRequests", { customerId, pageSize, page }],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `valuation-requests/customer/${customerId}`,
          {
            params: { pageSize, page },
          },
        );
        return response.data;
      } catch (error) {
        navigate("/not-found");
      }
    },
    enabled: customerId !== undefined && customerId !== null,
  });
};
