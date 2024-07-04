import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./config/axiosInstance.js";

export const useBlog = (id) => {
  return useQuery({
    queryKey: ["blog", { blogId: id }],
    queryFn: async () => {
      const response = await axiosInstance.get(`posts/${id}`);
      return response.data;
    },
    enabled: id !== undefined && id !== null,
  });
};

export const useBlogs = ( pageNo, pageSize, status,) => {
  let url = `posts?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=lastModifiedDate&sortDir=desc`;
    if (status !== undefined && status !== null) {
        url += `&status=${status}`;
    }
  return useQuery({
    queryKey: ["blogs",{ pageNo, pageSize, status }],
    queryFn: async () => {
      const response = await axiosInstance.get(url);
      if (response.data && Array.isArray(response.data.content)) {
        return response.data.content;
      }
      return [];
    },
  });
};
