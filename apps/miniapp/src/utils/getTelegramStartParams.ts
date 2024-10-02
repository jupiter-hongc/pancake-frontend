import { logger } from "@/lib/logger";
import WebApp from "@twa-dev/sdk";

export type StartParams = {
  campaign?: string;
};

export const getTelegramStartParams = (): StartParams => {
  try {
    const startParamData = JSON.parse(
      atob(WebApp.initDataUnsafe.start_param ?? "")
    );
    return startParamData;
  } catch (e) {
    logger.error(e);
    return {};
  }
};
