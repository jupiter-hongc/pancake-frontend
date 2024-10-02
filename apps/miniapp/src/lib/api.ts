import axios from "axios";
import { logger } from "./logger";
import { getLoginCookie } from "@/constants/cookie";
import md5 from "md5";

export const api = axios.create({
  adapter: "fetch",
});

api.interceptors.request.use((requestConfig) => {
  logger.debug({ requestConfig });

  const loginCookie = getLoginCookie();
  if (loginCookie) {
    requestConfig.headers.csrfToken = md5(loginCookie);
  }

  return requestConfig;
});

api.interceptors.response.use((response) => {
  logger.debug({ response });
  return response;
});
