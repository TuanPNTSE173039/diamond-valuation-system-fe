import { http } from "../config.js";

export const updateDiamondNote = (id, body) =>
  http.put(`diamond-valuation-notes/${id}`, body);

export const assignValuationStaff = (body) =>
  http.post("diamond-valuation-assigns", body);

export const getAllDiamondValuation = async () => {
  const { data } = await http.get(
    "diamond-valuation-assigns?sortBy=id&sortDir=desc",
  );
  return data;
};

export const getDiamondValuationById = async (id) => {
  const { data } = await http.get(`diamond-valuation-assigns/${id}`);
  return data;
};

export const updateDiamondValuation = (id, body) =>
  http.put(`diamond-valuation-assigns/${id}`, body);
