import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./config/axiosInstance.js";

export const useStaffs = () => {
  return useQuery({
    queryKey: ["staffs"],
    queryFn: async () => {
      const response = await axiosInstance.get("staffs");
      return response.data;
    },
  });
};

export const useStaff = (id) => {
  return useQuery({
    queryKey: ["staff", { staffId: id }],
    queryFn: async () => {
      const response = await axiosInstance.get(`staffs/${id}`);
      return response.data;
    },
    enabled: id !== null && id !== undefined,
  });
};
