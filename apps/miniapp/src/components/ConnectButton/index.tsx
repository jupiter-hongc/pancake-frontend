import { useAccount, useBalance, useDisconnect, useSwitchChain } from "wagmi";
import React, { useCallback } from "react";
import { cn } from "@/ui/utils";
import { Button } from "@/ui/Button";
import {
  bsc,
  formatUnits,
  getConnectorConfigById,
  useCloudWalletConnectContext,
  useWalletConnectModal,
} from "../wagmi";
import { ArrowDownG } from "@/icons/ArrowDownG";
import { Drawer, DrawerContent, DrawerTrigger } from "@/ui/Drawer";
import { formatNumberWithoutZero } from "@/utils/format";
import { logger } from "@/lib/logger";

const accountMask = (account: `0x${string}` | undefined) =>
  account?.replace(/(.{4})(.*)(.{4})/g, "$1...$3");

const InfoArea = () => {
  const { connector } = useAccount();

  return (
    <>
      <div className={cn("user-address")}>
        {connector &&
        (connector.icon || getConnectorConfigById(connector.id)) ? (
          <img
            src={
              connector.icon ??
              getConnectorConfigById(connector.id)?.logoUrlPath
            }
            alt={connector?.name}
            className="w-6 h-6"
          />
        ) : (
          <span className="w-8 h-8 flex items-center justify-center border-2 border-interactive-buy bg-interactive-interactiveBg rounded-full">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-t-buy w-5 h-5"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.1667 3.33325C15.4167 3.33325 15.8333 3.74992 15.8333 4.99992L15.8333 6.66659C16.7538 6.66659 17.5 7.41278 17.5 8.33325L17.5 14.1666C17.5 15.8333 16.6667 16.6666 14.9992 16.6666H5C3.33333 16.6666 2.5 15.8333 2.5 14.1666L2.5 5.83325C2.5 4.58325 3.75 3.33325 5 3.33325L14.1667 3.33325ZM4.16667 5.83325C4.16667 5.37302 4.53976 4.99992 5 4.99992L15.8333 4.99992L15.8333 6.66659L5 6.66659C4.53976 6.66659 4.16667 6.29349 4.16667 5.83325ZM14.1667 13.3333C15 13.3333 15.8342 12.4999 15.8333 11.6666C15.8325 10.8333 15 9.99992 14.1667 9.99992C13.3333 9.99992 12.5 10.8333 12.5 11.6666C12.5 12.4999 13.3333 13.3333 14.1667 13.3333Z"
                fill="currentColor"
              />
            </svg>
          </span>
        )}
      </div>
      <div className="w-5 flex justify-center items-center">
        <ArrowDownG className="w-2.5 h-2.5 text-t-fillSecondary" />
      </div>
    </>
  );
};

