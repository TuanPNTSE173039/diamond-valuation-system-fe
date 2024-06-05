import { axiosInstance } from "../config.js";

export const getValuationRequestDetails = async () => {
  const response = await axiosInstance.get(`valuation-request-details`);
  return response.data;
};

export const getValuationRequestDetail = async (id) => {
  const response = await axiosInstance.get(`valuation-request-details/${id}`);
  return response.data;
};

export const checkDiamond = (id, body) =>
  axiosInstance.put(`valuation-request-details/${id}`, body);

export const updateDetail = (id, body) =>
  axiosInstance.put(`valuation-request-details/${id}`, body);
