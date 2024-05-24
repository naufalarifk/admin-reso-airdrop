import Marquee from 'react-fast-marquee';
// import { TOKEN_RATE } from "@/constants/data";
import { OrderBook } from '@/components/dummy/OrderBook';
import { SelectMarketSwap } from '@/components';
import { NavLink, useParams } from 'react-router-dom';
import {
   usePublicMarket,
   usePublicMarketTicker,
   usePublicMarketTrade,
} from '../Swap/hooks/usePublicMarkets';
import {
   getMarketList,
   getMarketKLine,
   getMarketTrades,
   getMarketDepth,
   getMarketTicker,
} from '@/api/services/public/markets';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Currencies } from '../Dummy/types';
import dayjs from 'dayjs';
import { Decimal } from '@/components/molecules/Decimal';
import TradingViewV2 from '@/components/organisms/TradingView/tradingViewV2';
import { NewFormTrade } from '@/components/dummy/NewFormTrade';
import { RecentTrades } from '@/components/dummy/RecentTrade';
import { NewHistoryTrade } from '@/components/dummy/NewHistoryTrade';

export const NewTrade = () => {
   const baseUrl = import.meta.env.VITE_API_URL;
   // const [showTradingChart, setShowTradingChart] = useState(false);
   const [, setShowModalMarket] = useState(false);
   // const [showOrderBook, setShowOrderBook] = useState(true);

   const params = useParams();
   const marketId = params?.market?.replace('-', '')?.toLowerCase();
   const currId = params?.market?.split('-')[0]?.toLowerCase();

   const market = usePublicMarket(state => state.market);
   const marketTicker = usePublicMarketTicker(state => state.market_ticker);
   // const trades = usePublicMarketTrade((state) => state.market_trade);
   // const currencies = usePublicCurrency((state) => state.currency);
   // const marketKLine = usePublicMarket((state) => state.k_line);
   // const marketTrade = usePublicMarketTrade((state) => state.market_trade);
   const depth = usePublicMarket(state => state.depth);
   const updateMarketTicker = usePublicMarketTicker(state => state.updateMarketTickerState);
   const updateTradeMarket = usePublicMarketTrade(state => state.updateMarketTradeState);
   const updateKLine = usePublicMarket(state => state.updateKLine);
   const updateDepth = usePublicMarket(state => state.updateDepth);
   const updateMarket = usePublicMarket(state => state.updateMarketState);

   const getData = useCallback(async () => {
      const market = await getMarketList({});
      const k_line = await getMarketKLine(marketId!, {});
      const market_trade = await getMarketTrades(marketId!);
      const depth = await getMarketDepth(marketId!, 60);
      const marketTicker = await getMarketTicker(marketId!);

      updateDepth(depth);
      updateMarketTicker(marketTicker);
      updateMarket(market);
      updateTradeMarket(market_trade);
      updateKLine(k_line);
   }, [marketId, updateDepth, updateKLine, updateMarket, updateMarketTicker, updateTradeMarket]);

   const getCurrencies = async () => {
      try {
         const response: AxiosResponse = await axios.get(
            `${baseUrl}/api/v2/trade/public/currencies?limit=100&page=1&ordering=asc&order_by=position`,
         );
         return response.data;
      } catch (error) {
         console.log('error', error);
      }
   };

   const getCurrentMarket = market?.find(item => item.id?.toLowerCase() === marketId);

   const { data: listCurrencies, isLoading: unitLoading } = useQuery<Currencies[], string>({
      queryKey: ['curencies'],
      queryFn: getCurrencies,
   });

   const currency = listCurrencies?.find(item => item.id === currId);
   const usdt = listCurrencies?.find(item => item.id === 'usdt');
   // const getCurrentPair = listCurrencies?.find(item => item.id === getCurrentMarket?.quote_unit);
   const marketById = market?.find(item => item?.id === marketId);

   useEffect(() => {
      getData();
   }, [getData]);

   const [searchTerm, setSearchTerm] = useState('');

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
   };

   const filteredData = market?.filter(crypto =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()),
   );

   const getColor = (changePrice: string) => {
      return changePrice?.includes('+')
         ? 'text-green'
         : changePrice?.includes('-')
           ? 'text-primary'
           : 'text-soft';
   };

   return (
      <section className="layout-main mb-8">
         <div className="flex justify-between gap-4">
            <div className="flex h-full flex-grow flex-col gap-4">
               {/*  Trading Chart */}
               <div className="h-[525px] w-full overflow-hidden rounded-2xl bg-dark2 p-4">
                  <section className="hidden h-full w-full lg:block">
                     <div className="flex cursor-pointer items-center space-x-3">
                        {/* Pop up change market */}
                        <SelectMarketSwap
                           searchTerm={searchTerm}
                           handleSearch={handleSearch}
                           filteredData={filteredData}
                           setSearchTerm={setSearchTerm}
                           setShowModalMarket={setShowModalMarket}
                        />
                        {/* End Pop up change market */}

                        {/* Button Market */}
                        {market?.map(e => (
                           <NavLink
                              key={e.base_unit}
                              to={`/new/trade/${e.name.replace('/', '-')}`}
                              className={`${
                                 marketId?.toLowerCase() === e.name.replace('/', '').toLowerCase()
                                    ? 'border-primary/50 bg-primary/10'
                                    : '  border-dark3 bg-dark2'
                              } flex cursor-pointer items-center space-x-1 rounded-lg border px-2 py-1`}>
                              <div className="relative m-1 size-6 overflow-hidden rounded-full object-cover">
                                 <img
                                    src={
                                       market[0]?.base_unit === e?.base_unit
                                          ? `https://s2.coinmarketcap.com/static/img/coins/64x64/28301.png`
                                          : `https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png`
                                    }
                                    alt="icon"
                                 />
                              </div>
                              <div className="font-semibold">{e.name}</div>
                           </NavLink>
                        ))}
                        {/* End Button Market */}
                     </div>

                     <div className="my-2 flex items-center gap-7">
                        <div>
                           <div className="flex items-center space-x-1">
                              <div className="text-xl font-semibold">
                                 {Decimal.format(
                                    marketTicker?.ticker?.last ?? 0,
                                    currency?.precision!,
                                    ',',
                                 )}
                              </div>
                              <div className={getColor(marketTicker?.ticker?.price_change_percent)}>
                                 ({marketTicker?.ticker?.price_change_percent ?? '-'})
                              </div>
                           </div>
                           <div className="mt-1 text-[#90A3BF]">
                              {dayjs(marketTicker?.at * 1000).format('MMM DD, YYYY, hh:mm A')}
                           </div>
                        </div>
                        <div className="text-xl text-soft/15">|</div>
                        <div>
                           <div className="text-xs">Change 24H</div>
                           <div className={getColor(marketTicker?.ticker?.price_change_percent)}>
                              {marketTicker?.ticker?.price_change_percent ?? '0%'}
                           </div>
                        </div>
                        <div>
                           <div className="text-xs">24h High</div>
                           <div className={getColor(marketTicker?.ticker?.price_change_percent)}>
                              {Decimal.format(
                                 marketTicker?.ticker?.high ?? 0,
                                 currency?.precision!,
                                 ',',
                              )}
                           </div>
                        </div>
                        <div>
                           <div className="text-xs">24h Low</div>
                           <div className={getColor(marketTicker?.ticker?.price_change_percent)}>
                              {Decimal.format(
                                 marketTicker?.ticker?.low ?? 0,
                                 currency?.precision!,
                                 ',',
                              )}
                           </div>
                        </div>
                        <div>
                           <div className="text-xs">24h Volume</div>
                           <div className={getColor(marketTicker?.ticker?.price_change_percent)}>
                              {Decimal.format(
                                 marketTicker?.ticker?.volume ?? 0,
                                 currency?.precision!,
                                 ',',
                              )}
                           </div>
                        </div>

                        <div>
                           <div className="text-xs">Total Liquidity</div>
                           <div
                              className={getColor(
                                 marketTicker?.ticker?.price_change_percent ?? '0%',
                              )}>
                              {getCurrentMarket?.liquidity ?? '0'}
                           </div>
                        </div>
                     </div>
                     <div className="h-full max-h-[360px] w-full">
                        <TradingViewV2 />
                     </div>
                  </section>
               </div>
               {/* End Trading Chart */}
               <div className="h-full rounded-2xl bg-dark2 p-4">
                  <NewHistoryTrade isLoading={unitLoading} />
               </div>
            </div>
            <div className="flex flex-col gap-4">
               {/* OrderBook */}
               <div className="grid grid-cols-2 gap-4">
                  <OrderBook
                     data={depth}
                     ticker={marketTicker}
                     usdt={usdt!}
                     market={marketById!}
                  />
                  <NewFormTrade
                     unitLoading={unitLoading}
                     getCurrentMarket={getCurrentMarket!}
                  />
               </div>
               <div className="rounded-2xl bg-dark2  p-4">
                  <RecentTrades loading={unitLoading} />
               </div>
            </div>
         </div>

         <div className="fixed bottom-0 z-20 hidden h-5 w-full flex-row items-center border-t border-soft/30 bg-dark text-sm lg:flex">
            <Marquee>
               {market?.map(token => (
                  <div className="flex space-x-5 px-2 text-xs">
                     <div>{token.name}</div>
                     <div className="text-green">{token.max_price}</div>
                  </div>
               ))}
            </Marquee>
         </div>
      </section>
   );
};
