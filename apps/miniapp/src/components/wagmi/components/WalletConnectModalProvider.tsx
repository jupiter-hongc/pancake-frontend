"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { type Connector } from "wagmi";

import type { Props as WalletConnectionModalProps } from "./WalletConnectionModal";
import WalletConnectionModal from "./WalletConnectionModal";

type WalletConnectModalContextValue = {
  setWalletConnectModalVisibility: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

const WalletConnectModalContext = createContext<WalletConnectModalContextValue>(
  {
    setWalletConnectModalVisibility: () => {},
  }
);

export const useWalletConnectModal = () =>
  useContext(WalletConnectModalContext);

export type WalletConnectModalOnConnect = {
  onConnect?: (connector: Connector) => void;
  onConnected?: (connector: Connector) => void;
  onConnectFail?: (connector: Connector, error: Error) => void;
};

export type Props = Omit<
  React.ComponentProps<typeof WalletConnectionModal>,
  "visible" | "onClose"
> & {
  children?: React.ReactNode;
  staticHost: string;
  locale?: string;
  t: () => string;
  walletConnectionModal?: (
    props: WalletConnectionModalProps
  ) => React.JSX.Element;
} & WalletConnectModalOnConnect;

export const WalletConnectModalProvider: React.FC<Props> = ({
  children,
  locale = "en",
  t = () => {},
  Link,
  Trans,
  staticHost,
  walletConnectionModal,
  onConnect,
  onConnected,
  onConnectFail,
}) => {
  const [visible, setVisible] = useState(false);
  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  const providerValue = useMemo<WalletConnectModalContextValue>(() => {
    return {
      setWalletConnectModalVisibility: setVisible,
    };
  }, []);

  return (
    <WalletConnectModalContext.Provider value={providerValue}>
      {children}
      {React.createElement(walletConnectionModal ?? WalletConnectionModal, {
        visible,
        // @ts-expect-error - FIXME
        locale,
        onClose,
        t,
        Link,
        Trans,
        staticHost,
        onConnect,
        onConnected,
        onConnectFail,
      })}
    </WalletConnectModalContext.Provider>
  );
};
