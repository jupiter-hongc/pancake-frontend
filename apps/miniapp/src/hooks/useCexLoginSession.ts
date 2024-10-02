import { getLoginCookie } from "@/constants/cookie";
import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useAccount } from "wagmi";

export const useGetNonce = () => {
  const { address } = useAccount();
  return useMutation({
    mutationFn: async () => {
      if (!address) {
        throw new Error("Get Nonce Address not found");
      }
      return api.post<{ nonce: string }>(
        "/prediction/public/v1/getNonce",
        {},
        { params: { address } }
      );
    },
  });
};

export const useLogin = () => {
  const { address } = useAccount();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (params: {
      tgId?: number;
      signature: string;
      authData?: string;
    }) => {
      if (!address) {
        throw new Error("Login Address not found");
      }

      const response = await api.post(
        "/prediction/public/v1/login",
        {},
        { params: { address, ...params } }
      );

      if (response.data.failureCode) {
        throw new Error(
          `Login Error: [${response.data.failureCode}] ${response.data.failureReason}`
        );
      }

      return response;
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      return api.post("/prediction/private/v1/logout");
    },
  });
};

export const useValidateToken = () => {
  const { isConnected, isConnecting } = useAccount();
  return useQuery({
    queryKey: ["validate-token"],
    queryFn: async () => {
      return api.post("/prediction/public/v1/validateToken");
    },
    enabled: Boolean(getLoginCookie()) && isConnected && !isConnecting,
  });
};
