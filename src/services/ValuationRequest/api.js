import { http } from "../config.js";

export const getValuationRequests = async () => {
  const response = await http.get("valuation-requests");
  return response.data;
};

export const getValuationRequest = async (id) => {
  const response = await http.get(`valuation-requests/${id}`);
  return response.data;
};

export const assignConsultantStaff = (id, body) =>
  http.put(`valuation-requests/${id}`, body);
