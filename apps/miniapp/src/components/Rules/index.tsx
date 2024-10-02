import { Button } from "@/ui/Button";
import Header, { HeaderStartPortal } from "../Header";
import { createLazyRoute, Link } from "@tanstack/react-router";
import MainNav from "../MainNav";

export default function Rules() {
  return (
    <>
      <div className="min-h-[var(--tg-viewport-stable-height,100dvh)] bg-background-bg2 grid grid-rows-[1fr_max-content]">
        <Header />
        <div className="h-full shadow-[0px_2px_0px_-1px_rgb(0_0_0_/_0.06)_inset] px-8 text-center text-balance space-y-4 pb-4 pt-24">
          <p className="text-bold">
            Predict BNB price will rise or fall - guess correctly to win!
          </p>
          <p>
            Predict if the price of BNBUSD will be higher or lower than it was
            when the “LIVE” phase starts.
          </p>

          <span
            className="block text-t-disabled text-extraSmall leading-4"
            aria-hidden="true"
          >
            ✦ ✦ ✦
          </span>

          <p>
            If you enter an “UP” position, and the “Closed Price” is higher than
            the “Locked Price” at the end of the 5 minute LIVE phase, you WIN!
            And if it's lower, you lose.
          </p>

          <span
            className="block text-t-disabled text-extraSmall leading-4"
            aria-hidden="true"
          >
            ✦ ✦ ✦
          </span>

          <p>
            If you enter a “DOWN” position, and the “Closed Price” is higher
            than the “Locked Price” at the end of the 5 minute LIVE phase, you
            LOSE! If it's lower, you win.
          </p>

          <Button asChild className="mt-4 text-small h-12 max-w-40 w-full">
            <Link to="/predictions">Play now</Link>
          </Button>
          {import.meta.env.VITE_COMMIT_SHA ? (
            <div className="text-t-disabled">
              <p className="text-extraSmall text-center">
                Version: 1.0.{import.meta.env.VITE_BUILD_NUMBER}
              </p>
            </div>
          ) : null}
        </div>
        <MainNav className="sticky bottom-0" />
      </div>
      <HeaderStartPortal>
        <h1 className="text-h4 text-t-inverse">How to play</h1>
      </HeaderStartPortal>
    </>
  );
}

export const Route = createLazyRoute("/main-layout/rules")({
  component: Rules,
});
