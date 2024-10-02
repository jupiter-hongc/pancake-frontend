import { Link } from "@tanstack/react-router";
import ConnectButton from "./ConnectButton";
import { useAccount } from "wagmi";
import { CircledInfoD } from "@/icons/CircledInfoD";
import { cn } from "@/ui/utils";
import WebApp from "@twa-dev/sdk";

const PredictionIcon = (props: React.SVGAttributes<HTMLOrSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="24"
    fill="none"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12.43 17.852 8.21 20.29a2 2 0 0 1-2.733-.732L1.333 12.38a2 2 0 0 1 .732-2.732L6.651 7c.217-.125.448-.206.682-.243V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v.735c.3.019.6.105.876.265l4.586 2.648a2 2 0 0 1 .732 2.732l-4.144 7.177a2 2 0 0 1-2.732.732l-4.22-2.437ZM9.333 6h6v1.982L11.57 14.5H9.333V6Zm-2 8.5V8.916L3.065 11.38l4.144 7.177 3.563-2.057H9.333a2 2 0 0 1-2-2Zm9.876-5.768 4.586 2.648-4.144 7.177-4.585-2.648 4.143-7.177Z"
      clipRule="evenodd"
    />
  </svg>
);

const HistoryIcon = (props: React.SVGAttributes<HTMLOrSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M13 3a9 9 0 0 0-9 9H2.207a.5.5 0 0 0-.353.854l2.692 2.692a.5.5 0 0 0 .697.01l2.845-2.693A.5.5 0 0 0 7.744 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7a6.931 6.931 0 0 1-4.183-1.399c-.443-.334-1.076-.342-1.468.05-.392.392-.395 1.031.037 1.377A8.935 8.935 0 0 0 13 21a9 9 0 0 0 0-18Zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12Z"
    />
  </svg>
);

export default function MainNav({ className }: { className?: string }) {
  const { isConnected } = useAccount();
  return (
    <>
      <footer
        className={cn(
          "p-4 main-nav",
          WebApp.initData && "within-telegram",
          className
        )}
      >
        <div />
        <nav className="bg-background-bg1 relative z-30 h-16 rounded-full px-4 shadow-[0_4px_8px_0_rgba(0,0,0,0.16),0_1px_2px_0_rgba(0,0,0,0.08)] border border-b-2 border-border-line">
          <ul
            className={cn(
              "grid grid-cols-[repeat(4,minmax(max-content,1fr))] gap-4 text-center h-full items-center max-w-sm mx-auto text-xs font-normal leading-4 text-t-fillSecondary",
              !isConnected &&
                "grid-cols-[repeat(2,minmax(max-content,1fr))_minmax(50%,1fr)] gap-0"
            )}
          >
            {isConnected ? (
              <>
                <li>
                  <Link
                    to="/predictions"
                    className="data-[status=active]:font-semibold data-[status=active]:text-t-secondary flex flex-col items-center"
                  >
                    <PredictionIcon />
                    Prediction
                  </Link>
                </li>
                <li>
                  <Link
                    to="/history"
                    className="data-[status=active]:font-semibold data-[status=active]:text-t-secondary flex flex-col items-center"
                  >
                    <HistoryIcon />
                    History
                  </Link>
                </li>
                <li>
                  <Link
                    to="/rules"
                    className="data-[status=active]:font-semibold data-[status=active]:text-t-secondary flex flex-col items-center"
                  >
                    <CircledInfoD />
                    Rules
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/predictions"
                    className="data-[status=active]:font-semibold data-[status=active]:text-t-secondary flex flex-col items-center"
                  >
                    <PredictionIcon />
                    Prediction
                  </Link>
                </li>
                <li className="pr-4">
                  <Link
                    to="/rules"
                    className="data-[status=active]:font-semibold data-[status=active]:text-t-secondary flex flex-col items-center"
                  >
                    <CircledInfoD />
                    Rules
                  </Link>
                </li>
              </>
            )}
            <li className="flex justify-center">
              <ConnectButton
                connectText="Connect"
                className={cn("px-2 w-full", isConnected && "w-auto")}
                appendChild={
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.6667 3.33331C15.9167 3.33331 16.3333 3.74998 16.3333 4.99998L16.3333 6.66665C17.2538 6.66665 18 7.41284 18 8.33331L18 14.1666C18 15.8333 17.1667 16.6666 15.4992 16.6666H5.5C3.83333 16.6666 3 15.8333 3 14.1666L3 5.83331C3 4.58331 4.25 3.33331 5.5 3.33331L14.6667 3.33331ZM4.66667 5.83331C4.66667 5.37308 5.03976 4.99998 5.5 4.99998L16.3333 4.99998L16.3333 6.66665L5.5 6.66665C5.03976 6.66665 4.66667 6.29355 4.66667 5.83331ZM14.6667 13.3333C15.5 13.3333 16.3342 12.5 16.3333 11.6666C16.3325 10.8333 15.5 9.99998 14.6667 9.99998C13.8333 9.99998 13 10.8333 13 11.6666C13 12.5 13.8333 13.3333 14.6667 13.3333Z"
                      fill="white"
                    />
                  </svg>
                }
              />
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}
