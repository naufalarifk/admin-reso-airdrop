import { HistoryTrade } from "@/components";
import { HistorySwap } from "@/components/molecules/HistorySwap";

export const Dummy = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">
      <div className="bg-dark2 p-4 rounded-2xl h-96">
        <HistoryTrade />
      </div>
      <div className="bg-dark2 p-4 rounded-2xl h-96">
        <HistorySwap />
      </div>
    </div>
  );
};
