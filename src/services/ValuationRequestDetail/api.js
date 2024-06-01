import { http } from "../config.js";

export const getValuationRequestDetails = async () => {
  const response = await http.get(`valuation-request-details`);
  return response.data;
};

export const getValuationRequestDetail = async (id) => {
  const response = await http.get(`valuation-request-details/${id}`);
  return response.data;
};

export const checkDiamond = (id, body) =>
  http.put(`valuation-request-details/${id}`, body);

export const updateAssessStatus = (id, body) =>
  http.put(`valuation-request-details/${id}`, body);
