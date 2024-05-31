import { http } from "../config.js";

export const getStaffs = async () => {
  const response = await http.get("staffs");
  return response.data;
};
