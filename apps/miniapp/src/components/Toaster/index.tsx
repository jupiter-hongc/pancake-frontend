import "./toaster.css";

import { type ToastT, Toaster, toast } from "sonner";

import { cn } from "@/ui/utils";

const toastOptions: Partial<ToastT> = {
  unstyled: true,
  className:
    "bg-interactive-interactiveBg w-full p-4 rounded-3xl border border-b-2 border-border-line shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] pointer-events-auto",
  classNames: {
    // success: 'border-support-success',
    // error: "border-t-error",
  },
};

// eslint-disable-next-line react-refresh/only-export-components
export default () => {
  return (
    <Toaster
      theme={"dark"}
      className="shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] font-kanit"
      cn={cn}
      position="top-right"
      toastOptions={toastOptions}
      icons={{}}
    />
  );
};

// @ts-expect-error - ignore
window.toast = toast;
