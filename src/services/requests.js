import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./config/axiosInstance.js";

export const useRequests = () => {
  return useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "valuation-requests?sortBy=id&sortDir=desc",
      );
      return response.data;
    },
  });
};

export const useRequest = (id) => {
  return useQuery({
    queryKey: ["request", { requestId: id }],
    queryFn: async () => {
      const response = await axiosInstance.get(`valuation-requests/${id}`);
      return response.data;
    },
    enabled: id !== undefined && id !== null,
  });
};
