import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./config/axiosInstance.js";

export const useDetail = (id) => {
  return useQuery({
    queryKey: ["detail", { detailId: id }],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `valuation-request-details/${id}`,
      );
      return response.data;
    },
    enabled: id !== undefined && id !== null,
  });
};
