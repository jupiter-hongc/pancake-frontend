import { BetRound, useGetUserRounds } from "@/hooks/useGetUserRounds";
import { Button } from "@/ui/Button";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Header, { HeaderEndPortal, HeaderStartPortal } from "../Header";
import { Accordion } from "@/ui/Accordion";
import history from "@/assets/history.webp";
import { createLazyRoute, Link } from "@tanstack/react-router";
import { RoundInfo } from "./RoundInfo";
import { useIntersection, useToggle } from "react-use";

import { Drawer, DrawerContent } from "@/ui/Drawer";
import { ClaimModal } from "./ClaimModal";
import { useGetUserRoundsLength } from "@/hooks/useGetUserRoundsLength";
import { useAccount } from "wagmi";
import MainNav from "../MainNav";
import { cn } from "@/ui/utils";

export default function History() {
  const ref = useRef<HTMLDivElement>(null);

  const {
    data: total,
    isFetched: isTotalFetched,
    refetch: refreshUserRoundsTotal,
  } = useGetUserRoundsLength();
  const { refetch: refreshUserRounds } = useGetUserRounds();
  const [claimEpochs, setClaimEpochs] = useState<bigint[]>([]);
  const { isConnected } = useAccount();
  useEffect(() => {
    if (!isConnected) {
      location.href = "/predictions";
    }
  }, [isConnected]);
  const [claimDrawOpen, toggleClaimDrawOpen] = useToggle(false);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetched,
  } = useGetUserRounds();

  const entry = useIntersection(ref, {
    root: null,
    rootMargin: "10px",
    threshold: 1,
  });

  const isFetchingNextPageRef = useRef(isFetchingNextPage);
  const isLoadingRef = useRef(isLoading);
  isFetchingNextPageRef.current = isFetchingNextPage;
  isLoadingRef.current = isLoading;
  console.log("isIntersectionVisible", entry?.isIntersecting);
  useEffect(() => {
    if (isLoadingRef.current) return;
    if (!hasNextPage || isFetchingNextPageRef.current) return;
    if (entry?.isIntersecting) {
      console.log("fetch next page");
      fetchNextPage?.();
    }
  }, [hasNextPage, entry?.isIntersecting, fetchNextPage]);

  const userRounds = useMemo(
    () =>
      (data?.pages.map((page) => page).flat() ?? []).filter(
        Boolean
      ) as BetRound[],
    [data]
  );
  const doClaim = useCallback(
    async (epochs: bigint[]) => {
      setClaimEpochs(epochs);
      toggleClaimDrawOpen(true);
    },
    [setClaimEpochs, toggleClaimDrawOpen]
  );
  const onClaimed = useCallback(() => {
    toggleClaimDrawOpen(false);
    refreshUserRoundsTotal();
    refreshUserRounds();
  }, [toggleClaimDrawOpen, refreshUserRoundsTotal, refreshUserRounds]);

  const previousItems = useRef<string[]>([]);

  return (
    <>
      <div
        className={cn(
          "min-h-[var(--tg-viewport-stable-height,100dvh)] grid grid-rows-[1fr_max-content] bg-interactive-interactiveBg",
          !isLoading && total === 0n && isTotalFetched && "bg-background-bg2"
        )}
      >
        <Header />
        <main className="pt-14">
          {isLoading ? (
            <div className="h-full grid place-content-center">
              <img
                className="w-auto h-[59px] mx-auto block"
                alt="calculating"
                src="https://assets.pancakeswap.finance/web/pancake-3d-spinner-v2.gif"
              />
              <span className="sr-only">Loading ...</span>
            </div>
          ) : null}
          {!isLoading && total === 0n && isTotalFetched ? (
            <div className="h-max min-h-full flex flex-col justify-center items-center bg-background-bg2 [box-shadow:0px_2px_0px_-1px_rgba(0,0,0,0.06)_inset]">
              <img
                src={history}
                alt="No Record Rabbit"
                className="w-[13.4375rem]"
                aria-hidden="true"
              />
              <p className="text-small mt-4 text-center">
                You don't have any position.
              </p>
              <Button asChild className="mt-4 text-small h-12 max-w-40 w-full">
                <Link to="/predictions">Play now</Link>
              </Button>
            </div>
          ) : null}
          {!isLoading && userRounds.length > 0 && isFetched ? (
            <div className="grid grid-cols-[repeat(2,max-content)_1fr_max-content] gap-x-4 max-w-full overflow-auto bg-interactive-interactiveBg min-h-full auto-rows-min">
              <div className="grid grid-cols-subgrid col-span-4 py-2 border-border-line text-preTitle text-t-secondary border-b uppercase">
                <div className="pl-4"></div>
                <div className="pr-2">Round</div>
                <div className="">Result</div>
                <div className="pr-4"></div>
              </div>

              <Accordion
                type="multiple"
                className="contents"
                onValueChange={(items) => {
                  const epochId = items[items.length - 1];

                  const userRoundsIndex = userRounds.findIndex(
                    (r) => r.epoch.toString() === epochId
                  );

                  if (userRoundsIndex === 0) return;

                  if (previousItems.current.length < items.length) {
                    console.log(userRounds);

                    const target = document.getElementById(
                      items[items.length - 1]
                    );

                    if (!target) return;

                    setTimeout(() => {
                      target.scrollIntoView({
                        behavior: "smooth",
                      });
                    }, 200);
                  }

                  previousItems.current = items;
                }}
              >
                {userRounds.map((betRound) => {
                  return (
                    <RoundInfo
                      betRound={betRound}
                      key={betRound.epoch}
                      onClaim={doClaim.bind(null, [betRound.epoch])}
                    />
                  );
                })}
              </Accordion>
            </div>
          ) : null}
          <div className="" ref={ref} />
        </main>
        <MainNav className="sticky bottom-0" />
      </div>
      <Drawer open={claimDrawOpen} onOpenChange={toggleClaimDrawOpen}>
        <DrawerContent className="px-4 pb-[max(env(safe-area-inset-bottom,1.5rem),1.5rem)]">
          <ClaimModal
            betRounds={userRounds.filter(
              (i) =>
                claimEpochs.find((epoch) => epoch === i.epoch) &&
                i.win &&
                i.round.closePrice !== 0n &&
                !i.bet.claimed
            )}
            onClose={onClaimed}
          />
        </DrawerContent>
      </Drawer>
      <HeaderStartPortal>
        <h1 className="text-h4 text-t-inverse">History</h1>
      </HeaderStartPortal>
      {userRounds.length > 0 ? (
        <HeaderEndPortal>
          <Button
            variant={"primary"}
            className="h-9 text-t-white"
            disabled={userRounds.every((i) => !i.win || i.bet.claimed)}
            onClick={doClaim.bind(
              null,
              userRounds.filter((i) => !i.canceled).map((i) => i.epoch)
            )}
          >
            Claim All
          </Button>
        </HeaderEndPortal>
      ) : null}
    </>
  );
}

export const Route = createLazyRoute("/main-layout/history")({
  component: History,
});
