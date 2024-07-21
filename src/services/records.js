import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "./config/axiosInstance.js";

export const useRecord = (requestId, recordType) => {
  return useQuery({
    queryKey: ["record", requestId, recordType],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `records/by-request-id?requestId=${requestId}&type=${recordType}`,
      );
      return response.data;
    },
  });
};

export const useRecords = (requestId) => {
  const navigate = useNavigate();
  return useQuery({
    queryKey: ["records", { requestId: requestId }],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `records/by-request-id/${requestId}`,
        );
        return response.data;
      } catch (er) {
        navigate("/not-found");
      }
    },
  });
};

export const createRecord = async (record) => {
  const response = await axiosInstance.post("records", record);
  return response.data;
};

export const updateRecord = async (record) => {
  const response = await axiosInstance.put(`records/${record.id}`, record);
  return response.data;
};
