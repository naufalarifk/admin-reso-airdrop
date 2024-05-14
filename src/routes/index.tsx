import { Route, Routes } from "react-router-dom";
import {
  CreateStakingPage,
  Landing,
  Staking,
  // Trade,
  Bridge,
  Swap,
  Terms,
  Privacy,
  Pool,
  NotFound,
} from "@/pages";
import { MainMenu } from "./MainMenu";
import { LayoutDashboard, StakeLayout } from "@/components";
import { useScrollTop } from "@/hooks";
import { Dummy } from "@/pages/Dummy";

export const RootLayout = () => {
  useScrollTop();
  // const { chain } = useAccount();

  // useEffect(() => {
  //   const url = new URL(window.location.href);
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
      <Route path="/" element={<Landing />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route element={<MainMenu />}>
        <Route path="/*" element={<NotFound />} />
        <Route element={<LayoutDashboard />}>
          {/* <Route path="/trade" element={<Trade />} /> */}
          <Route path="/bridge" element={<Bridge />} />
          <Route path="/swap/:market" element={<Swap />} />
          <Route path="/pool" element={<Pool />} />
          <Route path="/dummy/:market" element={<Dummy />} />
        </Route>
      </Route>
      <Route element={<StakeLayout />}>
        <Route path="/staking" element={<Staking />} />
        <Route path="/staking/create" element={<CreateStakingPage />} />
      </Route>
    </Routes>
  );
};
