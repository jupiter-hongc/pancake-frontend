import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/ui/Drawer";

import React, { useCallback } from "react";
import { type Connector } from "wagmi";

import { WalletConnectButton } from "./WalletConnectButton";
import type { WalletConnectModalOnConnect } from "./WalletConnectModalProvider";

export type Props = {
  visible: boolean;
  onClose: () => void;
  Trans?: React.ElementType;
  Link?: React.ElementType;
  staticHost: string;
} & WalletConnectModalOnConnect;

const WalletConnectionModal = ({
  visible,
  onClose,
  staticHost,
  onConnect,
  onConnected,
  onConnectFail,
}: Props) => {
  const onWalletConnectButtonConnected = useCallback(
    (connector: Connector) => {
      onConnected?.(connector);
      onClose();
    },
    [onClose, onConnected]
  );

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (open === false) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <Drawer open={Boolean(visible)} onOpenChange={onOpenChange}>
      <DrawerContent className="w-full outline-none border-none rounded-t-3xl bg-interactive-interactiveBg p-4 px-3 border border-border-line pb-[max(env(safe-area-inset-bottom,1.5rem),1.5rem)]">
        <DrawerHeader className="py-4 mb-0 text-center">
          <DrawerTitle className="text-h4">Connect Wallet</DrawerTitle>
        </DrawerHeader>
        <WalletConnectButton
          staticHost={staticHost}
          onConnect={onConnect}
          onConnected={onWalletConnectButtonConnected}
          onConnectFail={onConnectFail}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default WalletConnectionModal;
