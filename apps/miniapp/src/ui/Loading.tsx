import React from "react";
import ReactDOM from "react-dom";

import { cn } from "./utils";
import { Spinner } from "./Spinner";

interface LoadingProps {
  show?: boolean;
  fullScreen?: boolean;
  inner?: boolean;
  color?: string;
  children?: React.ReactNode;
  className?: string;
}

const Loading = ({
  show = true,
  fullScreen = false,
  inner,
  color = "var(--colors-interactive-primary)",
  children,
  className,
}: LoadingProps) => {
  if (!show) return <>{children || null}</>;

  const spinner = (
    <Spinner
      className={cn(
        "absolute -translate-x-2/4 -translate-y-2/4 text-center left-2/4 top-2/4",
        className
      )}
      color={color}
    />
  );

  if (!fullScreen) {
    return (
      <>
        {children}
        {spinner}
      </>
    );
  }
  return (
    <>
      {children}
      <div
        className={cn(
          "top-0 left-0 w-full h-full z-[2000] bg-spinner-radial",
          className
        )}
        style={{
          position: inner ? "absolute" : "fixed",
        }}
      >
        {spinner}
      </div>
    </>
  );
};

let ele: HTMLElement;

Loading.show = ({ fullScreen = false } = {}) => {
  if (!ele) {
    ele = document.createElement("div");
    document.body.appendChild(ele);
  }
  ReactDOM.render(<Loading fullScreen={fullScreen} />, ele);
};

Loading.hide = () => {
  if (!ele) return;
  ReactDOM.render(<Loading show={false} />, ele);
};

export { Loading };
