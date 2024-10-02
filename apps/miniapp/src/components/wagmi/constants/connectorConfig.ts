import metaMaskLogo from "@/assets/metamaskW.webp";
import binance from "@/assets/binance-w3w.webp";
import walletConnect from "@/assets/walletconnect.webp";
import codexfield from "@/assets/codexfield.svg";

export type ConnectorId =
  | "DefiWallet"
  | "metaMask"
  | "walletConnect"
  | "binance"
  | "braveWallet"
  | "apollox"
  | "safepal"
  | "trustWallet"
  | "tokenPocket"
  | "coinbaseWallet"
  | "apolloxWalletConnect"
  | "trustWalletWalletConnect"
  | "unipass"
  | "okxWallet"
  | "injected"
  | string;

export type ConnectorConfig = {
  connectorId: ConnectorId;
  logoUrlPath: string;
  handleConnectorNotFoundError: ({
    isMobile,
  }?: {
    isMobile?: boolean;
  }) => Promise<void>;
  connectorName?: string;
};

export const connectorConfig = new Map<ConnectorId, ConnectorConfig>([
  [
    "metaMaskSDK",
    {
      connectorId: "metaMaskSDK",
      logoUrlPath: metaMaskLogo,
      handleConnectorNotFoundError: async () => {},
    },
  ],
  [
    "walletConnect",
    {
      connectorId: "walletConnect",
      logoUrlPath: walletConnect,
      handleConnectorNotFoundError: async () => {},
    },
  ],
  [
    "BinanceW3WSDK",
    {
      connectorId: "BinanceW3WSDK",
      logoUrlPath: binance,
      handleConnectorNotFoundError: async () => {},
    },
  ],
  [
    "codex-field-wallet",
    {
      connectorId: "codex-field-wallet",
      logoUrlPath: codexfield,
      handleConnectorNotFoundError: async () => {},
    },
  ],
]);

export const getConnectorConfigById = (id: ConnectorId) =>
  connectorConfig.get(id);
