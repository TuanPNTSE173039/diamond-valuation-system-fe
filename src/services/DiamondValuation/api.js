import { axiosInstance } from "../config.js";

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
