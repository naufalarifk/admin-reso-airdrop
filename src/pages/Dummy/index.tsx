import { HistoryTrade } from "@/components";
import { HistorySwap } from "@/components/molecules/HistorySwap";
import { useListMarketOrder } from "@/components/molecules/HistorySwap/hooks/useMarketOder";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Dummy = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { pair } = useListMarketOrder((state) => state);

  console.log("location.pathnam", window.location.pathname);

  useEffect(() => {
    if (location.pathname === "/dummy" || location.pathname === "/dummy/") {
      navigate(`/dummy/${pair}`);
    }
  }, [location, navigate, pair]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">
      <div className="bg-dark2 p-4 rounded-2xl h-[452px]">
        <HistoryTrade />
      </div>
      <div className="bg-dark2 p-4 rounded-2xl h-[452px] overflow-hidden">
        <HistorySwap />
      </div>
    </div>
  );
};
