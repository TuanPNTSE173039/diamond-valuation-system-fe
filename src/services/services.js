import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "./config/axiosInstance.js";

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await axiosInstance.get("services");
      return response.data;
    },
  });
};

export const useService = (id) => {
  const navigate = useNavigate();
  return useQuery({
    queryKey: ["service", { serviceId: id }],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`services/${id}`);
        return response.data;
      } catch (error) {
        navigate("/not-found");
      }
    },
    enabled: id !== undefined && id !== null,
  });
};

export const useServiceList = (id) => {
  return useQuery({
    queryKey: ["service", { serviceId: id }],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `services/${id}/service-price-lists`,
      );
      return response.data;
    },
    enabled: id !== undefined && id !== null,
  });
};
