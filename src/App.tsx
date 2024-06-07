import { BrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/routes';

// import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { SupportedChainsProvider } from "./hooks";

import { Toaster } from 'react-hot-toast';
import WebsocketService from './service/WebsocketService';
import { useMemo } from 'react';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";

import {
   ConnectionProvider,
   WalletProvider,
} from "@solana/wallet-adapter-react";
import {
   CloverWalletAdapter,
   PhantomWalletAdapter,
   SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

type ComponentsWithProps<
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   TComponents extends readonly React.JSXElementConstructor<any>[],
> = {
   [key in keyof TComponents]: keyof React.ComponentProps<TComponents[key]> extends never
   ? readonly [TComponents[key]]
   : readonly [TComponents[key], React.ComponentProps<TComponents[key]>];
} & { length: TComponents['length'] };

export const buildProvidersTree = <
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   T extends readonly React.JSXElementConstructor<any>[],
>(
   componentsWithProps: ComponentsWithProps<T>,
) => {
   const initialComponent: React.FC<React.PropsWithChildren> = ({ children }) => <>{children}</>;

   return componentsWithProps.reduce((AccumulatedComponents, [Provider, props = {}]) => {
      return ({ children }) => {
         return (
            <AccumulatedComponents>
               <Provider {...props}>{children}</Provider>
            </AccumulatedComponents>
         );
      };
   }, initialComponent);
};

function App() {
   const queryClient = new QueryClient();
   // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
   const network = WalletAdapterNetwork.Mainnet;
   // You can also provide a custom RPC endpoint.
   const endpoint = useMemo(() => clusterApiUrl(network, true), [network]);
   const wallets = useMemo(
      () => [
         // if desired, manually define specific/custom wallets here (normally not required)
         // otherwise, the wallet-adapter will auto detect the wallets a user's browser has available
         new PhantomWalletAdapter(),
         new SolflareWalletAdapter(),
         new CloverWalletAdapter(),
      ],
      []
   );


   // const chainID = chains.map((c) => c.id);

   // const ProvidersTree = buildProvidersTree([
   //   [WagmiProvider, { config }],
   //   [QueryClientProvider, { client: queryClient }],
   //   [SupportedChainsProvider, { supportedChains: chainID }],
   // ] as const);

   return (
      <ConnectionProvider endpoint={endpoint}>
         <WalletProvider wallets={wallets} autoConnect>
            <QueryClientProvider client={queryClient}>
               <BrowserRouter>
                  <WebsocketService />
                  <Toaster />
                  <RootLayout />
               </BrowserRouter>
            </QueryClientProvider>
         </WalletProvider>
      </ConnectionProvider>
   );
}

export default App;
