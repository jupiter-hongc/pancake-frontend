import { cn } from "@/ui/utils";

import { useCallback, useMemo } from "react";
import {
  type Connector,
  ConnectorNotFoundError,
  useChainId,
  useConnect,
} from "wagmi";

import {
  ConnectorId,
  getConnectorConfigById,
} from "../constants/connectorConfig";

import type { WalletConnectModalOnConnect } from "./WalletConnectModalProvider";
import { useBoolean } from "react-use";
import { Loading } from "@/icons/Loading";
import { logger } from "@/lib/logger";
import { toast } from "sonner";
import { UserRejectedRequestError } from "viem";
import { NoResponseReload } from "@/components/NoResponseReload";

type WalletConnectButtonProps = {
  staticHost: string;
} & WalletConnectModalOnConnect;

type ConnectorProps = WalletConnectButtonProps & {
  connector: Connector;
  layout: { index: number; total: number };
};

const CommonConnectButton = ({
  staticHost,
  connector,
  onConnect,
  onConnected,
  onConnectFail,
  layout,
}: ConnectorProps) => {
  const { connectAsync, reset } = useConnect();
  const [isConnecting, setIsConnecting] = useBoolean(false);
  const { index, total } = layout;
  // there are some connector using WalletConnect connector as base connector
  // the connectorId use to get the real id and name config

  const connectorId: ConnectorId =
    (connector.connectorId as string | void) ?? connector.id ?? connector.uid;

  const { ready } = connector;

  const connectorName = connector.name;

  const chainId = useChainId();

  const handleOnConnect = useCallback(async () => {
    try {
      setIsConnecting(true);
      onConnect?.(connector);
      reset();
      await connectAsync({ connector, chainId });
      onConnected?.(connector);
    } catch (error) {
      onConnectFail?.(connector, error as Error);
      if (error instanceof ConnectorNotFoundError) {
        await getConnectorConfigById(
          connectorId
        )?.handleConnectorNotFoundError();
        return;
      }
      logger.info(error);

      if (
        connector.id === "BinanceW3WSDK" &&
        // @ts-expect-error - ignore
        error.message.includes("[binance-w3w] User closed modal")
      ) {
        const userReject = new UserRejectedRequestError(new Error());
        toast.error(userReject?.shortMessage ?? userReject?.message);
        return;
      }
      // @ts-expect-error - ignore
      toast.error(error?.shortMessage ?? error?.message);
    } finally {
      setIsConnecting(false);
    }
  }, [
    chainId,
    connectAsync,
    connector,
    connectorId,
    onConnect,
    onConnectFail,
    onConnected,
    reset,
    setIsConnecting,
  ]);

  return (
    <button
      type="button"
      onClick={handleOnConnect}
      className={cn("flex-col flex gap-2 text-t-primary items-center rounded", {
        "hover:bg-interactive-interactive01 focus:bg-interactive-interactive01":
          ready,
        "col-start-2": total % 3 === 1 && index + 1 === total,
      })}
    >
      <div className="relative">
        <img
          className={cn(
            "w-auto h-[3.125rem] wallet-logo",
            isConnecting && "opacity-35"
          )}
          src={`${
            connector.icon ??
            `${staticHost}${getConnectorConfigById(connectorId)?.logoUrlPath}`
          }`}
        />
        {isConnecting ? (
          <Loading className="absolute inset-0 text-t-error w-5 h-5 m-auto" />
        ) : null}
      </div>
      <span className="wallet-label text-extraSmall">{connectorName}</span>
    </button>
  );
};

export const WalletConnectButton = ({
  staticHost,
  onConnect,
  onConnected,
  onConnectFail,
}: WalletConnectButtonProps) => {
  const { connectors } = useConnect();

  const { connectorsToShow, connectorsToInstall } = useMemo(() => {
    type FilterFn = (connector: Connector) => boolean;

    // @ts-expect-error - ignore
    const isConnectNotReadyButSupportDownload: FilterFn = (
      connector: Connector
    ) => connector.supportDownload && !connector.ready;

    const filterFns: FilterFn[] = [];
    const filterFnsInstall: FilterFn[] = [isConnectNotReadyButSupportDownload];

    return {
      connectorsToShow: connectors.filter((connector) =>
        filterFns.every((fn) => fn(connector))
      ),
      connectorsToInstall: connectors.filter((connector) =>
        filterFnsInstall.every((fn) => fn(connector))
      ),
    };
  }, [connectors]);

  const connectorToShowWithoutUniPass = useMemo(
    () =>
      connectorsToShow
        .filter((connector) => connector.id !== "unipass")
        .concat(connectorsToInstall),
    [connectorsToShow, connectorsToInstall]
  );

  const layoutClassName = useMemo(() => {
    return connectorToShowWithoutUniPass.length > 2
      ? "grid grid-cols-3 w-auto gap-4"
      : `flex justify-center ${
          connectorToShowWithoutUniPass.length === 1
            ? "[&>button]:w-min"
            : "w-[327px] [&>button]:w-1/2"
        }`;
  }, [connectorToShowWithoutUniPass.length]);

  return (
    <>
      <div className={layoutClassName}>
        {connectorToShowWithoutUniPass.map((connector, index, list) => (
          <CommonConnectButton
            layout={{ index, total: list.length }}
            connector={connector}
            staticHost={staticHost}
            key={connector.id}
            onConnect={onConnect}
            onConnected={onConnected}
            onConnectFail={onConnectFail}
          />
        ))}
      </div>
      <NoResponseReload />
    </>
  );
};