const ConnectedInfo = () => {
  const { address, chain, isConnected } = useAccount();
  const balance = useBalance({ address });

  const { disconnectAsync } = useDisconnect();

  const onLogout = useCallback(async () => {
    try {
      await disconnectAsync();
    } catch (e) {
      console.error(e);
    }
  }, [disconnectAsync]);

  const isWrongNetwork = !chain && isConnected;

  const { switchChainAsync } = useSwitchChain();

  return (
    <>
      <h2 className="text-h4 text-center flex justify-center items-center pt-6 gap-2">
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block"
        >
          <rect width="30" height="30" rx="15" fill="#F0B90B" />
          <path
            d="M9.65652 8.09552L14.9403 5.0199L20.2241 8.09552L18.2815 9.23173L14.9403 7.29233L11.5991 9.23173L9.65652 8.09552ZM20.2241 11.9743L18.2815 10.8381L14.9403 12.7775L11.5991 10.8381L9.65652 11.9743V14.2468L12.9977 16.1862V20.065L14.9403 21.2012L16.8829 20.065V16.1862L20.2241 14.2468V11.9743ZM20.2241 18.1256V15.8531L18.2815 16.9893V19.2618L20.2241 18.1256ZM21.6033 18.9288L18.2621 20.8682V23.1406L23.5459 20.065V13.9137L21.6033 15.0499V18.9288ZM19.6607 10.0349L21.6033 11.1711V13.4436L23.5459 12.3074V10.0349L21.6033 8.89871L19.6607 10.0349ZM12.9977 21.6909V23.9634L14.9403 25.0996L16.8829 23.9634V21.6909L14.9403 22.8271L12.9977 21.6909ZM9.65652 18.1256L11.5991 19.2618V16.9893L9.65652 15.8531V18.1256ZM12.9977 10.0349L14.9403 11.1711L16.8829 10.0349L14.9403 8.89871L12.9977 10.0349ZM8.27728 11.1711L10.2198 10.0349L8.27728 8.89871L6.33472 10.0349V12.3074L8.27728 13.4436V11.1711ZM8.27728 15.0499L6.33472 13.9137V20.065L11.6185 23.1406V20.8682L8.27728 18.9288V15.0499Z"
            fill="white"
          />
        </svg>
        Balance:{" "}
        {balance.data
          ? `${formatNumberWithoutZero(
              formatUnits(balance.data?.value, balance.data?.decimals),
              4
            )} ${balance.data.symbol}`
          : "--"}
      </h2>
      <div className="flex h-8 items-center mt-5 gap-2 justify-center">
        <div className="text-bold flex items-center gap-2 pr-3 rounded-full bg-interactive-interactiveTertiary">
          <div className="flex w-8 h-8  border-2 border-interactive-primary justify-center items-center rounded-full bg-interactive-interactiveBg">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.55979 17.1693C4.08091 17.1693 3.67299 17.0008 3.33604 16.6639C2.9991 16.327 2.83063 15.919 2.83063 15.4402V4.55973C2.83063 4.08084 2.9991 3.67293 3.33604 3.33598C3.67299 2.99904 4.08091 2.83057 4.55979 2.83057H15.4402C15.9191 2.83057 16.327 2.99904 16.664 3.33598C17.0009 3.67293 17.1694 4.08084 17.1694 4.55973H10.51C9.69653 4.55973 9.00146 4.84807 8.4248 5.42473C7.84813 6.0014 7.55979 6.69647 7.55979 7.50994V12.4999C7.55979 13.3134 7.84813 14.0068 8.4248 14.5801C9.00146 15.1535 9.69653 15.4402 10.51 15.4402H17.1694C17.1694 15.9232 17.0009 16.3322 16.664 16.667C16.327 17.0019 15.9191 17.1693 15.4402 17.1693H4.55979ZM10.51 13.9999C10.1008 13.9999 9.74688 13.8522 9.44813 13.5568C9.14938 13.2614 9 12.9091 9 12.4999V7.50994C9 7.10077 9.14938 6.74682 9.44813 6.44807C9.74688 6.14932 10.1008 5.99994 10.51 5.99994H16.6594C17.0685 5.99994 17.4225 6.14932 17.7213 6.44807C18.02 6.74682 18.1694 7.10077 18.1694 7.50994V12.4999C18.1694 12.9091 18.02 13.2614 17.7213 13.5568C17.4225 13.8522 17.0685 13.9999 16.6594 13.9999H10.51ZM13.5 11.2499C13.8472 11.2499 14.1424 11.1284 14.3854 10.8854C14.6285 10.6423 14.75 10.3472 14.75 9.99994C14.75 9.65272 14.6285 9.35758 14.3854 9.11452C14.1424 8.87147 13.8472 8.74994 13.5 8.74994C13.1528 8.74994 12.8576 8.87147 12.6146 9.11452C12.3715 9.35758 12.25 9.65272 12.25 9.99994C12.25 10.3472 12.3715 10.6423 12.6146 10.8854C12.8576 11.1284 13.1528 11.2499 13.5 11.2499Z"
                fill="#1FC7D4"
              />
            </svg>
          </div>
          {accountMask(address)}
        </div>
        <div
          className={cn(
            "text-bold h-8 leading-8 line-clamp-1 bg-interactive-interactiveTertiary20 gap-2",
            isWrongNetwork
              ? "pr-3 rounded-r-3xl rounded-l-xl flex items-center"
              : "px-3 rounded-full text-center"
          )}
        >
          {isWrongNetwork ? (
            <div className="border-2 h-8 w-8 rounded-xl border-t-error items-center justify-center flex bg-interactive-interactiveBg">
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.4944 14.1693C10.7463 14.1693 10.9593 14.0841 11.1333 13.9137C11.3074 13.7434 11.3944 13.5323 11.3944 13.2804C11.3944 13.0286 11.3092 12.8147 11.139 12.6389C10.9685 12.4632 10.7574 12.3754 10.5056 12.3754C10.2537 12.3754 10.0407 12.4617 9.86667 12.6345C9.69264 12.8073 9.60563 13.0197 9.60563 13.2716C9.60563 13.5234 9.69077 13.736 9.86104 13.9093C10.0315 14.0826 10.2426 14.1693 10.4944 14.1693ZM10.4956 11.0099C10.7367 11.0099 10.9419 10.9264 11.111 10.7593C11.2801 10.5924 11.3646 10.3877 11.3646 10.1454V6.75994C11.3646 6.51758 11.2815 6.31286 11.1154 6.14577C10.9492 5.97883 10.7455 5.89536 10.5044 5.89536C10.2633 5.89536 10.0581 5.97883 9.88896 6.14577C9.71993 6.31286 9.63542 6.51758 9.63542 6.75994V10.1454C9.63542 10.3877 9.71847 10.5924 9.88458 10.7593C10.0508 10.9264 10.2545 11.0099 10.4956 11.0099ZM10.5058 18.1693C9.3782 18.1693 8.31834 17.9567 7.32625 17.5314C6.33403 17.1061 5.46597 16.5216 4.72209 15.7779C3.97834 15.034 3.39382 14.1663 2.96854 13.1747C2.54327 12.1832 2.33063 11.1217 2.33063 9.99036C2.33063 8.85911 2.54327 7.80091 2.96854 6.81577C3.39382 5.8305 3.97834 4.96591 4.72209 4.22202C5.46597 3.47827 6.33368 2.89376 7.32521 2.46848C8.31674 2.04321 9.3782 1.83057 10.5096 1.83057C11.6408 1.83057 12.699 2.04321 13.6842 2.46848C14.6694 2.89376 15.534 3.47827 16.2779 4.22202C17.0217 4.96591 17.6062 5.83202 18.0315 6.82036C18.4567 7.80869 18.6694 8.86661 18.6694 9.99411C18.6694 11.1217 18.4567 12.1816 18.0315 13.1737C17.6062 14.1659 17.0217 15.034 16.2779 15.7779C15.534 16.5216 14.6679 17.1061 13.6796 17.5314C12.6913 17.9567 11.6333 18.1693 10.5058 18.1693Z"
                  fill="#ED4B9E"
                />
              </svg>
            </div>
          ) : null}

          {isWrongNetwork ? "Wrong Network" : chain?.name}
        </div>
      </div>
      <div className="mt-5">
        {isWrongNetwork ? (
          <Button
            type="button"
            className="h-12 text-bold w-full"
            onClick={async (e) => {
              e.preventDefault();
              try {
                await switchChainAsync({ chainId: bsc.id });
              } catch (e) {
                logger.error(e);
              }
            }}
          >
            Change the network to BNB chain
          </Button>
        ) : (
          <Button onClick={onLogout} className="h-12 text-bold w-full">
            Disconnect
          </Button>
        )}
      </div>
    </>
  );
};

