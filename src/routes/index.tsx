import { Route, Routes } from 'react-router-dom';
import {
   CreateStakingPage,
   // Landing,
   Staking,
   // Trade,
   Bridge,
   Terms,
   Privacy,
   Pool,
   NotFound,
   DummySwap,
   MarketOverview,
   Trade,
   NewTrade,
   Airdrop,
   Home,
} from '@/pages';
import { MainMenu } from './MainMenu';
import { LayoutDashboard, StakeLayout } from '@/components';
import { useScrollTop } from '@/hooks';
import { Dummy } from '@/pages/Dummy';
import { DummyPool } from '@/pages/DummyPool';

export const RootLayout = () => {
   useScrollTop();
   // const { chain } = useAccount();

   // useEffect(() => {
   //   const url = new URL(window.location.h66ref);
   //   url.searchParams.set(
   //     "chainId",
   //     String(chain?.nativeCurrency?.symbol).toLowerCase()
   //   );
   //   if (url.href !== window.location.href && chain?.id !== undefined) {
   //     window.location.href = url.href;
   //   }
   // });

   return (
      <Routes>
         {/* <Route path="/" element={<Landing />} /> */}
         {/* <Route
        path="/"
        element={
          <Navigate
            to={`/trade/${market?.[0]?.name?.replace('/', '-') || `MEME-USDT`} `}
            replace
          />
        }
      /> */}
         <Route
            path="/terms"
            element={<Terms />}
         />
         <Route
            path="/test"
            element={<Home />}
         />

         <Route
            path="/privacy"
            element={<Privacy />}
         />
         <Route element={<MainMenu />}>
            <Route
               path="/*"
               element={<NotFound />}
            />
            <Route element={<LayoutDashboard />}>
               <Route
                  path="/dummypool"
                  element={<DummyPool />}
               />
               <Route
                  path="/tradedummy"
                  element={<Trade />}
               />
               <Route
                  path="/bridge"
                  element={<Bridge />}
               />
               <Route
                  path="/old/trade/:market"
                  element={<DummySwap />}
               />
               <Route
                  path="/trade/:market"
                  element={<NewTrade />}
               />
               <Route
                  path="/airdrop"
                  element={<Airdrop />}
               />
               <Route
                  path="/market"
                  element={<Pool />}
               />
               <Route
                  path="/"
                  element={<MarketOverview />}
               />
               <Route
                  path="/dummy/:market"
                  element={<Dummy />}
               />
               <Route
                  path="/dummyswap/:market"
                  element={<DummySwap />}
               />
            </Route>
         </Route>
         <Route element={<StakeLayout />}>
            <Route
               path="/staking"
               element={<Staking />}
            />
            <Route
               path="/staking/create"
               element={<CreateStakingPage />}
            />
         </Route>
      </Routes>
   );
};
