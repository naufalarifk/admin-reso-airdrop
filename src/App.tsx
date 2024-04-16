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
