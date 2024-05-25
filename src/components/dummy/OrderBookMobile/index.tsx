import { IcHandicapAll, IcHandicapBuy, IcHandicapSell } from '@/assets/icons';
import { cn } from '@/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MarketTicker } from '@/pages/Swap/hooks/usePublicMarkets';
import { accumulateVolume, calcMaxVolume } from '@/utils';
import { Market } from '@/pages/Dummy/types';
import { Decimal } from '@/components/molecules/Decimal';
import { Skeleton } from '@/components';

export const OrderBookMobile = ({
   data,
   ticker,
   market,
   loading,
}: {
   data: { asks: string[][]; bids: [][]; timestamp: number };
   ticker: MarketTicker;
   market: Market;
   loading: boolean;
}) => {
   const [type, setType] = useState<'default' | 'sell' | 'buy'>('default');
   const [asks, setAsks] = useState<string[][]>([]);
   const [bids, setBids] = useState<string[][]>([]);
   const tick = ticker?.ticker;

   useEffect(() => {
      setAsks(data?.asks);
      setBids(data?.bids);
   }, [data]);

   const generateTotal = (price: number, volume: number) => {
      return Decimal.format(price * volume, market?.total_precision, ',');
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
      <div className="rounded bg-dark2 p-2 lg:rounded-2xl">
         <div className="flex items-center justify-between">
            <div className="text-[10px] font-semibold">Order Book</div>
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
         <div className="mb-2 mt-2 flex justify-between text-[10px] text-soft">
            <div className="flex-1">Pice {market?.quote_unit?.toUpperCase()}</div>
            {/* <div className="flex-1 text-right">Qty {market?.quote_unit?.toUpperCase()}</div> */}
            <div className="flex-1 text-right">Total {market?.quote_unit?.toUpperCase()}</div>
         </div>

         <div className="flex h-[442px]  flex-col overflow-hidden">
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
               {loading
                  ? Array.from({ length: 5 }).map((_, index) => (
                       <Skeleton key={index}>
                          <div className="h-[18px] w-full  bg-dark3" />
                       </Skeleton>
                    ))
                  : asks?.map((order, i) => (
                       <div
                          key={i}
                          className="relative flex h-[18px] justify-between pr-1 text-[10px]">
                          <div className="flex-1 text-primary">
                             {Decimal.format(
                                +order?.[0] ? +order?.[0] : 0,
                                market?.price_precision!,
                                ',',
                             )}
                          </div>
                          {/* <div className="flex-1 text-right text-soft">
                        {Decimal.format(
                                +order?.[1] ? +order?.[1] : 0,
                                market?.amount_precision!,
                                ',',
                             )}
                     </div> */}
                          <div className="flex-1 text-right text-soft">
                             {generateTotal(
                                +order?.[0] ? +order?.[0] : 0,
                                +order?.[1] ? +order?.[1] : 0,
                             )}
                          </div>

                          <div
                             className="animate-backgroundWidth absolute right-0 h-full bg-primary/15 transition-[width] duration-200 ease-in-out"
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
                  'hidden-scroll my-3 flex h-[42px] items-center justify-center rounded-lg bg-dark px-2 text-center',
                  type === 'sell' ? 'mb-0' : type === 'buy' ? 'mt-0' : '',
               )}>
               <div className="text-xs font-normal text-primary">
                  {Decimal.format(+tick?.last ? +tick?.last : 0, market?.price_precision!, ',')}
               </div>
               {/* <div className="text-xs font-normal text-soft">
                  ≈{Decimal.format(
                     +tick?.last ? +tick?.last : 0 / +usdtPrice ? +usdtPrice : 0,
                     market?.price_precision!,
                     ',',
                  )}{' '}
                  {market?.quote_unit?.toUpperCase()}
               </div> */}
            </div>
            {/* End Ticker */}

            {/* Buy */}
            <div
               className={cn(
                  `no-scrollbar flex flex-col space-y-0.5 transition-[height] duration-500 ease-in-out`,
                  type === 'default'
                     ? 'h-[calc(50%-33px)]'
                     : type === 'buy'
                       ? 'h-[calc(100%-54px)] overflow-scroll'
                       : 'h-0',
               )}>
               {loading
                  ? Array.from({ length: 5 }).map((_, index) => (
                       <Skeleton key={index}>
                          <div className="h-[18px] w-full  bg-dark3" />
                       </Skeleton>
                    ))
                  : bids?.map((order, i) => (
                       <div
                          key={i}
                          className="relative flex h-[18px] justify-between pr-1 text-[11.63px]">
                          <div className="flex-1 text-success">
                             {Decimal.format(
                                +order?.[0] ? +order?.[0] : 0,
                                market?.price_precision!,
                                ',',
                             )}
                          </div>
                          {/* <div className="flex-1 text-right text-soft">
                        {Decimal.format(
                                +order?.[1] ? +order?.[1] : 0,
                                market?.amount_precision!,
                                ',',
                             )}
                     </div> */}
                          <div className="flex-1 text-right text-soft">
                             {generateTotal(
                                +order?.[0] ? +order?.[0] : 0,
                                +order?.[1] ? +order?.[1] : 0,
                             )}
                          </div>
                          <div
                             className="animate-backgroundWidth absolute right-0 h-full bg-success/15 transition-[width] duration-200 ease-in-out"
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
