import Marquee from 'react-fast-marquee';
import { OrderBook } from '@/components/dummy/OrderBook';
import {
   HistoryTrade,
   ModalMobileChangeMarket,
   SelectMarketSwap,
   SwapContainer,
} from '@/components';
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
import { IcCoinPairs } from '@/assets/icons';
import { cn } from '@/utils';
import dayjs from 'dayjs';
import { Decimal } from '@/components/molecules/Decimal';
import TradingViewV2 from '@/components/organisms/TradingView/tradingViewV2';
import { SwapMobileContainer } from '@/components/dummy/SwapMobileContainer';
import { OrderBookMobile } from '@/components/dummy/OrderBookMobile';
import { HistoryTradeMobile } from '@/components/dummy/HistoryTradeMobile';

export const DummySwap = () => {
   const baseUrl = import.meta.env.VITE_API_URL;
   const [showTradingChart, setShowTradingChart] = useState(false);
   const [showModalMarket, setShowModalMarket] = useState(false);
   const [showOrderBook, setShowOrderBook] = useState(true);

   const params = useParams();
   const marketId = params?.market?.replace('-', '')?.toLowerCase();

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

   const [depthLoading, setDepthLoading] = useState(true);

   const getData = useCallback(async () => {
      const market = await getMarketList({});
      const k_line = await getMarketKLine(marketId!, {});
      const market_trade = await getMarketTrades(marketId!);
      const depth = await getMarketDepth(marketId!, 60, setDepthLoading);
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

   const usdt = listCurrencies?.find(item => item.id === 'usdt');
   const getCurrentPair = listCurrencies?.find(item => item.id === getCurrentMarket?.quote_unit);
   const marketById = market?.find(item => item?.id === marketId);

   useEffect(() => {
      getData();
   }, [getData]);

   const [searchTerm, setSearchTerm] = useState('');

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
   };

   const filteredData = market?.filter(crypto =>
      crypto.name?.toLowerCase().includes(searchTerm.toLowerCase()),
   );

   const getColor = (changePrice: string) => {
      return changePrice?.includes('+')
         ? 'text-green'
         : changePrice?.includes('-')
           ? 'text-primary'
           : 'text-soft';
   };

   return (
      <>
         <div className="layout-main mb-14">
            <div className="grid h-full grid-cols-1 gap-2 lg:gap-4">
               {/* Mobile view design */}
               <div className="flex h-[64px] items-center justify-between gap-2 rounded bg-dark2 p-4 px-3 lg:hidden">
                  <div
                     onClick={() => setShowModalMarket(!showModalMarket)}
                     className="flex gap-2">
                     <IcCoinPairs className="size-7 rounded-lg  bg-dark3 p-1 text-soft" />
                     <div className="text-base font-bold uppercase">{getCurrentMarket?.name}</div>
                  </div>
                  <div className="flex gap-1">
                     <div
                        onClick={() => {
                           setShowOrderBook(!showOrderBook);
                           setShowTradingChart(!showTradingChart);
                        }}>
                        <svg
                           className={cn(`size-6 ${showOrderBook ? 'text-primary' : 'text-soft'}`)}
                           viewBox="0 0 24 24"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M17 4H7a2 2 0 00-2 2v13a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2z"
                              stroke="currentColor"
                              strokeWidth={2}
                           />
                           <path
                              d="M9 9h6m-6 4h6m-6 4h4"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                           />
                        </svg>
                     </div>
                     <div
                        onClick={() => {
                           setShowTradingChart(!showTradingChart);
                           setShowOrderBook(!showOrderBook);
                        }}>
                        <svg
                           className={cn(
                              `size-6 ${showTradingChart ? 'text-primary' : 'text-soft'}`,
                           )}
                           viewBox="0 0 24 24"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M21 11.25h-1.5v-4.5a1.5 1.5 0 00-1.5-1.5h-3.75a1.5 1.5 0 00-1.5 1.5v4.5h-1.5V4.5A1.5 1.5 0 009.75 3H6a1.5 1.5 0 00-1.5 1.5v6.75H3a.75.75 0 100 1.5h1.5v6.75A1.5 1.5 0 006 21h3.75a1.5 1.5 0 001.5-1.5v-6.75h1.5v4.5a1.5 1.5 0 001.5 1.5H18a1.5 1.5 0 001.5-1.5v-4.5H21a.75.75 0 100-1.5zM9.75 19.5H6v-15h3.75v15zM18 17.25h-3.75V6.75H18v10.5z"
                              fill="currentColor"
                           />
                        </svg>
                     </div>
                     <div>
                        <svg
                           width={24}
                           height={24}
                           viewBox="0 0 24 24"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M12 2.25A9.75 9.75 0 1021.75 12 9.76 9.76 0 0012 2.25zm0 18A8.25 8.25 0 1120.25 12 8.26 8.26 0 0112 20.25zm1.5-3.75a.75.75 0 01-.75.75 1.5 1.5 0 01-1.5-1.5V12a.75.75 0 110-1.5 1.5 1.5 0 011.5 1.5v3.75a.75.75 0 01.75.75zm-3-8.625a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                              fill="#90A3BF"
                           />
                        </svg>
                     </div>
                  </div>
               </div>

               {showOrderBook && (
                  <div className="grid grid-cols-2 gap-2 lg:hidden">
                     <div className="block w-full lg:hidden">
                        <OrderBookMobile
                           data={depth}
                           ticker={marketTicker}
                           market={marketById!}
                           loading={depthLoading}
                        />
                     </div>
                     <div className="rounded bg-dark2 p-2">
                        <SwapMobileContainer
                           unitLoading={unitLoading}
                           getCurrentPair={getCurrentPair!}
                           getCurrentMarket={getCurrentMarket!}
                        />
                     </div>
                  </div>
               )}

               {showTradingChart && (
                  <div className="h-96 overflow-hidden rounded bg-dark2 p-2 lg:hidden">
                     <TradingViewV2 />
                  </div>
               )}

               <div className="rounded bg-dark2 p-2 lg:hidden">
                  <HistoryTradeMobile />
               </div>

               {/* End Mobile view design */}

               <div className="hidden h-full flex-col gap-4 lg:flex lg:flex-row ">
                  {/* OrderBook */}

                  <div className="w-full lg:block lg:w-[350px]">
                     <OrderBook
                        data={depth}
                        ticker={marketTicker}
                        usdt={usdt!}
                        market={marketById!}
                        loading={depthLoading}
                     />
                  </div>

                  {/* End OrderBook */}

                  {/*  Trading Chart */}
                  <div className="flex flex-grow overflow-hidden rounded-2xl bg-dark2 p-4">
                     <section className="hidden w-full lg:block">
                        <div className="flex cursor-pointer items-center space-x-3">
                           {/* Pop up change market */}
                           <SelectMarketSwap
                              searchTerm={searchTerm}
                              handleSearch={handleSearch}
                              filteredData={filteredData}
                              setSearchTerm={setSearchTerm}
                              setShowModalMarket={setShowModalMarket}
                              ticker={marketTicker}
                           />
                           {/* End Pop up change market */}

                           {/* Button Market */}
                           {market?.map(e => (
                              <NavLink
                                 key={e.base_unit}
                                 to={`/trade/${e.name.replace('/', '-')}`}
                                 className={`${
                                    marketId?.toLowerCase() ===
                                    e.name.replace('/', '').toLowerCase()
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
                                       +marketTicker?.ticker?.last
                                          ? +marketTicker?.ticker?.last
                                          : 0,
                                       marketById?.price_precision!,
                                       ',',
                                    )}
                                 </div>
                                 <div
                                    className={getColor(
                                       marketTicker?.ticker?.price_change_percent,
                                    )}>
                                    (
                                    {marketTicker?.ticker?.price_change_percent
                                       ? marketTicker?.ticker?.price_change_percent
                                       : '0%'}
                                    )
                                 </div>
                              </div>
                              <div className="mt-1 text-[#90A3BF]">
                                 {dayjs(
                                    marketTicker?.at ? marketTicker?.at * 1000 : Date.now(),
                                 ).format('MMM DD, YYYY, hh:mm A')}
                              </div>
                           </div>
                           <div className="text-xl text-soft/15">|</div>
                           <div>
                              <div className="text-xs">Change 24H</div>
                              <div className={getColor(marketTicker?.ticker?.price_change_percent)}>
                                 {marketTicker?.ticker?.price_change_percent
                                    ? marketTicker?.ticker?.price_change_percent
                                    : '0%'}
                              </div>
                           </div>
                           <div>
                              <div className="text-xs">24h High</div>
                              <div className={getColor(marketTicker?.ticker?.price_change_percent)}>
                                 {Decimal.format(
                                    +marketTicker?.ticker?.high ? +marketTicker?.ticker?.high : 0,
                                    marketById?.price_precision!,
                                    ',',
                                 )}
                              </div>
                           </div>
                           <div>
                              <div className="text-xs">24h Low</div>
                              <div className={getColor(marketTicker?.ticker?.price_change_percent)}>
                                 {Decimal.format(
                                    +marketTicker?.ticker?.low ? +marketTicker?.ticker?.low : 0,
                                    marketById?.price_precision!,
                                    ',',
                                 )}
                              </div>
                           </div>
                           <div>
                              <div className="text-xs">24h Volume</div>
                              <div className={getColor(marketTicker?.ticker?.price_change_percent)}>
                                 {Decimal.format(
                                    +marketTicker?.ticker?.volume
                                       ? +marketTicker?.ticker?.volume
                                       : 0,
                                    marketById?.amount_precision!,
                                    ',',
                                 )}
                              </div>
                           </div>
                           <div>
                              <div className="text-xs">24h Transaction</div>
                              <div className={getColor(marketTicker?.ticker?.price_change_percent)}>
                                 {marketTicker?.ticker?.transactions
                                    ? marketTicker?.ticker?.transactions
                                    : '0'}
                              </div>
                           </div>
                           <div>
                              <div className="text-xs">Total Liquidity</div>
                              <div className={getColor(marketTicker?.ticker?.price_change_percent)}>
                                 {getCurrentMarket?.liquidity ? getCurrentMarket?.liquidity : '0'}
                              </div>
                           </div>
                        </div>
                        <div className="h-full max-h-96 w-full">
                           <TradingViewV2 />
                        </div>
                     </section>
                  </div>

                  {/* End Trading Chart */}
               </div>
               <div className="hidden h-full lg:block">
                  {/* Form & Table Swap */}
                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                     <div className="order-2 h-[470px] rounded-2xl bg-dark2 p-4 lg:order-1">
                        <HistoryTrade />
                     </div>
                     <div className="order-1 h-full overflow-hidden rounded-2xl bg-dark2 p-4 lg:order-2 lg:h-[470px]">
                        <SwapContainer
                           unitLoading={unitLoading}
                           getCurrentPair={getCurrentPair!}
                           getCurrentMarket={getCurrentMarket!}
                        />
                     </div>
                  </div>
                  {/* End Form & Table Swap */}
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

         {/* Modal Mobile Change Market */}
         <ModalMobileChangeMarket
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            filteredData={filteredData}
            showModalMarket={showModalMarket}
            setSearchTerm={setSearchTerm}
            setShowModalMarket={setShowModalMarket}
         />
      </>
   );
};
