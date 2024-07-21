import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "./config/axiosInstance.js";

export const useDetail = (id) => {
  const navigate = useNavigate();
  return useQuery({
    queryKey: ["detail", { detailId: id }],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `valuation-request-details/${id}`,
        );
        return response.data;
      } catch (e) {
        navigate("/not-found");
      }
    },
    enabled: id !== undefined && id !== null,
  });
};

export const useDetails = () => {
  return useQuery({
    queryKey: ["details"],
    queryFn: async () => {
      const response = await axiosInstance.get("valuation-request-details");
      return response.data;
    },
  });
};
