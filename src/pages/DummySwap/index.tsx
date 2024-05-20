import Marquee from "react-fast-marquee";
import { TOKEN_RATE } from "@/constants/data";
import { OrderBook } from "@/components/dummy/OrderBook";
import { Dummy } from "../Dummy";

export const DummySwap = () => {
  return (
    <>
      <div className="layout-main">
        <div className="grid  grid-cols-1 gap-4 h-full">
          <div className="h-full flex flex-col lg:flex-row  gap-4 ">
            {/* OrderBook */}
            <div className="w-[312px]">
              <OrderBook />
            </div>
            {/* End OrderBook */}
            {/*  Trading Chart */}
            <div className="flex flex-1">Trading Chart goes here</div>
            {/* End Trading Chart */}
          </div>
          <div className="h-full">
            <Dummy />
          </div>
        </div>
      </div>
      <div className="border-t border-soft/30 fixed bottom-0 h-8 items-center w-full flex-row text-sm flex z-20 bg-dark">
        <Marquee>
          {TOKEN_RATE.map((token) => (
            <div className="px-2 flex space-x-5">
              <div>{token.name}</div>
              <div className="text-green">{token.rate}</div>
            </div>
          ))}
        </Marquee>
      </div>
    </>
  );
};
