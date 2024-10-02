import { WagmiReactQueryProvider } from "@/components/wagmi";
import WalletConnectionModal from "@/components/wagmi/components/WalletConnectionModal";
import { useCallback, useMemo, useRef } from "react";
import { bsc, bscTestnet, Chain } from "viem/chains";
import { State, createConfig, fallback, http, webSocket } from "wagmi";
import { injected, metaMask, walletConnect } from "wagmi/connectors";
import { getWagmiConnectorV2 } from "@binance/w3w-wagmi-connector-v2";
import { CexLoginSession } from "./CexLoginSession";
import { WalletTgSdk } from "@uxuycom/web3-tg-sdk";
import uxuyLogo from "@/assets/uxuy.png";

import { codexFieldWallet } from "codexfield-wallet-connector";

const metamaskWalletConnectId =
  "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96";
const binanceWeb3WalletConnectId =
  "8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4";
const trustWalletId =
  "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0";

const icon =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNSIgZmlsbD0ibm9uZSIgY2xhc3M9InctNiBoLTYiPjxwYXRoIGZpbGw9IiM2MzMwMDEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTExLjk0NiAyNC4wNzRjLTMuNTc1LS4wMDMtNi40NTQtLjg1Mi04LjQ2Ni0yLjM3N0MxLjQ0NCAyMC4xNTMuMzY0IDE3Ljk2My4zNjQgMTUuNDg1YzAtMi4zODggMS4wNzctNC4xMSAyLjI5Ny01LjI3NC45NTUtLjkxMiAyLjAxLTEuNDk3IDIuNzQ0LTEuODMzYTM3LjUgMzcuNSAwIDAgMS0uNTU4LTEuODQ3Yy0uMjQ4LS45MTItLjQ5Mi0xLjk4My0uNDkyLTIuNzY4IDAtLjkzLjIwNS0xLjg2Mi43NTctMi41ODdDNS42OTQuNDEgNi41NzIgMCA3LjYyNyAwYy44MjUgMCAxLjUyNi4zMDMgMi4wNzQuODI1LjUyNC41Ljg3MyAxLjE2MyAxLjExNCAxLjg1NS40MjMgMS4yMTUuNTg4IDIuNzQxLjYzNCA0LjI2NWgxLjAxMWMuMDQ2LTEuNTI0LjIxMS0zLjA1LjYzNC00LjI2NS4yNDEtLjY5Mi41OS0xLjM1NSAxLjExNC0xLjg1NUEyLjkzNCAyLjkzNCAwIDAgMSAxNi4yODIgMGMxLjA1NSAwIDEuOTMzLjQxIDIuNTE2IDEuMTc2LjU1MS43MjUuNzU2IDEuNjU4Ljc1NiAyLjU4NyAwIC43ODUtLjI0MyAxLjg1Ni0uNDkxIDIuNzY4YTM3LjU5NyAzNy41OTcgMCAwIDEtLjU2IDEuODQ3Yy43MzUuMzM2IDEuNzkuOTIgMi43NDUgMS44MzMgMS4yMiAxLjE2NCAyLjI5OCAyLjg4NiAyLjI5OCA1LjI3NCAwIDIuNDc4LTEuMDggNC42NjgtMy4xMTYgNi4yMTItMi4wMTIgMS41MjUtNC44OTIgMi4zNzQtOC40NjYgMi4zNzdoLS4wMThaIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBmaWxsPSIjRDE4ODRGIiBkPSJNNy42MjcuODg0QzYuMDgxLjg4NCA1LjM3IDIuMDM3IDUuMzcgMy42MzJjMCAxLjI2OC44MjcgMy44MDcgMS4xNjYgNC43OTZhLjQ0NC40NDQgMCAwIDEtLjI2Mi41NTJjLTEuMjQuNDg4LTQuODk2IDIuMjc3LTQuODk2IDYuMzc0IDAgNC4zMTYgMy43MTYgNy41NyAxMC41NjggNy41NzVoLjAxN2M2Ljg1Mi0uMDA2IDEwLjU2OC0zLjI2IDEwLjU2OC03LjU3NSAwLTQuMDk3LTMuNjU2LTUuODg2LTQuODk1LTYuMzc0YS40NDQuNDQ0IDAgMCAxLS4yNjMtLjU1MmMuMzQtLjk4OSAxLjE2Ni0zLjUyOCAxLjE2Ni00Ljc5NiAwLTEuNTk1LS43MTEtMi43NDgtMi4yNTctMi43NDgtMi4yMjYgMC0yLjc4IDMuMTUyLTIuODIgNi41MzVhLjQxMy40MTMgMCAwIDEtLjQxMS40MWgtMi4xOTNhLjQxMy40MTMgMCAwIDEtLjQxLS40MWMtLjA0LTMuMzgzLS41OTUtNi41MzUtMi44Mi02LjUzNVoiLz48cGF0aCBmaWxsPSIjRkVEQzkwIiBkPSJNMTEuOTYzIDIxLjU0NmMtNS4wMzUgMC0xMC41NzYtMi42OTUtMTAuNTg1LTYuMTg0di4wMTZjMCA0LjMyIDMuNzIyIDcuNTc1IDEwLjU4NSA3LjU3NSA2Ljg2MyAwIDEwLjU4NS0zLjI1NiAxMC41ODUtNy41NzV2LS4wMTZjLS4wMDkgMy40ODktNS41NSA2LjE4NC0xMC41ODUgNi4xODRaIi8+PHBhdGggZmlsbD0iIzYzMzAwMSIgZD0iTTkuMTY1IDE0LjI5YzAgMS4xNzgtLjU1NiAxLjc5Mi0xLjI0MyAxLjc5MnMtMS4yNDMtLjYxNC0xLjI0My0xLjc5MmMwLTEuMTc3LjU1Ni0xLjc5MSAxLjI0My0xLjc5MXMxLjI0My42MTQgMS4yNDMgMS43OTFaTTE3LjI0NyAxNC4yOWMwIDEuMTc4LS41NTcgMS43OTItMS4yNDMgMS43OTItLjY4NyAwLTEuMjQ0LS42MTQtMS4yNDQtMS43OTIgMC0xLjE3Ny41NTctMS43OTEgMS4yNDQtMS43OTEuNjg2IDAgMS4yNDMuNjE0IDEuMjQzIDEuNzkxWiIvPjwvc3ZnPg==";

