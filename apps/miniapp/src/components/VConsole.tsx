import { useScript } from "@uidotdev/usehooks";
import { useEffect } from "react";

export const VConsole = () => {
  const status = useScript(
    "https://unpkg.com/vconsole@3.15.1/dist/vconsole.min.js"
  );

  useEffect(() => {
    if (status === "ready") {
      const vconsole = new window.VConsole();
      return () => {
        vconsole.destroy();
      };
    }
    return () => {};
  }, [status]);

  return null;
};
