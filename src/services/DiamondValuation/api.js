import { http } from "../config.js";

export const updateDiamondNote = (id, body) =>
  http.put(`diamond-valuation-notes/${id}`, body);

export const assignValuationStaff = (body) =>
  http.post("diamond-valuation-assigns", body);
