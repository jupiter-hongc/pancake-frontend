"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Config, State, watchAccount } from "@wagmi/core";
import React, { createContext, useContext, useMemo, useRef } from "react";
import { useEffectOnce } from "react-use";
import {
  useAccount,
  useChainId,
  useChains,
  useConfig,
  useSwitchChain,
  WagmiProvider,
} from "wagmi";
import { type Chain, bsc } from "wagmi/chains";

import { WalletConnectConnectorQrModalOptions } from "../constants/walletConnectModalTheme";
import { WalletConnectModalProvider } from "./WalletConnectModalProvider";

export type CloudWalletConnectContextValue = {
  supportedChains: readonly [Chain, ...Chain[]];
  selectedNetworkId: number;
  isUnsupportedNetwork: boolean;
  hideChains?: Chain[];
  onSwitchNetwork?: (id: number) => void;
  onBeforeConnect?: () => Promise<void> | void;
};

export const CloudWalletConnectContext =
  createContext<CloudWalletConnectContextValue>({
    // @ts-expect-error -- ignore
    supportedChains: [],
    isUnsupportedNetwork: false,
    selectedNetworkId: bsc.id,
    setSelectedNetworkId: () => {},
    onBeforeConnect: () => {},
  });

export const useCloudWalletConnectContext = () =>
  useContext(CloudWalletConnectContext);

const NetworkChange = ({
  reloadAfterNetworkSwitch,
}: {
  reloadAfterNetworkSwitch: boolean;
}) => {
  const config = useConfig();

  const isInitialized = useRef(false);

  useEffectOnce(() => {
    const unwatch = watchAccount(config, {
      onChange(account, previousAccount) {
        if (
          isInitialized.current &&
          account.isConnected &&
          previousAccount.address &&
          reloadAfterNetworkSwitch &&
          account.chainId !== previousAccount.chainId
        ) {
          window.location.reload();
        }

        if (account.isConnected) {
          isInitialized.current = true;
        }
      },
    });

    return () => {
      unwatch();
    };
  });

  return null;
};

export type Props = {
  children: React.ReactNode;
  supportedChains: readonly [Chain, ...Chain[]];
  initialChainNetwork?: number;
  onSwitchNetwork?: (id: number) => void;
  onBeforeConnect?: () => Promise<void> | void;
};

const WalletProvider = ({
  children,
  supportedChains,
  initialChainNetwork,
  onSwitchNetwork,
  onBeforeConnect,
}: Props) => {
  const { isConnected, chain } = useAccount();
  const chains = useChains();

  const connectedChainId = useChainId();

  const chainsToShow = useMemo(() => {
    if (supportedChains.length === 0) return chains;
    return chains.filter((c) =>
      supportedChains.some((supportedChain) => c.id === supportedChain.id)
    );
  }, [supportedChains, chains]);

  const initialChain = chainsToShow.find(
    (chainInfo) => chainInfo.id === initialChainNetwork
  );

  const isUnsupportedNetwork = useMemo(() => {
    return (
      (isConnected && chain === undefined) ||
      !chainsToShow.some((chainToShow) => chainToShow.id === connectedChainId)
    );
  }, [isConnected, chain, chainsToShow, connectedChainId]);

  const { switchChainAsync } = useSwitchChain();

  useEffectOnce(() => {
    if (initialChain && !isConnected) {
      switchChainAsync({ chainId: initialChain.id }).catch(console.error);
    }
  });

  const cloudWalletConnectContextValue =
    useMemo<CloudWalletConnectContextValue>(
      () => ({
        supportedChains,
        selectedNetworkId: chain?.id as number,
        isUnsupportedNetwork,
        onSwitchNetwork,
        onBeforeConnect,
      }),
      [
        supportedChains,
        chain?.id,
        isUnsupportedNetwork,
        onSwitchNetwork,
        onBeforeConnect,
      ]
    );

  return (
    <CloudWalletConnectContext.Provider value={cloudWalletConnectContextValue}>
      {children}
    </CloudWalletConnectContext.Provider>
  );
};

export type WagmiProviderProps = {
  walletConnectModalProps: Omit<
    React.ComponentProps<typeof WalletConnectModalProvider>,
    "children" | "Link" | "Trans"
  >;
  Link?: React.ElementType;
  Trans?: React.ElementType;
  supportedChains: readonly [Chain, ...Chain[]];
  staticHost: string;
  walletConnectConnectorQrModalOptions?: WalletConnectConnectorQrModalOptions;
  initialChainNetwork?: number;
  onSwitchNetwork?: (id: number) => void;
  onBeforeConnect?: () => Promise<void> | void;
  config: Config;
  initialState?: State;
  reloadAfterNetworkSwitch?: boolean;
  children?: React.ReactNode;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      structuralSharing: false,
    },
  },
});

const WagmiConfig: React.FC<WagmiProviderProps> = ({
  children,
  Link,
  Trans,
  walletConnectModalProps: {
    t,
    locale,
    walletConnectionModal,
    onConnect,
    onConnected,
    onConnectFail,
  },
  supportedChains,
  staticHost,
  initialChainNetwork,
  onSwitchNetwork,
  onBeforeConnect,
  config,
  initialState,
  reloadAfterNetworkSwitch = true,
}) => {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider
          supportedChains={supportedChains}
          initialChainNetwork={initialChainNetwork}
          onSwitchNetwork={onSwitchNetwork}
          onBeforeConnect={onBeforeConnect}
        >
          <WalletConnectModalProvider
            t={t}
            locale={locale}
            Link={Link}
            Trans={Trans}
            staticHost={staticHost}
            onConnect={onConnect}
            onConnected={onConnected}
            onConnectFail={onConnectFail}
            walletConnectionModal={walletConnectionModal}
          >
            <NetworkChange
              reloadAfterNetworkSwitch={reloadAfterNetworkSwitch}
            />
            {children}
          </WalletConnectModalProvider>
        </WalletProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default WagmiConfig;
