import { IcHandicapAll, IcHandicapBuy, IcHandicapSell } from "@/assets/icons";
import { cn } from "@/utils";
import { useState } from "react";

export const OrderBook = () => {
  const [type, setType] = useState<"default" | "sell" | "buy">("default");

  return (
    <div className="p-4 bg-dark2 rounded-2xl">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Order Book</div>
        <div className="flex space-x-3">
          <div
            className={cn(
              `'cursor-pointer',  '${type === "default" && "opacity-50"}'`
            )}
            onClick={() => setType("default")}
          >
            <IcHandicapAll />
          </div>
          <div
            className={cn(`cursor-pointer ${type === "buy" && "opacity-50"}`)}
            onClick={() => setType("buy")}
          >
            <IcHandicapBuy />
          </div>
          <div
            className={cn(`cursor-pointer ${type === "sell" && "opacity-50"}`)}
            onClick={() => setType("sell")}
          >
            <IcHandicapSell />
          </div>
        </div>
      </div>
      <div className="flex justify-between text-xs text-soft">
        <div className="flex-1">Pice USDT</div>
        <div className="flex-1 text-right">Qty USDT</div>
        <div className="flex-1 text-right">Total USDT</div>
      </div>

      <div className="flex flex-col overflow-hidden h-[342px]">
        {/* Sell */}
        <div
          className={cn(
            `space-y-0.5 flex flex-col-reverse transition-[height] duration-1000 ease-in-out`,
            type === "default"
              ? "h-[calc(50%-21px)]"
              : type === "sell"
              ? "h-[calc(100%-42px)] overflow-scroll"
              : "h-0"
          )}
        >
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="flex pr-1 h-[18px] justify-between text-[11.63px] relative"
            >
              <div className="text-primary flex-1">1133.131313</div>
              <div className="text-soft flex-1 text-right">5.2354235</div>
              <div className="text-soft flex-1 text-right">4.41114</div>
              <div className="absolute w-20 bg-primary/30 h-full right-0" />
            </div>
          ))}
        </div>
        {/* End Sell */}

        {/* Ticker */}
        <div className="bg-dark h-[42px] px-2 flex justify-between items-center">
          <div>69,398.54</div>
          <div>≈69,398.54 USD</div>
        </div>
        {/* End Ticker */}

        {/* Buy */}
        <div
          className={cn(
            `space-y-0.5 flex flex-col transition-[height] duration-1000 ease-in-out`,
            type === "default"
              ? "h-[calc(50%-21px)]"
              : type === "buy"
              ? "h-[calc(100%-42px)] overflow-scroll"
              : "h-0"
          )}
        >
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="flex pr-1 h-[18px] justify-between text-[11.63px] relative"
            >
              <div className="text-success flex-1">1133.131313</div>
              <div className="text-soft flex-1 text-right">5.2354235</div>
              <div className="text-soft flex-1 text-right">4.41114</div>
              <div className="absolute w-20 bg-success/30 h-full right-0" />
            </div>
          ))}
        </div>
        {/* End Buy */}
      </div>
    </div>
  );
};
