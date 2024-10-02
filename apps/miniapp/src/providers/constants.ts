import { logger } from "@/lib/logger";
import { QueryCache, QueryClient } from "@tanstack/react-query";

export const querCache = new QueryCache({
  onError: (error) => {
    logger.error(error);
  },
});
export const queryClient = new QueryClient();
