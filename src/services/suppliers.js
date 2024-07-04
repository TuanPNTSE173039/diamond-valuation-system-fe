import { axiosInstance } from "./config/axiosInstance.js";
import { useQuery } from "@tanstack/react-query";

export const useSuppliers = () => {
    return useQuery({
        queryKey: ["suppliers"],
        queryFn: async () => {
            const response = await axiosInstance.get("suppliers");
            if (response.data && Array.isArray(response.data.content)) {
                return response.data.content;
            }
            return [];
        },
    });
};

export const useDiamondsOfSupplier = (pageNo, pageSize, id) => {
    return useQuery({
        queryKey: ["diamonds", { pageNo, pageSize, id }], // Thay đổi queryKey để bao gồm pageNo và pageSize
        queryFn: async () => {
            const response = await axiosInstance.get(`suppliers/${id}/diamond-market?pageNo=${pageNo}&pageSize=${pageSize}`);
            if (response.data) {
                return {
                    diamonds: response.data.content,
                    totalCount: response.data.totalElement
                };
            }
            return { diamonds: [], totalCount: 0 };
        },
        enabled: id !== undefined && id !== null,
    });
};




