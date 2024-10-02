import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
  ScrollRestoration,
} from "@tanstack/react-router";

import ReactQueryClientProvider from "./providers/QueryClientProvider";
import WagmiProvider from "./providers/WagmiProvider";
import Header from "./components/Header";
import MainNav from "./components/MainNav";
import Toaster from "./components/Toaster";
import { VConsole } from "./components/VConsole";
import WebApp from "@twa-dev/sdk";
import ReactGA from "react-ga4";

import { getTelegramStartParams } from "./utils/getTelegramStartParams";

WebApp.ready();
WebApp.disableVerticalSwipes();
WebApp.expand();

const gaOptions: Record<string, unknown> = {};

const startParams = getTelegramStartParams();

// Adding campaign source to tracking
if (startParams.campaign) {
  gaOptions.campaign = startParams.campaign;
}

ReactGA.initialize(import.meta.env.VITE_GA_ID, {
  gaOptions,
});

const rootRoute = createRootRoute({
  component: () => (
    <WagmiProvider>
      <ReactQueryClientProvider>
        <ScrollRestoration />
        <div className="isolate">
          <Outlet />
        </div>
        <Toaster />
        {import.meta.env.VITE_BUILD_ENV === "qa" ? <VConsole /> : null}
      </ReactQueryClientProvider>
    </WagmiProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  loader: () => {
    throw redirect({ to: "/predictions", replace: true });
  },
});

const predictionLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "prediction-layout",
  component: () => {
    return (
      <>
        <div className="bg-[image:var(--colors-cake-page-background)] grid grid-rows-[max-content_1fr_max-content] min-h-[var(--tg-viewport-stable-height,100dvh)] mdh:pt-4">
          <Header />
          <main className="">
            <Outlet />
          </main>
          <MainNav className="sticky bottom-0" />
        </div>
      </>
    );
  },
});

const mainLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "main-layout",
  component: function MainLayout() {
    return <Outlet />;
  },
});

const predictionRoute = createRoute({
  getParentRoute: () => predictionLayout,
  path: "/predictions",
}).lazy(() => import("@/components/Prediction").then((d) => d.Route));

const historyRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/history",
}).lazy(() => import("@/components/History").then((d) => d.Route));

const rulesRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/rules",
}).lazy(() => import("@/components/Rules").then((d) => d.Route));

const routeTree = rootRoute.addChildren([
  predictionLayout,
  mainLayoutRoute,
  indexRoute,
  predictionRoute,
  historyRoute,
  rulesRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
