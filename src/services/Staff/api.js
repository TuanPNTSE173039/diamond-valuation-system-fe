import { axiosInstance } from "../config.js";

export const getStaffs = async () => {
  const response = await axiosInstance.get("staffs");
  return response.data;
};
