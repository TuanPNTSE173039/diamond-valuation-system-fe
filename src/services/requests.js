import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Role from "../utilities/Role.js";
import { axiosInstance } from "./config/axiosInstance.js";

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
  startDate = undefined,
  endDate = undefined,
  search = undefined,
  status = undefined,
) => {
  let url;
  if (userRole === Role.CONSULTANT) {
    url = `staffs/${userId}/valuation-requests?pageNo=${pageNo}&pageSize=${pageSize}&sortDir=desc`;
  } else {
    url = `valuation-requests/response?pageNo=${pageNo}&pageSize=${pageSize}&sortDir=desc`;
  }
  if (status) {
    url += `&status=${status}`;
  }
  if (startDate && endDate) {
    url += `&startDate=${startDate}&endDate=${endDate}`;
  }
  if (search) {
    url += `&search=${search}`;
  }
  return useQuery({
    queryKey: [
      "briefRequests",
      {
        pageNo,
        pageSize,
        userRole,
        userId,
        status,
        startDate,
        endDate,
        search,
      },
    ],
    queryFn: async () => {
      const response = await axiosInstance.get(url);
      return response.data;
    },
  });
};

export const useRequest = (id) => {
  const navigate = useNavigate();
  return useQuery({
    queryKey: ["request", { requestId: id }],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`valuation-requests/${id}`);
        return response.data;
      } catch (error) {
        navigate("/not-found");
      }
    },
    enabled: id !== undefined && id !== null,
  });
};
