import { OrderBook } from "@/components/dummy/OrderBook";

export const DummySwap = () => {
  return (
    <div className="grid grid-cols-1 h-full">
      <div className="h-full flex flex-col lg:flex-row  gap-4 ">
        {/* OrderBook */}
        <div className="w-[312px] hidden lg:block">
          <OrderBook />
        </div>
        <div className="flex flex-1">Trading</div>
      </div>
      <div className="h-full bg-green">bawah</div>
    </div>
  );
};
