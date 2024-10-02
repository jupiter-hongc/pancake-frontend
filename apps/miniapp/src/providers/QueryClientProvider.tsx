import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { queryClient } from "./constants";

type Props = {
  children?: React.ReactNode;
};

export default function ReactQueryClientProvider(props: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
