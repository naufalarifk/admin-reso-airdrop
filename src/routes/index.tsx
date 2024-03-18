import { Route, Routes } from "react-router-dom";
import { Landing, Staking, Trade, Bridge } from "@/pages";
import { MainMenu } from "./MainMenu";
import { LayoutDashboard } from "@/components";

export const RootLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<MainMenu />}>
        <Route element={<LayoutDashboard />}>
          <Route path="/trade" element={<Trade />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/bridge" element={<Bridge />} />
        </Route>
      </Route>
    </Routes>
  );
};
