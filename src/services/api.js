import { axiosInstance } from "./config/axiosInstance.js";
import * as http from "node:http";

// ---CUSTOMERS---
export const getCustomers = async () => {
  const response = await axiosInstance.get("customers");
  return response.data;
};
export const getCustomer = async (customerID) => {
  const response = await axiosInstance.get(`customers/${customerID}`);
  return response.data;
};
export const banCustomer = async (customerID) => {
  const response = await axiosInstance.delete(`/customers/${customerID}`);
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

// ---SERVICES---
export const updateService = async (id, body) => axiosInstance.put(`services/${id}`, body);
export const postService = async (body) => axiosInstance.post("services", body);
export const deleteService = async (id) => axiosInstance.delete(`services/${id}`);

// ---SERVICE PRICE---
export const updateServicePrice = async (id, body) =>
  axiosInstance.put(`service-price-lists/${id}`, body);
export const postServicePrice = async (body) =>
  axiosInstance.post("service-price-lists", body);
export const deleteServicePrice = async (id) => axiosInstance.delete(`service-price-lists/${id}`);
// ---STAFF---
export const registerStaff = async (staffData) => {
  const response = await axiosInstance.post('auth/register-staff', staffData);
  return response.data;
};

export const deleteStaff = async (staffId) => {
  const response = await axiosInstance.delete(`/staffs/${staffId}`);
  return response.data;
};

export const updateStaff = async (staffId, staffData) => {
  const response = await axiosInstance.put(`/staffs/${staffId}`, staffData);
  return response.data;
};

export const updateStaffPassword = async (authID, body) => {
  const response = await axiosInstance.put(`auth/${authID}`, body);
  return response.data;
};
// ---SUPPLIERS---
export const updateSupplier = async (id, body) => axiosInstance.put(`suppliers/${id}`, body);
export const postSupplier = async (body) => axiosInstance.post("suppliers", body);
export const deleteSupplier = async (id) => axiosInstance.delete(`suppliers/${id}`);
export const crawlDiamondBaseOnSupplier = async (id) => axiosInstance.get(`diamond-market/crawl/supplier/${id}`);


// ---DIAMONDS---
export const deleteDiamond = async (id) => axiosInstance.delete(`diamond-market/${id}`);
export const createDiamond = async (body) => axiosInstance.post("diamond-market", body);

// ---BLOG---
export const postBlog = async (body) => axiosInstance.post("posts", body);
export const updateBlog = async (id, body) => axiosInstance.put(`posts/${id}`, body);
export const deleteBlog = async (id) => axiosInstance.delete(`posts/${id}`);


//---Forget Password---
export const forgotPassword = async (email) => axiosInstance.post("auth/forget-password", { email });