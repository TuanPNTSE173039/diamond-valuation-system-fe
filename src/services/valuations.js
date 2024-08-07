import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Role from "../utilities/Role.js";
import { axiosInstance } from "./config/axiosInstance.js";

export const useValuations = (
  pageNo,
  pageSize,
  userRole,
  userId,
  status = null,
) => {
  let url;
  if (userRole === Role.VALUATION) {
    url = `staffs/${userId}/diamond-assigns?pageNo=${pageNo}&pageSize=${pageSize}&sortDir=desc`;
  } else {
    url = `diamond-valuation-assigns?pageNo=${pageNo}&pageSize=${pageSize}&sortDir=desc`;
  }
  if (status !== null) {
    url += `&status=${status}`;
  }
  return useQuery({
    queryKey: ["valuations", { pageNo, pageSize, userRole, userId, status }],
    queryFn: async () => {
      const { data } = await axiosInstance.get(url);
      return data;
    },
  });
};

export const useValuation = (id) => {
  const navigate = useNavigate();
  return useQuery({
    queryKey: ["valuation", { valuationId: id }],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get(
          `diamond-valuation-assigns/${id}`,
        );
        return data;
      } catch (error) {
        navigate("/not-found");
      }
    },
    enabled: id !== null && id !== undefined,
  });
};
