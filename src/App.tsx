import { BrowserRouter } from "react-router-dom";
import { RootLayout } from "@/routes";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SupportedChainsProvider } from "./hooks";
import { chains, config } from "@/config";

function App() {
  const queryClient = new QueryClient();
  const projectId = import.meta.env.VITE_WAGMI_PROJECT_ID;

  createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true, // Optional - false as default
    themeVariables: {
      "--w3m-accent": "#F23F5D",
      "--w3m-border-radius-master": "8px",
    },
    excludeWalletIds: [
      "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0", // Trust
      "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa", // Coinbase
      "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    ],
    termsConditionsUrl: "https://www.mytermsandconditions.com",
  });

  const chainID = chains.map((c) => c.id);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <SupportedChainsProvider supportedChains={chainID}>
          <BrowserRouter>
            <RootLayout />
          </BrowserRouter>
        </SupportedChainsProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
