import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "./config/axiosInstance.js";

export const useStaffs = (role) => {
  let url = "staffs";
  if (role) {
    url += `?role=${role}`;
  }
  return useQuery({
    queryKey: ["staffs", { role: role }],
    queryFn: async () => {
      const response = await axiosInstance.get(url);
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
