import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./config/axiosInstance.js";

export const useBlog = (id) => {
  return useQuery({
    queryKey: ["request", { blogId: id }],
    queryFn: async () => {
      const response = await axiosInstance.get(`valuation-requests/${id}`);
      return response.data;
    },
    enabled: id !== undefined && id !== null,
  });
};

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await axiosInstance.get("blogs");
      return response.data;
    },
  });
};