const config = createConfig({
  chains:
    import.meta.env.VITE_BUILD_ENV === "production" ? [bsc] : [bsc, bscTestnet],
  multiInjectedProviderDiscovery: true,
  connectors: [
    getWagmiConnectorV2()(),
    walletConnect({
      projectId: "e542ff314e26ff34de2d4fba98db70bb",
      showQrModal: true,
      qrModalOptions: {
        explorerRecommendedWalletIds: [
          binanceWeb3WalletConnectId,
          metamaskWalletConnectId,
          trustWalletId,
        ],
      },
    }),
    metaMask({
      dappMetadata: {
        name: "Pancakeswap Predictions",
        url: "https://t.me/pancakefi_bot",
        base64Icon: icon,
      },
      useDeeplink: false,
      openDeeplink: (deepLink: string) => {
        console.log("metamask open deeplink", { deepLink });
        const anchor = document.createElement("a");
        anchor.href = deepLink;
        anchor.setAttribute("target", "_blank");
        anchor.click();
      },
    }),

    injected({
      // @ts-expect-error -- ignore
      target() {
        return {
          id: "uxuy",
          name: "UXUY Wallet",
          icon: uxuyLogo,
          provider: () => {
            const { ethereum } = new WalletTgSdk({
              injected: false,
              metaData: {
                icon,
                hostname: window.location.hostname,
                name: "Pancakeswap Predictions",
                url: "https://t.me/pancakefi_bot",
              },
            });
            ethereum.isMetaMask = false;
            return ethereum;
          },
        };
      },
    }),
    // codexFieldWallet({
    //   projectId: "e542ff314e26ff34de2d4fba98db70bb",
    // }),
  ],
  transports: {
    [bsc.id]: fallback([
      http("https://bsc-rpc.publicnode.com", { batch: true }),
      http(
        "https://bsc-mainnet.nodereal.io/v1/75c02638d44b45c3a15a202ef20f9945",
        { batch: true }
      ),
    ]),
    [bscTestnet.id]: fallback([
      webSocket("wss://bsc-testnet-rpc.publicnode.com", {
        key: "publicnode",
        name: "Public Node Websocket Provider",
      }),
      http("https://bsc-testnet-rpc.publicnode.com", {
        batch: true,
      }),
    ]),
  },
});

export const defaultSupportedChains: [Chain, ...Chain[]] = [bsc, bscTestnet];

const defaultOptions = {
  supportedChains: defaultSupportedChains,
};

const WagmiProvider = ({
  children,
  initialChainNetwork,
  initialState,
  supportedChains,
}: {
  children: React.ReactNode;
  initialChainNetwork?: number;
  supportedChains?: readonly [Chain, ...Chain[]];
  initialState?: State;
}) => {
  const {
    t,

    i18n: { language: lng },
  } = {
    t: () => {},
    i18n: {
      language: "en",
    },
  };

  const onConnect = useCallback(() => {}, []);
  const ref = useRef<{ openSignMessageDialog: () => void }>(null);

  const onConnected = useCallback(async () => {
    ref.current?.openSignMessageDialog();
  }, []);

  const onConnectFailed = useCallback(() => {}, []);

  const walletConnectModalProps = useMemo(() => {
    return {
      t,
      locale: lng,
      staticHost: "",
      walletConnectionModal: WalletConnectionModal,
      onConnect,
      onConnected,
      onConnectFailed,
    };
  }, [lng, t, onConnect, onConnected, onConnectFailed]);
  return (
    <WagmiReactQueryProvider
      {...defaultOptions}
      config={config}
      initialChainNetwork={initialChainNetwork}
      initialState={initialState}
      supportedChains={supportedChains ?? defaultOptions.supportedChains}
      reloadAfterNetworkSwitch={false}
      // @ts-expect-error -- ignore first
      walletConnectModalProps={walletConnectModalProps}
      staticHost=""
    >
      {children}
      <CexLoginSession ref={ref} />
    </WagmiReactQueryProvider>
  );
};

export default WagmiProvider;
