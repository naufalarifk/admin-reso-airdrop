import { IcHandicapAll, IcHandicapBuy, IcHandicapSell } from '@/assets/icons';
import { Text } from '@/components';
import { MarketTicker } from '@/pages/Swap/hooks/usePublicMarkets';
import { OrderBook } from '@/types/components';

const SellTab = ({ asks }: { asks: OrderBook['asks'] }) => {
   return (
      <section className="space-y-2">
         {asks?.map(ask => (
            <div className="relative z-10 grid grid-cols-3 place-content-center">
               <div
                  style={{
                     background: 'rgba(213, 83, 83, 0.16)',
                  }}
                  className="absolute right-0 -z-10 h-full w-[10%]"
               />
               <Text className="bg-transparent text-center">{ask.price}</Text>
               <Text className="bg-transparent text-center">{ask.remaining_volume}</Text>
               <Text className="bg-transparent text-center">
                  {Number(ask.price) * Number(ask.origin_volume)}
               </Text>
            </div>
         ))}
      </section>
   );
};

const BuyTab = ({ bids }: { bids: OrderBook['bids'] }) => {
   return (
      <section className="space-y-2">
         {bids?.map(bid => (
            <div className="relative z-10 grid grid-cols-3 place-content-center">
               <div
                  style={{
                     background: 'rgba(14, 203, 129, 0.10)',
                  }}
                  className="absolute right-0 -z-10 h-full w-[10%]"
               />
               <Text className="bg-transparent text-center">{bid.price}</Text>
               <Text className="bg-transparent text-center">{bid.remaining_volume}</Text>
               <Text className="bg-transparent text-center">
                  {Number(bid.price) * Number(bid.origin_volume)}
               </Text>
            </div>
         ))}
      </section>
   );
};

export const OrderBookSwap = ({
   data,
   ticker_data,
}: {
   data: OrderBook;
   ticker_data?: MarketTicker;
}) => {
   const { ticker } = ticker_data || {};
   console.log('ticker', ticker);
   console.log(typeof ticker?.price_change_percent);
   const change_percent = Number(ticker?.price_change_percent);
   console.log('change_percent', change_percent);

   // const [type, setType] = useState<"default" | "sell" | "buy">("default");

   return (
      <section className="w-full rounded-lg bg-[#181924] p-4 lg:w-1/5">
         <div className="flex items-center justify-between">
            <Text className="text-lg font-semibold">Orderbook</Text>
            <div className="flex space-x-1">
               <IcHandicapAll />
               <IcHandicapBuy />
               <IcHandicapSell />
            </div>
         </div>
         <div className="grid grid-cols-3">
            <Text className="text-center">Price USDT</Text>
            <Text className="text-center">Qty USDT</Text>
            <Text className="text-center">Total USDT</Text>
         </div>
         <div className="flex h-[882px] flex-col overflow-hidden">
            <SellTab asks={data?.asks} />
            {/* New Price */}
            <div className="my-4 flex items-center justify-between rounded-lg bg-[#0E0F19] px-2 py-4">
               <Text className="text-red-500">{ticker?.last}</Text>
               {/* <Text>≈{Number(ticker.last) * change_percent.toFixed(2)} USD</Text> */}
            </div>
            <BuyTab bids={data?.bids} />
         </div>
      </section>
   );
};
