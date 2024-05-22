import { IcHandicapAll, IcHandicapBuy, IcHandicapSell } from "@/assets/icons";
import { cn } from "@/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MarketTicker } from "@/pages/Swap/hooks/usePublicMarkets";
import { accumulateVolume, calcMaxVolume } from "@/utils";
import { Currencies } from "@/pages/Dummy/types";
import { Decimal } from "@/components/molecules/Decimal";

export const OrderBook = ({
  data,
  ticker,
  currency,
  usdt,
}: {
  data: { asks: string[][]; bids: [][]; timestamp: number };
  ticker: MarketTicker;
  currency: Currencies;
  usdt: Currencies;
}) => {
  const [type, setType] = useState<"default" | "sell" | "buy">("default");
  const [asks, setAsks] = useState<string[][]>([]);
  const [bids, setBids] = useState<string[][]>([]);
  const tick = ticker?.ticker;
  const precision = currency?.precision;
  const usdtPrice = usdt?.price;

  useEffect(() => {
    setAsks(data?.asks);
    setBids(data?.bids);
  }, [data]);

  // const getRandomNumber = (min: number, max: number, fixed: number) => {
  //   return (Math.random() * (max - min) + min).toFixed(fixed);
  // };

  // const generateOrderData = (data: Ask[]) => {
  //   return data?.map(item => ({
  //     price: parseFloat(item?.price?.toString()),
  //     origin_volume: parseFloat(item?.origin_volume?.toString()),
  //     total: getRandomNumber(1, 10, 5),
  //     width: `${Math.random() * 100}%`,
  //   }));
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setAsks(generateOrderData(60));
  //     setBids(generateOrderData(60));
  //   }, 500); // Update every 3 seconds

  //   return () => clearInterval(interval);
  // }, []);

  const generateTotal = (price: number, volume: number) => {
    return Decimal.format(price * volume, precision, ",");
  };

  const mapValues = useCallback(
    (maxVolume?: number, data?: number[]) =>
      data && maxVolume && data.length
        ? data.map((currentVolume) => (currentVolume / maxVolume) * 100)
        : [],
    []
  );

  const bgWidthAsks = useMemo(
    () =>
      mapValues(
        calcMaxVolume(bids, asks?.slice(0)?.reverse()),
        accumulateVolume(asks?.slice(0)?.reverse(), false)
      ),
    [mapValues, asks, bids]
  );
  const bgWidthBids = useMemo(
    () => mapValues(calcMaxVolume(bids, asks), accumulateVolume(bids, false)),
    [mapValues, asks, bids]
  );

  return (
    <div className="p-4 bg-dark2 rounded lg:rounded-2xl">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Order Book</div>
        <div className="flex space-x-3">
          <div
            className={cn(
              `cursor-pointer ${
                type === "default" ? "opacity-100" : "opacity-50"
              }`
            )}
            onClick={() => setType("default")}
          >
            <IcHandicapAll />
          </div>
          <div
            className={cn(
              `cursor-pointer ${type === "buy" ? "opacity-100" : "opacity-50"}`
            )}
            onClick={() => setType("buy")}
          >
            <IcHandicapBuy />
          </div>
          <div
            className={cn(
              `cursor-pointer ${type === "sell" ? "opacity-100" : "opacity-50"}`
            )}
            onClick={() => setType("sell")}
          >
            <IcHandicapSell />
          </div>
        </div>
      </div>
      <div className="flex justify-between text-xs mb-2 text-soft">
        <div className="flex-1">Pice USDT</div>
        <div className="flex-1 text-right">Qty USDT</div>
        <div className="flex-1 text-right">Total USDT</div>
      </div>

      <div className="flex flex-col  overflow-hidden h-[442px]">
        {/* Sell */}
        <div
          className={cn(
            `space-y-0.5 flex flex-col-reverse no-scrollbar transition-[height] duration-500 ease-in-out`,
            type === "default"
              ? "h-[calc(50%-33px)]"
              : type === "sell"
              ? "h-[calc(100%-54px)] overflow-scroll"
              : "h-0"
          )}
        >
          {asks?.map((order, i) => (
            <div
              key={i}
              className="flex pr-1 h-[18px] justify-between text-[11.63px] relative"
            >
              <div className="text-primary flex-1">
                {Decimal.format(order?.[0] ?? 0, precision, ",")}
              </div>
              <div className="text-soft flex-1 text-right">
                {Decimal.format(order?.[1] ?? 0, precision, ",")}
              </div>
              <div className="text-soft flex-1 text-right">
                {generateTotal(+order?.[0] ?? 0, +order?.[1])}
              </div>

              <div
                className="absolute right-0 bg-primary/15 h-full transition-[width] duration-200 ease-in-out animate-backgroundWidth"
                style={{
                  width: `${bgWidthAsks[i]}%`,
                }}
              />
            </div>
          ))}
        </div>
        {/* End Sell */}

        {/* Ticker */}
        <div
          className={cn(
            "bg-dark h-[42px] rounded-lg px-2 hidden-scroll flex justify-between items-center my-3",
            type === "sell" ? "mb-0" : type === "buy" ? "mt-0" : ""
          )}
        >
          <div className="text-base font-normal text-primary">{Decimal.format(tick?.last ?? 0, precision, ",")}</div>
          <div className="text-xs font-normal text-soft">
            ≈{Decimal.format((tick?.last / +usdtPrice) ?? 0, precision, ",")}USDT
          </div>
        </div>
        {/* End Ticker */}

        {/* Buy */}
        <div
          className={cn(
            `space-y-0.5 flex flex-col no-scrollbar transition-[height] duration-500 ease-in-out`,
            type === "default"
              ? "h-[calc(50%-33px)]"
              : type === "buy"
              ? "h-[calc(100%-54px)] overflow-scroll"
              : "h-0"
          )}
        >
          {bids?.map((order, i) => (
            <div
              key={i}
              className="flex pr-1 h-[18px] justify-between text-[11.63px] relative"
            >
              <div className="text-success flex-1">
                {Decimal.format(order?.[0] ?? 0, precision, ",")}
              </div>
              <div className="text-soft flex-1 text-right">
                {Decimal.format(order?.[1] ?? 0, precision, ",")}
              </div>
              <div className="text-soft flex-1 text-right">
                {generateTotal(+order?.[0] ?? 0, +order?.[1])}
              </div>
              <div
                className="absolute right-0 bg-success/15 h-full transition-[width] duration-200 ease-in-out animate-backgroundWidth"
                style={{
                  width: `${bgWidthBids[i]}%`,
                }}
              />
            </div>
          ))}
        </div>
        {/* End Buy */}
      </div>
    </div>
  );
};
