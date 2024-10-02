import { CakeSvg } from "@/icons/Cake";
import { cn } from "@/ui/utils";
import { Portal } from "@radix-ui/react-portal";
import { Link, useMatchRoute } from "@tanstack/react-router";
import React from "react";
import { useLayoutEffect, useState } from "react";

let HeaderStartNode: HTMLElement | null = null;
let HeaderEndNode: HTMLElement | null = null;

const Header = React.forwardRef(function Header(
  {
    className,
  }: {
    className?: string;
  },
  ref
) {
  const matchRoute = useMatchRoute();

  const isHistoryPage = matchRoute({ to: "/history" });
  const isRulesPage = matchRoute({ to: "/rules" });

  return (
    <header
      // @ts-expect-error - ignore
      ref={ref}
      className={cn(
        `z-30 px-4 h-14 flex justify-between has-[#header-end:empty]:justify-center`,
        isHistoryPage || isRulesPage
          ? "bg-background-bg1 fixed top-0 inset-x-0"
          : "",
        className
      )}
    >
      <div
        ref={(node) => {
          HeaderStartNode = node;
        }}
        className="flex items-center gap-1.5"
      >
        <Link to="/">
          <CakeSvg className="w-6 h-6" />
        </Link>
      </div>
      <div
        ref={(node) => {
          HeaderEndNode = node;
        }}
        className="empty:contents flex justify-end items-center flex-1"
        id="header-end"
      />
    </header>
  );
});

export default Header;

export const HeaderStartPortal: React.FC<
  Omit<React.ComponentProps<typeof Portal>, "container">
> = (props) => {
  const [node, setNode] = useState<HTMLElement | null>(null);
  useLayoutEffect(() => {
    setNode(HeaderStartNode);
  }, []);
  if (!node) return null;
  return <Portal {...props} container={node} />;
};

export const HeaderEndPortal: React.FC<
  Omit<React.ComponentProps<typeof Portal>, "container">
> = (props) => {
  const [node, setNode] = useState<HTMLElement | null>(null);
  useLayoutEffect(() => {
    setNode(HeaderEndNode);
  }, []);
  if (!node) return null;
  return <Portal {...props} container={node} />;
};
