import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "./config/axiosInstance.js";

export const useRecord = (requestId, recordType) => {
  return useQuery({
    queryKey: ["record", requestId, recordType],
    queryFn: async () => {
      const response = await axiosInstance.get(`records/by-request-id?requestId=${requestId}&type=${recordType}`);
      return response.data;
    },
  })
}

export const useRecords = (requestId) => {
  return useQuery({
    queryKey: ["records", {requestId: requestId}],
    queryFn: async () => {
      const response = await axiosInstance.get(`records/by-request-id/${requestId}`);
      return response.data;
    },
  })
}

export const createRecord = async (record) => {
  const response = await axiosInstance.post("records", record);
  return response.data;
}
