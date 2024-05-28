import { BrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/routes';

// import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { SupportedChainsProvider } from "./hooks";

import { Toaster } from 'react-hot-toast';
import WebsocketService from './service/WebsocketService';

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
