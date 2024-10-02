import {
  useGetNonce,
  useLogin,
  useLogout,
  useValidateToken,
} from "@/hooks/useCexLoginSession";
import { logger } from "@/lib/logger";
import { Button } from "@/ui/Button";
import { Drawer, DrawerContent } from "@/ui/Drawer";
import { withResolvers } from "@/utils/withResolvers";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { usePrevious, useToggle } from "react-use";
import { toast } from "sonner";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import Cookie from "js-cookie";
import md5 from "md5";
import { getLoginCookie, removeLoginCookie } from "@/constants/cookie";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/ui/utils";
import { UserRejectedRequestError } from "viem";
import { Loading } from "@/icons/Loading";
import WebApp from "@twa-dev/sdk";
import { NoResponseReload } from "@/components/NoResponseReload";

const useSignDialog = () => {
  const [open, setOpen] = useToggle(false);
  const resolveRef = useRef<ReturnType<typeof withResolvers>["resolve"]>();
  const rejectRef = useRef<ReturnType<typeof withResolvers>["reject"]>();

  const { mutateAsync: getNonce, isPending: isGetNoncePending } = useGetNonce();
  const { connector } = useAccount();
  const { signMessageAsync, isPending: isPendingSignMessage } =
    useSignMessage();
  const { mutateAsync: login, isPending: isPendingLogin } = useLogin();
  const isPending = isGetNoncePending || isPendingSignMessage || isPendingLogin;

  const signMessage = useCallback(async () => {
    try {
      const nonceResponse = await getNonce();
      const signature = await signMessageAsync({
        message: `You are signing up for the Pancake Prediction Telegram bot  ${nonceResponse.data.nonce}`,
      });

      const response = await login({
        signature,
        tgId: WebApp.initDataUnsafe.user?.id,
        authData: WebApp.initData,
      });

      setOpen(false);
      resolveRef.current?.(true);

      Cookie.set("csrfToken", md5(response.data.csrfToken));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      logger.error(e);
      toast.error(e.shortMessage || e.message);
    }
  }, [getNonce, login, setOpen, signMessageAsync]);

  const onOpenChange = useCallback(
    async (state: boolean) => {
      if (state === false) {
        rejectRef.current?.(
          new UserRejectedRequestError(new Error("User Reject"))
        );
      }
      setOpen(state);
    },
    [setOpen]
  );

  const openSignMessageDialog = useCallback(async () => {
    const { promise, resolve, reject } = withResolvers();
    resolveRef.current = resolve;
    rejectRef.current = reject;
    setOpen(true);
    signMessage().catch((e) => {
      logger.error(e);
    });
    return promise;
  }, [setOpen, signMessage]);

  const component = useMemo(() => {
    return (
      <Drawer open={open} onOpenChange={onOpenChange} dismissible={!isPending}>
        <DrawerContent className="px-4 pb-[max(env(safe-area-inset-bottom,1.5rem),1.5rem)]">
          <img
            src="https://assets.pancakeswap.finance/web/pancake-3d-spinner-v2.gif"
            alt="Pancake"
            className="h-24 w-20 mx-auto"
          />
          <p className="text-t-fillSecondary text-small mb-4 text-center mt-4">
            Kindly open your {connector?.name || "connected wallet"}, approve
            the signing, and embark on your prediction journey!
          </p>
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              signMessage();
            }}
            disabled={isPending}
            className={cn(
              isPendingSignMessage && "!text-t-onColor disabled:bg-t-disabled"
            )}
          >
            {isPendingSignMessage ? (
              <>
                <Loading className="mr-2" /> Waiting for signature
              </>
            ) : (
              "Signature to register"
            )}
          </Button>
          <NoResponseReload />
        </DrawerContent>
      </Drawer>
    );
  }, [
    open,
    onOpenChange,
    isPending,
    connector?.name,
    isPendingSignMessage,
    signMessage,
  ]);

  return [openSignMessageDialog, component, isPending] as const;
};

export const CexLoginSession = forwardRef((_, ref) => {
  const { isConnected, isConnecting, isDisconnected, address, isReconnecting } =
    useAccount();
  const previousAddress = usePrevious(address);
  const [openSignMessageDialog, signDialog, isPending] = useSignDialog();
  const { mutateAsync: logout } = useLogout();
  const { data, isLoading, isError, refetch } = useValidateToken();
  const queryClient = useQueryClient();
  const isLoggingIn = useRef(false);

  const { disconnectAsync } = useDisconnect();

  useEffect(() => {
    if (previousAddress !== undefined && previousAddress !== address) {
      !isDisconnected && disconnectAsync();
    }
  }, [address, disconnectAsync, isDisconnected, previousAddress]);

  useEffect(() => {
    if (
      !isReconnecting &&
      !isConnecting &&
      isConnected &&
      !isPending &&
      !isLoggingIn.current &&
      !isLoading &&
      ((data?.data && data.data.expireAfter <= 0) || isError)
    ) {
      logger.debug("Validation Token session expired. Will disconnect wallet");
      disconnectAsync().then(() => {
        queryClient.invalidateQueries();
        toast.info("Login Session expired. Please login again");
      });
    }
  }, [
    data?.data,
    isConnecting,
    isConnected,
    isError,
    isLoading,
    isPending,
    queryClient,
    isReconnecting,
    isDisconnected,
    disconnectAsync,
  ]);

  useEffect(() => {
    if (data?.data && data.data.expireAfter && !isError) {
      const timeoutId = setTimeout(() => {
        refetch();
      }, data.data.expireAfter * 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [data?.data, isError, refetch]);

  useImperativeHandle(ref, () => {
    return {
      openSignMessageDialog: () => {
        isLoggingIn.current = true;
        return openSignMessageDialog()
          .catch((e) => {
            toast.error(e.message);
            !isDisconnected && disconnectAsync();
          })
          .finally(() => {
            isLoggingIn.current = false;
          });
      },
    };
  });

  useEffect(() => {
    if (!isConnected && !isConnecting && getLoginCookie() && !isLoading) {
      // logout here
      logout()
        .then(() => {
          logger.debug("Logout successfully");
        })
        .catch((e) => {
          logger.error(e);
        })
        .finally(() => {
          removeLoginCookie();
        });
    }
  }, [isConnected, isConnecting, isDisconnected, isLoading, logout]);

  return <>{signDialog}</>;
});
