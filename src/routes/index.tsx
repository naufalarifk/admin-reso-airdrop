import { Navigate, Route, Routes } from 'react-router-dom';
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
} from '@/pages';
import { MainMenu } from './MainMenu';
import { LayoutDashboard, StakeLayout } from '@/components';
import { useScrollTop } from '@/hooks';
import { Dummy } from '@/pages/Dummy';
import { usePublicMarket } from '@/pages/Swap/hooks/usePublicMarkets';

export const RootLayout = () => {
  const market = usePublicMarket(state => state.market);

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

  console.log('market', market);

  return (
    <Routes>
      {/* <Route path="/" element={<Landing />} /> */}
      <Route
        path="/"
        element={
          <Navigate
            to={`/trade/${market?.[0]?.name?.replace('/', '-') || `MEME-USDT`} `}
            replace
          />
        }
      />
      <Route
        path="/terms"
        element={<Terms />}
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
            path="/market"
            element={<Pool />}
          />
          <Route path="/" element={<MarketOverview />} />
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
