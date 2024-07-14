import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./config/axiosInstance.js";

export const useOverral = () => {
  return useQuery({
    queryKey: ["dashboard-overral"],
    queryFn: async () => {
      const response = await axiosInstance.get("dashboard/overall");
      return response.data;
    },
  });
};

export const useRevenue = () => {
  return useQuery({
    queryKey: ["dashboard-revenue"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "dashboard/service-price-monthly-data",
      );
      return response.data;
    },
  });
};

export const useAppointments = () => {
  return useQuery({
    queryKey: ["dashboard-appointments"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "dashboard/appointment-monthly-data",
      );
      return response.data;
    },
  });
};

export const useTopFiveConsultants = () => {
  return useQuery({
    queryKey: ["dashboard-top-consultants"],
    queryFn: async () => {
      const response = await axiosInstance.get("dashboard/top-consultant");
      return response.data;
    },
  });
};

export const useTopFiveServices = () => {
  return useQuery({
    queryKey: ["dashboard-top-services"],
    queryFn: async () => {
      const response = await axiosInstance.get("dashboard/top-service");
      return response.data;
    },
  });
};

export const useTopFiveCustomers = () => {
  return useQuery({
    queryKey: ["dashboard-top-customers"],
    queryFn: async () => {
      const response = await axiosInstance.get("dashboard/top-customer");
      return response.data;
    },
  });
};

export const useTopFiveValuations = () => {
  return useQuery({
    queryKey: ["dashboard-top-valuations"],
    queryFn: async () => {
      const response = await axiosInstance.get("dashboard/top-valuation");
      return response.data;
    },
  });
};
