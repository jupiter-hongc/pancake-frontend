import { cn } from "@/ui/utils";
import React from "react";

export const OrderF = (
  props: React.SVGProps<SVGSVGElement> & { orderType: "buy" | "sell" }
) => {
  const { orderType, ...rest } = props;
  return (
    <svg width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...rest}>
      <rect
        x="3.5"
        y="3.5"
        width="7"
        height="17"
        className={cn(
          orderType === "buy"
            ? "stroke-interactive-buy"
            : "stroke-interactive-sell"
        )}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 4h7v4h-7V4zm0 6h7v4h-7v-4zm7 6h-7v4h7v-4z"
        fill="currentColor"
      />
    </svg>
  );
};

export const OrderBookF = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
      <rect x="3.5" y="3.5" width="7" height="7" className="stroke-t-buy" />
      <rect x="3.5" y="13.5" width="7" height="7" className="stroke-t-sell" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 3H13V6H21V3ZM21 8H13V11H21V8ZM13 13H21V16H13V13ZM21 18H13V21H21V18Z"
        fill="currentColor"
      />
    </svg>
  );
};
