import { BetPosition, DismissDuration } from "@/constants";
import usePollOraclePrice from "@/hooks/usePollOraclePrice";
import { RoundedData } from "@/hooks/useRoundsData";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { Tabs, TabsList, TabsTrigger } from "@/ui/Tabs";
import { cn } from "@/ui/utils";
import { formatBigIntToFixed, formatNumberWithoutZero } from "@/utils/format";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { formatUnits, parseUnits } from "viem";
import { usePayout } from "@/hooks/usePayout";
import ConnectButton from "../ConnectButton";
import { usePredictionData } from "@/hooks/usePredictionData";

import { toast } from "sonner";

import { Loading } from "@/icons/Loading";

import { useNotifyApiPlaceOrder, usePlaceOrder } from "@/hooks/usePlaceOrder";
import { logger } from "@/lib/logger";
import { useGetUserRoundsLength } from "@/hooks/useGetUserRoundsLength";
import { WalletSvg } from "@/icons/Wallet";
import { useHasNewOrder } from "@/hooks/useHasNewOrder";
import { WaveCircle } from "../Effect/WaveCircle";
import { TimeoutError } from "@/utils/errors";
import WebApp from "@twa-dev/sdk";
import { NoResponseReload } from "../NoResponseReload";

const USDDecimal = 4;
const Percents = ["10%", "25%", "50%", "100%"];

