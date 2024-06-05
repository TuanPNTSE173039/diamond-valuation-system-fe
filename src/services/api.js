import { axiosInstance } from "./config.js";

// ---CUSTOMERS---
export const getCustomers = async () => {
  const response = await axiosInstance.get("customers");
  return response.data;
};
export const getCustomer = async (customerID) => {
  const response = await axiosInstance.get(`customers/${customerID}`);
  return response.data;
};

// ---DIAMOND VALUATION---
export const updateDiamondNote = (id, body) =>
  axiosInstance.put(`diamond-valuation-notes/${id}`, body);
export const assignValuationStaff = (body) =>
  axiosInstance.post("diamond-valuation-assigns", body);
export const getAllDiamondValuation = async () => {
  const { data } = await axiosInstance.get(
    "diamond-valuation-assigns?sortBy=id&sortDir=desc",
  );
  return data;
};
export const getDiamondValuationById = async (id) => {
  const { data } = await axiosInstance.get(`diamond-valuation-assigns/${id}`);
  return data;
};
export const updateDiamondValuation = (id, body) =>
  axiosInstance.put(`diamond-valuation-assigns/${id}`, body);

//--- STAFF ---
export const getStaffs = async () => {
  const response = await axiosInstance.get("staffs");
  return response.data;
};

// ---VALUATION REQUEST---
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

// ---VALUATION REQUEST DETAIL---
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
