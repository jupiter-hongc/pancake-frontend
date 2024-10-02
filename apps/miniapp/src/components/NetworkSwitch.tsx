import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import { Button } from "@/ui/Button";
import { cn } from "@/ui/utils";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { getNetworkCustomConfigById, getNetworkNameById } from "./wagmi";

import { useCallback, useMemo } from "react";
import { useCloudWalletConnectContext } from "./wagmi";

//   import { useAstherusLanguage } from '@/hooks'

const useChainsToShow = () => {
  const { supportedChains, hideChains } = useCloudWalletConnectContext();
  return useMemo(() => {
    if (!hideChains || hideChains.length === 0) {
      return supportedChains;
    }
    return supportedChains.filter(
      (supportedChain) =>
        !hideChains.find((hideChain) => supportedChain.id === hideChain.id)
    );
  }, [hideChains, supportedChains]);
};

const Overlay = ({
  staticHost,
  onSwitchNetwork,
}: {
  staticHost: string;
  onSwitchNetwork: (id: number) => void;
}) => {
  const chainId = useChainId();
  const chainsToShow = useChainsToShow();

  return (
    <>
      {chainsToShow.map((network) => {
        const isActive = network.id === chainId;
        return (
          <DropdownMenuItem asChild key={network.id}>
            <button
              type="button"
              onClick={async () => {
                if (chainId === network.id) return;

                onSwitchNetwork(network.id);
              }}
              className={`text-left text-subtitle2 justify-start rounded-none w-full px-4 py-2.5 relative text-t-primary hover:bg-interactive-interactiveBgHover focus:bg-interactive-interactiveBgActive cursor-pointer font-normal after:absolute after:right-4 after:content-[''] after:w-2 after:h-2 after:rounded-full after:bg-interactive-buy ${
                isActive ? "after:block" : "after:hidden"
              }`}
            >
              <img
                className="mr-1.5 w-5- h-5"
                src={`${staticHost}${
                  getNetworkCustomConfigById(network.id)?.iconUrlPath
                }`}
              />
              {getNetworkNameById(network.id, network.name)}
            </button>
          </DropdownMenuItem>
        );
      })}
    </>
  );
};

const WrongNetworkOverlay = ({
  onSwitchNetwork,
}: {
  onSwitchNetwork: (id: number) => void;
}) => {
  const chainsToShow = useChainsToShow();

  return (
    <div className="px-3 py-4">
      <p className="text-caption1 sm:text-body2 text-t-third text-center mb-4">
        Network not supported
      </p>
      <p className="text-caption1 text-t-third text-center mb-2">Switch to</p>
      <div className="space-y-2">
        {chainsToShow.map((chain) => {
          return (
            <Button
              key={chain.id}
              type="button"
              onClick={() => {
                onSwitchNetwork(chain.id);
              }}
              size="sm"
              className="text-subtitle3 sm:text-subtitle2 py-1 sm:py-1.5 h-6 sm:h-8 w-full"
            >
              {getNetworkNameById(chain.id, chain.name)}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

type Props = {
  staticHost: string;

  sideOffset?: number;
};

const NetworkSwitch = ({ staticHost, sideOffset }: Props) => {
  const { onSwitchNetwork } = useCloudWalletConnectContext();
  const { switchChainAsync } = useSwitchChain();
  const chainId = useChainId();

  const { chain, isConnected } = useAccount();

  const chainsToShow = useChainsToShow();

  const currentChain = useMemo(
    () => chainsToShow.find((supportedChain) => supportedChain.id === chainId),
    [chainsToShow, chainId]
  );
  const iconUrlPath = getNetworkCustomConfigById(currentChain?.id)?.iconUrlPath;

  const isUnsupportedNetwork = useMemo(() => {
    return (
      isConnected &&
      (chain === undefined ||
        !chainsToShow.some((chainToShow) => chainToShow.id === chain?.id))
    );
  }, [chain, chainsToShow, isConnected]);

  const handleSwitchNetwork = useCallback(
    async (id: number) => {
      try {
        await switchChainAsync?.({ chainId: id });
        if (onSwitchNetwork) {
          onSwitchNetwork(id);
        }
        return;
      } catch (error) {
        logger.error(error);
      }
    },
    [onSwitchNetwork, switchChainAsync]
  );

  return (
    <div className="items-center flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant={isUnsupportedNetwork ? "supportError" : "secondary"}
            id="networkDropdownMenuButton"
            size="sm"
            className={cn(
              "text-body2 h-[26px] md:h-9 rounded-none px-2 md:pl-4 md:pr-3 bg-transparent border-border-line border border-solid whitespace-nowrap",
              {
                "border-t-error bg-t-error bg-opacity-15 text-t-error":
                  isUnsupportedNetwork,
              }
            )}
          >
            {isUnsupportedNetwork ? (
              <>
                {/* <CircledWarningD className="w-5 h-5 md:hidden" /> */}
                <span className="hidden md:inline whitespace-nowrap">
                  Wrong Network
                </span>
              </>
            ) : (
              <div className="flex gap-1">
                <img
                  className="h-[18px] w-[18px] md:h-5 md:w-5"
                  src={`${staticHost}${iconUrlPath}`}
                />
                {getNetworkNameById(currentChain?.id, currentChain?.name)}
              </div>
            )}
            {/* <div>{!isUnsupportedNetwork && <ArrowDownG className="ml-1 w-2.5 h-1.5 text-t-third" />}</div> */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent
            align="end"
            sideOffset={sideOffset ?? 4}
            side="bottom"
            className="bg-interactive-interactiveBg border-border-line border border-solid rounded-none min-w-[188px] max-w-[188px] overflow-hidden"
          >
            {isUnsupportedNetwork ? (
              <WrongNetworkOverlay onSwitchNetwork={handleSwitchNetwork} />
            ) : (
              <Overlay
                staticHost={staticHost}
                onSwitchNetwork={handleSwitchNetwork}
              />
            )}
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  );
};

export default NetworkSwitch;