export const BetPositionOrder = ({
  open,
  round,
  progress,
  position,
  setPosition,
  onClose,
  refetchLedger,
}: {
  round: RoundedData;
  progress: number;
  open: boolean;
  position: BetPosition;
  setPosition: (position: BetPosition) => void;
  onClose?: () => void;
  refetchLedger?: () => void;
}) => {
  const { price } = usePollOraclePrice();
  const { refetch: refreshUserRoundsTotal } = useGetUserRoundsLength();

  const [amount, setAmount] = useState("");
  const dust = parseUnits("0.001", 18);

  const [upDownTouched, setUpDownTouched] = useState(false);

  const { address, connector } = useAccount();
  const {
    data: { minBetAmount },
  } = usePredictionData();
  const [_, setHasNewOrder] = useHasNewOrder();
  const payout = usePayout(round);
  const ref = useRef<HTMLInputElement>(null);
  const { data } = useBalance({
    address: address as `0x${string}`,
    query: {
      enabled: Boolean(address),
    },
  });
  const decimal = data?.decimals || 18;
  const balance = data?.value || 0n;
  const available = useMemo(
    () => (balance && balance > dust ? balance - dust : 0n),
    [balance, dust]
  );

  const {
    mutateAsync: placeOrder,
    isPending: isPlaceOrderPending,
    reset: restPlaceOrder,
  } = usePlaceOrder();
  const { mutateAsync: notifyPlaceOrder } = useNotifyApiPlaceOrder();

  const isPending = isPlaceOrderPending;

  const { isConnected } = useAccount();

  useEffect(() => {
    if (open && isConnected) {
      const timeoutId = setTimeout(() => {
        ref.current?.focus();
      }, 400);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [open, isConnected]);

  const partAvailable = useCallback(
    (x: string) => {
      const percent = Number(x.replace("%", ""));
      setAmount(formatUnits((available * BigInt(percent)) / 100n, decimal));
    },
    [available, decimal]
  );

  const error = useMemo(() => {
    if (!open) return undefined;
    if (!address) return undefined;
    if (amount === "" || Number(amount) === 0) return undefined;
    const value = parseUnits(amount || "0", decimal);
    if (value > available) {
      return "Insufficient BNB balance";
    }
    if (value <= 0n || value < BigInt(minBetAmount || "0")) {
      return `A minimum amount of ${formatUnits(
        BigInt(minBetAmount || "0"),
        decimal
      )} BNB is required`;
    }
    return undefined;
  }, [address, amount, available, decimal, minBetAmount, open]);

  const onConfirm: React.FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault();
      if (error !== undefined || !address) return;

      let toastId: number | string = 0;

      try {
        const placeOrderPromises = Promise.allSettled([
          placeOrder({
            amount: parseUnits(amount || "0", decimal),
            epoch: round.epoch,
            position,
          }),
          notifyPlaceOrder({
            amount: Number(amount),
            epoch: Number(round.epoch),
            position,
          }),
        ]);

        // Hack fix for metamask sdk opening the deep link
        if (connector?.id === "metaMaskSDK" && WebApp.initData) {
          window.open("https://metamask.app.link", "_blank");
        }

        toastId = toast(
          <div>
            <h2 className="text-h4 text-t-fillSecondary">Notice</h2>
            <p className="text-extraSmall text-t-fillSecondary">
              Please open your connected wallet to confirm the transaction
            </p>
          </div>,
          {
            duration: 5000,
          }
        );

        await Promise.race([
          placeOrderPromises,
          new Promise((_, reject) => {
            setTimeout(() => {
              reject(new TimeoutError());
            }, 30_000);
          }),
        ]);

        const [placeOrderResponse, notifyPlaceOrderResponse] =
          await placeOrderPromises;

        if (placeOrderResponse.status === "rejected") {
          throw placeOrderResponse.reason;
        }

        if (placeOrderResponse.status === "fulfilled") {
          logger.debug({ placeOrderResponse: placeOrderResponse.value });
        }

        if (notifyPlaceOrderResponse.status === "fulfilled") {
          logger.info({
            notifyPlaceOrderResponse: notifyPlaceOrderResponse.value,
          });
        }

        refetchLedger?.();
        await refreshUserRoundsTotal();
        onClose?.();
        setHasNewOrder(true, 1000);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error instanceof TimeoutError) {
          refetchLedger?.();
          await refreshUserRoundsTotal();
          toast(
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-h4 text-t-fillSecondary">Fail</h2>
              </div>
              <p className="text-extraSmall text-t-fillSecondary">
                Request Timeout{" "}
              </p>
            </div>,
            {
              duration: DismissDuration,
            }
          );
          restPlaceOrder();
          return;
        }

        const isBinanceWallet = connector?.id === "BinanceW3WSDK";
        logger.error(error);
        const errorMsg =
          error?.shortMessage || error?.details || error?.message;
        toast(
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-h4 text-t-fillSecondary">Fail</h2>
              {!isBinanceWallet && error?.cause?.code && (
                <span className="text-extraSmall text-t-fillSecondary">
                  #{error?.cause?.code}
                </span>
              )}
            </div>
            <p className="text-extraSmall text-t-fillSecondary">
              {isBinanceWallet || errorMsg === "" ? "Wallet error" : errorMsg}
            </p>
          </div>,
          {
            duration: DismissDuration,
          }
        );
      } finally {
        toast.dismiss(toastId);
      }
    },
    [
      error,
      address,
      placeOrder,
      amount,
      decimal,
      round.epoch,
      position,
      notifyPlaceOrder,
      refetchLedger,
      refreshUserRoundsTotal,
      onClose,
      setHasNewOrder,
      connector?.id,
      restPlaceOrder,
    ]
  );

  return (
    <>
      <div className="mb-6">
        <div className="mx-auto relative">
          <WaveCircle
            pricePool={round.totalAmount}
            price={price}
            position={upDownTouched ? position : BetPosition.HOUSE}
            progress={progress}
          />
        </div>
      </div>
      <div>
        <Tabs
          className="w-full h-full"
          value={position}
          onValueChange={(v) => {
            setUpDownTouched(true);
            setPosition(v as BetPosition);
          }}
        >
          <TabsList className="p-0 h-10 relative w-full bg-[#e9e5ef] border-border-inputSecondary border rounded-2xl text-t-fillSecondary">
            <div
              className={cn(
                "h-full z-10 py-0 absolute left-0 top-0 rounded-2xl px-2 translate-x-0 bg-t-buy border-b-4 border-[rgba(0,0,0,0.2)] text-base text-t-third w-[50%] transition-all duration-300",
                {
                  "translate-x-[100%] bg-t-sell": position === BetPosition.BEAR,
                  "translate-x-0 bg-t-buy ": position === BetPosition.BULL,
                }
              )}
            />
            <TabsTrigger
              className="h-full relative z-20 py-0 w-full rounded-2xl px-2 text-base text-t-third data-[state=active]:bg-transparent data-[state=active]:text-t-white"
              value={BetPosition.BULL}
            >
              <div className="flex items-center gap-2">
                <span>UP</span>
                <span
                  className={cn(
                    "text-sm",
                    position === BetPosition.BULL ? "font-bold" : "font-normal"
                  )}
                >
                  {payout.up}x
                </span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              className="h-full relative z-10 py-0 w-full rounded-2xl px-2 text-base text-t-third data-[state=active]:bg-transparent data-[state=active]:text-t-white"
              value={BetPosition.BEAR}
            >
              <div className="flex items-center gap-2">
                <span>DOWN</span>
                <span
                  className={cn(
                    "text-sm",
                    position === BetPosition.BEAR ? "font-bold" : "font-normal"
                  )}
                >
                  {payout.down}x
                </span>
              </div>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <form onSubmit={onConfirm} noValidate id="prediction-form">
          <div
            className={cn(
              "py-2 px-3 rounded-2xl border border-border-inputSecondary bg-interactive-interactive01 mt-4 shadow-[0px_2px_0px_-1px_rgba(0,0,0,0.06)_inset]",
              {
                "border-t-error shadow-[0px_0px_0px_4px_rgba(237,75,158,0.2)]":
                  Boolean(error),
                "border-border-inputSecondary": amount.trim() === "",
                "border-t-secondary shadow-[0px_0px_0px_4px_rgba(118,69,217,0.2)]":
                  !error && Number(amount) > 0,
              }
            )}
          >
            {address && (
              <div className="flex items-center gap-1 text-xs font-normal text-t-secondary">
                <WalletSvg className="text-t-fillSecondary w-4 h-4" />
                <span>
                  {formatNumberWithoutZero(formatUnits(balance, 18), 4)} BNB
                </span>
              </div>
            )}
            <div className="mt-1">
              <div className="flex gap-1 items-center">
                <Input
                  type="text"
                  onFocus={(e) => {
                    if (WebApp.initData) {
                      e.currentTarget.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  pattern={`^[0-9]*[.,]?[0-9]{0,18}$`}
                  inputMode="decimal"
                  min="0"
                  disabled={isPending || progress === 1}
                  max={formatUnits(available, 18)}
                  ref={ref}
                  className="h-6 pr-0 bg-transparent text-body text-right text-t-primary py-0"
                  value={amount}
                  placeholder="0.0"
                  onChange={(e) => {
                    e.currentTarget.validity.valid &&
                      setAmount(
                        e.currentTarget.value
                          .replace(/,/g, ".")
                          .replace(/^0+(\d+\.?\d*)/, "$1")
                      );
                  }}
                />
                <span className="text-body text-t-fillSecondary">BNB</span>
              </div>
              {error ? (
                <span className="block text-right h-5 mt-1 text-extraSmall text-t-error">
                  {error}
                </span>
              ) : (
                <span className="block text-right h-5 text-sm font-normal text-t-fillSecondary mt-1">
                  ~
                  {formatBigIntToFixed(
                    parseUnits(amount || "0", 18) * price,
                    USDDecimal,
                    8 + 18
                  )}{" "}
                  USD
                </span>
              )}
            </div>
            {address && (
              <div className="flex gap-1 mt-1">
                {Percents.map((x) => (
                  <button
                    type="button"
                    key={x}
                    className={cn(
                      "rounded-lg w-full text-center bg-t-white text-[#02919D] text-xs font-semibold py-1 px-2 border-[rgba(31,199,212,1)] border-2",
                      address && isPending && "active:bg-t-disabled"
                    )}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (address && !isPending) {
                        partAvailable(x);
                      }
                    }}
                  >
                    {x === "100%" ? "Max" : x}
                  </button>
                ))}
              </div>
            )}
          </div>
          {address ? (
            <>
              <Button
                variant="primary"
                className="h-12 mt-4 text-t-white w-full"
                disabled={
                  !address ||
                  isPending ||
                  Number(amount) === 0 ||
                  Boolean(error) ||
                  progress === 1
                }
                onClick={onConfirm}
              >
                {!isPending &&
                  progress < 1 &&
                  !amount.trim() &&
                  "Enter an amount"}
                {!isPending && progress < 1 && amount.trim() && "Confirm"}
                {isPending && progress < 1 && (
                  <div className="flex gap-2 items-center">
                    <p className="text-bold text-t-white">
                      Open your wallet and confirm
                    </p>
                    <Loading className="w-6 h-6 text-t-white" />
                  </div>
                )}
                {!isPending && progress == 1 && (
                  <div className="flex gap-2 items-center">
                    <p className="text-bold text-t-white">Finish Round</p>
                    <Loading className="w-6 h-6 text-t-white" />
                  </div>
                )}
              </Button>
              <NoResponseReload />
            </>
          ) : (
            <ConnectButton className="rounded-2xl w-full h-12 mt-4" />
          )}
        </form>
      </div>
    </>
  );
};
