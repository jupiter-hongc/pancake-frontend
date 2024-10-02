import { WalletConnectParameters } from "wagmi/connectors";

export type WalletConnectConnectorQrModalOptions =
  WalletConnectParameters["qrModalOptions"];

export const DEFAULT_QR_MODAL_OPTIONS: WalletConnectConnectorQrModalOptions = {
  explorerExcludedWalletIds: [
    "80c7742837ad9455049270303bccd55bae39a9e639b70d931191269d3a76320a",
  ],
  themeVariables: {
    "--wcm-z-index": "3000",
  },
};