type Props = React.ComponentProps<typeof Button> & {
  onBeforeConnect?: () => Promise<void>;
  className?: string;
  appendChild?: React.ReactNode;
  connectText?: React.ReactNode;
};

const ConnectButton = ({
  onBeforeConnect,
  className,
  appendChild,
  connectText = "Connect Wallet",
  ...rest
}: Props) => {
  const { isConnected } = useAccount();

  const { onBeforeConnect: onBeforeConnectFromContext } =
    useCloudWalletConnectContext();
  const { setWalletConnectModalVisibility } = useWalletConnectModal();

  const onConnect = useCallback(async () => {
    try {
      await onBeforeConnectFromContext?.();
      await onBeforeConnect?.();
      setWalletConnectModalVisibility(true);
    } catch (e) {
      console.error(e);
    }
  }, [
    onBeforeConnect,
    onBeforeConnectFromContext,
    setWalletConnectModalVisibility,
  ]);

  if (!isConnected) {
    return (
      <Button
        variant="default"
        type="button"
        aria-label="Connect Wallet"
        onClick={onConnect}
        size="sm"
        className={cn("whitespace-nowrap text-bold h-10", className)}
        {...rest}
      >
        <span>{connectText}</span>
        {appendChild || null}
      </Button>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          type="button"
          id="userActionDropdownMenuButton"
          className={cn(
            "rounded-full border-border-line border-b-2 !bg-interactive-interactiveTertiary active:bg-interactive-interactiveTertiary focus:bg-interactive-interactiveTertiary",
            className
          )}
          {...rest}
        >
          <InfoArea />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-4 pb-[max(env(safe-area-inset-bottom,1.5rem),1.5rem)]">
        <ConnectedInfo />
      </DrawerContent>
    </Drawer>
  );
};

export default ConnectButton;
