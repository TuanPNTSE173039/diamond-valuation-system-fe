import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./config/axiosInstance.js";

export const useValuations = () => {
  return useQuery({
    queryKey: ["valuations"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        "diamond-valuation-assigns?sortBy=id&sortDir=desc",
      );
      return data;
    },
  });
};

export const useValuation = (id) => {
  return useQuery({
    queryKey: ["valuation", {valuationId: id}],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`diamond-valuation-assigns/${id}`);
      return data;
    },
    enabled: id !== null && id !== undefined
  });
}