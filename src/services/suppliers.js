import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "./config/axiosInstance.js";

export const useSuppliers = () => {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const response = await axiosInstance.get("suppliers");
      if (response.data && Array.isArray(response.data.content)) {
        return response.data.content;
      }
      return [];
    },
  });
};

export const useDiamondsOfSupplier = (pageNo, pageSize, id) => {
  const navigate = useNavigate();
  return useQuery({
    queryKey: ["diamonds", { pageNo, pageSize, id }],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `suppliers/${id}/diamond-market?pageNo=${pageNo}&pageSize=${pageSize}`,
        );
        return response.data;
      } catch (error) {
        navigate("/not-found");
      }
    },
    enabled: id !== undefined && id !== null,
  });
};
