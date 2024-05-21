import Marquee from 'react-fast-marquee';
import { TOKEN_RATE } from '@/constants/data';
import { OrderBook } from '@/components/dummy/OrderBook';
import { HistoryTrade } from '@/components';
import { HistorySwap } from '@/components/molecules/HistorySwap';
import { useNavigate, useParams } from 'react-router-dom';
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
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Currencies } from '../Dummy/types';
import { IcCoinPairs } from '@/assets/icons';
import { cn } from '@/utils';
import { Dialog, Transition } from '@headlessui/react';
import dayjs from 'dayjs';
import { Decimal } from '@/components/molecules/Decimal';

export const DummySwap = () => {
   const baseUrl = import.meta.env.VITE_API_URL;
   const navigate = useNavigate();
   const [showTradingChart, setShowTradingChart] = useState(false);
   const [showModalMarket, setShowModalMarket] = useState(false);

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
      updateMarket(market);
      updateTradeMarket(market_trade);
      updateKLine(k_line);
   }, [marketId, updateKLine, updateMarket, updateTradeMarket]);

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
   const getCurrentPair = listCurrencies?.find(item => item.id === getCurrentMarket?.quote_unit);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const depth = await getMarketDepth(marketId!, 60);
            const marketTicker = await getMarketTicker(marketId!);

            updateDepth(depth);
            updateMarketTicker(marketTicker);
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      };

      fetchData();

      // const intervalId = setInterval(fetchData, 8000);
      // return () => clearInterval(intervalId);
   }, [marketId, updateDepth, updateMarketTicker]);

   useEffect(() => {
      getData();
   }, [getData]);

   console.log('ejanebkaj', currency);

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

   console.log('handleSearch', handleSearch);

   return (
      <>
         <div className="layout-main mb-14">
            <div className="grid h-full grid-cols-1 gap-4">
               <div className="flex h-[64px] items-center justify-between gap-2 rounded-lg bg-dark2 p-4 px-3 lg:hidden">
                  <div
                     onClick={() => setShowModalMarket(!showModalMarket)}
                     className="flex gap-2">
                     <IcCoinPairs className="size-7 rounded-lg  bg-dark3 p-1 text-soft" />
                     <div className="text-base font-bold uppercase">{getCurrentMarket?.name}</div>
                  </div>
                  <div className="flex gap-1">
                     <div onClick={() => setShowTradingChart(!showTradingChart)}>
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
               <div className="flex h-[52px] items-center gap-2 rounded-lg bg-yellow/10 px-3 lg:hidden">
                  <div>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-7 text-yellow"
                        viewBox="0 0 28 28"
                        fill="none">
                        <path
                           opacity="0.2"
                           d="M25.1201 14.6142L14.6201 25.1142C14.5394 25.1951 14.4436 25.2592 14.3381 25.3029C14.2327 25.3467 14.1196 25.3692 14.0054 25.3692C13.8912 25.3692 13.7781 25.3467 13.6727 25.3029C13.5672 25.2592 13.4714 25.1951 13.3907 25.1142L2.89071 14.6142C2.80989 14.5336 2.74576 14.4378 2.70201 14.3323C2.65826 14.2268 2.63574 14.1137 2.63574 13.9995C2.63574 13.8854 2.65826 13.7723 2.70201 13.6668C2.74576 13.5613 2.80989 13.4655 2.89071 13.3849L13.3962 2.88485C13.4768 2.80403 13.5727 2.7399 13.6781 2.69615C13.7836 2.6524 13.8967 2.62988 14.0109 2.62988C14.1251 2.62988 14.2381 2.6524 14.3436 2.69615C14.4491 2.7399 14.5449 2.80403 14.6256 2.88485L25.1256 13.3903C25.2864 13.5537 25.3761 13.7741 25.3751 14.0034C25.374 14.2327 25.2824 14.4523 25.1201 14.6142Z"
                           fill="currentColor"
                        />
                        <path
                           d="M14 7.87518C14.232 7.87518 14.4546 7.96736 14.6187 8.13146C14.7828 8.29555 14.875 8.51811 14.875 8.75018V14.8752C14.875 15.1072 14.7828 15.3298 14.6187 15.4939C14.4546 15.658 14.232 15.7502 14 15.7502C13.7679 15.7502 13.5453 15.658 13.3812 15.4939C13.2171 15.3298 13.125 15.1072 13.125 14.8752V8.75018C13.125 8.51811 13.2171 8.29555 13.3812 8.13146C13.5453 7.96736 13.7679 7.87518 14 7.87518ZM12.6875 18.8127C12.6875 19.0723 12.7644 19.326 12.9087 19.5419C13.0529 19.7577 13.2579 19.9259 13.4977 20.0253C13.7375 20.1246 14.0014 20.1506 14.256 20.1C14.5106 20.0493 14.7445 19.9243 14.928 19.7408C15.1116 19.5572 15.2366 19.3233 15.2872 19.0687C15.3379 18.8141 15.3119 18.5502 15.2126 18.3104C15.1132 18.0706 14.945 17.8656 14.7291 17.7214C14.5133 17.5772 14.2596 17.5002 14 17.5002C13.6519 17.5002 13.318 17.6385 13.0719 17.8846C12.8257 18.1307 12.6875 18.4646 12.6875 18.8127ZM26.25 14.0002C26.2506 14.2294 26.2058 14.4564 26.1181 14.6682C26.0304 14.88 25.9016 15.0723 25.7392 15.2339L15.2337 25.7405C14.9058 26.0664 14.4623 26.2494 14 26.2494C13.5376 26.2494 13.0941 26.0664 12.7662 25.7405L2.26621 15.2339C1.94027 14.906 1.75732 14.4625 1.75732 14.0002C1.75732 13.5379 1.94027 13.0943 2.26621 12.7664L12.7717 2.25986C13.0996 1.93392 13.5431 1.75098 14.0054 1.75098C14.4678 1.75098 14.9113 1.93392 15.2392 2.25986L25.7446 12.7664C25.9061 12.9285 26.0339 13.121 26.1206 13.3328C26.2074 13.5445 26.2513 13.7714 26.25 14.0002ZM24.5 14.0002L14 3.50018L3.49996 14.0002L14 24.5002L24.5 14.0002Z"
                           fill="currentColor"
                        />
                     </svg>
                  </div>
                  <div className="text-xs text-yellow">
                     <div className="font-normal">Info</div>
                     <div className="font-semibold">This pair had low liquidity</div>
                  </div>
               </div>
               <div className="flex h-full flex-col gap-4 lg:flex-row ">
                  {/* OrderBook */}

                  <div className="w-full md:w-[312px]">
                     <OrderBook
                        data={depth}
                        ticker={marketTicker}
                        currency={currency!}
                        usdt={usdt!}
                     />
                  </div>

                  {/* End OrderBook */}
                  {/*  Trading Chart */}

                  <div className="flex flex-1 overflow-hidden rounded-2xl bg-dark2 p-4">
                     <section className="hidden w-full lg:block">
                        <div
                           onClick={() => setShowModalMarket(!showModalMarket)}
                           className="flex cursor-pointer items-center space-x-3">
                           <IcCoinPairs className="h-8 w-8 rounded-lg bg-dark3 p-1 text-white" />
                           {market?.map(e => (
                              <div
                                 key={e.base_unit}
                                 onClick={() => navigate(`/dummyswap/${e.name.replace('/', '-')}`)}
                                 className={`${
                                    marketId === e.name
                                       ? 'bg-[#20232e]'
                                       : 'border border-[#20232e] bg-transparent'
                                 } flex cursor-pointer items-center space-x-1 rounded-lg px-2 py-1`}>
                                 <div className="relative m-1 h-6 w-8">
                                    <img
                                       src={
                                          market[0]?.base_unit === e?.base_unit
                                             ? `https://s2.coinmarketcap.com/static/img/coins/64x64/28301.png`
                                             : `https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png`
                                       }
                                       alt="kokom"
                                    />
                                    {/* <IcBitcoin height={24} width={24} className="absolute z-10" />
              <IcBitcoin height={24} width={24} className="absolute left-2" /> */}
                                 </div>
                                 <div className="font-semibold">{e.name}</div>
                              </div>
                           ))}
                        </div>
                        <div className="my-2  flex items-center gap-7">
                           <div>
                              <div className="flex items-center space-x-1">
                                 <div className="text-xl font-semibold">
                                    {Decimal.format(
                                       marketTicker?.ticker?.last ?? 0,
                                       currency?.precision!,
                                       ',',
                                    )}
                                 </div>
                                 <div
                                    className={getColor(
                                       marketTicker?.ticker?.price_change_percent,
                                    )}>
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
                              <div className="text-xs">24h Transactions</div>
                              <div className={getColor(marketTicker?.ticker?.price_change_percent)}>
                                 {marketTicker?.ticker?.transactions}
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
                           {/* <div className="flex space-x-1 bg-[#FE9F00] bg-opacity-10 p-2 rounded-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                    >
                      <path
                        opacity="0.2"
                        d="M25.1201 14.6142L14.6201 25.1142C14.5394 25.1951 14.4436 25.2592 14.3381 25.3029C14.2327 25.3467 14.1196 25.3692 14.0054 25.3692C13.8912 25.3692 13.7781 25.3467 13.6727 25.3029C13.5672 25.2592 13.4714 25.1951 13.3907 25.1142L2.89071 14.6142C2.80989 14.5336 2.74576 14.4378 2.70201 14.3323C2.65826 14.2268 2.63574 14.1137 2.63574 13.9995C2.63574 13.8854 2.65826 13.7723 2.70201 13.6668C2.74576 13.5613 2.80989 13.4655 2.89071 13.3849L13.3962 2.88485C13.4768 2.80403 13.5727 2.7399 13.6781 2.69615C13.7836 2.6524 13.8967 2.62988 14.0109 2.62988C14.1251 2.62988 14.2381 2.6524 14.3436 2.69615C14.4491 2.7399 14.5449 2.80403 14.6256 2.88485L25.1256 13.3903C25.2864 13.5537 25.3761 13.7741 25.3751 14.0034C25.374 14.2327 25.2824 14.4523 25.1201 14.6142Z"
                        fill="#FE9F00"
                      />
                      <path
                        d="M14 7.87518C14.232 7.87518 14.4546 7.96736 14.6187 8.13146C14.7828 8.29555 14.875 8.51811 14.875 8.75018V14.8752C14.875 15.1072 14.7828 15.3298 14.6187 15.4939C14.4546 15.658 14.232 15.7502 14 15.7502C13.7679 15.7502 13.5453 15.658 13.3812 15.4939C13.2171 15.3298 13.125 15.1072 13.125 14.8752V8.75018C13.125 8.51811 13.2171 8.29555 13.3812 8.13146C13.5453 7.96736 13.7679 7.87518 14 7.87518ZM12.6875 18.8127C12.6875 19.0723 12.7644 19.326 12.9087 19.5419C13.0529 19.7577 13.2579 19.9259 13.4977 20.0253C13.7375 20.1246 14.0014 20.1506 14.256 20.1C14.5106 20.0493 14.7445 19.9243 14.928 19.7408C15.1116 19.5572 15.2366 19.3233 15.2872 19.0687C15.3379 18.8141 15.3119 18.5502 15.2126 18.3104C15.1132 18.0706 14.945 17.8656 14.7291 17.7214C14.5133 17.5772 14.2596 17.5002 14 17.5002C13.6519 17.5002 13.318 17.6385 13.0719 17.8846C12.8257 18.1307 12.6875 18.4646 12.6875 18.8127ZM26.25 14.0002C26.2506 14.2294 26.2058 14.4564 26.1181 14.6682C26.0304 14.88 25.9016 15.0723 25.7392 15.2339L15.2337 25.7405C14.9058 26.0664 14.4623 26.2494 14 26.2494C13.5376 26.2494 13.0941 26.0664 12.7662 25.7405L2.26621 15.2339C1.94027 14.906 1.75732 14.4625 1.75732 14.0002C1.75732 13.5379 1.94027 13.0943 2.26621 12.7664L12.7717 2.25986C13.0996 1.93392 13.5431 1.75098 14.0054 1.75098C14.4678 1.75098 14.9113 1.93392 15.2392 2.25986L25.7446 12.7664C25.9061 12.9285 26.0339 13.121 26.1206 13.3328C26.2074 13.5445 26.2513 13.7714 26.25 14.0002ZM24.5 14.0002L14 3.50018L3.49996 14.0002L14 24.5002L24.5 14.0002Z"
                        fill="#FE9F00"
                      />
                    </svg>
                    <div>
                      <div className="text-[#FE9F00]">Info</div>
                      <div className="text-[#FE9F00] font-semibold">
                        This pair had low liquidity
                      </div>
                    </div>
                  </div> */}
                        </div>
                        <div className="grid h-full max-h-96 w-full place-content-center overflow-y-scroll">
                           Trading chart
                        </div>
                     </section>
                  </div>

                  {/* End Trading Chart */}
               </div>
               <div className="h-full">
                  {/* Form & Table Swap */}
                  <div className="grid grid-cols-1 gap-7 xl:grid-cols-2">
                     <div className="order-2 h-[452px] rounded-2xl bg-dark2 p-4 lg:order-1">
                        <HistoryTrade />
                     </div>
                     <div className="order-1 h-full overflow-hidden rounded-2xl bg-dark2 p-4 lg:order-2 lg:h-[452px]">
                        <HistorySwap
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
               {TOKEN_RATE.map(token => (
                  <div className="flex space-x-5 px-2 text-xs">
                     <div>{token.name}</div>
                     <div className="text-green">{token.rate}</div>
                  </div>
               ))}
            </Marquee>
         </div>

         {/* Modal Change Market */}
         <Transition
            appear
            show={showModalMarket}
            as={Fragment}>
            <Dialog
               as="div"
               className="relative"
               onClose={() => setShowModalMarket(!showModalMarket)}>
               <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <div className="fixed inset-0 z-[99]  bg-black/20 " />
               </Transition.Child>

               <div className="fixed inset-0 z-[999] overflow-y-auto backdrop-blur-sm">
                  <div className="flex min-h-full   items-center justify-center p-4">
                     <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95">
                        <Dialog.Panel className="relative  w-full max-w-lg transform  overflow-hidden rounded-lg border border-soft/15 bg-dark  p-6  shadow-xl transition-all">
                           <div>
                              <input type="text" />
                           </div>
                           <div className="flex items-center justify-between border-b border-primary/50 pb-2 text-xs text-soft">
                              <div>Pairs</div>
                              <div>Last Price</div>
                              <div>Volume 24h</div>
                           </div>
                           <div className="mt-3 space-y-2">
                              {filteredData?.map(item => (
                                 <div
                                    key={item.id}
                                    onClick={() => {
                                       navigate(`/dummyswap/${item.name?.replace('/', '-')}`);
                                       setShowModalMarket(false);
                                    }}
                                    className="flex cursor-pointer justify-between">
                                    <div className="w-full text-xs font-medium text-soft">
                                       {item.name}
                                    </div>
                                    <div className="w-full text-center text-xs font-light text-soft">
                                       00
                                    </div>
                                    <div className="w-full text-right text-xs font-light text-soft">
                                       00
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </>
   );
};
