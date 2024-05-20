import { IcHandicapAll, IcHandicapBuy, IcHandicapSell } from "@/assets/icons";
import { cn } from "@/utils";
import { useEffect, useState } from "react";

export const OrderBook = () => {
  const [type, setType] = useState<"default" | "sell" | "buy">("default");

  const getRandomNumber = (min: number, max: number, fixed: number) => {
    return (Math.random() * (max - min) + min).toFixed(fixed);
  };

  const generateOrderData = (length: number) => {
    return Array.from({ length }).map(() => ({
      price: getRandomNumber(100, 200, 6),
      quantity: getRandomNumber(1, 10, 7),
      total: getRandomNumber(1, 10, 5),
      width: `${Math.random() * 100}%`,
    }));
  };

  const [sellOrders, setSellOrders] = useState(generateOrderData(60));
  const [buyOrders, setBuyOrders] = useState(generateOrderData(60));

  useEffect(() => {
    const interval = setInterval(() => {
      setSellOrders(generateOrderData(60));
      setBuyOrders(generateOrderData(60));
    }, 500); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-dark2 rounded-2xl">
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
          {sellOrders.map((order, i) => (
            <div
              key={i}
              className="flex pr-1 h-[18px] justify-between text-[11.63px] relative"
            >
              <div className="text-primary flex-1">{order.price}</div>
              <div className="text-soft flex-1 text-right">
                {order.quantity}
              </div>
              <div className="text-soft flex-1 text-right">{order.total}</div>

              <div
                className="absolute right-0 bg-primary/15 h-full transition-[width] duration-200 ease-in-out animate-backgroundWidth"
                style={{ width: order.width }}
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
          <div className="text-base font-normal text-primary">69,398.54</div>
          <div className="text-xs font-normal text-soft">≈69,398.54 USD</div>
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
          {buyOrders.map((order, i) => (
            <div
              key={i}
              className="flex pr-1 h-[18px] justify-between text-[11.63px] relative"
            >
              <div className="text-success flex-1">{order.price}</div>
              <div className="text-soft flex-1 text-right">
                {order.quantity}
              </div>
              <div className="text-soft flex-1 text-right">{order.total}</div>
              <div
                className="absolute right-0 bg-success/15 h-full transition-[width] duration-200 ease-in-out animate-backgroundWidth"
                style={{ width: order.width }}
              />
            </div>
          ))}
        </div>
        {/* End Buy */}
      </div>
    </div>
  );
};
