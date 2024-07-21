import {axiosInstance} from "./config/axiosInstance.js";
import {useQuery} from "@tanstack/react-query";

export const useDiamondMarket = (pageNo = 1, pageSize = 10) => {
    return useQuery({
        queryKey: ["diamondMarket", { pageNo, pageSize }],
        queryFn: async () => {
            const response = await axiosInstance.get('diamond-market?sortDir=DESC', {
                params: { pageNo, pageSize }
            });
            return response.data;
        },
        enabled: pageNo !== undefined && pageSize !== undefined,
    });
};
