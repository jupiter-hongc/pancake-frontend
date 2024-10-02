import { useCallback, useEffect } from "react";

import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { DismissDuration, PollingInterval } from "@/constants";
import { toast } from "sonner";
import { useClaim } from "@/hooks/useClaim";
import { Button } from "@/ui/Button";
import { cn } from "@/ui/utils";
import { logger } from "@/lib/logger";
import WebApp from "@twa-dev/sdk";

export interface Props {
  epochs: bigint[];
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onSuccess?: () => void;
  onFailed?: (error: any) => void;
}

export const ClaimButton = ({
  epochs,
  disabled,
  className,
  children,
  onSuccess,
  onFailed,
}: Props) => {
  const { claim, data, isPending } = useClaim();
  const { connector } = useAccount();
  const { isLoading, isFetched, isSuccess, isError, error } =
    useWaitForTransactionReceipt({
      hash: data,
      pollingInterval: PollingInterval,
      timeout: 30_000,
    });
  const doClaim = useCallback(async () => {
    try {
      const promise = claim(epochs);

      // Hack fix for metamask sdk opening the deep link
      if (connector?.id === "metaMaskSDK" && WebApp.initData) {
        window.open("https://metamask.app.link", "_blank");
      }

      await promise;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      logger.error(error);
      toast(
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-h4 text-t-fillSecondary">Fail</h2>
            {error?.cause?.code && (
              <span className="text-extraSmall text-t-fillSecondary">
                #{error?.cause?.code}
              </span>
            )}
          </div>
          <p className="text-extraSmall text-t-fillSecondary">
            {error?.shortMessage || error?.details || error?.message}
          </p>
        </div>,
        {
          duration: DismissDuration,
          dismissible: true,
        }
      );
      onFailed?.(error);
      return;
    }
  }, [claim, connector?.id, epochs, onFailed]);
  useEffect(() => {
    if (!isFetched) return;
    if (isSuccess) {
      onSuccess?.();
    }
    if (isError) {
      onFailed?.(error);
    }
  }, [error, isError, isFetched, isSuccess, onFailed, onSuccess]);
  return (
    <Button
      variant={"primary"}
      disabled={isPending || isLoading || disabled}
      className={cn("h-10 w-full text-t-white mt-4", className)}
      onClick={doClaim}
    >
      {isPending || isLoading ? "Open your wallet and confirm" : children}
    </Button>
  );
};
