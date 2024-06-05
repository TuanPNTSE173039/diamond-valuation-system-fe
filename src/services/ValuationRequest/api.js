import { axiosInstance } from "../config.js";

export const getValuationRequests = async () => {
  const response = await axiosInstance.get(
    "valuation-requests?sortBy=id&sortDir=desc",
  );
  return response.data;
};

export const getValuationRequest = async (id) => {
  const response = await axiosInstance.get(`valuation-requests/${id}`);
  return response.data;
};

export const updateValuationRequest = (id, body) =>
  axiosInstance.put(`valuation-requests/${id}`, body);

export const postPayment = (body) => axiosInstance.post("payments", body);
