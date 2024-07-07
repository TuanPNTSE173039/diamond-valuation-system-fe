import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./config/axiosInstance.js";
import Role from "../utilities/Role.js";

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

export const useStaffValuation = (id, role) => {
  let url = "";
  if (role === Role.VALUATION) {
    url = `staffs/${id}/diamond-assigns?pageNo=0&pageSize=10&sortDir=desc`;
  } else if (role === Role.CONSULTANT) {
    url = `staffs/${id}/valuation-requests?pageNo=0&pageSize=10&sortDir=desc`;
  }

  return useQuery({
    queryKey: ["staffValuation", { staffId: id, role: role }],
    queryFn: async () => {
      const response = await axiosInstance.get(url);
      return response.data;
    },
    enabled: id !== null && id !== undefined && role !== "",
  });
};

export const useStaffList = (pageSize = 10, pageNo = 0 ) => {
  return useQuery({
    queryKey: ["staffList", { pageSize, pageNo }],
    queryFn: async () => {
      const response = await axiosInstance.get(`staffs?pageSize=${pageSize}&pageNo=${pageNo}`);
      return response.data;
    },
    keepPreviousData: true,
  });
};