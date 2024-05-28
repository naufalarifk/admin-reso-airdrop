import { IcHandicapAll, IcHandicapBuy, IcHandicapSell } from '@/assets/icons';
import { cn } from '@/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MarketTicker } from '@/pages/Swap/hooks/usePublicMarkets';
import { accumulateVolume, calcMaxVolume, validateNumber } from '@/utils';
import { Currencies, Market } from '@/pages/Dummy/types';
import { Decimal } from '@/components/molecules/Decimal';
import { Skeleton } from '@/components';

export const OrderBook = ({
   data,
   ticker,
   usdt,
   market,
   loading,
}: {
   data: { asks: string[][]; bids: [][]; timestamp: number };
   ticker: MarketTicker;
   usdt: Currencies;
   market: Market;
   loading: boolean;
}) => {
   const [type, setType] = useState<'default' | 'sell' | 'buy'>('default');
   const [asks, setAsks] = useState<string[][]>([]);
   const [bids, setBids] = useState<string[][]>([]);
   const tick = ticker?.ticker;
   const usdtPrice = usdt?.price;

   useEffect(() => {
      setAsks(data?.asks);
      setBids(data?.bids);
   }, [data]);

   const generateTotal = (price: number, volume: number) => {
      return Decimal.format(price * volume, market?.total_precision!, ',');
   };

   const mapValues = useCallback(
      (maxVolume?: number, data?: number[]) =>
         data && maxVolume && data.length
            ? data.map(currentVolume => (currentVolume / maxVolume) * 100)
            : [],
      [],
   );

   const bgWidthAsks = useMemo(
      () =>
         mapValues(
            calcMaxVolume(bids, asks?.slice(0)?.reverse()),
            accumulateVolume(asks?.slice(0)?.reverse(), false),
         ),
      [mapValues, asks, bids],
   );
   const bgWidthBids = useMemo(
      () => mapValues(calcMaxVolume(bids, asks), accumulateVolume(bids, false)),
      [mapValues, asks, bids],
   );

   return (
      <div className="rounded bg-dark2 p-4 lg:rounded-2xl">
         <div className="flex items-center justify-between">
            <div className="text-xxs font-semibold lg:text-lg">Order Book</div>
            <div className="flex space-x-3">
               <div
                  className={cn(
                     `cursor-pointer ${type === 'default' ? 'opacity-100' : 'opacity-50'}`,
                  )}
                  onClick={() => setType('default')}>
                  <IcHandicapAll />
               </div>
               <div
                  className={cn(`cursor-pointer ${type === 'buy' ? 'opacity-100' : 'opacity-50'}`)}
                  onClick={() => setType('buy')}>
                  <IcHandicapBuy />
               </div>
               <div
                  className={cn(`cursor-pointer ${type === 'sell' ? 'opacity-100' : 'opacity-50'}`)}
                  onClick={() => setType('sell')}>
                  <IcHandicapSell />
               </div>
            </div>
         </div>
         <div className="my-2 flex justify-between text-xxs text-soft lg:mb-2">
            <div className="flex-1">Pice {market?.quote_unit?.toUpperCase()}</div>
            <div className="hidden flex-1 text-right lg:block">
               Qty {market?.base_unit?.toUpperCase()}
            </div>
            <div className="flex-1 text-right">Total {market?.quote_unit?.toUpperCase()}</div>
         </div>

         <div className="flex h-[510px]  flex-col overflow-hidden">
            {/* Sell */}
            <div
               className={cn(
                  `no-scrollbar flex flex-col-reverse space-y-0.5 transition-[height] duration-500 ease-in-out`,
                  type === 'default'
                     ? 'h-[calc(50%-33px)]'
                     : type === 'sell'
                       ? 'h-[calc(100%-54px)] overflow-scroll'
                       : 'h-0',
               )}>
               {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                     <Skeleton key={index}>
                        <div className="h-[18px] w-full  bg-dark3" />
                     </Skeleton>
                  ))
               ) : asks?.length > 0 ? (
                  asks?.map((order, i) => (
                     <div
                        key={i}
                        className="font-ibm relative flex h-[18px] justify-between pr-1 text-xxs">
                        <div className="flex-1 text-primary">
                           {Decimal.format(
                              validateNumber(order?.[0]),
                              market?.price_precision!,
                              ',',
                           )}
                        </div>
                        <div className="hidden flex-1 text-right text-soft lg:block">
                           {Decimal.format(
                              validateNumber(order?.[1]),
                              market?.amount_precision!,
                              ',',
                           )}
                        </div>
                        <div className="flex-1 text-right text-soft">
                           {generateTotal(validateNumber(order?.[0]), validateNumber(order?.[1]))}
                        </div>

                        <div
                           className="animate-backgroundWidth absolute right-0 h-full bg-primary/15 transition-[width] duration-200 ease-in-out"
                           style={{
                              width: `${bgWidthAsks[i]}%`,
                           }}
                        />
                     </div>
                  ))
               ) : (
                  <div className="py-5 text-center text-sm font-bold text-soft">No Data</div>
               )}
            </div>
            {/* End Sell */}

            {/* Ticker */}
            <div
               className={cn(
                  'hidden-scroll font-ibm my-3 flex h-[42px] items-center justify-center rounded-lg bg-dark px-2 lg:justify-between',
                  type === 'sell' ? 'mb-0' : type === 'buy' ? 'mt-0' : '',
               )}>
               <div className="text-xs font-normal text-primary">
                  {Decimal.format(validateNumber(tick?.last), market?.price_precision!, ',')}
               </div>
               <div className="hidden text-right text-xxs font-normal text-soft lg:block">
                  ≈
                  {Decimal.format(
                     validateNumber(tick?.last) / validateNumber(usdtPrice),
                     market?.price_precision!,
                     ',',
                  )}{' '}
                  {market?.quote_unit?.toUpperCase()}
               </div>
            </div>
            {/* End Ticker */}

            {/* Buy */}
            <div
               className={cn(
                  `no-scrollbar font-ibm flex flex-col space-y-0.5 transition-[height] duration-500 ease-in-out`,
                  type === 'default'
                     ? 'h-[calc(50%-33px)]'
                     : type === 'buy'
                       ? 'h-[calc(100%-54px)] overflow-scroll'
                       : 'h-0',
               )}>
               {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                     <Skeleton key={index}>
                        <div className="h-[18px] w-full  bg-dark3" />
                     </Skeleton>
                  ))
               ) : bids?.length > 0 ? (
                  bids?.map((order, i) => (
                     <div
                        key={i}
                        className="relative flex h-[18px] justify-between pr-1 text-xxs">
                        <div className="flex-1 text-success">
                           {Decimal.format(
                              validateNumber(order?.[0]),
                              market?.price_precision!,
                              ',',
                           )}
                        </div>
                        <div className="hidden flex-1 text-right text-soft lg:block">
                           {Decimal.format(
                              validateNumber(order?.[1]),
                              market?.amount_precision!,
                              ',',
                           )}
                        </div>
                        <div className="flex-1 text-right text-soft">
                           {generateTotal(validateNumber(order?.[0]), validateNumber(order?.[1]))}
                        </div>
                        <div
                           className="animate-backgroundWidth absolute right-0 h-full bg-success/15 transition-[width] duration-200 ease-in-out"
                           style={{
                              width: `${bgWidthBids[i]}%`,
                           }}
                        />
                     </div>
                  ))
               ) : (
                  <div className="py-5 text-center text-sm font-bold text-soft">No Data</div>
               )}
            </div>
            {/* End Buy */}
         </div>
      </div>
   );
};
