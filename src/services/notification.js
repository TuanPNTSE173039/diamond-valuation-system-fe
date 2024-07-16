import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./config/axiosInstance.js";

export const useNotification = (accountId) => {
  return useQuery({
    queryKey: ["notification", { accountId: accountId }],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `notifications?accountId=${accountId}`,
      );
      return response.data;
    },
    enabled: !!accountId,
  });
};
