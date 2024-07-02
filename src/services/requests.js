import {useQuery} from "@tanstack/react-query";
import Role from "../utilities/Role.js";
import {axiosInstance} from "./config/axiosInstance.js";

export const useRequests = () => {
  return useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "valuation-requests?sortBy=id&sortDir=desc",
      );
      return response.data;
    },
  });
};

export const useBriefRequests = (
  pageNo,
  pageSize,
  userRole,
  userId,
  status,
) => {
  let url;
  if (userRole === Role.CONSULTANT) {
    url = `staffs/${userId}/valuation-requests??pageNo=${pageNo}&pageSize=${pageSize}&sortDir=desc`;
  } else {
    url = `valuation-requests/response?pageNo=${pageNo}&pageSize=${pageSize}&sortDir=desc`;
  }
  if (status) {
    url += `&status=${status}`;
  }
  return useQuery({
    queryKey: ["briefRequests", { pageNo, pageSize, userRole, userId, status }],
    queryFn: async () => {
      const response = await axiosInstance.get(url);
      return response.data;
    },
  });
};

export const useRequest = (id) => {
  return useQuery({
    queryKey: ["request", { requestId: id }],
    queryFn: async () => {
      const response = await axiosInstance.get(`valuation-requests/${id}`);
      return response.data;
    },
    enabled: id !== undefined && id !== null,
  });
};
