import { BrowserRouter } from "react-router-dom";
import { RootLayout } from "@/routes";
import { createWeb3Modal } from "@web3modal/wagmi/react";
// import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { SupportedChainsProvider } from "./hooks";
import {
  // chains,
  config
} from "@/config";
import { Toaster } from "react-hot-toast";
import WebsocketService from "./service/WebsocketService";

type ComponentsWithProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TComponents extends readonly React.JSXElementConstructor<any>[]
> = {
  [key in keyof TComponents]: keyof React.ComponentProps<
    TComponents[key]
  > extends never
  ? readonly [TComponents[key]]
  : readonly [TComponents[key], React.ComponentProps<TComponents[key]>];
} & { length: TComponents["length"] };

export const buildProvidersTree = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends readonly React.JSXElementConstructor<any>[]
>(
  componentsWithProps: ComponentsWithProps<T>
) => {
  const initialComponent: React.FC<React.PropsWithChildren> = ({
    children,
  }) => <>{children}</>;

  return componentsWithProps.reduce(
    (AccumulatedComponents, [Provider, props = {}]) => {
      return ({ children }) => {
        return (
          <AccumulatedComponents>
            <Provider {...props}>{children}</Provider>
          </AccumulatedComponents>
        );
      };
    },
    initialComponent
  );
};

function App() {
  const queryClient = new QueryClient();
  const projectId = import.meta.env.VITE_WAGMI_PROJECT_ID;

  createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true,
    enableOnramp: true,
    themeVariables: {
      "--w3m-accent": "#F23F5D",
      "--w3m-border-radius-master": "8px",
    },
    excludeWalletIds: [
      "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    ],
    allWallets: "HIDE",
    termsConditionsUrl: "https://www.mytermsandconditions.com",
    themeMode: "dark",
  });

  // const chainID = chains.map((c) => c.id);

  // const ProvidersTree = buildProvidersTree([
  //   [WagmiProvider, { config }],
  //   [QueryClientProvider, { client: queryClient }],
  //   [SupportedChainsProvider, { supportedChains: chainID }],
  // ] as const);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <WebsocketService />
        <Toaster />
        <RootLayout />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
