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